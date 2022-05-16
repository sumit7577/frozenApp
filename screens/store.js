import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Block, Text } from 'galio-framework';
import _ from 'lodash';
import { Button } from "../components";
import { nowTheme } from '../constants';
import { useSelector } from "react-redux";
import { getCart, getCartProduct, updateCartItems } from "../network/products";
import { createCheckout, getSymbol } from "../network/checkout";
import Loader from "../components/Loader";
import { noProduct } from "../constants/Images";


function Stores(props) {
    const { route, navigation } = props;
    const updatedCart = route?.params?.property;
    const cart = useSelector(state => state.product.list);
    const [quantity, setQuantity] = useState(0);
    const users = useSelector(state => state.user.user);
    const addresses = users.defaultAddress;
    const [response, setResponse] = useState(() => {
        return false;
    })
    const [cartdetail, setCart] = useState(() => {
        return null;
    });
    const [addressIndex,setIndex] = useState(()=>{
        return 0;
    })
    const [allProds, setProds] = useState([]);
    const [totalAmount, setTotalAmount] = useState(() => {
        return []
    });
    const [currencyCode, setCurrencyCode] = useState(() => {
        return []
    });

    useEffect(() => {
        setResponse(() => {
            return true;
        })
        getCart(cart?.data?.cartCreate.cart.id).then(res => {

            setCart(res?.data?.data.cart?.lines?.edges);
            setTotalAmount(() => {
                const baseObject = res?.data?.data.cart;
                return [baseObject.estimatedCost.subtotalAmount.amount,
                baseObject.estimatedCost.totalTaxAmount.amount,
                baseObject.estimatedCost.totalAmount.amount];
            });

            setCurrencyCode(() => {
                const baseObject = res?.data?.data.cart;

                return [getSymbol(baseObject.estimatedCost.subtotalAmount.currencyCode),
                getSymbol(baseObject.estimatedCost.totalTaxAmount.currencyCode),
                getSymbol(baseObject.estimatedCost.totalAmount.currencyCode)];
            });



            let base = res?.data?.data.cart?.lines?.edges;

            if (base.length >= 1) {

                base?.map((value) => {
                    getCartProduct(value.node.attributes[0].value).then(res => {
                        setResponse(() => {
                            return false;
                        })
                        res.quantity = value.node.quantity;
                        res.variantId = value.node.id;
                        setProds((prevProd) => {
                            return [...prevProd, res];
                        })
                    }).catch(error => {
                        setResponse(() => {
                            return false;
                        })
                        console.log(error);
                    });
                }
                )
            }

            else {
                setResponse(() => {
                    return false;
                })
                console.log("no products")
            }

        }).catch(error => {
            setResponse(() => {
                return false;
            })
            console.log(error);
        })

        return () => {
            setProds([]);
        }
    }, [updatedCart, quantity]);

    const createCart = () => {
        setResponse(() => {
            return true;
        })
        let lineItems = [];
        if (allProds && allProds.length >= 1) {
            allProds.map(value => {
                lineItems.push(
                    {
                        variantId: value.variants[0].id,
                        quantity: value.quantity,
                        customAttributes: [{ key: "id", value: value.id }]
                    }
                )
            })
        }
        else {
            setResponse(() => {
                return false;
            })
            Alert.alert("No Products");
        }

        if (lineItems.length >= 1) {
            createCheckout(lineItems, addresses.address1, addresses?.address2, addresses.city, addresses?.company,
                users.firstName, users.lastName, users?.number, addresses?.zip, addresses.country, users?.email, users.token).then(
                    res => {
                        setResponse(() => {
                            return false;
                        })
                        if (res.id) {
                            navigation.navigate("Cart", {
                                screen: "Summary", params: {
                                    id: res.id,
                                    cartId: cart.data.cartCreate.cart.id,
                                    totalPrice: res.totalPrice,
                                }
                            })
                        }

                    }
                ).catch(error => {
                    setResponse(() => {
                        return false;
                    })
                    console.log(error);
                })
        }

    }

    const increaseCounter = (merchandiseId, prodouctId, variantId, index, quantity) => {
        if (quantity < 999) {
            updateCartItems(merchandiseId, prodouctId, quantity + 1, variantId, cart?.data?.cartCreate.cart.id).then(res => {
                if (res.data.data.cartLinesUpdate.userErrors == 0) {
                    setQuantity(quantity + 1);
                }
            }).catch(error => {
                console.log(error);
            })
        }
        else {
            Alert.alert("Server Error", "Cart Limit Exceeded!")
        }
    }

    const decraseCounter = (merchandiseId, prodouctId, variantId, index, quantity) => {
        if (quantity >= 2) {
            updateCartItems(merchandiseId, prodouctId, quantity - 1, variantId, cart?.data?.cartCreate.cart.id).then(res => {
                if (res.data.data.cartLinesUpdate.userErrors == 0) {
                    setQuantity(quantity - 1);
                }
            }).catch(error => {
                console.log(error);
            })
        }
        else {
            Alert.alert("Server Error", "Can`t Add Less Than 0 Products")
        }
    }

    if (cartdetail === null) {
        return (
            <SafeAreaView style={{ alignItems: "center", position: "absolute", top: height / 4, left: width / 8 }}>
                <Image source={noProduct} style={{ resizeMode: "contain", height: 300, width: 300 }} />
            </SafeAreaView>
        )
    }
    else {
        return (
            <SafeAreaView style={{ backgroundColor: nowTheme.COLORS.WHITE }}>
                <Block middle style={{ borderBottomWidth: 0.5, borderColor: nowTheme.COLORS.MUTED, padding: 4, margin: 8 }}>
                    <Text style={{ fontFamily: nowTheme.FONTFAMILY.MEDIUM, padding: 4,fontSize:16 }}>CART</Text>
                </Block>
                <Loader response={response} />
                <Block style={styles.container}>
                    <Block style={styles.header} middle>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {allProds.map((value, index) => {
                                return (
                                    <Block middle row style={styles.prods} key={index}>
                                        <Image source={{ uri: value?.images[0]?.src }} style={{ height: 50, width: 50 }} />
                                        <Block>
                                            <Text style={{ maxWidth: width * 0.4, fontFamily: nowTheme.FONTFAMILY.REGULAR, fontSize: 12, paddingLeft: 5, paddingVertical: 10, }}>
                                                {value?.title}</Text>
                                                <Text style={{fontFamily: nowTheme.FONTFAMILY.REGULAR, fontSize: 14, paddingLeft: 5,}}>{getSymbol(value.variants[0].priceV2.currencyCode)}{value.variants[0]?.price}</Text>
                                        </Block>

                                        <Button small style={{ backgroundColor: nowTheme.COLORS.THEME, width: 40, height: 40 }} onPress={() => {
                                            decraseCounter(value.variants[0].id, value.id, value.variantId, index, value.quantity);
                                        }}>
                                            <Text
                                                style={{ fontFamily: nowTheme.FONTFAMILY.BOLD }}
                                                size={14}
                                                color={nowTheme.COLORS.WHITE}
                                            >
                                                -
                                            </Text>
                                        </Button>

                                        <Text style={styles.text}>{value.quantity}</Text>

                                        <Button small style={{ backgroundColor: nowTheme.COLORS.THEME, width: 40, height: 40 }} onPress={() => {
                                            increaseCounter(value.variants[0].id, value.id, value.variantId, index, value.quantity);
                                        }}>
                                            <Text
                                                style={{ fontFamily: nowTheme.FONTFAMILY.BOLD }}
                                                size={14}
                                                color={nowTheme.COLORS.WHITE}
                                            >
                                                +
                                            </Text>
                                        </Button>
                                    </Block>
                                )
                            })}
                        </ScrollView>

                    </Block>

                    <Block style={styles.body}>
                        <Block style={{ flex: 3, padding: 5, marginRight: 8 }} right>

                            <Block row style={styles.bill}>
                                <Text style={styles.texts}>SUB TOTAL</Text>
                                <Text style={styles.texts}>{currencyCode[0]}{totalAmount[0]}</Text>
                            </Block>

                            <Block row style={styles.bill}>
                                <Text style={styles.texts}>VAT</Text>
                                <Text style={styles.texts}>{currencyCode[1]}{totalAmount[1]}</Text>
                            </Block>

                            <Block row style={styles.bill}>
                                <Text style={styles.texts}>TOTAL</Text>
                                <Text style={styles.texts}>{currencyCode[2]}{totalAmount[2]}</Text>
                            </Block>

                        </Block>

                        <Block style={{ flex: 3, justifyContent: "space-between", paddingLeft: 12, paddingRight: 12 }} row>

                            <Block>
                                <Text style={styles.texts}>SHIPPING ADDRESS</Text>
                                <Text style={styles.text}>{users.defaultAddress.firstName} {users.defaultAddress.lastName}</Text>
                                <Text style={styles.text}>{addresses.address1}</Text>
                                <Text style={styles.text}>{addresses.city} {addresses.zip}</Text>
                                <Text style={styles.text}>{addresses.country}</Text>
                                <Text style={{ marginTop: 12, fontFamily: nowTheme.FONTFAMILY.REGULAR, fontSize: 13 }}>
                                    {users.defaultAddress.phone ? users.defaultAddress.phone : "Phone Number Not Exists!"}</Text>
                            </Block>

                            <Block style={{ alignItems: "center" }}>
                                <Button border style={{ backgroundColor: nowTheme.COLORS.WHITE, height: 50, width: width / 3, marginTop: "20%" }}
                                    onPress={() => {
                                        users.address.edges.map((value,index)=>{
                                            if(value.node.id === users.defaultAddress.id){
                                                setIndex(()=>{
                                                    return index;
                                                })
                                            }
                                        })
                                        navigation.navigate("Setting", {
                                            screen: "EditAddress", params: {
                                                addressId:users.defaultAddress.id,
                                                id:addressIndex,
                                            }
                                        })
                                    }}>
                                    <Text
                                        style={{ fontFamily: nowTheme.FONTFAMILY.BOLD }}
                                        size={12}
                                        color={nowTheme.COLORS.THEME}
                                    >
                                        EDIT
                                    </Text>
                                </Button>
                            </Block>

                        </Block>

                        <Block style={{ flex: 4, margin: 10, justifyContent: "space-between" }}>

                            <Block style={{ borderWidth: 2, borderColor: nowTheme.COLORS.THEME, height: height / 8, justifyContent: "center", borderRadius: 5 }}>
                                <Text style={{ textAlign: "center", color: nowTheme.COLORS.MUTED, fontSize: 12, fontFamily: nowTheme.FONTFAMILY.REGULAR, paddingHorizontal: 20 }}>
                                    include any purchase order numbers, notes or special instructions for your order here</Text>
                            </Block>

                            <Block>
                                <Text style={{ textAlign: "center", fontFamily: nowTheme.FONTFAMILY.MEDIUM, fontSize: 10, paddingHorizontal: 20 }}>
                                    By placing an order you agree to our terms & conditions of sale & use of equipment, to view them click here</Text>
                            </Block>
                        </Block>

                    </Block>

                    <Block style={styles.footer} center>

                        <Button full border style={{ backgroundColor: nowTheme.COLORS.THEME }} onPress={createCart}>
                            <Text
                                style={{ fontFamily: nowTheme.FONTFAMILY.BOLD }}
                                size={12}
                                color={nowTheme.COLORS.WHITE}
                            >
                                CHECKOUT
                            </Text>
                        </Button>
                    </Block>

                </Block>
            </SafeAreaView>
        );
    }
}

const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    header: {
        flex: 2,
        justifyContent: "center",
        padding: 8,
    },
    body: {
        flex: 5,
    },
    footer: {
        flex: 2,
    },
    prods: {
        width: "100%",
        justifyContent: "space-between",
        padding: 8,
        borderBottomWidth: 0.5,
        borderColor: nowTheme.COLORS.MUTED,
        borderRadius: 4,
        marginTop: 8,
    },
    text: {
        fontFamily: nowTheme.FONTFAMILY.REGULAR,
        fontSize: 12,
    },
    texts: {
        fontFamily: nowTheme.FONTFAMILY.BOLD,
        fontSize: 13,
        marginBottom: 5,
    },
    bill: {
        justifyContent: "space-between",
        width: "55%"
    }
});

export default Stores;