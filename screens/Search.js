import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { Block, Text } from 'galio-framework';
import { nowTheme } from "../constants";
import { Button, Input } from '../components';

export default function Search(props) {
    const { navigation } = props;
    return (
        <SafeAreaView>
            <Block style={styles.container}>
                <Block flex style={styles.header}>
                    <Text style={{ fontSize: nowTheme.SIZES.FONT * 2, fontFamily: nowTheme.FONTFAMILY.REGULAR }}>Search</Text>
                    <Input placeholder="Search all Products" style={styles.inputs} value={props.route?.params?.name?props.route.params.name:""} />
                </Block>
                <Block style={{ flex: 3.8 }}>
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={true}>
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

const styles = StyleSheet.create({
    container: {
        height: "100%",
        padding: 10,
    },
    header: {
        flex: 1,
        marginTop: 10,
    }, 
    inputs: { borderWidth: 2, borderColor: nowTheme.COLORS.THEME, height: 55, marginTop: 15, }
})