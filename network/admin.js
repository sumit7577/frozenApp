import Axios from "axios";
import { ADMIN_STORE, ADMIN_KEY } from "@env";

const getGid = async (lineItems, discount, customerId, email,note) => {
  var globalResponse;
  const variable = `{
        customers(first: 10, query:"(email:${email})") {
          edges {
            node {
              id
              displayName
            }
          }
        }
      }`;
  const configs = {
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": ADMIN_KEY
    },
  }
  const response = await Axios.post(ADMIN_STORE + "graphql.json", JSON.stringify({ query: variable }), configs);
  if (response?.data.data.customers.edges.length > 0) {
    const variable2 = {
      "input": {
        "customerId": response.data.data.customers.edges[0].node.id,
        "note": note,
        "email": email,
        "taxExempt": true,
        "appliedDiscount": {
          "description": "damaged",
          "value": 500,
          "amount": 5,
          "valueType": "FIXED_AMOUNT",
          "title": "Test Discount Dont Trust this"
        },
        "lineItems":lineItems,
        "useCustomerDefaultAddress": true
      }
    };
    const data = `
      mutation draftOrderCreate($input: DraftOrderInput!) {
        draftOrderCreate(input:$input) {
          draftOrder {
            id
            email
            appliedDiscount{
                amountV2{
                    amount
                }
                value
                title
            }
            billingAddress{
                address1
            }
            completedAt
          }
          userErrors {
            field
            message
          }
        }
      }`;
    try {
      globalResponse = await Axios.post(ADMIN_STORE + "graphql.json", JSON.stringify({ query: data, variables: variable2 }), configs);
      return globalResponse;
    }
    catch({request}){
      console.log(request);
    }
    
  }
  else {
    return globalResponse;
  }
};

export { getGid };