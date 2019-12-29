import React, { Component } from 'react'

import Transition from 'modules/transition/Transition.jsx'

import styled from 'styled-components'
import Themogrify from 'modules/theme/Themogrify.js'

const StylesWrapper = styled.div(props => Themogrify(props.styles));

function styledBlock(Block) {

  class Wrapper extends Component {

    render() {
      var block = this.props.block;

      return(
        <Transition
          outTrigger={this.props.triggerOut}
          outCall={this.props.triggerAction}
          config={block.transition}>

          <StylesWrapper name="style-wrapper" styles={block.styles}>
            <Block {...this.props} />
          </StylesWrapper>
        </Transition>
      )
    }
  }

  return Wrapper;
}

export default styledBlock;