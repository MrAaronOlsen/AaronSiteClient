import React from 'react';
import PropTypes from "prop-types";

import styled from 'styled-components';
import Themogrify from 'modules/theme/Themogrify.js';

import './element.scss';

const StylesWrapper = styled.div(props => Themogrify(props.styles));

export default function Element(props) {
  const display = props.display;
  const id = props.identity;

  function onClick() {
    return props.onClick(id)
  }

  function classes() {
    var classes = "list-element-wrapper";

    if (props.selected === id) {
      classes += " selected"
    }

    return classes
  }

  return (
    <StylesWrapper className={classes()} styles={props.styles} onClick={onClick}>
      {display}
    </StylesWrapper>
  )
}

Element.propTypes = {
  display: PropTypes.string.isRequired,
  identity: PropTypes.string.isRequired
}