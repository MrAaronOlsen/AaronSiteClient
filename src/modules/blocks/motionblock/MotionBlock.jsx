import React from 'react'

import Motion from 'motion/Motion.jsx';

export default function MotionBlock(props) {
  const block = props.block || {};
  const styles = block.styles || {};
  const motion = block.motion || {};

  function getMotion() {

    return (
      <Motion {...props}
        styles={styles}
        motion={motion} >

        {props.children}

      </Motion>
    )
  }

  return ( getMotion() )
}