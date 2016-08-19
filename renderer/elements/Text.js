/*
  - ctx: canvas2dcontext
  - el: the element to be rendered
  - props: calculated props and styles
  - done: call when finished
*/

export default function Text(ctx, el, props) {
  const { children } = el;
  const { x, y } = props;
  const { font,
    textBaseLine = 'baseline',
    textAlign = 'start',
    fillStyle = '#000',
  } = props;
  ctx.font = font;
  ctx.fillStyle = fillStyle;
  ctx.textBaseLine = textBaseLine;
  ctx.textAlign = textAlign;
  ctx.fillText(children, x, y);
}
