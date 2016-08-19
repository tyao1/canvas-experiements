/*
  - ctx: canvas2dcontext
  - el: the element to be rendered
  - props: calculated props and styles
  - done: call when finished
*/
import { required } from '../utils/propTypes';

export default function CvsImage(ctx, el, props, done) {
  const img = new Image();
  const { x, y, width, height } = props;

  img.onload = function onImageLoad() {
    ctx.drawImage(img, x, y, width, height);
    done();
  };
  img.src = props.src;
}

CvsImage.propTypes = {
  dada: [required],
  xxx: [required],
  src: [required],
};

CvsImage.async = true;
