import React from 'react'

import MotionExit from 'motion/MotionExit.jsx';
import Motion from 'motion/Motion.jsx';

export default function MotionBlock(props) {
  const block = props.block || {};
  const styles = block.styles || {};
  const motion = block.motion || {};

  function getMotion() {

    return (
      <MotionExit {...props} exit={motion.exit}>
        <Motion {...props}
          styles={styles}
          motion={motion} >

          {props.children}

        </Motion>
      </MotionExit>
    )
  }

  return ( getMotion() )
}