import React from 'react'
import MotionExit from 'motion/MotionExit.jsx';
import MotionDiv from 'motion/MotionDiv.jsx';
import MotionImg from 'motion/MotionImg.jsx';
import MotionLink from 'motion/MotionLink.jsx';

export default function MotionBlock(props) {
  const block = props.block || {};
  const styles = block.styles;

  const motion = block.motion || {};
  const variants = motion.variants;
  const initial = motion.initial;
  const animate = motion.animate;
  const exit = motion.exit;

  function getMotionType() {
    switch (props.type) {
      case 'img': return MotionImg;
      case 'link': return MotionLink;
      default: return MotionDiv;
    }
  }

  function getMotion() {
    var Motion = getMotionType();

    return (
      <MotionExit trigger={props.trigger} exit={exit}>
        <Motion
          type={props.type}
          src={props.src}
          href={props.href}
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

  return ( getMotion() )
}