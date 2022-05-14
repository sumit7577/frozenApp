import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Block } from 'galio-framework'
import { nowTheme } from '../constants'
import { useSelector } from 'react-redux'
import { Button } from '../components'
import { getCart, getCartProduct } from "../network/products";
import { getSymbol } from '../network/checkout'
import Loader from "../components/Loader";
import { getShippingCost } from '../network/checkout'


export default function Summary(props) {
    const { cartId, id, totalPrice } = props.route.params;
    const [allProds, setProds] = useState([]);
    const [totalAmount, setTotalAmount] = useState(() => {
        return []
    });
    const [currencyCode, setCurrencyCode] = useState(() => {
        return []
    });
    const [response, setResponse] = useState(false);
    const [shippingCost, setShippingCost] = useState(() => {
        return 0;
    })

    const completePayment = () => {
        props.navigation.navigate("Cart", {
            screen: "Payment", params: {
                id: id,
                cartId: cartId,
                totalPrice:totalAmount[2],
            }
        })
    }

    useEffect(() => {
        setResponse(() => {
            return true;
        })
        getCart(cartId).then(res => {
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

        getShippingCost(id).then(res => {
            setShippingCost(() => {
                return res.data.data.node.availableShippingRates.shippingRates[0].priceV2.amount
            });
        })

        return () => {
            setProds([]);
        }
    }, [cartId]);

    const user = useSelector(state => state.user.user.defaultAddress);
    const fullAddress = user.address1 + " " + user.address2 + " " + user.city + " " + user.country + " " + user.province + " " + user.zip
    return (
        <SafeAreaView style={{ backgroundColor: nowTheme.COLORS.WHITE, height: "100%" }}>
            <Loader response={response} />
            <Block middle style={{ borderBottomWidth: 0.5, borderColor: nowTheme.COLORS.MUTED, padding: 4, margin: 8 }}>
                <Text style={{ fontFamily: nowTheme.FONTFAMILY.BOLD, padding: 4 }}>Order Summary</Text>
            </Block>
            <Block style={styles.container}>
                <Block style={styles.header}>
                    <Text style={styles.addressText}>Address</Text>
                    <Text style={{
                        fontFamily: nowTheme.FONTFAMILY.REGULAR,
                        fontSize: 12,
                        padding: 8
                    }}>
                        {fullAddress}
                    </Text>
                </Block>
                <Block style={styles.body}>
                    <Text style={styles.addressText}>Order Summary</Text>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {allProds.map((value, index) => (
                            <Block row space="between" key={index} style={{ padding: 8,margin:10,marginTop:0, borderBottomWidth: 0.5, borderColor: nowTheme.COLORS.MUTED }}>
                                <Block center>
                                    <Image source={{ uri: value.images[0].src }} style={{ height: 50, width: 50 }} />
                                </Block>
                                <Block style={{ padding: 8 }}>
                                    <Text style={{ fontFamily: nowTheme.FONTFAMILY.REGULAR, fontSize: 11 }}>{value.title}</Text>
                                    <Text style={{ fontFamily: nowTheme.FONTFAMILY.BOLD, fontSize: 12, paddingTop: 4 }}>{currencyCode[0]}{value.variants[0].price}</Text>
                                    <Text style={{ fontFamily: nowTheme.FONTFAMILY.REGULAR, fontSize: 10, paddingTop: 4 }}>Quantity {value.quantity}</Text>
                                </Block>
                            </Block>
                        ))
                        }
                    </ScrollView>

                </Block>
                <Block style={styles.footer}>
                    <Text style={styles.addressText}>Price Details</Text>
                    <Block>
                        <Block row space="between">
                            <Text style={styles.text}>Price(2 Item)</Text>
                            <Text style={styles.text}>{currencyCode[0]}{totalAmount[0]}</Text>
                        </Block>

                        <Block row space="between">
                            <Text style={styles.text}>Tax</Text>
                            <Text style={styles.text}>{currencyCode[0]}{totalAmount[1]}</Text>
                        </Block>

                        <Block row space="between">
                            <Text style={styles.text}>Delivery Charges</Text>
                            <Text style={styles.text}>{currencyCode[1]}{shippingCost}</Text>
                        </Block>

                        <Block row space="between" style={{ borderBottomWidth: 0.5, borderTopWidth: 0.5, borderColor: nowTheme.COLORS.MUTED, padding: 8, marginTop: 8, paddingBottom: 12, marginBottom: 8 }}>
                            <Text style={styles.text2}>Total Amount</Text>
                            <Text style={styles.text2}>{currencyCode[2]}{totalAmount[2]}</Text>
                        </Block>
                    </Block>

                    <Button full style={{ backgroundColor: nowTheme.COLORS.THEME, alignSelf: "center" }} onPress={completePayment}>
                        <Text
                            style={{ fontFamily: nowTheme.FONTFAMILY.BOLD, color: nowTheme.COLORS.WHITE }}
                            size={14}
                        >
                            CONTINUE
                        </Text>
                    </Button>
                </Block>
            </Block>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%"
    },
    header: {
        flex: 1,
        padding: 8
    },
    text: {
        fontFamily: nowTheme.FONTFAMILY.BOLD,
        fontSize: 12,
        padding: 5
    },
    body: {
        flex: 5,
        padding: 8

    },
    footer: {
        flex: 5,
        padding: 8
    },
    addressText: {
        fontFamily: nowTheme.FONTFAMILY.BOLD,
        borderBottomWidth: 0.5,
        margin: 4,
        paddingBottom: 8,
        borderColor: nowTheme.COLORS.MUTED
    },
    text2: {
        fontFamily: nowTheme.FONTFAMILY.BOLD,
    }
})