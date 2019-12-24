import React from 'react'

import TextInput from 'modules/textinput/TextInput.jsx'
import DeleteBtn from 'public/images/delete-button.png'
import styles from './blockText.mod.scss'

function useOutsideAlerter(ref) {
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      ref.current.lastChild.style.visibility = "hidden"
    }
  }

  function handleClickInSide(event) {
    if (ref.current && ref.current.contains(event.target)) {
      ref.current.lastChild.style.visibility = "visible"
    }
  }

  React.useEffect(() => {
    // Bind the event listener
    if (ref) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("mousedown", handleClickInSide);
    }

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleClickInSide);
    };
  });
}

export default function BlockText(props) {
  const wrapperRef = React.useRef(null);
  useOutsideAlerter(wrapperRef);

  function deleteLine() {
    props.delete(props.name)
  }

  return(
    <div className={styles.wrapper} ref={props.delete ? wrapperRef : null} >
      <span>{props.name}: </span>
      <TextInput name={props.name}
        text={props.text}
        onChange={props.onChange}
        classNames={styles.text} />
      
      {props.delete ? <img src={DeleteBtn} onClick={deleteLine}/> : null}

    </div>
  )
}