import React from 'react';

import BlockText from './blocktext/BlockText.jsx';
import BlockRich from './blockrich/BlockRich.jsx';
import BlockImg from './blockimg/BlockImg.jsx';
import BlockWrapper from './blockwrapper/BlockWrapper.jsx';

import StyledBlock from './styledblock/StyledBlock.jsx';
import linkedBlock from './linkedblock/LinkedBlock.jsx';
import modalBlock from './modalblock/ModalBlock.jsx';

const types = {
  "text": BlockText,
  'rich': BlockRich,
  'img': BlockImg,
  'wrapper': BlockWrapper
}

export default function BlockIterator(props) {
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

    if (block.link) {
      Block = linkedBlock(Block)
    } else if(block.modal) {
      Block = modalBlock(Block)
    }

    return(
      <Block {...props} blocks={blocks} block={block} />
    )
  }

  // <StyledBlock {...props} block={block} key={thisBlock}>
  //
  // </StyledBlock>

  function getBlocks() {
    let blocksToRender = [];

    while ( hasNext() ) {
      blocksToRender.push(getNext())
    }

    return blocksToRender;
  }

  return( getBlocks() );
}