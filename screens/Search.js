import { StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { Block, Text } from 'galio-framework';
import { nowTheme } from "../constants";
import { Button, Input } from '../components';
import { getProducts, getCollections } from "../network/products";
import _ from 'lodash';
import { Card } from "../components";
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { Icons } from '../constants/Images';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getSymbol } from '../network/checkout';


export default function Search(props) {
    const [allprods, setProducts] = useState([]);
    const [response, setResponse] = useState(() => {
        return false;
    })
    const [text, setText] = useState(() => {
        return undefined;
    })
    const users = useSelector(state => state.user.user);
    const SearchProduct = async () => {
        if (allprods.length > 1) {
            setProducts([])
        }
        setResponse(true);
        try {
            const resp = await getCollections();
            resp.map(value => {
                getProducts(value.id, 30).then(data => {
                    data.products.map(value => {
                        if (value.title.toUpperCase().indexOf(text.toUpperCase()) !== -1) {
                            setProducts((prevProd) => {
                                setResponse(false);
                                return [...prevProd, value]
                            })
                        }
                    })
                }) 
            })
        }
        catch (e) {
            setResponse(false);
            console.log(e);
        }
    }
    /*useEffect(() => {
        if (props.route?.params?.tag) {
            setResponse(() => {
                return true;
            })
        }
        /*getCollections().then(data => {
            data.map((value) => {
                if (value.title.includes(props.route?.params?.tag)) {
                    
                }
            })
        });
        const setProduct = (value) => {
            getProducts(value, 30).then(data => {
                setResponse(() => {
                    return false;
                })
                setProducts((prevProd) => {
                    return [...prevProd, data]
                })
            }).catch((error) => {
                setResponse(() => {
                    return false;
                })
                console.warn(error)
            })
        }
        setProduct(props.route?.params?.tag?.id)
    
        return () => {
            setProducts([])
        }
    }, []);*/

    const { navigation } = props;
    return (
        <SafeAreaView style={{ backgroundColor: nowTheme.COLORS.WHITE }}>
            <Block row middle style={{ borderBottomWidth: 0.5, borderColor: nowTheme.COLORS.MUTED, padding: 4, margin: 8 }}>
                <Text style={{ fontFamily: nowTheme.FONTFAMILY.MEDIUM, padding: 4, fontSize: 16 }}>SEARCH</Text>
            </Block>
            <Loader response={response} />
            <Block style={styles.container}>
                <Block flex row middle space="between" style={styles.header}>
                    <Input placeholder="Search all Products" style={styles.inputs} onChangeText={(text) => {
                        setText(() => {
                            return text
                        })
                    }} />
                    <TouchableOpacity onPress={SearchProduct}>
                        <Image source={Icons.search} style={{ height: 30, width: 30, alignSelf: "center", marginRight: 8 }} />
                    </TouchableOpacity>

                </Block>
                <Block style={{ flex: 6, marginBottom: "10%" }}>
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                        {_.map(_.chunk(allprods, 2), (element, index) => (
                            <Block flex row center key={index} style={styles.home}>
                                {_.map(element, (item, i) => (
                                    <TouchableOpacity key={i} style={{ width: width / 2, padding: 8, height: height / 5 }} onPress={() => navigation.navigate("Home", {
                                        screen: "SearchDetail", params: {
                                            name: item.title,
                                            desc: item?.description,
                                            image: item.images[0].src,
                                            price: item?.variants[0]?.price,
                                            code: item.variants[0].priceV2.currencyCode,
                                            variantId: item?.variants[0]?.id,
                                            id: item.id,
                                            available: item.availableForSale
                                        }
                                    })}>
                                        <Block style={{ height: "100%", width: "90%" }} >
                                            <Image source={{ uri: item.images[0].src }} style={{ height: "70%", width: "100%" }} />
                                            <Text style={{
                                                fontFamily: nowTheme.FONTFAMILY.REGULAR,
                                                color: nowTheme.COLORS.BLACK,
                                                fontSize: 9,
                                                textAlign: 'center',
                                                top: 5,
                                            }}>{item.title}</Text>
                                            <Text style={{
                                                fontFamily: nowTheme.FONTFAMILY.BOLD,
                                                color: nowTheme.COLORS.BLACK,
                                                fontSize: 11,
                                                textAlign: 'center',
                                                top: 5,
                                            }}>{getSymbol(item.variants[0].priceV2.currencyCode)} {item.variants[0].price}</Text>
                                        </Block>

                                        {/*<Card name={item.title} navigation={navigation} item={{
                                        id: item?.id, detail: item?.description, price: item?.variants[0]?.price, code: item.variants[0].priceV2,
                                        variantId: item?.variants[0]?.id,
                                        available: item.availableForSale
                                    }} imageUri={item.images[0].src} uri horizontal style={{ margin: 8, }} key={i} isText={true} isImage />*/}
                                    </TouchableOpacity>
                                )
                                )}
                            </Block>
                        ))}
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
        borderWidth: 1,
        borderColor: nowTheme.COLORS.THEME,
        maxHeight: 60,
        borderRadius: 8,
    },
    home: {
        width: width * .95,
        height: height / 4.2,
    },
    inputs: {
        borderWidth: 0,
        height: 55,
        width: width * 0.85
    }
})