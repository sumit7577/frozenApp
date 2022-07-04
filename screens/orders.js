import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { getOrders, getSymbol } from "../network/checkout";
import { useSelector } from "react-redux";
import { Block } from 'galio-framework';
import { nowTheme } from "../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icons } from "../constants/Images";
import Loader from "../components/Loader";

const renderItem = (({ item }) => {
    let baseAddr = item.node.shippingAddress;
    const fullAddress = baseAddr?.address1 ? baseAddr?.address1 + baseAddr?.address2 + " " + baseAddr?.city + " " + baseAddr?.country + " " + baseAddr?.zip : null
    return (
        <View key={item.node.id} style={styles.home}>
            <Block row style={{ margin: 4, padding: 4 }}>
                <Text style={styles.text}>Order Id :     </Text>
                <Text style={styles.text2}>{item.node.name}</Text>
            </Block>
            <Block row style={{ margin: 4, padding: 4 }}>
                <Text style={styles.text}>Order Date :     </Text>
                <Text style={styles.text2}>{new Date(item.node.processedAt).toUTCString().replace("GMT","")}</Text>
            </Block>
            <Block row style={{ margin: 4, padding: 4 }}>
                <Text style={styles.text}>Payment Status :     </Text>
                <Text style={styles.text2}>{item.node.financialStatus}</Text>
            </Block>
            <Block row style={{ margin: 4, padding: 4 }}>
                <Text style={styles.text}>Fulfillment Status :     </Text>
                <Text style={styles.text2}>{item.node.fulfillmentStatus}</Text>
            </Block>
            <Block row style={{ margin: 4, padding: 4 }}>
                <Text style={styles.text}>Total :     </Text>
                <Text style={styles.text2}>{getSymbol(item.node.totalPriceV2.currencyCode)} {item.node.totalPriceV2.amount}</Text>
            </Block>
            <Block row style={{ margin: 4, padding: 4, maxWidth: "70%" }}>
                <Text style={styles.text}>Address :     </Text>
                <Text style={styles.text2}>{fullAddress}</Text>
            </Block>
        </View>
    )
});
export default function Orders(props) {
    const [orderData, setOrderData] = useState(() => {
        return undefined;
    });
    const [response, setResponse] = useState(() => {
        return true;
    })
    const user = useSelector(state => state.user.user);

    useEffect(() => {
        getOrders(user.token).then((res) => {
            setOrderData(res.data.data.customer.orders.edges);
            setResponse(false);
        }).catch((error) => {
            console.log(error);
            setResponse(false);
        })
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <Loader response={response} />
            <Block row style={{ borderBottomWidth: 0.5, borderColor: nowTheme.COLORS.MUTED, padding: 4, margin: 8 }}>
                <TouchableOpacity onPress={() => {
                    props.navigation.pop()
                }}>
                    <Image source={Icons.back} tintColor={nowTheme.COLORS.BLACK} style={{ height: 15, width: 17, marginTop: 8 }} />
                </TouchableOpacity>
                <Text style={{ fontFamily: nowTheme.FONTFAMILY.BOLD, padding: 4, marginLeft: "30%", fontSize: 16 }}>Orders Details</Text>
            </Block>
            <FlatList
                data={orderData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                initialNumToRender={10}
            />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        marginBottom: '15%'
    },
    home: {
        margin: 8,
        padding: 8,
        borderBottomWidth: 1,
        borderColor: nowTheme.COLORS.MUTED,
    },
    text: {
        fontFamily: nowTheme.FONTFAMILY.BOLD,
        fontSize: 18,
    },
    text2: {
        fontSize: nowTheme.FONTFAMILY.REGULAR,
        fontSize: 17,
    }
})