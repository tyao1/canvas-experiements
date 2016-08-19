import invariant from './invariant';

function buildChecker(fn, msgFn) {
  fn.message = msgFn;
  return fn;
}


export const func = buildChecker((value) => {
  return typeof value === 'function';
}, (currentValue) => {
  return `Function is required, but got: ${currentValue}`;
});

export const required = buildChecker((value) => {
  return value !== null && value !== undefined;
}, (currentValue) => {
  return `value is required, but got: ${currentValue}`;
});

function validate(propType, prop, key, name) {
  return propType.some(check => {
    const result = check(prop);
    if (!result) {
      const message = check.message(prop);
      console.error(`${key}: ${message}. Please check ${name}`);
    }
    return result;
  });
}

export default function checkPropTypes(propTypes, props, component) {
  invariant(typeof propTypes === 'object', 'PropTypes had to be an object');
  Object.keys(propTypes).forEach(key => {
    if (!validate(propTypes[key], props[key], key, component.name)) {
     
    }
  });
}
