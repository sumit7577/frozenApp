import { SHOPIFY_STORE, API_KEY } from "@env";
import Client from 'shopify-buy';
import { GETPRODUCT } from "./mutations";

const shopName = "frozen-brothers-online.myshopify.com";
const client = Client.buildClient({
    domain:shopName,
    storefrontAccessToken:API_KEY});

const getCollections = async () => {
    const collections = await client.collection.fetchAll(250);
    return collections;
}

const getProducts = async(id,number) =>{
    const products = await client.collection.fetchWithProducts(id,{ productsFirst: number });
    return products;
}

export {getCollections,client,getProducts};