import React, { Component } from 'react'

import BlockText from 'blockform/blocktext/BlockText.jsx'
import BlockRich from 'blockform/blockrich/BlockRich.jsx'
import BlockObject from 'blockform/blockobject/BlockObject.jsx'

import { properties as transitionProps } from 'modules/transition/Transition.jsx'

import styles from './blockForm.mod.scss'

const stylesProps = {
  'width': '100%',
  'height': '300px',
  'padding': '10px',
  'border': 'none',
  'background-color': '$background'
}

const objectAttributes = {
  'transition': transitionProps,
  'styles': stylesProps
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
    attributes={objectAttributes[name]} />
}

const blockTypes = {
  'text': blockText,
  'rich': blockRich
}

const blockContent = function(props) {
  if (block(props).type) {
    return blockTypes[block(props).type]('content', props)
  }
}

export default function BlockForm(props) {

  return(
    <div className={styles.wrapper}>
      { blockText('type', props) }
      { blockContent(props) }
      { blockText('next', props) }
      { blockObject('transition', props) }
      { blockObject('styles', props) }
    </div>
  )
}