import { Text, StyleSheet, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { Block } from "galio-framework";
import { Button } from "../components";
import { nowTheme } from '../constants';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createCart, updateCart } from '../network/products';
import { addProduct } from '../store/products/actions';
import { useDispatch } from "react-redux";

export default function SearchDetail(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const cart = useSelector(state => state.product);
  const { route, navigation } = props;
  const [number, setNumber] = useState(1);

  const [price, setPrice] = useState(() => {
    return route.params.price;
  })

  const increaseCounter = () => {
    setNumber((prevNumber) => {
      return prevNumber + 1;
    });
  }

  const decreaseCounter = () => {
    setNumber((prevNumber) => {
      if (prevNumber >= 2) {
        return prevNumber - 1;
      }
      else {
        return prevNumber;
      }
    });
  }

  useEffect(() => {
    setPrice(() => {
      return (route.params.price * number).toFixed(2);
    })

  }, [number]);

  const addtoCart = () => {
    if (cart.list == null) {
      createCart(user.token, "id", route.params.id, route.params.variantId, number).then((resp) => {
        dispatch(addProduct(resp.data));
        let respProps = resp.data.data.cartCreate.cart.lines.edges;
        navigation.navigate("Cart",{
          screen:"Stores",params:{
            property:respProps
          }
        });
      }).catch((error) => {
        console.log(error);
      })
    }
    else {
      updateCart(cart.list.data.cartCreate.cart.id,"id",route.params.id,route.params.variantId,number).then(res =>{
        let respProps = res.data.data.cartLinesAdd.cart.lines.edges;
        navigation.navigate("Cart",{
          screen:"Stores",params:{
            property:respProps
          }
        });
      }).catch(error=>{
        console.log(error);
      })
    }
    
  }
  return (
    <SafeAreaView>
      <Block middle style={styles.container}>
        <Block style={styles.header} middle row>
          <Image source={{ uri: route.params.image }} style={{ height: 50, width: 50 }} />
          <Text style={{ maxWidth: width * 0.7, fontFamily: nowTheme.FONTFAMILY.BOLD, fontSize: 12, paddingLeft: 5 }}> {route.params.name}{'\n'} ${price}</Text>
        </Block>

        <Block style={styles.body}>

          <Block row bottom style={{ alignItems: "center" }}>
            <Text style={styles.text}>${price}</Text>

            <Button small style={{ backgroundColor: nowTheme.COLORS.THEME, width: 50, height: 40 }} onPress={increaseCounter}>
              <Text
                style={{ fontFamily: nowTheme.FONTFAMILY.BOLD }}
                size={14}
                color={nowTheme.COLORS.THEME}
              >
                +
              </Text>
            </Button>

            <Text style={styles.text}>{number}</Text>

            <Button small style={{ backgroundColor: nowTheme.COLORS.THEME, width: 50, height: 40 }} onPress={decreaseCounter}>
              <Text
                style={{ fontFamily: nowTheme.FONTFAMILY.BOLD }}
                size={14}
                color={nowTheme.COLORS.THEME}
              >
                -
              </Text>
            </Button>

          </Block>

          <Button full border style={{ backgroundColor: nowTheme.COLORS.WHITE }} onPress={addtoCart}>
            <Text
              style={{ fontFamily: nowTheme.FONTFAMILY.BOLD, fontSize: 12, color: nowTheme.COLORS.THEME }}
            >
              ADD TO CART
            </Text>
          </Button>

        </Block>

        <Block style={styles.footer}>
          <Text style={{ fontFamily: nowTheme.FONTFAMILY.REGULAR }}> {route.params.desc}</Text>
        </Block>

      </Block>
    </SafeAreaView>
  )
}

const { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    height: "100%",
    marginTop: "20%",
  },
  header: {
    flex: 0.8,
    width: "90%",
    padding: 5,
    justifyContent: "space-between",
    borderRadius: 4,
    backgroundColor: "#d3d3d3",
  },
  body: {
    flex: 1.5,
  },
  footer: {
    flex: 6,
  },
  details: {
    width: "90%",
  }, text: {
    fontFamily: nowTheme.FONTFAMILY.BOLD, fontSize: 12,
  }
});