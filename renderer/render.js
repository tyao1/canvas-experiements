import invariant from './utils/invariant';
import Task from './utils/task';
import calcPosition from './utils/calcPosition';
import checkPropTypes from './utils/propTypes';

function startRender(ctx, options, el, callback) {
  const task = new Task(callback);
  const containerStyle = {
    x: 0,
    y: 0,
    width: options.width,
    height: options.height,
  }
  renderElement(ctx, task, containerStyle, el);
}

const defaultEleProps = {

};

function renderElement(ctx, task, parentStyle, el) {
  console.log('[RENDER]', el);
  const { type, props, children } = el;
  let async;

  task.addTask();

  let defaultProps;
  if (typeof type === 'function') {
    defaultProps = el.defaultProps;
  } else {
    defaultProps = defaultEleProps;
  }

  // merge props
  const finalProps = {
    ...defaultProps,
    ...props,
  };

  // check prop types
  if (process.env.NODE_ENV !== 'production') {
    if (type.propTypes) {
      checkPropTypes(type.propTypes, finalProps, type);
    }
  }


  /* calculate style of this element, based on parent style and 1st pass
  *  this is the second passs to position the elment
  *  the first pass should caculate actual size and remaning spaces
  */
  const calcedStyle = calcPosition(parentStyle, finalProps);

  if (typeof type === 'function') {
    type(ctx, el, {...finalProps, ...calcedStyle}, task.finishTask);
    if (type.async) async = true;
  } else {
    // predefined elements
    if (type === 'rect') {
      const { x, y, width, height, fillStyle, strokeStyle } = finalProps;
      ctx.fillStyle = fillStyle;
      ctx.fillRect(x, y, width, height);
      if (strokeStyle) {
        ctx.strokeStyle = strokeStyle;
        ctx.strokeRect(x, y, width, height);
      }
    } else {
      // not recognized element
    }
  }

  parentStyle = calcedStyle;
  /*
    Calculate extra styles for parents
  */
  if (Array.isArray(children)) {
    let fixHeight = 0;
    let fixWidth = 0;
    const cacledGrow = children.reduce((prev, child) => {
      let defaultProps;
      if (typeof child.type === 'function') {
        defaultProps = child.type.defaultProps;
      } else {
        defaultProps = defaultEleProps;
      }
      if (child.props.position === 'absolute' || defaultProps && defaultProps.position === 'absolute') {
        return prev;
      }
      const grow = child.props.grow || (defaultProps && defaultProps.grow) || 1;
      if (grow === 0) {
        if (child.props.height) fixHeight += child.props.height;
        else if (defaultProps && defaultProps.height) fixHeight += defaultProps.height;
        if (child.props.width) fixWidth += child.props.width;
        else if (defaultProps && defaultProps.width) fixWidth += defaultProps.width;
      }
      return prev + grow;
    }, 0);
    parentStyle.totalGrow = cacledGrow;
    parentStyle.fixHeight = fixHeight;
    parentStyle.fixWidth = fixWidth;
    children.map(renderElement.bind(this, ctx, task, parentStyle));
  }

  // Make the callback works
  if (!async) {
    task.finishTask();
  }
}

export default function render(ctx, options, el, callback) {
  invariant(ctx, 'Canvas ctx not privided');
  invariant(options, 'options not privided');
  invariant(el, 'Root element not provided');

  const { width, height, ratio } = options;
  const canvas = ctx.canvas;
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
  canvas.style.width = width / ratio + 'px';
  canvas.style.height = height / ratio + 'px';

  startRender(ctx, options, el, callback);
}
