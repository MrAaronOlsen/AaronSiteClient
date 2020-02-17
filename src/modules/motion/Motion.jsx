import React from "react";
import { motion } from 'framer-motion';
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
  const motion = props.motion;
  const variants = motion.variants || props.variants;
  const initial = motion.initial || props.initial;
  const animate = motion.animate || props.animate;
  const exit = motion.exit || props.exit || {};

  const type = props.type;
  const StyledMotion = getStyledMotion(type)

  function closedElement() {
    return (
      <StyledMotion styles={props.styles}
        src={props.src}
        variants={variants}
        initial={initial}
        animate={animate}
        exit={exit || initial} />
    )
  }

  function openElement() {
    return (
      <StyledMotion styles={props.styles}
        href={props.href}
        target="_blank"
        variants={variants}
        initial={initial}
        animate={animate}
        exit={exit || initial} >

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