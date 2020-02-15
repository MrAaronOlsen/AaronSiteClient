import React, { Component } from 'react'
import styled from 'styled-components'

import Motion, { MotionExit } from 'motion';
import Theme from 'theme';
const StyledDiv = styled.div(props => Theme(props.styles));

export default function BlockText(props) {
  const block = props.block || {};
  const content = block.content
  const styles = block.styles

  function getBlock() {
    if (block.hasMotion) {
      const motion = block.motion || {};
      const variants = motion.variants;
      const initial = motion.initial;
      const animate = motion.animate;
      const exit = motion.exit;

      return (
        <MotionExit trigger={props.trigger}>
          <Motion
            styles={styles}
            variants={variants}
            initial={initial}
            animate={animate}
            exit={exit}/>

        </MotionExit>
      )

    } else {
      return (
        <StyledDiv name={"block-text"} styles={styles} onClick={props.onClick}>
          { content }
        </StyledDiv>
      )
    }
  }

  return ( getBlock() )
}