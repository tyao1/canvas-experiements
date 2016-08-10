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

function startRender(ctx, el, callback) {
  const task = new Task(callback);
  renderElement(ctx, task, el);
}

function renderElement(ctx, task, el) {
  console.log('[RENDER]', el);
  const { type, props, children } = el;
  task.addTask();
  let async;
  if (typeof type === 'function') {
    type(ctx, el);
  } else {
    if ( type === 'dom') {
      async = true;
      invariant(typeof children === 'string', '需要Dom字符串！');
      const finalProps = {
        ...el.defaultProps,
        ...props,
      };
      const { width, height, x, y } = finalProps;
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
      const finalProps = {
        ...el.defaultProps,
        ...props,
      };
      const { width, height, x, y, fillStyle } = finalProps;
      ctx.fillStyle = fillStyle;
      ctx.fillRect(x, y, width, height);
    } else if (type === 'text') {
      const finalProps = {
        ...el.defaultProps,
        ...props,
      };
      const { x, y, font, textBaseLine, textAlign, fillStyle } = finalProps;
      ctx.font = font;
      ctx.fillStyle = fillStyle;
      ctx.textBaseLine = textBaseLine,
      ctx.textAlign = textAlign,
      ctx.fillText(children, x, y);
    }
  }

  if (Array.isArray(children)) {
    children.map(renderElement.bind(this, ctx, task));
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
  startRender(ctx, el, callback);
}
