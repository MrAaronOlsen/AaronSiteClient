import React from 'react'
import styled from 'styled-components'

import TextInput from 'modules/textinput/TextInput.jsx'
import DeleteBtn from 'public/images/delete-button.png'
import Themogrify from 'modules/theme/Themogrify.js'

import styles from './element.mod.scss'

const StylesWrapper = styled.div(props => Themogrify(props.styles));

export default function BlockList(props) {
  const block = props.block

  function onClick() {
    props.onClick(props.name)
  }

  function onChange(newName) {
    props.renameBlock(props.name, newName)
  }

  function deleteBlock() {
    props.deleteBlock(props.name)
  }

  function deleteBtn() {
    return <img className={styles.deleteBtn}
      src={DeleteBtn}
      onClick={deleteBlock.bind(this)}/>
  }

  function classNames() {
    return [props.focused ? styles.focused : "", styles.textWrapper].join(" ")
  }

  function getStyles() {
    const s = {};

    var borderColor;

    if (block.type === "wrapper") {
      borderColor = "#666"
    } else {
      borderColor = '#aaa'
    }

    if (props.name === 'start') {
      borderColor = "hsla(108, 18%, 59%, 1)"
    }

    var depth = props.depth;
    if (props.depth === -1) {
      borderColor = "hsla(0, 18%, 59%, 1)";
      depth = 0;
    }

    s['borderLeft'] = `solid ${borderColor} 5px`;
    s[`padding-left`] = `${(depth * 10) + 20}px !important`;

    return s;
  }

  return(
    <StylesWrapper className={styles.wrapper} styles={getStyles()} onClick={onClick.bind(this)}>
      <TextInput text={props.name}
        onChange={onChange.bind(this)}
        classNames={classNames()}>

        {props.focused && deleteBtn()}
      </TextInput>
    </StylesWrapper>
  )
}