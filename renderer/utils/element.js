import invariant from './invariant';

import genQR from './qrCode';


export default function el(type, props, children) {
  invariant(typeof type === 'string' || typeof type === 'function', '元素要求为字符串或者函数')
  return {
    type,
    props,
    children,
    // defaultProps: defaultProps || this.defaultProps,
  };
}

export function qr(props, children) {
  return el(genQR, props, children);
}

/*
export function elFunctor(type) {
  return function (props, children) {
    el(type, props, children)
  }
}
*/
