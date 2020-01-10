import React, { Component } from 'react'

import Transition from 'modules/transition/Transition.jsx'

import styled from 'styled-components'
import Themogrify from 'modules/theme/Themogrify.js'

const StylesWrapper = styled.div(props => Themogrify(props.styles));

export default function StyledBlock(props) {
  const block = props.block;

  return(
    <Transition
      outTrigger={props.triggerOut}
      outCall={props.triggerAction}
      config={block.transition}>

      <StylesWrapper name="style-wrapper" styles={block.styles}>
        { props.children }
      </StylesWrapper>
    </Transition>
  )
}