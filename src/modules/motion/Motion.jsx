import React from "react";
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components'

import Themed from 'theme'
const ThemedMotion = styled(motion.div)(props => Themed(props.styles));

export default function Motion(props) {

  return(
    <ThemedMotion name={"motion"} styles={props.styles}
      variants={props.variants}
      initial={props.initial}
      animate={props.animate}
      exit={props.exit || props.initial}>

      {props.children}
    </ThemedMotion>
  );
}

export const MotionExit = function(props) {

  return(
    <AnimatePresence>
      {props.trigger && props.children}
    </AnimatePresence>
  );
}