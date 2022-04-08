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

const getUser = async (password) => {
    const data = `{
        customer(customerAccessToken: \"${password}") {
            id
            firstName
            lastName
            email
            phone
            addresses(first:5){
                edges{
                    node{
                        address1
                        address2
                        city
                        company
                        country
                        zip
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


const createCart = async (token,key,value,merchandiseId,quantity,note,discountCodes) => {
    const variable = `input: {
          buyerIdentity: {
            customerAccessToken: \"${token}"
          },
          discountCodes: "",
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

export { getCollections, getProducts, getUser, creatToken, createCart,getCart,getCartProduct,updateCart };