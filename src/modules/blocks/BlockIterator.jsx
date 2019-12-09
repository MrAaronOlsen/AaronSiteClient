import React from 'react'

import BlockText from './blocktext/BlockText.jsx';
import BlockRich from './blockrich/BlockRich.jsx';
import BlockImg from './blockimg/BlockImg.jsx';

const types = new Set([
  "text",
  'rich',
  'img'
])

export default function BlockIterator(props) {
  const blocks = props.blocks;
  var name = 'start';
  var block;

  function hasNext() {
    if (name && blocks[name]) {
      block = blocks[name];
      name = block.next;

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
      case 'text': return <BlockText {...props} block={block} key={name} />
      case 'rich': return <BlockRich {...props} block={block} key={name} />
      case 'img': return <BlockImg {...props} block={block} key={name} />
    }
  }

  function getBlocks() {
    var blocks = [];

    while ( hasNext() ) {
      blocks.push(getNext())
    }

    return blocks;
  }

  return( getBlocks() );
}