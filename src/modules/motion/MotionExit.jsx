import React from 'react';
import { AnimatePresence } from 'framer-motion';

export default function MotionExit(props) {

  function getMotion() {
    if (props.exit) {
      return (
        <AnimatePresence>
          {props.trigger && props.children}
        </AnimatePresence>
      )
    } else {
      return (
        props.children
      )
    }
  }

  return( getMotion() );
}