import { StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { Block, Text } from 'galio-framework';
import { nowTheme } from "../constants";
import { Button } from '../components';
import { getProducts } from "../network/products";
import _, { concat } from 'lodash';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icons } from '../constants/Images';
import { getSymbol } from '../network/checkout';
import { addressLogo } from '../constants/Images';
import { File_Data, HOME_ITEMS } from "../constants/articles";


export default function Collection(props) {
    const [allprods, setProducts] = useState([]);
    const [response, setResponse] = useState(() => {
        return false;
    })
    const users = useSelector(state => state.user.user);
    useEffect(() => {
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
        });*/
        const setProduct = (value) => {
            getProducts(value, 30).then(data => {
                data.products.map(value => {
                    for (let name of File_Data) {
                        if (name["Product Title"] == value.title) {
                            for (let tags of users.tags) {
                                if (name[tags + " Price"] !== undefined && name[tags + " Price"] !== null) {
                                    value.price23 = name[tags + " Price"].toFixed(2)
                                }
                            }
                        }
                    }
                })
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
        setProduct(props.route?.params?.tag?.id);

        return () => {
            setProducts([])
        }

    }, [props.route?.params?.tag]);

    const { navigation } = props;
    return (
        <SafeAreaView style={{ backgroundColor: nowTheme.COLORS.WHITE }}>
            <Block row space="between" style={{ borderBottomWidth: 0.5, borderColor: nowTheme.COLORS.MUTED, padding: 4, margin: 8 }}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack();
                }}>
                    <Image source={Icons.back} tintColor={nowTheme.COLORS.BLACK} style={{ height: 15, width: 17, marginTop: 10 }} />
                </TouchableOpacity>
                <Text style={{ fontFamily: nowTheme.FONTFAMILY.MEDIUM, padding: 4, fontSize: 16, textAlign: "center" }}>{props.route.params.tag.name}</Text>
                <Block></Block>
            </Block>
            <Loader response={response} />
            <Block style={styles.container}>
                <Block style={{ flex: 6, marginBottom: "20%" }}>
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                        {allprods.map((value, index) => {
                            return (
                                _.map(_.chunk(value.products, 2), (element, index) => {
                                    return (
                                        <Block flex row space="between" center key={index} style={styles.home}>
                                            {_.map(element, (item, i) => {
                                                return (
                                                    <TouchableOpacity key={i} style={{ width: width / 2, padding: 8, height: height / 5 }} onPress={() => navigation.navigate("Home", {
                                                        screen: "SearchDetail", params: {
                                                            name: item.title,
                                                            desc: item?.description,
                                                            image: item?.images[0]?.src,
                                                            price: item?.variants[0]?.price,
                                                            price23:item?.price23,
                                                            code: item?.variants[0]?.priceV2?.currencyCode,
                                                            variantId: item?.variants[0]?.id,
                                                            id: item.id,
                                                            available: item.availableForSale
                                                        }
                                                    })}>
                                                        <Block style={{ height: "100%", width: "90%" }} >
                                                            {item?.images[0]?.src ? <Image source={{ uri: item.images[0].src }} style={{ height: "70%", width: "100%" }} /> :
                                                                <Image source={addressLogo} style={{ height: "70%", width: "100%" }} onError={() => {
                                                                    item.images[0].src = addressLogo
                                                                }} />
                                                            }

                                                            <Text style={{
                                                                fontFamily: nowTheme.FONTFAMILY.REGULAR,
                                                                color: nowTheme.COLORS.BLACK,
                                                                fontSize: 9,
                                                                textAlign: 'center',
                                                                top: 5,
                                                            }}>{item.title}</Text>
                                                            {item.price23 ?
                                                                <Block row center>
                                                                    <Text style={{
                                                                        fontFamily: nowTheme.FONTFAMILY.BOLD,
                                                                        color: nowTheme.COLORS.BLACK,
                                                                        fontSize: 11,
                                                                        textAlign: 'center',
                                                                        top: 5,
                                                                    }}>
                                                                        {getSymbol(item.variants[0].priceV2.currencyCode)} {item?.price23}
                                                                    </Text>
                                                                    <Text style={{
                                                                        textDecorationLine: 'line-through',
                                                                        textDecorationStyle: 'solid',
                                                                        fontFamily: nowTheme.FONTFAMILY.BOLD,
                                                                        color: nowTheme.COLORS.BLACK,
                                                                        fontSize: 11,
                                                                        textAlign: 'center',
                                                                        top: 5,
                                                                        marginLeft:10,
                                                                    }}>{getSymbol(item.variants[0].priceV2.currencyCode)} {item?.variants[0]?.price}</Text>
                                                                </Block> :
                                                                <Text style={{
                                                                    fontFamily: nowTheme.FONTFAMILY.BOLD,
                                                                    color: nowTheme.COLORS.BLACK,
                                                                    fontSize: 11,
                                                                    textAlign: 'center',
                                                                    top: 5,
                                                                }}>{getSymbol(item.variants[0].priceV2.currencyCode)} {item?.variants[0]?.price}</Text>}
                                                        </Block>

                                                        {/*<Card name={item.title} navigation={navigation} item={{
                                                            id: item?.id, detail: item?.description, price: item?.variants[0]?.price, code: item.variants[0].priceV2,
                                                            variantId: item?.variants[0]?.id,
                                                            available: item.availableForSale
                                                        }} imageUri={item.images[0].src} uri horizontal style={{ margin: 8, }} key={i} isText={true} isImage />*/}
                                                    </TouchableOpacity>
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
        marginTop: -20
    },
    home: {
        width: width * .95,
        height: height / 5,
        margin: 8,
    },
    inputs: {
        borderWidth: 1,
        borderColor: nowTheme.COLORS.THEME,
        height: 55,
        marginTop: 15
    }
})