import React, { Component } from 'react'

import Transition from 'modules/transition/Transition.jsx'


export default function StyledBlock(props) {
  const block = props.block;

  return(
    <Transition
      outTrigger={props.triggerOut}
      outCall={props.triggerAction}
      config={block.transition}
      styles={block.styles} >

      { props.children }
    </Transition>
  )
}