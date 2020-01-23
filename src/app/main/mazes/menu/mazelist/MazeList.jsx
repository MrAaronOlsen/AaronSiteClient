import React from 'react';
import PropTypes from 'prop-types';

import Mazes from 'mazes/lib/mazes/Mazes.js';
import DropDownList from 'modules/lists/dropdown/DropDownList.jsx';
import Element from 'modules/lists/Element.jsx';

const listStyles = {
  '&&': {
    'width': '200px'
  }
}

export default function Menu(props) {
  const selected = props.selected;

  function getSelected() {

    if (selected) {
      return Mazes.getText(selected);
    }

    return "Select A Maze"
  }

  function unwind() {
    return Mazes.getValues().map(element => {
      return <Element key={element.id}
        selected={selected}
        display={element.text}
        identity={element.id}
        onClick={props.selectMaze} />
    })
  }

  return (
    <DropDownList styles={listStyles} selected={getSelected()}>
      { unwind() }
    </DropDownList>
  )
}