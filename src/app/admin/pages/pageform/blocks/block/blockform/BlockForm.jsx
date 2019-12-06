import React, { Component } from 'react'

import BlockText from 'blockform/blocktext/BlockText.jsx'
import BlockRich from 'blockform/blockrich/BlockRich.jsx'
import BlockObject from 'blockform/blockobject/BlockObject.jsx'

import TransitionProperties from 'modules/transition/TransitionProperties.jsx'
import StyleProperties from './StyleProperties.jsx'

import styles from './blockForm.mod.scss'

const objectAttributes = {
  'transition': TransitionProperties,
  'styles': StyleProperties
}

const block = function(props) {
  return props.block || {}
}

const blockText = function(name, props) {
  return <BlockText
    name={name}
    text={block(props)[name]}
    onChange={props.onChange} />
}

const blockRich = function(name, props) {
  return <BlockRich
    name={name}
    text={block(props)[name]}
    blockKey={props.blockKey}
    onChange={props.onChange} />
}

const blockObject = function(name, props) {
  return <BlockObject
    name={name}
    object={block(props)[name]}
    blockKey={props.blockKey}
    onChange={props.onChange}
    attributes={objectAttributes[name]}
    hasStyles />
}

const blockTypes = {
  'text': blockText,
  'rich': blockRich,
  'img': blockText
}

const blockTypesKey = {
  'text': 'content',
  'rich': 'content',
  'img': 'img_url'
}

const blockContent = function(props) {
  var type = block(props).type;

  if (type && blockTypes[type]) {
    return blockTypes[type](blockTypesKey[type], props)
  }
}

export default function BlockForm(props) {

  return(
    props.blockKey &&
      <div className={styles.wrapper} key={props.blockKey}>
        { blockText('type', props) }
        { blockContent(props) }
        { blockText('next', props) }
        { blockObject('transition', props) }
        { blockObject('styles', props) }
      </div> || null
  )
}