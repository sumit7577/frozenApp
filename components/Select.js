import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import DropDownPicker from 'react-native-dropdown-picker';
import { nowTheme } from '../constants';

class DropDown extends React.Component {
  state = {
    value: 'kh',
    open: false,
  };
  
  handleOnSelect = (index, value) => {
    const { onSelect } = this.props;

    this.setState({ value: value });
    onSelect && onSelect(index, value);
  };

  render() {
    const {
      onSelect,
      iconName,
      iconFamily,
      iconSize,
      iconColor,
      color,
      textStyle,
      style,
      ...props
    } = this.props;

    const setValue = (value) => {
      const { onSelect } = this.props;
      const val = value();
      onSelect && onSelect(val);
    }

    const { open } = this.state;

    return (
      <DropDownPicker
        containerStyle={styles.container}
        style={styles.dropdown}
        open={open}
        setOpen={(open) => this.setState({ open: open })}
        setValue={setValue}
        defaultIndex={0}
        {...props}
      />
    );
  }
}

DropDown.propTypes = {
  onSelect: PropTypes.func,
  iconName: PropTypes.string,
  iconFamily: PropTypes.string,
  iconSize: PropTypes.number,
  color: PropTypes.string,
  textStyle: PropTypes.any
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 9.5,
    backgroundColor: '#FFFFFF',
    zIndex: 1
  },
  dropdown: {
    color: nowTheme.COLORS.WHITE,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: nowTheme.COLORS.BORDER,
  }
});

export default DropDown;
