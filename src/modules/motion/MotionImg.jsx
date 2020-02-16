import React from "react";
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components'

import Themed from 'theme'
const ThemedImg = styled(motion.img)(props => Themed(props.styles));

export default function MotionImg(props) {

  return(
    <ThemedImg styles={props.styles}
      src={props.src}
      variants={props.variants}
      initial={props.initial}
      animate={props.animate}
      exit={props.exit || props.initial}/>
  );
}