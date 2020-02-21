import BlockText from 'blockform/blocktext/BlockText.jsx'
import BlockRich from 'blockform/blockrich/BlockRich.jsx'
import BlockList from 'blockform/blocklist/BlockList.jsx'

import StyleProperties from './StyleProperties.jsx'
import MotionProperties from 'modules/motion/MotionProperties.jsx'

export const properties = {
  'styles': StyleProperties,
  ':hover': StyleProperties,
  ':action': StyleProperties,
  'motion': MotionProperties
}

export const blockContentTypes = {
  'text': BlockText,
  'rich': BlockRich,
  'img': BlockText,
  'wrapper': BlockList
}

export const blockContentDisplay = {
  'text': 'content',
  'rich': 'content',
  'img': 'img_url',
  'wrapper': 'first_child'
}

export function blockLists(blocks) {
  return {
    'type': Object.keys(blockContentTypes),
    'next': Object.keys(blocks),
    'first_child': Object.keys(blocks),
    'modal': Object.keys(blocks),
    'template': Object.keys(blocks)
  }
}