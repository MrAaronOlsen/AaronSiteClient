import React from 'react';

import BlockText from './blocktext/BlockText.jsx';
import BlockRich from './blockrich/BlockRich.jsx';
import BlockImg from './blockimg/BlockImg.jsx';
import BlockWrapper from './blockwrapper/BlockWrapper.jsx';

const types = new Set([
  "text",
  'rich',
  'img',
  'wrapper'
])

export default function BlockIterator(props) {
  const blocks = props.blocks;

  var nextBlock = props.start || 'start';

  var thisBlock;
  var block;

  function hasNext() {
    if (nextBlock && blocks[nextBlock]) {
      thisBlock = nextBlock;

      block = blocks[thisBlock];
      nextBlock = block.next;

      return true;
    } else {
      return false;
    }
  }

  function getNext() {
    let type = block.type;

    if (!types.has(type)) {
      return null;
    }

    return getByType(type);
  }

  function getByType(type) {
    switch(type) {
      case 'text': return <BlockText {...props} block={block} key={thisBlock} />
      case 'rich': return <BlockRich {...props} block={block} key={thisBlock} />
      case 'img': return <BlockImg {...props} block={block} key={thisBlock} />
      case 'wrapper': return <BlockWrapper {...props} blocks={blocks} block={block} key={thisBlock} />
    }
  }

  function getBlocks() {
    let blocksToRender = [];

    while ( hasNext() ) {
      blocksToRender.push(getNext())
    }

    return blocksToRender;
  }

  return( getBlocks() );
}