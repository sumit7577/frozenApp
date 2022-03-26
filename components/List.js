import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, Text, theme } from 'galio-framework';
import { Button, Icon } from '../components';
import { nowTheme } from '../constants';

export default class List extends React.Component {
    render() {
        const { data, onSelect, onPay } = this.props;
        return (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
                {data.map((item, i) => (
                    <Block flex style={styles.group} key={i}>
                        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                            <Block style={styles.rows}>
                                <Block row middle space="between">
                                    <Text
                                        style={{ fontFamily: 'montserrat-regular', width: '80%' }}
                                        size={24}
                                        color={nowTheme.COLORS.TEXT}
                                    >
                                        {item.firstName} {item.lastName}
                                    </Text>
                                    <Icon name="inr" family="Font-Awesome" style={{ paddingRight: 5 }} />
                                    <Text
                                        style={{ fontFamily: 'montserrat-regular', width: '20%' }}
                                        size={20}
                                        color={nowTheme.COLORS.TEXT}
                                    >
                                        {item.amount}
                                    </Text>
                                </Block>
                                <Block row middle space="between">
                                    <Text
                                        style={[{ fontFamily: 'montserrat-regular', width: '60%' }, item.overDue ? styles.overDue : '']}
                                        size={16}
                                        color={nowTheme.COLORS.TEXT}
                                        bold
                                    >
                                        Due Date: {item.dueDate}
                                    </Text>
                                    <Button
                                        textStyle={{ fontFamily: 'montserrat-regular', fontSize: 12 }}
                                        color="info"
                                        small={true}
                                        style={styles.button}
                                        onPress={() => onSelect(item.userId)}
                                    >
                                        View
                                    </Button>
                                    <Button
                                        textStyle={{ fontFamily: 'montserrat-regular', fontSize: 12 }}
                                        color="primary"
                                        small={true}
                                        style={styles.button}
                                        onPress={() => onPay(item.userId)}
                                    >
                                        Pay
                                    </Button>
                                </Block>
                            </Block>
                        </Block>
                    </Block>
                ))}
            </ScrollView>
        );
    }
}

const { width } = Dimensions.get("screen");
const styles = StyleSheet.create({
    group: {
        paddingTop: 10,
        width: width
    },
    rows: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10
    },
    articles: {
        width: width,
        fontFamily: 'montserrat-regular'
    },
    overDue: {
        color: 'red'
    },
    button: {
        width: 50,
    },
});