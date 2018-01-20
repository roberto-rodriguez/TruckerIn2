import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import initials from 'initials';

// from https://flatuicolors.com/
const defaultColors = ['#0B3A42', "#ffa07a", 'blue', '#629aa9', "#9acd32", "#fc6c85", 'green', 'lime', 'maroon', 'navy', 'olive', 'purple', 'red', "crimson", 'teal', 'yellow', 'darkblue', 'steelblue', 'blueviolet', 'dodgerblue'];

function sumChars(str) {
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }

  return sum;
}

class Avatar extends Component {
  render() {
    let {
      src,
      name,
      color,
      textColor = '#fff',
      colors = defaultColors,
      fontDecrease,
      size = 55,
      style,
      defaultName,
      square
    } = this.props;

    if (!fontDecrease) fontDecrease = 2.5;

    if (!name) name = '?'

    if(typeof size !== 'number') size = parseInt(size);

    let abbr = initials(name);
    if(!abbr) abbr = defaultName;

    const borderRadius = size * (square ? 0 : 0.5);

    const imageStyle = {
      borderRadius
    };

    const innerStyle = {
      borderRadius,
      borderWidth: 1,
      borderColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center'
    };

    if (size) {
      imageStyle.width = innerStyle.width = size;
      imageStyle.height = innerStyle.height = size;
    }

    let inner, classes;
    if (src) {

      const props = {
        style: imageStyle,
        source: {uri: src}
      }

      inner = React.createElement( this.props.component || Image, props )

    } else {
      let background;
      if (color) {
        background = color;
      } else {
        // pick a deterministic color from the list
        let i = sumChars(name) % colors.length;
        background = colors[i];
      }

      innerStyle.backgroundColor = background;

      inner = <Text style={{ fontSize: size / fontDecrease, color: textColor }}>{abbr}</Text>
    }

    return (
      <View>
        <View style={[innerStyle, style]}>
          {inner}
        </View>
      </View>
    )
  }
}

module.exports = Avatar;
