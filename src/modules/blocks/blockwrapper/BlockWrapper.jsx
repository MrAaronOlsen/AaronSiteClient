import React, { Component } from 'react';

import BlockIterator from '../BlockIterator.jsx';

export default function BlockWrapper(props) {
  const blocks = props.blocks;
  const block = props.block;

  return (
    <BlockIterator
      outTrigger={props.triggerOut}
      triggerAction={props.actionOut}
      blocks={blocks}
      start={block.first_child} />
  )
}