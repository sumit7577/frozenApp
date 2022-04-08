import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, Text } from 'galio-framework';
import _ from 'lodash';
import { Card } from "../components";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { nowTheme } from "../constants";
import { Brands } from '../constants/Images';

class Home extends React.Component {
  constructor() {
    super()
    this.delayDate = ["4 April 2022", "5 April 2022"]
    this.state = {
      list: []
    }
  }
  componentDidMount() {
  }
  componentDidUpdate() {
  }
  render() {
    
    const { ...property } = this.props;
    return (
      <Block flex style={{ marginTop: "10%" }}>
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
        </Block>
        <Block style={{ flex: 8 }}>
          {Brands.length === 0 ? (<Text>Loading...</Text>) :
            <ScrollView showsVerticalScrollIndicator={false}>
              {_.map(_.chunk(Brands, 2), (element, index) => (
                <Block flex row center key={index} style={styles.home}>
                  {_.map(element, (item, i) => (
                    <Card name={item.text} tags={item.tag} imageUri={item.path} navigation={property.navigation} horizontal style={{ margin: 8,maxWidth:width/2 }} button key={i} isText={false} isImage />
                  ))}
                </Block>
              ))}
            </ScrollView>
          }
        </Block>
      </Block>
    );
  }
}

const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
  home: {
    width: width * .95,
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
