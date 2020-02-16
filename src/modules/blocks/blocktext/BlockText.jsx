import React from 'react'
import styled from 'styled-components'

import MotionBlock from 'modules/blocks/motionblock/MotionBlock.jsx';
import Theme from 'theme';

const StyledDiv = styled.div(props => Theme(props.styles));

export default function BlockText(props) {
  const block = props.block || {};
  const content = block.content
  const styles = block.styles

  function getBlock() {
    if (block.hasMotion) {
      return (
        <MotionBlock trigger={props.trigger} block={block}>
          { content }
        </MotionBlock>
      )
    } else {
      return (
        <StyledDiv styles={styles}>
          { content }
        </StyledDiv>
      )
    }
  }

  return ( getBlock() )
}