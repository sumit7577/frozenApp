import { SHOPIFY_STORE, API_KEY } from "@env";
import Client from 'shopify-buy';
import { Client as clent } from 'shopify-buy/index.unoptimized.umd';
import { GETUSER } from "./mutations";
import Axios from 'axios';

const shopName = "frozen-brothers-online.myshopify.com";

const client = Client.buildClient({
    domain: shopName,
    storefrontAccessToken: API_KEY
})

const axios = Axios.create({
    headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": "0454ce0a269736e04dfc3f87dc402bba",
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

export { getCollections, getProducts, getUser, creatToken };