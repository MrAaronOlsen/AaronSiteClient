import React, { Component } from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components'

import BlockIterator from '../BlockIterator.jsx'
import styledBlock from '../styledBlock/StyledBlock.jsx'

function BlockWrapper(props) {
  const blocks = props.blocks;
  const block = props.block;

  return (
    <React.Fragment>
      <BlockIterator
        triggerOut={props.triggerOut}
        triggerAction={props.actionOut}
        blocks={blocks}
        start={block.first_child} />
    </React.Fragment>
  )
}

const WrappedComponent = styledBlock(BlockWrapper)
export default WrappedComponent