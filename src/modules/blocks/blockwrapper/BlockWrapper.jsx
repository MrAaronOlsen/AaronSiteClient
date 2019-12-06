import React, { Component } from 'react'

import Transition from 'modules/transition/Transition.jsx'

import styled from 'styled-components'
import Themogrify from 'mixins/theme.js'
import styles from './blockWrapper.mod.scss'

const StylesWrapper = styled.div(props => Themogrify(props.styles));

function styledBlock(Block) {

  class Wrapper extends Component {

    render() {
      var block = this.props.block;

      return(
        <Transition config={block.transition}>
          <StylesWrapper styles={block.styles} className={styles.wrapper}>
            <Block {...this.props} />
          </StylesWrapper>
        </Transition>
      )
    }
  }

  return Wrapper;
}

export default styledBlock;