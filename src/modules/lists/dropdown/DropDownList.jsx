import React from 'react';
import PropTypes from "prop-types";

import ArrowImg from 'public/images/arrow-down.png';
import styled from 'styled-components';
import Themogrify from 'modules/theme/Themogrify.js';

import './dropDownList.scss';

const StylesWrapper = styled.div(props => Themogrify(props.styles));

export default function DropDownList(props) {
  const selected = props.selected;

  return(
    <StylesWrapper className={'dropdownlist-wrapper'} styles={props.styles}>
      <div className={'dropdownlist-header'}>
        {selected}
        <img src={ArrowImg} />
      </div>
      <div className={'dropdownlist-list'}>
        { props.children }
      </div>

    </StylesWrapper>
  )
}

DropDownList.propTypes = {
  selected: PropTypes.string
};

DropDownList.defaultProps = {
  selected: "Select Something"
};