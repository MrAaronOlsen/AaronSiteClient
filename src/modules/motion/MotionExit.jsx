import React from 'react';
import { AnimatePresence } from 'framer-motion';

export default function MotionExit(props) {

  function getMotion() {
    return (
      <AnimatePresence onExitComplete={props.onExit}>
        {props.trigger && props.children}
      </AnimatePresence>
    )
  }

  return( getMotion() );
}