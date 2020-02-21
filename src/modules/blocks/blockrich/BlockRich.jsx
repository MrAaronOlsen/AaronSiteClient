import React, { Component } from 'react'
import styled from 'styled-components'
import Interweave from 'interweave'

import MotionBlock from 'modules/blocks/motionblock/MotionBlock.jsx';
import Theme from 'theme';

const StyledDiv = styled.div(props => Theme(props.styles));

export default function BlockRich(props) {
  const block = props.block || {};
  const content = block.content
  const styles = block.styles

  function getBlock() {
    if (block.hasMotion) {
      return (
        <MotionBlock {...props}>
          <Interweave content={content} />
        </MotionBlock>
      )
    } else {
      return (
        <StyledDiv styles={styles}>
          <Interweave content={content} />
        </StyledDiv>
      )
    }
  }

  return ( getBlock() )
}