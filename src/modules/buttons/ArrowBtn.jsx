import React from 'react';
import PropTypes from 'prop-types';

import ArrowImg from 'public/images/arrow-in-circle.png';
import styles from './arrowBtn.mod.scss'

export default class ArrowBtn extends React.Component {
  ref = React.createRef();

  componentDidMount() {
    this.ref.current.style.setProperty('--hover-circle-size', this.props.size);
  }

  getClasses() {
    return [styles.wrapper, styles[this.props.direction], this.props.classNames].join(' ');
  }

  getImgSize() {
    return {
      width: this.props.size,
      height: this.props.size
    }
  }

  getBgSize() {
    return {
      width: this.state.size,
      height: this.state.size
    }
  }

  onClick() {
    if (this.props.onClick) {
      this.props.onClick(this.props.name)
    }
  }

  render() {
    return(
      <div ref={this.ref} className={this.getClasses()}>
        <img src={ArrowImg} style={this.getImgSize()} onClick={this.onClick.bind(this)}/>
        <div className={styles.circle}/>
      </div>
    )
  }
}

ArrowBtn.propTypes = {
  direction: PropTypes.string,
  size: PropTypes.string,
  name: PropTypes.string
};

ArrowBtn.defaultProps = {
  direction: 'right',
  size: '30px'
}