import React, { Component } from 'react';

import Blocks from '../Blocks.jsx';

export default function BlockWrapper(props) {
  const blocks = props.blocks;
  const block = props.block;

  return (
    <Blocks
      start={block.first_child}
      trigger={props.trigger}
      blocks={blocks} />
  )
}