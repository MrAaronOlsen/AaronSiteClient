import React from 'react';

import BlockText from './blocktext/BlockText.jsx';
import BlockRich from './blockrich/BlockRich.jsx';
import BlockImg from './blockimg/BlockImg.jsx';
import BlockWrapper from './blockwrapper/BlockWrapper.jsx';

const types = {
  'text': BlockText,
  'rich': BlockRich,
  'img': BlockImg,
  'wrapper': BlockWrapper
}

export default function Blocks(props) {
  const blocks = props.blocks;
  var nextBlock = props.start;

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
    var Block = types[block.type]

    if (!Block) {
      return null;
    }

    return(
      <Block {...props}
        key={thisBlock}
        block={block} />
    )
  }

  function getBlocks() {
    const toRender = [];

    while ( hasNext() ) {
      toRender.push(getNext())
    }

    return toRender;
  }

  return(
    <React.Fragment>
      { getBlocks() }
    </React.Fragment>
  );
}