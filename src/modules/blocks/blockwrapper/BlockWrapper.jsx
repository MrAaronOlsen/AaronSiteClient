import React from 'react';
import styled from 'styled-components';

import Blocks from '../Blocks.jsx';
import MotionBlock from 'modules/blocks/motionblock/MotionBlock.jsx';
import Theme from 'theme';

const StyledDiv = styled.div(props => Theme(props.styles));
const StyledLink = styled.a(props => Theme(props.styles));

export default function BlockWrapper(props) {
  const blocks = props.blocks;
  const block = props.block;
  const styles = block.styles;
  const link = block.link;

  function getStyled() {
    return block.hasLink ? StyledLink : StyledDiv;
  }

  function getStyleType() {
    return block.hasLink ? 'link' : null;
  }

  function getBlock() {

    if (block.hasMotion) {
      return (
        <MotionBlock {...props} href={link} target="_blank" type={ getStyleType() }>
          <Blocks {...props} start={block.first_child} />
        </MotionBlock>
      )
    } else {
      const Styled = getStyled()

      return (
        <Styled styles={styles} href={link} target="_blank">
          <Blocks {...props} start={block.first_child} />
        </Styled>
      )
    }
  }

  return ( getBlock() )
}