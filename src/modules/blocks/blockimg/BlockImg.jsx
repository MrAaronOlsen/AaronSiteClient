import React, { Component } from 'react'

import styled from 'styled-components'

import MotionBlock from 'modules/blocks/motionblock/MotionBlock.jsx';
import Theme from 'theme';

const StyledDiv = styled.img(props => Theme(props.styles));

export default function BlockImg(props) {
  const block = props.block;
  const url = block.img_url;
  const styles = block.styles;

  function getBlock() {
    if (block.hasMotion) {
      return (
        <MotionBlock trigger={props.trigger} block={block} type={"img"} src={url} />
      )
    } else {
      return ( <StyledDiv styles={styles} src={url} /> )
    }
  }

  return ( getBlock() )
}