/*
  - ctx: canvas2dcontext
  - el: the element to be rendered
  - props: calculated props and styles
  - done: call when finished
*/

export default function View(ctx, el, props) {
  const { x, y, width, height, fillStyle, strokeStyle } = props;
  ctx.fillStyle = fillStyle;
  ctx.fillRect(x, y, width, height);
  if (strokeStyle) {
    ctx.strokeStyle = strokeStyle;
    ctx.strokeRect(x, y, width, height);
  }
}
