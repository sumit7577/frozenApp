import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, FlatList, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Block, Text } from 'galio-framework';
import _ from 'lodash';
import { Card, Button } from "../components";
import { nowTheme } from '../constants';
import { useSelector } from "react-redux";
import { getCart, getCartProduct } from "../network/products";


function Stores(props) {
    const { route, navigation } = props;
    const updatedCart = route?.params?.property;
    const cart = useSelector(state => state.product.list);
    const [cartdetail, setCart] = useState(() => {
        return null;
    });
    const [allProds, setProds] = useState([]);
    const [totalAmount, setTotalAmount] = useState(() => {
        return []
    });
    const [currencyCode, setCurrencyCode] = useState(() => {
        return []
    });

    useEffect(() => {
        setProds([]);
        getCart(cart.data.cartCreate.cart.id).then(res => {

            setCart(res.data.data.cart?.lines?.edges);

            setTotalAmount(() => {
                const baseObject = res.data.data.cart;
                return [baseObject.estimatedCost.subtotalAmount.amount,
                baseObject.estimatedCost.totalTaxAmount.amount,
                baseObject.estimatedCost.totalAmount.amount];
            });

            setCurrencyCode(() => {
                const baseObject = res.data.data.cart;

                return [baseObject.estimatedCost.subtotalAmount.currencyCode,
                baseObject.estimatedCost.totalTaxAmount.currencyCode,
                baseObject.estimatedCost.totalAmount.currencyCode];
            });

            let base = res.data.data.cart?.lines?.edges;

            if (base.length >= 1) {

                base.map((value) => {
                    getCartProduct(value.node.attributes[0].value).then(res => {
                        res.quantity = value.node.quantity;
                        setProds((prevProd) => {
                            return [...prevProd, res];
                        })
                    })
                });
            }

            else {
                console.log("no producs")
            }

        })
    }, [updatedCart]);

    if (cartdetail === null) {
        return (
            <SafeAreaView>
                <Text> No product in carts</Text>
            </SafeAreaView>
        )
    }
    else {
        return (
            <SafeAreaView>
                <Block style={styles.container}>

                    <Block style={styles.header} middle>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {allProds.map((value, index) => {
                                return (
                                    <Block middle row style={styles.prods} key={index}>
                                        <Image source={{ uri: value?.images[0]?.src }} style={{ height: 50, width: 50 }} />
                                        <Text style={{ maxWidth: width * 0.4, fontFamily: nowTheme.FONTFAMILY.BOLD, fontSize: 10, paddingLeft: 5 }}> {value?.title}{'\n'} ${value.variants[0]?.price}</Text>

                                        <Button small style={{ backgroundColor: nowTheme.COLORS.THEME, width: 30, height: 40 }}>
                                            <Text
                                                style={{ fontFamily: nowTheme.FONTFAMILY.BOLD }}
                                                size={14}
                                                color={nowTheme.COLORS.WHITE}
                                            >
                                                +
                                            </Text>
                                        </Button>

                                        <Text style={styles.text}>{value.quantity}</Text>

                                        <Button small style={{ backgroundColor: nowTheme.COLORS.THEME, width: 30, height: 40 }}>
                                            <Text
                                                style={{ fontFamily: nowTheme.FONTFAMILY.BOLD }}
                                                size={14}
                                                color={nowTheme.COLORS.WHITE}
                                            >
                                                -
                                            </Text>
                                        </Button>

                                        <Text style={styles.text}>${value.variants[0]?.price}</Text>
                                    </Block>
                                )
                            })}
                        </ScrollView>

                    </Block>

                    <Block style={styles.body}>
                        <Block style={{ flex: 3, padding: 5 }} right>

                            <Block row style={styles.bill}>
                                <Text style={styles.texts}>SUB TOTAL</Text>
                                <Text style={styles.texts}>${totalAmount[0]}</Text>
                            </Block>

                            <Block row style={styles.bill}>
                                <Text style={styles.texts}>VAT</Text>
                                <Text style={styles.texts}>${totalAmount[1]}</Text>
                            </Block>

                            <Block row style={styles.bill}>
                                <Text style={styles.texts}>DELIVERY </Text>
                                <Text style={styles.texts}>$</Text>
                            </Block>

                            <Block row style={styles.bill}>
                                <Text style={styles.texts}>TOTAL</Text>
                                <Text style={styles.texts}>${totalAmount[2]}</Text>
                            </Block>

                        </Block>
                        <Block style={{ flex: 6 }}>
                            <Text>SHIPPING ADDRESS</Text>
                        </Block>
                    </Block>

                    <Block style={styles.footer} middle>

                        <Button full border style={{ backgroundColor: nowTheme.COLORS.THEME }}>
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
        marginTop: "10%",
        justifyContent: "center",
        padding: 8,
    },
    body: {
        flex: 5.5,
    },
    footer: {
        flex: 1,
    },
    prods: {
        width: "100%",
        justifyContent: "space-between",
        padding: 8,
        borderRadius: 4,
        backgroundColor: "#d3d3d3",
        marginTop: 8,
    },
    text: {
        fontFamily: nowTheme.FONTFAMILY.BOLD,
        fontSize: 10,
    },
    texts: {
        fontFamily: nowTheme.FONTFAMILY.BOLD,
        fontSize: 12,
        marginBottom: 5,
    },
    bill:{
        justifyContent: "space-between",
        width: "55%"
    }
});

export default Stores;