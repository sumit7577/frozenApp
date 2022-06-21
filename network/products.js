import { SHOPIFY_STORE, API_KEY } from "@env";
import Client from 'shopify-buy';
import Axios from 'axios';


const shopName = "frozen-brothers-online.myshopify.com";

const client = Client.buildClient({
    domain: shopName,
    storefrontAccessToken: API_KEY
})


const axios = Axios.create({
    headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": API_KEY,
    }
})

const getCollections = async () => {
    const collections = await client.collection.fetchAll(250);
    return collections;
}

const getProducts = async (id, number) => {
    const products = await client.collection.fetchWithProducts(id, { productsFirst: number });
    return products;
}

const getAllProducts = async()=>{
  const response = await client.collection.fetchAllWithProducts();
  return response;
}


const getUser = async (password) => {
    const data = `{
        customer(customerAccessToken: \"${password}") {
            id
            firstName
            lastName
            email
            phone
            tags
            defaultAddress{
                id
                address1
                address2 
                city
                company
                country
                phone
                firstName
                lastName
                countryCodeV2
                zip
                province
                provinceCode
            }
            addresses(first:10){
                edges{
                    node{
                        id
                        address1
                        address2
                        city
                        phone
                        company
                        country
                        countryCodeV2
                        firstName
                        lastName
                        zip
                        province
                        provinceCode
                    }
                }
            }
        }
    }`
    const response = await axios.post(SHOPIFY_STORE, JSON.stringify({ query: data }));
    return response;
}

const creatToken = async (email, password) => {
    const variable = `
        input:{
            email:\"${email}",
            password:\"${password}",
        }
    `
    const data = `
        mutation customerAccessTokenCreate{
            customerAccessTokenCreate(${variable}) {
              customerAccessToken {
                accessToken
                expiresAt
              }
              customerUserErrors {
                  code
                  message
              }
            }
        }
    `
    const response = await axios.post(SHOPIFY_STORE, JSON.stringify({ query: data }));
    return response;
}

const resetPassword = async(email)=>{
    const data = `
    mutation customerRecover{
        customerRecover(email: \"${email}") {
          customerUserErrors {
            code
            message
          }
        }
      }
    `
    const response = await axios.post(SHOPIFY_STORE,JSON.stringify({query:data}));
    return response;
}


const createCart = async (token,key,value,merchandiseId,quantity,note,discountCodes) => {
    const variable = `input: {
          buyerIdentity: {
            customerAccessToken: \"${token}"
          },
          discountCodes: "sage-238",
          lines: {
            attributes: {
              key: \"${key}",
              value: \"${value}"
            },
            merchandiseId: \"${merchandiseId}",
            quantity: ${quantity},
          },
          note: ""
        }`;
    const data = `
    mutation cartCreate{
        cartCreate(${variable}){
            cart{
                id
                lines(first:10){
                    edges{
                        node{
                            attributes{
                                key
                                value
                            }
                            quantity
                        }
                    }
                }
            }
            userErrors {
                field
                message
            }
        }
    }`
    const respose  = await axios.post(SHOPIFY_STORE,JSON.stringify( {query:data} ));
    return respose;
}

const getCart = async(id) =>{
    const data = `{
        cart(id:\"${id}"\){
            id
            lines(first:10){
                edges{
                    node{
                        attributes{
                            key
                            value
                        }
                        quantity
                        id
                    }
                }
            }
            estimatedCost {
                totalAmount {
                  amount
                  currencyCode
                }
                subtotalAmount {
                  amount
                  currencyCode
                }
                totalTaxAmount {
                  amount
                  currencyCode
                }
                totalDutyAmount {
                  amount
                  currencyCode
                }
            }
        }
    }`;
    const response = await axios.post(SHOPIFY_STORE,JSON.stringify({query:data}));
    return response;
}

const getCartProduct = async(id)=>{
    const response = await client.product.fetch(id);
    return response;
}

