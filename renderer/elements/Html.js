const DOMURL = window.URL || window.webkitURL || window;

export default function Html(ctx, el, props, done) {
  const { children } = el;
  const { x, y } = props;
  // invariant(typeof children === 'string', '需要Dom字符串！');
  const img = new Image();
  const svg = new Blob([children], { type: 'image/svg+xml;charset=utf-8' });
  const url = DOMURL.createObjectURL(svg);
  img.onload = function onImageLoad() {
    ctx.drawImage(img, x, y);
    DOMURL.revokeObjectURL(url);
    done();
  };
  img.src = url;
}

Html.async = true;
