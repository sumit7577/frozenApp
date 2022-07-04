import { Text, StyleSheet, Image, Dimensions, Alert } from 'react-native';
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
import { getSymbol } from "../network/checkout";
import Loader from '../components/Loader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icons } from '../constants/Images';
import { addressLogo } from '../constants/Images';


export default function SearchDetail(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const cart = useSelector(state => state.product);
  const { route, navigation } = props;
  const [number, setNumber] = useState(1);
  const [response, setResponse] = useState(() => {
    return false;
  })

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
      if (!route.params.price23) {
        return (route.params.price * number).toFixed(2);
      }
      else{
        return (route.params.price23 * number).toFixed(2);
      }

    })

  }, [number]);

  const addtoCart = () => {
    setResponse(() => {
      return true;
    })
    if (cart.list == null) {
      createCart(user.token, "id", route.params.id, route.params.variantId, number).then((resp) => {
        setResponse(() => {
          return false;
        })
        dispatch(addProduct(resp.data));
        let respProps = resp.data.data.cartCreate.cart.lines.edges;
        navigation.navigate("Cart", {
          screen: "Stores", params: {
            property: respProps
          }
        });
      }).catch((error) => {
        setResponse(() => {
          return false;
        })
        console.log(error);
      })
    }
    else {
      updateCart(cart.list.data.cartCreate.cart.id, "id", route.params.id, route.params.variantId, number).then(res => {
        setResponse(() => {
          return false;
        })
        let respProps = res.data.data.cartLinesAdd.cart.lines.edges;
        navigation.navigate("Cart", {
          screen: "Stores", params: {
            property: respProps
          }
        });
      }).catch(error => {
        setResponse(() => {
          return false;
        })
        console.log(error);
      })
    }

  }
  return (
    <SafeAreaView style={{ backgroundColor: nowTheme.COLORS.WHITE }}>
      <Block row style={{ borderBottomWidth: 0.5, borderColor: nowTheme.COLORS.MUTED, padding: 4, margin: 8 }}>
        <TouchableOpacity onPress={() => {
          navigation.goBack();
        }}>
          <Image source={Icons.back} tintColor={nowTheme.COLORS.BLACK} style={{ height: 15, width: 17, marginTop: 10 }} />
        </TouchableOpacity>
        <Text style={{ fontFamily: nowTheme.FONTFAMILY.MEDIUM, padding: 4, fontSize: 16, marginLeft: "30%" }}>Product Detail</Text>
      </Block>
      <Loader response={response} />
      <Block middle style={styles.container}>
        <Block style={styles.header}>
          {route.params.image ? <Image source={{ uri: route.params.image }} style={{ height: 150, width: 150, alignSelf: "center" }} /> :
            <Image source={addressLogo} style={{ height: 150, width: 150, alignSelf: "center", resizeMode: "contain" }} />}

          <Text style={{ fontFamily: nowTheme.FONTFAMILY.REGULAR, fontSize: 14 }}> {route.params.name}</Text>
          <Text style={{ fontFamily: nowTheme.FONTFAMILY.BOLD,fontSize: 14 }}>
            {getSymbol(route.params.code)}{price}
          </Text>
        </Block>

        <Block style={styles.body}>

          <Block row bottom style={{ alignItems: "center" }}>
            <Text style={styles.text}>{getSymbol(route.params.code)}{price}</Text>

            <Button small style={{ backgroundColor: nowTheme.COLORS.THEME, width: 50, height: 40 }} onPress={decreaseCounter}>
              <Text
                style={{ fontFamily: nowTheme.FONTFAMILY.BOLD }}
                size={14}
                color={nowTheme.COLORS.THEME}
              >
                -
              </Text>
            </Button>

            <Text style={styles.text}>{number}</Text>

            <Button small style={{ backgroundColor: nowTheme.COLORS.THEME, width: 50, height: 40 }} onPress={increaseCounter}>
              <Text
                style={{ fontFamily: nowTheme.FONTFAMILY.BOLD }}
                size={14}
                color={nowTheme.COLORS.THEME}
              >
                +
              </Text>
            </Button>

          </Block>
          {route.params.available ?
            <Button full border style={{ backgroundColor: nowTheme.COLORS.WHITE }} onPress={addtoCart}>
              <Text
                style={{ fontFamily: nowTheme.FONTFAMILY.BOLD, fontSize: 14, color: nowTheme.COLORS.THEME }}
              >
                ADD TO CART
              </Text>
            </Button> :
            <Button full border style={{ backgroundColor: nowTheme.COLORS.WHITE, borderColor: nowTheme.COLORS.ERROR }} onPress={() => {
              Alert.alert("Server Error", "Sorry This Product is Not Available Now!")
            }}>
              <Text
                style={{ fontFamily: nowTheme.FONTFAMILY.BOLD, fontSize: 12, color: nowTheme.COLORS.THEME }}
              >
                Out Of Stock
              </Text>
            </Button>
          }

        </Block>

        <Block style={styles.footer} top>
          <Text style={styles.texts}>{route.params.desc}
          </Text>
        </Block>

      </Block>
    </SafeAreaView>
  )
}

const { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    height: "100%",
    marginTop: "5%",
  },
  header: {
    flex: 3,
    width: "90%",
    padding: 5,
    justifyContent: "space-between",
    borderRadius: 4,
  },
  body: {
    flex: 1.5,
  },
  footer: {
    flex: 8,
    margin:20,
    paddingTop:height/20,
  },
  details: {
    width: "90%",
  }, text: {
    fontFamily: nowTheme.FONTFAMILY.BOLD, fontSize: 12,
  },
  texts: {
    fontFamily: nowTheme.FONTFAMILY.REGULAR,
    fontSize: 16,
    marginBottom: 20,
  }
});