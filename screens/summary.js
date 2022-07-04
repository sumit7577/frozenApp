import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native'
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
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icons } from '../constants/Images'
import { addressLogo } from '../constants/Images'
import Checkbox from 'expo-checkbox';

export default function Summary(props) {
    const { cartId, id, totalPrice, url } = props.route.params;
    const [allProds, setProds] = useState([]);
    const [isChecked, setChecked] = useState(false);
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
        if (!isChecked) {
            Alert.alert("Error", 'Please Accept the Terms & Conditions')
        }
        else {
            props.navigation.navigate("Cart", {
                screen: "Payment2", params: {
                    id: id,
                    cartId: cartId,
                    totalPrice: totalAmount[2],
                    url: url,
                }
            })
        }
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
            <Block row style={{ borderBottomWidth: 0.5, borderColor: nowTheme.COLORS.MUTED, padding: 4, margin: 8 }}>
                <TouchableOpacity onPress={() => {
                    props.navigation.pop()
                }}>
                    <Image source={Icons.back} tintColor={nowTheme.COLORS.BLACK} style={{ height: 15, width: 17, marginTop: 8 }} />
                </TouchableOpacity>
                <Text style={{ fontFamily: nowTheme.FONTFAMILY.BOLD, padding: 4, marginLeft: "30%", fontSize: 16 }}>Order Summary</Text>
            </Block>
            <Block style={styles.container}>
                <Block style={styles.header}>
                    <Text style={styles.addressText}>Address</Text>
                    <Text style={{
                        fontFamily: nowTheme.FONTFAMILY.REGULAR,
                        fontSize: 14,
                        padding: 8
                    }}>
                        {fullAddress}
                    </Text>
                </Block>
                <Block style={styles.body}>
                    <Text style={styles.addressText}>Order Summary</Text>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {allProds.map((value, index) => (
                            <Block row space="between" key={index} style={{ padding: 8, margin: 10, borderBottomWidth: 0.5, borderColor: nowTheme.COLORS.MUTED }}>
                                <Block center>
                                    {value?.images[0]?.src ? <Image source={{ uri: value.images[0].src }} style={{ height: 50, width: 50 }} /> :
                                        <Image source={addressLogo} style={{ height: 50, width: 50 }} />}
                                </Block>
                                <Block style={{ padding: 8 }}>
                                    <Text style={{ fontFamily: nowTheme.FONTFAMILY.REGULAR, fontSize: 14,maxWidth:"95%" }}>{value.title}</Text>
                                    <Text style={{ fontFamily: nowTheme.FONTFAMILY.BOLD, fontSize: 14, paddingTop: 4 }}>{currencyCode[0]}{value.variants[0].price}</Text>
                                    <Text style={{ fontFamily: nowTheme.FONTFAMILY.REGULAR, fontSize: 14, paddingTop: 4 }}>Quantity {value.quantity}</Text>
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
                            <Text style={{ fontFamily: nowTheme.FONTFAMILY.BOLD }}>{currencyCode[0]}{totalAmount[0]}</Text>
                        </Block>

                        <Block row space="between">
                            <Text style={styles.text}>Tax</Text>
                            <Text style={{ fontFamily: nowTheme.FONTFAMILY.BOLD }}>{currencyCode[0]}{totalAmount[1]}</Text>
                        </Block>

                        <Block row space="between">
                            <Text style={styles.text}>Delivery Charges</Text>
                            <Text style={{ fontFamily: nowTheme.FONTFAMILY.BOLD }}>{currencyCode[1]}{shippingCost}</Text>
                        </Block>

                        <Block row space="between" style={{ borderBottomWidth: 0.5, borderTopWidth: 0.5, borderColor: nowTheme.COLORS.MUTED, padding: 8, marginTop: 8, paddingBottom: 12, marginBottom: 8 }}>
                            <Text style={styles.text2}>Total Amount</Text>
                            <Text style={{ fontFamily: nowTheme.FONTFAMILY.BOLD }}>{currencyCode[2]}{totalAmount[2]}</Text>
                        </Block>
                        <Block row style={{ alignItems: "center", paddingLeft: 8 }}>
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
        padding: 8,
        marginBottom: 10,
    },
    text: {
        fontFamily: nowTheme.FONTFAMILY.REGULAR,
        fontSize: 14,
        padding: 5
    },
    body: {
        flex: 5,
        padding: 8

    },
    footer: {
        flex: 6,
        padding: 8
    },
    addressText: {
        fontFamily: nowTheme.FONTFAMILY.BOLD,
        borderBottomWidth: 0.5,
        margin: 4,
        paddingBottom: 8,
        borderColor: nowTheme.COLORS.MUTED,
        fontSize: 16
    },
    text2: {
        fontFamily: nowTheme.FONTFAMILY.BOLD,
    }
})