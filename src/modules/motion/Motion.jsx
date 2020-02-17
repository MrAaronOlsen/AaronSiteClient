import React from "react";
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components'

import Themed from 'theme'

const ThemedImg = styled(motion.img)(props => Themed(props.styles));
const ThemedLink = styled(motion.a)(props => Themed(props.styles));
const ThemedDiv = styled(motion.div)(props => Themed(props.styles));

const getStyledMotion = function(type) {
  switch (type) {
    case 'img': return ThemedImg;
    case 'link': return ThemedLink;
    default: return ThemedDiv;
  }
}

export default function Motion(props) {
  const type = props.type;
  const StyledMotion = getStyledMotion(type)

  function closedElement() {
    return (
      <StyledMotion styles={props.styles}
        src={props.src}
        variants={props.variants}
        initial={props.initial}
        animate={props.animate}
        exit={props.exit || props.initial} />
    )
  }

  function openElement() {
    return (
      <StyledMotion styles={props.styles}
        href={props.href}
        target="_blank"
        variants={props.variants}
        initial={props.initial}
        animate={props.animate}
        exit={props.exit || props.initial}>

        {props.children}
      </StyledMotion>
    )
  }

  function getMotion() {
    if (type === 'img') {
      return closedElement()
    } else {
      return openElement()
    }
  }

  return( getMotion() );
}