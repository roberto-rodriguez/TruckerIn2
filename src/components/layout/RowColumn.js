/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Row, Column} from 'src/components/'

 class RowColumn extends Component {

  render() {
    var {h, style, start, end} = this.props

    return (
      <Row h={h} style={style}>
        <Column  h={h} start={start} end={end}>
          {this.props.children}
        </Column>
      </Row>
    );
  }
}


export default RowColumn;
