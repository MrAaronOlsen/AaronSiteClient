import React from "react";
import PropTypes from "prop-types";

function Canvas(props) {

  return(
    <canvas className={props.classNames}
      ref={props.canvasRef}
      width={props.width}
      height={props.height} >
    </canvas>
  )

}

Canvas.propTypes = {
  canvasRef: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  classNames: PropTypes.string
};

export default React.forwardRef((props, ref) => <Canvas canvasRef={ref} {...props}/>);