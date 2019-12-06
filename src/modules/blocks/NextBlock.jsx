import React from 'react'

import BlockText from './blocktext/BlockText.jsx';
import BlockRich from './blockrich/BlockRich.jsx';
import BlockImg from './blockimg/BlockImg.jsx';

const types = new Set([
  'text',
  'rich',
  'img'
])

export default function NextBlock(props) {
  const blocks = props.blocks;
  var blockName = 'start';
  var block;

  function hasNext() {
    if (blockName && blocks[blockName]) {
      block = blocks[blockName];
      blockName = block.next;

      return true;
    } else {
      return false;
    }
  }

  function getNext() {
    var type = block.type;

    if (!types.has(type)) {
      return null;
    }

    switch(type) {
      case 'text': return <BlockText block={block} key={blockName} />
      case 'rich': return <BlockRich block={block} key={blockName} />
      case 'img': return <BlockImg block={block} key={blockName} />
    }
  }

  function getBlocks() {
    var blockList = [];

    while ( hasNext() ) {
      blockList.push(getNext())
    }

    return blockList;
  }

  return( getBlocks() );
}