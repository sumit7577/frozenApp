import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Block, Text } from 'galio-framework';
import _ from 'lodash';
import { Button, Input } from "../components";
import { nowTheme } from '../constants';
import { useSelector } from "react-redux";
import { getCart, getCartProduct, updateCartItems } from "../network/products";
import { createCheckout, getSymbol } from "../network/checkout";
import Loader from "../components/Loader";
import { noProduct } from "../constants/Images";
import { addressLogo } from "../constants/Images";
import Checkbox from 'expo-checkbox';
import { TouchableOpacity } from "react-native-gesture-handler";
import { getGid } from "../network/admin";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/products/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

function Stores(props) {
    const { route, navigation } = props;
    const dispatch = useDispatch();
    const [isChecked, setChecked] = useState(false);
    //const updatedCart = route?.params?.property;
    const cart = useSelector(state => state.product.list);
    const [quantity, setQuantity] = useState(0);
    const users = useSelector(state => state.user.user);
    const addresses = users.defaultAddress;
    const [response, setResponse] = useState(() => {
        return false;
    });
    const [cartdetail, setCart] = useState(() => {
        return [];
    });
    const [addressIndex, setIndex] = useState(() => {
        return 0;
    })
    //const [allProds, setProds] = useState([]);
    const [totalAmount, setTotalAmount] = useState(() => {
        return []
    });
    const [currencyCode, setCurrencyCode] = useState(() => {
        return []
    });
    const isFocused = useIsFocused();

    useEffect(() => {
        (async () => {
            const productList = await AsyncStorage.getItem("products");
            const allProducts = JSON.parse(productList);
            if (allProducts) {
                setCart(() => {
                    return allProducts;
                });
            }
        })();

    }, [isFocused]);

    useEffect(() => {
        let TotalPrice = 0;
        cartdetail?.map((value) => {
            if (value.price23) {
                TotalPrice += value.quantity * value.price23;
            }
            else {
                TotalPrice += value.quantity * value.price;
            }

        });
        setTotalAmount(() => {
            return [TotalPrice];
        })
        setCurrencyCode(() => {
            return [cartdetail[0]?.code];
        });
        (async () => {
            await AsyncStorage.setItem("products", JSON.stringify(cartdetail));
        })();
    }, [cartdetail]);


    /*useEffect(() => {
        setResponse(() => {
            return true;
        });
        getCart(cart?.data?.cartCreate.cart.id).then(res => {
            setCart(res?.data?.data.cart?.lines?.edges);
            let base2 = res?.data?.data.cart?.lines?.edges
            if (base2 && base2.length > 0) {
                setTotalAmount(() => {
                    const baseObject = res?.data?.data?.cart;
                    return [baseObject.estimatedCost.subtotalAmount.amount,
                    baseObject.estimatedCost.totalTaxAmount?.amount,
                    baseObject.estimatedCost.totalAmount.amount];
                });
            }
            if (base2 && base2.length > 0) {
                setCurrencyCode(() => {
                    const baseObject = res?.data?.data?.cart;
                    return [getSymbol(baseObject.estimatedCost.subtotalAmount.currencyCode),
                    getSymbol(baseObject.estimatedCost.totalTaxAmount.currencyCode),
                    getSymbol(baseObject.estimatedCost.totalAmount.currencyCode)];
                });
            } else {
                console.log("no products");
            }

            let base = res?.data?.data.cart?.lines?.edges;

            if (base && base.length > 0) {
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
    }, [updatedCart, quantity, cart]);*/

    const createCart = () => {
        setResponse(() => {
            return true;
        })
        let lineItems = [];
        if (cartdetail && cartdetail.length >= 1) {
            cartdetail.map(value => {
                lineItems.push(
                    {
                        variantId: value.variantId,
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
                users.defaultAddress.firstName, users.defaultAddress.lastName, users?.defaultAddress.phone, addresses?.zip, addresses.country, users?.email, users.token).then(
                    res => {
                        setResponse(() => {
                            return false;
                        })
                        if (res.id) {
                            navigation.navigate("Cart", {
                                screen: "Summary", params: {
                                    id: res.id,
                                    totalPrice: res.totalPrice,
                                    url: res.webUrl,
                                    checkoutId: res.id,
                                }
                            });
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

    const termCheckout = () => {
        setResponse(() => {
            return true;
        });
        let lineItems = [];
        let discount = {
            description: "Custom discount",
            value_type: "fixed_amount", value: "10.0", amount: "10.00", title: "Custom"
        }
        if (cartdetail && cartdetail.length >= 1) {
            cartdetail.map(value => {
                lineItems.push(
                    {
                        title: value.name,
                        originalUnitPrice: value.price,
                        quantity: value.quantity,
                        appliedDiscount: {
                            description: "wholesale",
                            value: value.quantity,
                            amount: value.price23,
                            valueType: "PERCENTAGE",
                            title: "A Wholesale Discount For Net30 Users"
                        },
                        weight: {
                            value: 1,
                            unit: "KILOGRAMS"
                        },
                        customAttributes: [
                            {
                                key: "id",
                                value: value.id,
                            },
                        ]
                    }
                )
            });
        }
        else {
            setResponse(() => {
                return false;
            })
            Alert.alert("No Products");
        };
        if (lineItems.length >= 1) {
            getGid(lineItems, discount, users.id, users.email).then(
                res => {
                    setResponse(() => {
                        return false;
                    });

                    if (res.data.data.draftOrderCreate.userErrors.length < 1) {
                        (async () => {
                            await AsyncStorage.removeItem("products");
                        })();
                        setCart(() => {
                            return [];
                        })
                        Alert.alert("Order Success", "Order Successfully Placed!");
                    }
                    else {
                        setResponse(() => {
                            return false;
                        });
                        Alert.alert("Order Failed", "Can`t Complete Your order Right Now. Please! Try Again Later");
                    }
                }
            ).catch(error => {
                setResponse(() => {
                    return false;
                })
                Alert.alert("Order Failed", "Can`t Complete Your order Right Now. Please! Try Again Later");
            })
        }
    }

    const increaseCounter = (id, index, quantity) => {
        if (cartdetail[index].quantity < 999) {
            setCart((prev) => {
                const prevArray = [...prev];
                prevArray[index].quantity += 1;
                return prevArray;
            });
            (async () => {
                await AsyncStorage.setItem("products", JSON.stringify(cartdetail));
            })();
        }
        else {
            Alert.alert("Cart Error", "Cart Limit Exceeded!")
        }
        /*setResponse(true);
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
        }*/
    }

    const decraseCounter = (id, index, quantity) => {
        if (cartdetail[index].quantity > 1) {
            setCart((prev) => {
                const prevArray = [...prev];
                prevArray[index].quantity -= 1;
                return prevArray;
            });
            (async () => {
                await AsyncStorage.setItem("products", JSON.stringify(cartdetail));
            })();
        }
        else {
            setCart((prev) => {
                const prevArray = [...prev];
                prevArray.splice(index, 1);
                return prevArray;
            });
            (async () => {
                await AsyncStorage.setItem("products", JSON.stringify(cartdetail));
            })();
        }

        /*setResponse(true);
        updateCartItems(merchandiseId, prodouctId, quantity - 1, variantId, cart?.data?.cartCreate.cart.id).then(res => {
            if (res.data.data.cartLinesUpdate.userErrors == 0) {
                setQuantity(quantity - 1);
                getCart(cart?.data?.cartCreate.cart.id).then(res => {
                    setCart(res?.data?.data.cart?.lines?.edges);
                }).catch(error => {
                    console.log(error);
                })
            }
        }).catch(error => {
            console.log(error);
        })*/
    };

    const erorMessage = () => {
        Alert.alert("Error", 'Please Accept the Terms & Conditions');
    }

    if (!cartdetail || cartdetail.length < 1) {
        return (
            <SafeAreaView style={{ alignItems: "center", position: "absolute", top: height / 4, left: width / 8 }}>
                <Image source={noProduct} style={{ resizeMode: "contain", height: 300, width: 300 }} />
            </SafeAreaView>
        )
    }
    else {
        return (
            <SafeAreaView style={{ backgroundColor: nowTheme.COLORS.WHITE, height: "100%" }}>
                <Block middle style={{ borderBottomWidth: 0.5, borderColor: nowTheme.COLORS.MUTED, padding: 4, margin: 8 }}>
                    <Text style={{ fontFamily: nowTheme.FONTFAMILY.MEDIUM, padding: 4, fontSize: 16 }}>CART</Text>
                </Block>
                <Loader response={response} />
                <Block style={styles.container}>
                    <ScrollView overScrollMode="always">
                        <Block style={styles.header} middle>
                            {cartdetail.map((value, index) => {
                                return (
                                    <Block middle row style={styles.prods} key={index}>
                                        {value?.image && value.image != "" ? <Image source={{ uri: value?.image }} style={{ height: 50, width: 50 }} /> :
                                            <Image source={addressLogo} style={{ height: 50, width: 50 }} />}
                                        <Block>
                                            <Text style={{ maxWidth: width * 0.4, fontFamily: nowTheme.FONTFAMILY.REGULAR, fontSize: 12, paddingLeft: 5, paddingVertical: 10, }}>
                                                {value?.name}</Text>
                                            <Text style={{ fontFamily: nowTheme.FONTFAMILY.REGULAR, fontSize: 14, paddingLeft: 5, }}>{getSymbol(value.code)}{value.price23 ? value.price23 : value.price}</Text>
                                        </Block>

                                        <Button small style={{ backgroundColor: nowTheme.COLORS.THEME, width: 40, height: 40 }} onPress={() => {
                                            decraseCounter(value.id, index, value.quantity);
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
                                            increaseCounter(value.id, index, value.quantity);
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


                        </Block>

                        <Block style={styles.body}>
                            <Block style={{ flex: 1, padding: 5, marginRight: 8 }} right>

                                <Block row style={styles.bill}>
                                    <Text style={styles.texts}>SUB TOTAL</Text>
                                    <Text style={styles.texts}>{getSymbol(currencyCode[0])}{totalAmount[0].toFixed(2)}</Text>
                                </Block>

                                {/*<Block row style={styles.bill}>
                                <Text style={styles.texts}>VAT</Text>
                                <Text style={styles.texts}>{currencyCode[1]}{totalAmount[1]}</Text>
                            </Block>

                            <Block row style={styles.bill}>
                                <Text style={styles.texts}>TOTAL</Text>
                                <Text style={styles.texts}>{currencyCode[2]}{totalAmount[2]}</Text>
                        </Block>*/}

                            </Block>

                            <Block style={{ flex: 3, marginTop: "10%", justifyContent: "space-between", paddingLeft: 12, paddingRight: 12 }} row>

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
                                            users.address.edges.map((value, index) => {
                                                if (value.node.id === users.defaultAddress.id) {
                                                    setIndex(() => {
                                                        return index;
                                                    })
                                                }
                                            })
                                            navigation.navigate("Setting", {
                                                screen: "SettingHome", params: {
                                                    addressId: users.defaultAddress.id,
                                                    id: addressIndex,
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

                            <Block style={{ flex: 4, margin: 10, justifyContent: "space-between", marginTop: "10%" }}>

                                <Block style={{ borderWidth: 2, borderColor: nowTheme.COLORS.THEME, height: height / 8, justifyContent: "center", borderRadius: 5 }}>
                                    <Text style={{ textAlign: "center", color: nowTheme.COLORS.MUTED, fontSize: 12, fontFamily: nowTheme.FONTFAMILY.REGULAR, paddingHorizontal: 20 }}>
                                        include any purchase order numbers, notes or special instructions for your order here</Text>
                                </Block>

                                <Block>
                                    
                                    <Text style={{ textAlign: "center", fontFamily: nowTheme.FONTFAMILY.MEDIUM, fontSize: 10, paddingHorizontal: 20, marginTop: "5%" }}>
                                        By placing an order you agree to our terms & conditions of sale & use of equipment.</Text>
                                </Block>
                                {users.tags.includes("net30") && <Block row style={{ alignItems: "center", paddingLeft: 8, marginTop: "10%" }}>
                                    <Checkbox
                                        value={isChecked}
                                        onValueChange={setChecked}
                                    />
                                    <Text style={{
                                        fontFamily: nowTheme.FONTFAMILY.REGULAR,
                                        fontSize: 15
                                    }}>I agree to the </Text>
                                    <TouchableOpacity onPress={() => {
                                        props.navigation.navigate("Condition2")
                                    }}>
                                        <Text style={{
                                            textDecorationLine: 'underline',
                                            textDecorationStyle: 'solid',
                                            color: nowTheme.COLORS.THEME,
                                            fontFamily: nowTheme.FONTFAMILY.BOLD,
                                            fontSize: 15,
                                        }}>terms and conditions</Text>
                                    </TouchableOpacity>
                                </Block>}

                            </Block>

                        </Block>

                        <Block style={styles.footer} center>
                            {users.tags.includes("net30") ? <Button full border style={{ backgroundColor: nowTheme.COLORS.THEME }} onPress={isChecked ? termCheckout : erorMessage}>
                                <Text
                                    style={{ fontFamily: nowTheme.FONTFAMILY.BOLD }}
                                    size={12}
                                    color={nowTheme.COLORS.WHITE}
                                >
                                    TERM CHECKOUT
                                </Text>
                            </Button> : <Button full border style={{ backgroundColor: nowTheme.COLORS.THEME }} onPress={createCart}>
                                <Text
                                    style={{ fontFamily: nowTheme.FONTFAMILY.BOLD }}
                                    size={12}
                                    color={nowTheme.COLORS.WHITE}
                                >
                                    CHECKOUT
                                </Text>
                            </Button>}
                        </Block>
                    </ScrollView>
                </Block>

            </SafeAreaView>
        );
    }
}

const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        height: "90%",
        display: "flex",
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
        flex: 9,
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