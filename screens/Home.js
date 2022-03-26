import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, Text} from 'galio-framework';
import _ from 'lodash';
import { Card } from "../components";
import { HOME_ITEMS } from '../constants/articles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { nowTheme } from "../constants";

class Home extends React.Component {
  constructor() {
    super()
    this.delayDate = ["4 April 2022","5 April 2022"]
  }
  render() {
    return (
      <Block flex style={{ marginTop: "10%" }}>
        <Block style={styles.top}>
          <AntDesign name="notification" size={50} color="black" style={{ transform: [{ rotateY: '180deg' }], marginLeft: 8 }} />
          <Block style={{ marginRight: "20%" }}>
            <Text style={styles.heading}>EASTER DELIVERIES</Text>
            <Text style={{fontSize:13,fontFamily:nowTheme.FONTFAMILY.REGULAR}}>Deliveries not available on these</Text>
            <Text style={{fontSize:13,fontFamily:nowTheme.FONTFAMILY.REGULAR}}>Easter Dates:</Text>
            {this.delayDate.map((value,index)=>{
              return(
                <Text style={{fontSize:11,fontFamily:nowTheme.FONTFAMILY.REGULAR}} key={index}>{value}</Text>
              )
            })}
          </Block>
        </Block>
        <ScrollView showsVerticalScrollIndicator={false}>
          {_.map(_.chunk(HOME_ITEMS, 2), (element, index) => (
            <Block flex row center key={index} style={styles.home}>
              {_.map(element, (item, i) => (
                <Card item={item} horizontal style={{ margin: 8 }} key={i} isText={true} />
              ))}
            </Block>
          ))}
        </ScrollView>
      </Block>
    );
  }
}

const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
  home: {
    width: width * .95
  },
  top: {
    flexDirection: "row",
    width: width * .95,
    backgroundColor: nowTheme.COLORS.THEME,
    marginLeft: 12,
    flex: 0.35,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius:5,
  },
  heading:{
    fontWeight:"700",
    fontFamily: nowTheme.FONTFAMILY.BOLD,
  }
});

export default Home;
