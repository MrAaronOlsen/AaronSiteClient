import React from "react";
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components'

import Themed from 'theme'
const ThemedDiv = styled(motion.div)(props => Themed(props.styles));

export default function MotionDiv(props) {

  return (
    <ThemedDiv styles={props.styles}
      variants={props.variants}
      initial={props.initial}
      animate={props.animate}
      exit={props.exit || props.initial}>

      {props.children}
    </ThemedDiv>
  )
}