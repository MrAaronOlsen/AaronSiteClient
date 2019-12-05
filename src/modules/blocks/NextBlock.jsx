import React from 'react'

import BlockText from './blocktext/BlockText.jsx';
import BlockRich from './blockrich/BlockRich.jsx';
import BlockImg from './blockimg/BlockImg.jsx';

import BlockContext from 'blocks/BlockContext.jsx'

const types = new Set([
  'text',
  'rich',
  'img'
])

export default function NextBlock(props) {
  const blocks = React.useContext(BlockContext);
  const name = props.name;

  if (!name || ! blocks[name]) {
    return null;
  }

  const block = blocks[name];

  var type = block.type;

  if (!types.has(type)) {
    return null;
  }

  function getBlock() {

    switch(type) {
      case 'text': return <BlockText name={name} />
      case 'rich': return <BlockRich name={name} />
      case 'img': return <BlockImg name={name} />
    }
  }

  return( getBlock() );
}