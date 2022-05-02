import { Text, StyleSheet, Dimensions, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Block } from 'galio-framework';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Input } from "../components";
import { nowTheme } from '../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getCheckout, getStripeToken, completeCheckout } from '../network/checkout';
import getSymbolFromCurrency from 'currency-symbol-map'

export default function Payment(props) {
  const { route, navigation } = props;

  const [cardNumber, setCardNumber] = useState(() => {
    return {}
  });

  const [checkout, setCheckout] = useState(() => {
    return null;
  })

  useEffect(() => {
    getCheckout(route.params.id).then(res => {
      setCheckout(() => {
        return res
      })

      setCardNumber(prevState => {
        return { ...prevState, Symbol: getSymbolFromCurrency(res?.totalPriceV2?.currencyCode) }
      })

    }).catch(error => {
      console.log(error);
    })

  }, [route.params.id]);

  const Pay = () => {


    if (cardNumber.number && cardNumber.month, cardNumber.year && cardNumber.cvv) {

      getStripeToken(cardNumber.number, cardNumber.month, cardNumber.year, cardNumber.cvv).then(res => {

        if (res.error) {
          Alert.alert(res.error.message);
        }
        else {

          completeCheckout(route.params.id, res.id, checkout.totalPrice, checkout.totalPriceV2.currencyCode, checkout.shippingAddress).then(res => {

            if (res.data?.data.checkoutCompleteWithTokenizedPaymentV3.checkout.id && res.data?.data.checkoutCompleteWithTokenizedPaymentV3.checkoutUserErrors.length == 0) {
              Alert.alert("Payment Successful");
            }

          }).catch(error => {
            console.log(error);
          })
        }

      }).catch(error => {
        console.log(error);
      })

    }
    else {
      Alert.alert("Card Error",
      "Please Enter Card Details")
    }

  }

  return (
    <SafeAreaView>
      <Block style={styles.container}>

        <Block style={styles.header} row>
          <AntDesign name="arrowleft" size={22} color="black" style={{ marginLeft: 8, position: "absolute", left: 10, }} onPress={() => {
            navigation.pop();
          }} />
          <Text style={styles.text}> Enter Card Details</Text>
        </Block>

        <Block style={styles.payment}>

          <Block style={{ padding: 4, marginTop: 8 }}>
            <Text style={styles.texts}>Card Number</Text>

            <Input placeholder='4242 4242 4242 4242' maxLength={50} style={styles.input} keyboardType="numeric" onChangeText={(text) => {
              setCardNumber((prevState) => {
                return { ...prevState, number: text }
              })
            }} />

          </Block>

          <Block row style={{ justifyContent: "space-between", padding: 4, marginTop: 8 }}>

            <Block style={{ width: "22%" }}>
              <Text style={styles.texts}>Month</Text>
              <Input placeholder='MM' maxLength={2} style={styles.input} autoComplete="cc-exp-month" keyboardType="default" onChangeText={(text) => {
                setCardNumber((prevState) => {
                  return { ...prevState, month: text }
                })
              }} />
            </Block>

            <Block style={{ width: "22%" }}>

              <Text style={styles.texts}>Year</Text>
              <Input placeholder='YY' maxLength={4} style={styles.input} autoComplete="cc-exp-month" keyboardType="default" onChangeText={(text) => {
                setCardNumber((prevState) => {
                  return { ...prevState, year: text }
                })
              }} />
            </Block>

            <Block style={{ width: "45%" }}>
              <Text style={styles.texts}>CVV</Text>
              <Input placeholder='333' maxLength={3} style={styles.input} keyboardType="numeric" onChangeText={(text) => {
                setCardNumber((prevState) => {
                  return { ...prevState, cvv: text }
                })
              }} />
            </Block>

          </Block>

          <Block style={{ padding: 4, marginTop: 8 }}>
            <Text style={styles.texts}>Name</Text>

            <Input placeholder='CardHolder Name' maxLength={50} style={styles.input} onChangeText={(text) => {
              setCardNumber((prevState) => {
                return { ...prevState, name: text }
              })
            }} />

          </Block>

          <Button full style={{ backgroundColor: nowTheme.COLORS.DRIBBBLE, alignSelf: "center", marginTop: 10, }} onPress={Pay}>
            <Text
              style={{ fontFamily: nowTheme.FONTFAMILY.BOLD, fontSize: 12, color: nowTheme.COLORS.WHITE }}
            >
              PAY {cardNumber?.Symbol}{checkout?.totalPrice ? checkout.totalPrice : route.params.totalPrice}
            </Text>
          </Button>

        </Block>

      </Block>
    </SafeAreaView>

  )
}

const { height, width } = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {

  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1.1,
    borderColor: nowTheme.COLORS.MUTED,
    margin: 10,
    height: 55,
    borderRadius: 4,

  },
  payment: {
    margin: 8,
    marginTop: height * 0.04,
    maxWidth: width,
  }
  ,
  text: {
    fontFamily: nowTheme.FONTFAMILY.BOLD,
    fontSize: 14,
    color: nowTheme.COLORS.GITHUB,
  },
  input: {
    height: 50,
    borderWidth: 0,
    borderEndWidth: 1,
  },
  texts: {
    fontFamily: nowTheme.FONTFAMILY.BOLD,
    fontSize: 14,
    color: nowTheme.COLORS.GITHUB,
    paddingLeft: 8,
  }
})