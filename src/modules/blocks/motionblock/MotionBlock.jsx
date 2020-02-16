import React from 'react'
import Motion, { MotionExit } from 'motion';
import shortid from 'shortid';

export default function MotionBlock(props) {
  const id = shortid.generate()
  const block = props.block || {};
  const styles = block.styles;

  const motion = block.motion || {};
  const variants = motion.variants;
  const initial = motion.initial;
  const animate = motion.animate;
  const exit = motion.exit;

  return (
    <MotionExit trigger={props.trigger}>
      <Motion
        styles={styles}
        variants={variants}
        initial={initial}
        animate={animate}
        exit={exit}>

        {props.children}

      </Motion>
    </MotionExit>
  )
}