const updateCart = async(id,key,value,variantId,quantity)=>{
    const variable = `
    lines:{
        attributes:{
            key:\"${key}"\,
            value:\"${value}"\,
        },
        merchandiseId:\"${variantId}"\,
        quantity:${quantity}
    }`;
    const data = `
    mutation cartLinesAdd{
        cartLinesAdd(cartId: \"${id}"\, ${variable}) {
          cart {
            id
            lines(first:10){
                edges{
                    node{
                        attributes{
                            key
                            value
                        }
                        quantity
                    }
                }
            }
          }
          userErrors {
            field
            message
          }
        }
      }`;
    
    const response = await axios.post(SHOPIFY_STORE,JSON.stringify({query:data}));
    return response;
}


const updateCartItems = async(merchandiseId,id,quantity,lineId,cartId)=>{
    const variable = `
        lines: {
          attributes: [
            {
              key: "id",
              value: \"${id}"\
            }
          ],
          id:\"${lineId}"\,
          merchandiseId:\"${merchandiseId}"\,
          quantity: ${quantity}
        }
    `
    const data = `
    mutation cartLinesUpdate{
        cartLinesUpdate(cartId: \"${cartId}"\, ${variable}) {
          cart {
            id
          }
          userErrors {
            field
            message
          }
        }
      }
    `
    const response = await axios.post(SHOPIFY_STORE,JSON.stringify({query:data}));
    return response;
}


const addressCreate = async(customerToken,address1,address2,city,company,country,firstName,lastName,phone,province,zip)=>{
    const variable = `
        address: {
          address1: \"${address1}"\,
          address2: \"${address2}"\,
          city:\"${city}"\,
          company: \"${company}"\,
          country: \"${country}"\,
          firstName: \"${firstName}"\,
          lastName: \"${lastName}"\,
          phone: \"${phone}"\,
          province: \"${province}"\,
          zip: \"${zip}"\
        }
    `
    const data = `
    mutation customerAddressCreate {
        customerAddressCreate(${variable}, customerAccessToken: \"${customerToken}"\) {
          customerAddress {
            id
          }
          customerUserErrors {
            field
            message
          }
        }
      }
    `
    const response = await axios.post(SHOPIFY_STORE,JSON.stringify({query:data}));
    return response;
}

const addressUpdate = async(customerToken,addressId,address1,address2,city,company,country,firstName,lastName,phone,province,zip) =>{
    const variable = `
        address: {
          address1: \"${address1}"\,
          address2: \"${address2}"\,
          city: \"${city}"\,
          company: \"${company}"\,
          country: \"${country}"\,
          firstName: \"${firstName}"\,
          lastName: \"${lastName}"\,
          phone: \"${phone}"\,
          province: \"${province}"\,
          zip: \"${zip}"\
        }
    `;
    const data = `
    mutation customerAddressUpdate {
        customerAddressUpdate(${variable}, customerAccessToken: \"${customerToken}"\, id: \"${addressId}"\) {
          customerAddress {
            id
          }
          customerUserErrors {
            field
            message
          }
        }
      }
    `;
    const response = await axios.post(SHOPIFY_STORE,JSON.stringify({query:data}));
    return response;

}

const defaultAddressUpdate = async(customerToken,addressId)=>{
    const data = `
    mutation customerDefaultAddressUpdate {
        customerDefaultAddressUpdate(addressId: \"${addressId}"\, customerAccessToken: \"${customerToken}"\) {
          customer {
            id
          }
          customerUserErrors {
            field
            message
          }
        }
      }`;
    const response = await axios.post(SHOPIFY_STORE,JSON.stringify({query:data}));
    return response;
}

const addressDelete = async(addressId,customerToken)=>{
  const data = `
  mutation customerAddressDelete {
    customerAddressDelete(customerAccessToken: \"${customerToken}"\, id: \"${addressId}"\) {
      customerUserErrors {
        field
        message
      }
      deletedCustomerAddressId
    }
  }
  `;
  const response = await axios.post(SHOPIFY_STORE,JSON.stringify({query:data}));
  return response;
}
export { getCollections, getProducts, getUser, creatToken, createCart,getCart,getCartProduct,updateCart,axios,client,resetPassword,updateCartItems,
defaultAddressUpdate,addressCreate,addressUpdate,addressDelete,getAllProducts };