import invariant from '../utils/invariant';

export default function el(type, props, children) {
  invariant(typeof type === 'string' || typeof type === 'function', '元素要求为字符串或者函数')
  return {
    type,
    props,
    children,
    // defaultProps: defaultProps || this.defaultProps,
  };
}


