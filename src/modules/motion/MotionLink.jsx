import React from "react";
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components'

import Themed from 'theme'
const ThemedLink = styled(motion.a)(props => Themed(props.styles));

export default function MotionImg(props) {

  return(
    <ThemedLink styles={props.styles}
      href={props.href}
      target="_blank"
      variants={props.variants}
      initial={props.initial}
      animate={props.animate}
      exit={props.exit || props.initial}>

      {props.children}
    </ThemedLink>
  );
}