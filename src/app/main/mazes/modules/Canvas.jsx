import React, { Component } from "react";
import PropTypes from "prop-types";

class Canvas extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <canvas className={this.props.class}
        ref={this.props.canvasRef}
        width={this.props.width}
        height={this.props.height} >
      </canvas>
    )
  }

}

Canvas.propTypes = {
  canvasRef: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default React.forwardRef((props, ref) => <Canvas canvasRef={ref} {...props}/>);