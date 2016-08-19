import invariant from './invariant';

function cssifyName(str) {
  return str.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
}

export default function style(styles) {
  invariant(typeof styles === 'object', '样式要求为Object');
  const keys = Object.keys(styles);
  return keys.reduce((str, key) => {
    return `${str}${cssifyName(key)}:${styles[key]};`;
  }, '');
}

export function stringStyle(styles) {
  return ' style="' + style(styles) + '"';
}
