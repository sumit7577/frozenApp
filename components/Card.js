import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Image, View } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import _ from 'lodash';
import { nowTheme } from '../constants';
import Icon from './Icon';
import ArButton from './Button';

class Card extends React.Component {
  render() {
    const { navigation, horizontal, full, style, ctaColor, imageStyle, ctaRight, titleStyle, isText, isImage, button,name,imageUri,tags,uri } = this.props;
    const imageStyles = [full ? styles.fullImage : styles.horizontalImage, imageStyle];
    const titleStyles = [styles.cardTitle, titleStyle];
    const cardContainer = [button ? styles.buttonCard : styles.card, style];
    const imgContainer = [
      styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
    ];

    return (
      <Block row={horizontal} card flex style={cardContainer}>
        <Block flex space="between" style={styles.cardDescription}>
          {isImage ? <Block flex center style={imgContainer} >
            {uri?<Image source={{uri:imageUri}} style={imageStyles} /> :<Image source={imageUri} style={imageStyles} />}
          </Block> :
            <Block flex center style={styles.icon} >
              <Icon
                family="Font-Awesome"
                size={50}
                name={item.icon}
              />
            </Block>}
          {isText == false ? <View /> : <Block flex style={titleStyles} >
            <Text style={styles.title} bold>
              {name}
            </Text>
          </Block>}
          {button ? <ArButton color={nowTheme.COLORS.THEME} border style={{ backgroundColor: nowTheme.COLORS.WHITE, width: "100%", height: 35, marginLeft: 0 }} onPress={() => {
            navigation.navigate("Search",{screen:"SearchHome", params:{
              name: name,
              tag:tags,
            }});
          }}>
            <Text
              style={{ fontFamily: nowTheme.FONTFAMILY.BOLD,textAlign:"center" }}
              size={12}
              color={nowTheme.COLORS.THEME}
            >
              {name}
            </Text>
          </ArButton> : null}
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
    height: 150,
    marginBottom: 4,
  },
  buttonCard: {
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    height: 180,
    marginBottom: 4,
  },
  cardTitle: {
    paddingHorizontal: 9,
    paddingTop: 7,
    paddingBottom: 15
  },
  title: {
    fontFamily: 'montserrat-regular',
    color: nowTheme.COLORS.ACTIVE,
    fontSize: 8,
    textAlign: 'center',
    top: 5
  },
  icon: {
    top: 20
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    borderRadius: 3,
    height: "100%",
    width: "100%",
    overflow: 'hidden'
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
    height: "100%",
    width: "100%",
    resizeMode: 'stretch',

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
  }
});

export default withNavigation(Card);
