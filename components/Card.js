import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import _ from 'lodash';
import { nowTheme } from '../constants';
import Icon from './Icon';
import ArButton from './Button';
import { getSymbol } from "../network/checkout";

class Card extends React.Component {
  render() {
    const { navigation, horizontal, full, style, ctaColor, imageStyle, ctaRight, titleStyle, isText, isImage, button, name, imageUri, tags, uri, item } = this.props;
    const imageStyles = [full ? styles.fullImage : styles.horizontalImage, imageStyle];
    const titleStyles = [styles.cardTitle, titleStyle];
    const cardContainer = [button ? styles.buttonCard : styles.card, style];
    const imgContainer = [
      styles.imageContainer,
      full && styles.homeContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
    ];

    return (
      <Block row={horizontal} card flex style={cardContainer}>
        <Block flex space="between" style={styles.cardDescription}>
          {isImage ?
            <Block flex center style={imgContainer} >
              {uri ?
                <Image source={{ uri: imageUri }} style={imageStyles} /> : <Image source={imageUri} style={imageStyles} />}
            </Block>
            :
            <Block flex center style={styles.icon} >
              <Icon
                family="Font-Awesome"
                size={50}
                name={item.icon}
              />
            </Block>}
          {isText == false ? <View /> :
            <Block flex style={titleStyles} >
              <TouchableOpacity onPress={() => navigation.navigate("Search", {
                screen: "SearchDetail", params: {
                  name: name,
                  desc: item.detail,
                  image: imageUri,
                  price: item.price,
                  code: item.code.currencyCode,
                  variantId: item.variantId,
                  id: item.id,
                  available: item.available
                }

              })}>
                <Text style={styles.title} bold>
                  {name}
                </Text>
                <Text style={styles.price} bold>
                  {getSymbol(item.code.currencyCode)}{item.price}
                </Text>
              </TouchableOpacity>
            </Block>
          }
          {/*{button ? <ArButton color={nowTheme.COLORS.THEME} style={{ backgroundColor: nowTheme.COLORS.WHITE, width: "100%", height: 35, marginLeft: 0 }} onPress={() => {
            navigation.navigate("Search", {
              screen: "SearchHome", params: {
                name: name,
                tag: tags,
              }
            })
          }}
          >
            <Text
              style={{ fontFamily: nowTheme.FONTFAMILY.BOLD, textAlign: "center" }}
              size={12}
              color={nowTheme.COLORS.THEME}
            >
              {name}
            </Text>
          </ArButton> : null}
        8*/}
          {button ? <Block flex style={titleStyles} >
            <TouchableOpacity onPress={() => navigation.navigate("Home", {
              screen: "Collection", params: {
                name: name,
                tag: tags,
              }
            })}>
              <Text style={{ color: nowTheme.COLORS.THEME, fontFamily: nowTheme.FONTFAMILY.BOLD, padding: 8, textAlign: "center" }} bold>
                {name}
              </Text>
            </TouchableOpacity>
          </Block> : null}
        </Block>
      </Block>
    );
  }
}

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
  ctaRight: PropTypes.bool,
  titleStyle: PropTypes.any,
  textBodyStyle: PropTypes.any
};

const styles = StyleSheet.create({
  card: {
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    height: 230,
    marginBottom: 4,
  },
  buttonCard: {
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    height: 200,
    marginBottom: 4,
  },
  cardTitle: {
    paddingHorizontal: 8,
    paddingTop: 7,
  },
  title: {
    fontFamily: nowTheme.FONTFAMILY.BOLD,
    color: nowTheme.COLORS.BLACK,
    fontSize: 9,
    textAlign: 'center',
    top: 5,
    overflow: 'scroll',
  },
  price: {
    fontFamily: nowTheme.FONTFAMILY.BOLD,
    color: nowTheme.COLORS.BLACK,
    fontSize: 10,
    textAlign: 'center',
    top: 5,
    overflow: 'scroll',
  },
  icon: {
    top: 20
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    borderRadius: 3,
    height: "100%",
    width: "100%",

  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: "100%",
    width: "100%",
    resizeMode: "stretch",
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 180,
    width: "100%",
    resizeMode: 'contain',
  },
  shadow: {
    shadowColor: '#8898AA',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2
  },
  articleButton: {
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 9,
    paddingVertical: 7
  },
  homeContainer: {
    flex: 8,
  }
});

export default withNavigation(Card);
