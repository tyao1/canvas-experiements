let sized;
import invariant from './invariant';
const DOMURL = window.URL || window.webkitURL || window;



class Task { // 用来判断加载完成
  constructor(callback) {
    this._count = 0;
    this._callback = callback;
  }

  addTask = () => {
    this._count++;
  };

  finishTask = () => {
    this._count--;
    if (!this._count && this._callback) {
      
      this._callback();
    }
  };
}

function startRender(ctx, options, el, callback) {
  const task = new Task(callback);
  const containerStyle = {
    x: 0,
    y: 0,
    width: options.width * 2,
    height: options.height * 2,
  }
  renderElement(ctx, task, containerStyle, el);
}

/*
  - parentStyle caclulated style of parentStyle
  - currentProp props contained style defination
  - return calculated current style
*/
function calcPosition(parentStyle, currentProp) {
  const {
    position = 'static',
    direction = 'row',
    grow = 1,
    x, y,
    width, height,
    padLeft = 0,
    padRight = 0,
    padTop = 0,
    padBottom = 0,
    fixHeight = 0,
    fixWidth = 0,
    totalGrow,
    // mutation
  } = parentStyle;
  let {childPos} = parentStyle;
  const {
    position: cPosition = 'static',
    direction: cDirection = 'row',
    grow: cGrow = 1,
    x: cX, y: cY,
    width: cWidth,
    height: cHeight,
    padLeft: cPadLeft = 0,
    padRight: cPadRight = 0,
    padTop: cPadTop = 0,
    padBottom: cPadBottom = 0,
    // isCenter = false,
  } = currentProp;

  const isCenter = currentProp.textAlign === 'center';

  const calcedStyle = {};

  if (cPosition === 'absolute') {
    if (position === 'relative') {
      // relative to parent
      calcedStyle.x = x + cX;
      calcedStyle.y = y + cY;
    } else {
      calcedStyle.x = cX;
      calcedStyle.y = cY;
    }
    
    calcedStyle.width = cWidth;
    calcedStyle.height = cHeight;
    calcedStyle.padLeft = cPadLeft;
    calcedStyle.padRight = cPadRight;
    calcedStyle.padBottom = cPadBottom;
    calcedStyle.padTop = cPadTop;
    calcedStyle.direction = cDirection;
  } else {
    // using flex like positioning
    let remainWidth = width - padLeft - padRight - fixWidth;
    let remainHeight = height - padTop - padBottom - fixHeight;
    //if (direction === 'row') {
    if (!totalGrow) {
      // only child maybe
      calcedStyle.width = Math.min(cWidth, remainWidth);
      calcedStyle.height = Math.min(cHeight, remainHeight);
      calcedStyle.x = x + padLeft;
      calcedStyle.y = y + padTop;
    } else { // get the total grow of children
      if (direction === 'row') {
        const myWidth = cGrow ? cGrow / totalGrow * remainWidth
        : cWidth;
        if (totalGrow > 1) {
          if (!childPos) childPos = x + padLeft;
          calcedStyle.x = childPos;
          childPos += myWidth;
        } else {
          childPos = 0;
          calcedStyle.x = x + padLeft;
        }

        calcedStyle.y = y + padTop;
        calcedStyle.width = myWidth;
        calcedStyle.height = cHeight ? Math.min(cHeight, remainHeight) : remainHeight;

      } else { // column
        const myHeight = cGrow ? cGrow / totalGrow * remainHeight
        : cHeight;
        if (totalGrow > 1) {
          if (!childPos) childPos = y + padTop;
          calcedStyle.y = childPos;
          childPos += myHeight;
        } else {
          childPos = 0;
          calcedStyle.y = y + padTop;
        }
        calcedStyle.x = x + padLeft;
        calcedStyle.width = cWidth ? Math.min(cWidth, remainWidth) : remainWidth;
        calcedStyle.height = myHeight;
      }

      // introduce mutation
      parentStyle.childPos = childPos;
    }
    
  }
  
  if (isCenter) {
    calcedStyle.x = calcedStyle.x + calcedStyle.width / 2;
  }
  calcedStyle.padLeft = cPadLeft;
  calcedStyle.padTop = cPadTop;
  calcedStyle.padRight = cPadRight;
  calcedStyle.padBottom = cPadBottom;
  calcedStyle.direction = cDirection;
  return calcedStyle;
}

const defaultEleProps = {

};

function renderElement(ctx, task, parentStyle, el) {
  console.log('[RENDER]', el);
  const { type, props, children } = el;
  task.addTask();
  let async;

  let defaultProps;
  if (typeof type === 'function') {
    defaultProps = el.defaultProps;
  } else {
    defaultProps = defaultEleProps;
  }
  const finalProps = {
    ...defaultProps,
    ...props,
  };
  // const {x, y, width, height} = finalProps;
  const calcedStyle = calcPosition(parentStyle, finalProps);
  const {x, y, width, height} = calcedStyle;

  if (typeof type === 'function') {
    type(ctx, el, {...finalProps, ...calcedStyle});
  } else {
    if (type === 'img') {
      async = true;
      const img = new Image();
      img.onload = function onImageLoad() {
        ctx.drawImage(img, x, y, width, height);
        task.finishTask();
      }
      img.src = finalProps.src;
    } else if ( type === 'dom') {
      async = true;
      invariant(typeof children === 'string', '需要Dom字符串！');

      let img = new Image();
      let svg = new Blob([children], { type: 'image/svg+xml;charset=utf-8' });
      const url = DOMURL.createObjectURL(svg);
      img.onload = function onImageLoad() {
        ctx.drawImage(img, x, y);
        DOMURL.revokeObjectURL(url);
        img = null;
        svg = null;
        task.finishTask();
      }
      img.src = url;
    } else if (type === 'rect') {
      const { fillStyle, strokeStyle } = finalProps;
      ctx.fillStyle = fillStyle;
      ctx.fillRect(x, y, width, height);
      if (strokeStyle) {
        ctx.strokeStyle = strokeStyle;
        ctx.strokeRect(x, y, width, height);
      }
    } else if (type === 'text') {
      const { font,
        textBaseLine = 'top',
        textAlign = 'start',
        fillStyle = '#000',
      } = finalProps;
      ctx.font = font;
      ctx.fillStyle = fillStyle;
      ctx.textBaseLine = textBaseLine,
      ctx.textAlign = textAlign,
      ctx.fillText(children, x, y);
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

  if (!async) {
    task.finishTask();
  }

}

export default function render(ctx, options, el, callback) {
  invariant(ctx, 'Canvas ctx not privided');
  invariant(options, 'options not privided');
  invariant(el, 'Root element not provided');

  const { width, height } = options;
  const canvas = ctx.canvas;

  if (!sized) {
    // @2x image
    canvas.setAttribute('width', width * 2);
    canvas.setAttribute('height', height * 2)

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    sized = true;
  }

  /*
  ctx.font = '48px serif';
  ctx.fillText('Hello world', 24, 140);
  ctx.fillText('Hello world', 100, 150);
  ctx.fillText('Hello world', 5, 170);
  */
  startRender(ctx, options, el, callback);
}
