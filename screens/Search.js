import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { Block, Text } from 'galio-framework';
import { nowTheme } from "../constants";
import { Button, Input } from '../components';
import { getCollections,getProducts } from "../network/products";
import _ from 'lodash';
import { Card } from "../components";

export default function Search(props) {
    const [state, setState] = useState([]);
    const [allprods, setProducts] = useState([]);

    useEffect(() => {
        getCollections().then(data => {
            data.map((value) => {
                if (value.title.includes(props.route?.params?.tag)) {
                    setProduct(value.id)
                }
            })
        });

        const setProduct = (value) => {
            getProducts(value,30).then(data => {
                setProducts((prevProd) => {
                    return [...prevProd, data]
                })
            }).catch((error) => {
                console.warn(error)
            })
        }

        return () => {
            setProducts([])
        }
    }, [props.route?.params?.tag]);
    const { navigation } = props;
    return (
        <SafeAreaView>
            <Block style={styles.container}>
                <Block flex style={styles.header}>
                    <Text style={{ fontSize: nowTheme.SIZES.FONT * 2, fontFamily: nowTheme.FONTFAMILY.REGULAR }}>Search</Text>
                    <Input placeholder="Search all Products" style={styles.inputs} value={props.route?.params?.name ? props.route.params.name : ""} />
                </Block>
                <Block style={{ flex: 3.8 }}>
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                        {allprods.map((value, index) => {
                            return (
                                _.map(_.chunk(value.products, 3), (element, index) => {
                                    return (
                                        <Block flex row center key={index} style={styles.home}>
                                            {_.map(element, (item, i) => {
                                                return (
                                                    <Card name={item.title} imageUri={item.images[0].src} uri horizontal style={{ margin: 8 }} key={i} isText={true} isImage />
                                                )
                                            })}
                                        </Block>
                                    )
                                })
                            )
                        })
                        }
                    </ScrollView>
                </Block>
                <Block>
                    <Button full color={nowTheme.COLORS.THEME} style={{ backgroundColor: nowTheme.COLORS.THEME }} onPress={() => navigation.navigate("Home")}>
                        <Text
                            style={{ fontFamily: nowTheme.FONTFAMILY.BOLD }}
                            size={14}
                            color={nowTheme.COLORS.WHITE}
                        >
                            CLOSE
                        </Text>
                    </Button>
                </Block>
            </Block>
        </SafeAreaView>
    )
};

const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        height: "100%",
        padding: 10,
    },
    header: {
        flex: 1,
        marginTop: 10,
    },
    home: {
        width: width * .95,
    },
    inputs: { borderWidth: 2, borderColor: nowTheme.COLORS.THEME, height: 55, marginTop: 15, }
})