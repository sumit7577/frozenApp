import React from "react";
import { StyleSheet, Dimensions, ScrollView, Image } from "react-native";
import { Block, Text } from 'galio-framework';
import _ from 'lodash';
import { Card } from "../components";
import { nowTheme } from "../constants";
import { getCollections } from "../network/products";
import { TouchableOpacity } from "react-native-gesture-handler";
import Loader from '../components/Loader';

class Home extends React.Component {
  constructor() {
    super()
    this.delayDate = ["4 April 2022", "5 April 2022"]
    this.state = {
      list: [],
    }
  }
  componentDidMount() {
    const resp = async () => {
      const response = await getCollections();
      response.map((value, index) => {
        if (value.title.startsWith("All")) {
          this.setState(prevState => ({
            list: [...prevState.list, { id: value.id, name: value.title, image: value.image.src }]
          }));
        }
      })
    }
    resp();
  }
  componentDidUpdate() {
  }
  render() {
    const { ...property } = this.props;
    return (
      <Block flex style={{ backgroundColor: nowTheme.COLORS.WHITE }}>
        <Block middle style={{ borderBottomWidth: 0.5, borderColor: nowTheme.COLORS.MUTED, padding: 4, margin: 8, marginTop: "8%" }}>
          <Text style={{ fontFamily: nowTheme.FONTFAMILY.MEDIUM, padding: 4, fontSize: 18 }}>Home</Text>
        </Block>
        {/*
        <Block style={styles.top}>
          <AntDesign name="notification" size={50} color="black" style={{ transform: [{ rotateY: '180deg' }], marginLeft: 8 }} />
          <Block style={{ marginRight: "20%" }}>
            <Text style={styles.heading}>EASTER DELIVERIES</Text>
            <Text style={{ fontSize: 13, fontFamily: nowTheme.FONTFAMILY.REGULAR }}>Deliveries not available on these</Text>
            <Text style={{ fontSize: 13, fontFamily: nowTheme.FONTFAMILY.REGULAR }}>Easter Dates:</Text>
            {this.delayDate.map((value, index) => {
              return (
                <Text style={{ fontSize: 11, fontFamily: nowTheme.FONTFAMILY.REGULAR }} key={index}>{value}</Text>
              )
            })}
          </Block>
          </Block>*/}
        <Block style={{ flex: 8 }}>
          {this.state.list.length === 0 ? (<Loader response={true} />) :
            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity key={this.state.list[0].id} style={{ width: width, padding: 8 }} onPress={() => property.navigation.navigate("Home", {
                screen: "Collection", params: {
                  name: this.state.list[0].name,
                  tag: this.state.list[0],
                }
              })}>
                <Block style={{ height: 150, width: "100%" }} >
                  <Image source={{ uri: this.state.list[0].image }} style={{ height: "80%", width: "100%" }} />
                  <Text style={{
                    textAlign: "center", fontFamily: nowTheme.FONTFAMILY.BOLD,
                    color: nowTheme.COLORS.THEME,
                    fontSize: 14,
                    top: 10
                  }}>{this.state.list[0].name}</Text>
                </Block>
              </TouchableOpacity>
              {_.map(_.chunk(this.state.list.slice(1), 2), (element, index) => (
                <Block flex row space="between" center key={index} style={styles.home}>
                  {_.map(element, (item, i) => (
                    <TouchableOpacity key={i} style={{ width: width / 2, padding: 8 }} onPress={() => property.navigation.navigate("Home", {
                      screen: "Collection", params: {
                        name: item.name,
                        tag: item,
                      }
                    })}>
                      <Block style={{ height: 150, width: "90%" }} >
                        <Image source={{ uri: item.image }} style={{ height: "60%", width: "100%" }} />
                        <Text style={{
                          textAlign: "center", fontFamily: nowTheme.FONTFAMILY.BOLD,
                          color: nowTheme.COLORS.THEME,
                          fontSize: 14,
                          top: 10
                        }}>{item.name}</Text>
                      </Block>
                    </TouchableOpacity>
                  )
                  )}
                </Block>
              ))}
            </ScrollView>
          }
        </Block>
      </Block>
    );
  }
}
{/*<Card full name={item.name} tags={item} imageUri={item.image} uri
                      navigation={property.navigation} horizontal style={{ margin: 8, maxWidth: width }}
                      button key={item.id} isText={false} isImage />*/ }

const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
  home: {
    width: width * .95,
    marginTop: 10
  },
  top: {
    flexDirection: "row",
    width: width * .95,
    backgroundColor: nowTheme.COLORS.THEME,
    marginLeft: 12,
    flex: 1.5,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
  },
  heading: {
    fontWeight: "700",
    fontFamily: nowTheme.FONTFAMILY.BOLD,
  }
});

export default Home;
