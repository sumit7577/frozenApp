import { axios, client } from "./products";
import { SHOPIFY_STORE, ADMIN_STORE, ADMIN_KEY } from "@env";
import getSymbolFromCurrency from 'currency-symbol-map'


const createCheckout = async (lineItems, address1, address2, city, company, firstName, lastName, phone, zip, country, email, token) => {
  const response = await client.checkout.create({
    email: email, lineItems: [],
    shippingAddress: { address1, address2, city, company, country, firstName, lastName, phone, zip },
    note: "",
  });

  if (response.id) {
    await client.checkout.addLineItems(response.id, lineItems);
    associateCustomer(response.id, token);
    //updateShippingAddress(response.id,address1,address2,city,company,firstName,lastName,phone,zip,country);
    getShippingCost(response.id).then(res => {
      updateShippingCost(response.id, res?.data?.data.node.availableShippingRates.shippingRates[0].handle);
    });
  }
  return getCheckout(response.id);
}

const getCheckout = async (checkoutId) => {
  const response = await client.checkout.fetch(checkoutId);
  return response;
}


const associateCustomer = async (customerId, checkoutId) => {
  const data = `
    mutation associateCustomerWithCheckout{
        checkoutCustomerAssociateV2(checkoutId: \"${checkoutId}"\, customerAccessToken: \"${customerId}"\) {
          checkout {
            id
          }
          checkoutUserErrors {
            message
          }
          customer {
            id
          }
        }
      }`;
  await axios.post(SHOPIFY_STORE, JSON.stringify({ query: data }));
}

const getStripeToken = async (number, month, year, cvv) => {
  const variable = `card[number]=${number}&card[exp_month]=${month}&card[exp_year]=${year}&card[cvc]=${cvv}`;
  const response = await fetch("https://api.stripe.com/v1/tokens", {
    method: "POST",
    body: variable,
    headers: {
      "Authorization": "Bearer sk_test_51HpQavLo9p3SVh7eqAAvUYsQbi8F46rk9Qk55osFFjDZqhZL5KQSz42rHMibylbAiSTiUM0pQ9PwRIGhesXfhJns00RPqL0xSA",
      "Content-Type": "application/x-www-form-urlencoded",
    }
  })
  const data = await response.json();
  return data;
}

const getShopifyVaultToken = async (number, month, year, cvv, firstName = "sumit", lastName = "kumar") => {
  const variable = {
    "credit_card": {
      "number": number, "first_name": firstName,
      "last_name": lastName, "month": month, "year": year, "verification_value": cvv
    }
  };
  const response = await axios.post("https://elb.deposit.shopifycs.com/sessions", variable);
  return response;
}

const completeCheckoutV2 = async (checkoutId, vaultId, amount, currencyCode, address) => {
  const variable = `
  payment: {
    paymentAmount: {
      amount: \"${amount}"\,
      currencyCode: ${currencyCode}
    },
    idempotencyKey: "123",
    billingAddress: {
      firstName: \"${address.firstName}"\,
      lastName: \"${address.lastName}"\,
      address1: \"${address.address1}"\,
      province: \"${address?.province}"\,
      country: \"${address?.country}"\,
      city: \"${address?.city}"\,
      zip: \"${address.zip}"
    },
    test:true,
    vaultId: \"${vaultId}"\
  }`;
  const data = `
  mutation checkoutCompleteWithCreditCardV2 {
    checkoutCompleteWithCreditCardV2(checkoutId: \"${checkoutId}"\, ${variable}) {
      checkout {
        id
        completedAt
      }
      checkoutUserErrors {
        code
        field
        message
      }
      payment {
        creditCard{
          brand
        }
        errorMessage
        id
        transaction{
          kind
          statusV2
          test
          amountV2{
            amount
            currencyCode
          }
        }
      }
    }
  }`
  const response = await axios.post(SHOPIFY_STORE, JSON.stringify({ query: data }));
  return response;
}

const completeCheckout = async (checkoutId, paymentId, amount, currencyCode, address) => {
  const variable = `
  payment: {
    paymentAmount: {
      amount: \"${amount}"\,
      currencyCode: ${currencyCode}
    },
    idempotencyKey: "123",
    billingAddress: {
      firstName: \"${address.firstName}"\,
      lastName: \"${address.lastName}"\,
      address1: \"${address.address1}"\,
      province: \"${address?.province}"\,
      country: \"${address?.country}"\,
      city: \"${address?.city}"\,
      zip: \"${address.zip}"
    },
    type: SHOPIFY_PAY,
    test:true,
    paymentData: \"${paymentId}"\
  }`;
  const data =
    `mutation checkoutCompleteWithTokenizedPaymentV3 {
    checkoutCompleteWithTokenizedPaymentV3(checkoutId: \"${checkoutId}"\, ${variable}) {
      checkout {
        id
        completedAt
      }
      checkoutUserErrors {
        code
        field
        message
      }
      payment {
        id
        transaction{
          kind
          statusV2
          test
          amountV2{
            amount
            currencyCode
          }
        }
      }
    }
  }`;
  const response = await axios.post(SHOPIFY_STORE, JSON.stringify({ query: data }));
  return response;
}

const updateShippingAddress = async (checkoutId, address1, address2, city, company, firstName, lastName, phone, zip, country) => {
  const shippingAddress = {
    address1: address1,
    address2: address2,
    city: city,
    company: company,
    country: country,
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    zip: zip
  }
  await client.checkout.updateShippingAddress(checkoutId, shippingAddress);

}

const getShippingCost = async (checkoutId) => {
  const data = `
  query {
    node(id: \"${checkoutId}"\) {
      ... on Checkout {
        id
        webUrl
        availableShippingRates {
          ready
          shippingRates {
            handle
            priceV2 {
              amount
            }
            title
          }
        }
      }
    }
  }
  `
  const response = await axios.post(SHOPIFY_STORE, JSON.stringify({ query: data }));
  return response;
}

const updateShippingCost = async (checkoutId, handle) => {
  const data = `
  mutation checkoutShippingLineUpdate {
    checkoutShippingLineUpdate(checkoutId: \"${checkoutId}", shippingRateHandle: \"${handle}"\) {
      checkout {
        id
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
  `;
  await axios.post(SHOPIFY_STORE, JSON.stringify({ query: data }));

}

const getOrders = async (token) => {
  const data = `{
    customer(customerAccessToken: \"${token}"\){
        orders(first:100){
            edges{
                node{
                    id
                    name
                    processedAt
                    totalPriceV2{
                        amount
                        currencyCode
                    }
                    fulfillmentStatus
                    financialStatus
                    shippingAddress{
                        address1
                        address2
                        city
                        company
                        country
                        name 
                        phone
                        zip
                      }
                  }
              }
          }
      }
  }`;
  const response = await axios.post(SHOPIFY_STORE, JSON.stringify({ query: data }));
  return response;
}

const getSymbol = (currencyCode) => {
  const symbol = getSymbolFromCurrency(currencyCode);
  return symbol;
};


export { createCheckout, getCheckout, getStripeToken, completeCheckout, updateShippingAddress, getSymbol, getShippingCost, getShopifyVaultToken, completeCheckoutV2, getOrders };