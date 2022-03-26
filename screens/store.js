import React, { useState } from "react";
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity,Image,FlatList } from "react-native";
import { Block, theme, Text } from 'galio-framework';
import _ from 'lodash';
import { Card } from "../components";
import { Brands, Categories, Favourites } from '../constants/Images'
import { nowTheme } from '../constants';


function ScreenChanger(props) {
    if (props.screenName == "Brands") {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={styles.storeScroll}>
                {_.map(_.chunk(Brands, 3), (element, index) => (
                    <Block flex row center key={index} style={styles.storeBanners}>
                        {_.map(element, (item, i) => (
                            <Card item={item} horizontal style={{ margin: 8 }} key={i} isText={false} full={false} isImage />
                        ))}
                    </Block>
                ))}
            </ScrollView>
        )
    }
    
    else if (props.screenName == "Categories") {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                {_.map(_.chunk(Categories, 3), (element, index) => (
                    <Block flex row center key={index} style={styles.icon}>
                        {_.map(element, (item, i) => (
                            <Card item={item} horizontal style={{ margin: 8 }} key={i} isText={true} />
                        ))}
                    </Block>
                ))}
            </ScrollView>
        )
    }

    else {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                {_.map(_.chunk(Favourites, 3), (element, index) => (
                    <Block flex row center key={index} style={styles.storeBanners}>
                        {_.map(element, (item, i) => (
                            <Card item={item} horizontal style={{ margin: 8 }} key={i} isText={false} full={false} isImage />
                        ))}
                    </Block>
                ))}
            </ScrollView>

        )
    }
}

const upperBannerScreen = ({item}) =>{
    return(
        <Image source={item.path} style={styles.topScrollImage} />
    )
}

function Stores() {
    const [current, setCurrent] = useState(() => "Brands");
    return (
        <Block style={styles.home} flex>
            <Block style={styles.upperBanner}>
                <FlatList data={Brands} renderItem={upperBannerScreen} horizontal pagingEnabled showsHorizontalScrollIndicator={false} bounces={false}/>
            </Block>

            <ScreenChanger screenName={current} />

            <Block style={styles.lowerButtons}>
                <TouchableOpacity style={current == "Categories" ? styles.activeFooterNavigator : styles.footerNavigator} onPress={() => { setCurrent(() => "Categories") }}>
                    <Block style={styles.screenBlocks}>
                        <Text style={styles.texts}>Categories</Text>
                    </Block>
                </TouchableOpacity>

                <TouchableOpacity style={current == "Brands" ? styles.activeFooterNavigator : styles.footerNavigator} onPress={() => { setCurrent(() => "Brands") }} >
                    <Block style={styles.screenBlocks}>
                        <Text style={styles.texts}>Brands</Text>
                    </Block>
                </TouchableOpacity>

                <TouchableOpacity style={current == "Favourites" ? styles.activeFooterNavigator : styles.footerNavigator} onPress={() => { setCurrent(() => "Favourites") }}>
                    <Block style={styles.screenBlocks}>
                        <Text style={styles.texts}>Favourites</Text>
                    </Block>
                </TouchableOpacity>

            </Block>
        </Block>
    );
}

const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
    topScrollImage:{
        height:"100%",
        width:width,
        resizeMode:"stretch",
        
    },
    home: {
    },

    storeBanners: {
    },

    upperBanner: {
        flex:0.4,
    },
    storeScroll: {

    },
    lowerButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: height * .06,
        backgroundColor: nowTheme.COLORS.PRICE_COLOR,
    },
    footerNavigator: {
        flex: 1,
        width: width / 3,
        borderRadius: 5,
        margin: 5,

    },
    activeFooterNavigator: {
        backgroundColor: "white",
        width: width / 3,
        borderRadius: 5,
        margin: 5,
    },
    texts: {
        fontFamily: 'montserrat-bold',
        fontSize: 13,
    },
    screenBlocks: {
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default Stores;