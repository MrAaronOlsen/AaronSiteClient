import React from 'react';

export function outsideClick(ref, callback, filterRefs) {
  React.useEffect(() => {
    document.addEventListener('click',
      function handleClick(e) { outsideClickCheck(e, ref, callback, filterRefs) }, false)

    return () => {
      document.removeEventListener('click',
        function handleClick(e) { outsideClickCheck(e, ref, callback, filterRefs) }, false)
    }
  }, [])
}

const outsideClickCheck = (event, ref, callback, filterRefs, type) => {

  if (filterRefs && typeof filterRefs === 'object') {
    for (let i = 0; i < filterRefs.length; i++) {
      if (filterRefs[i].current && filterRefs[i].current.contains(event.target)) {
        return;
      }
    };
  }

  if (ref.current && !ref.current.contains(event.target)) {
    callback()
  }
}