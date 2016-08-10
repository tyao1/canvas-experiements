import render from './utils/render';
import el, { qr } from './utils/element';
import { stringStyle as style} from './utils/inlineStyle';

const styles = {
  container: {
    fontSize: '32px',
  },
  infoSection: {
    padding: '14px',
  },
  fakeLocation: {
    backgroundColor: '#ef7474',
    height: '200px',
  },
  info: {
    boxSizing: 'border-box',
    display: 'inline-block',
    width: '33%',
    textAlign: 'center',
    padding: '20px',
  },
  caption: {
    color: '#979797',
    marginBottom: '3px',
  },
  value: {
    color: 'red',
    fontSize: '1.2em',
  },
}

const canvas = document.getElementById('main');
if (!canvas) {
  console.error('Canvas is not supported');
}

const width = window.innerWidth;
const height = window.outerHeight;

const realWidth = width * 2;
const realHeight = height * 2;

const ctx = canvas.getContext('2d');

const tree = el('rect', {
  x: 0,
  y: 0,
  height: realHeight,
  width: realWidth,
  fillStyle: '#fff',
}, [
/*
  safari不支持，chrome无法输出结果
  el('dom', {
    x: 0,
    y: 0,
    height: realHeight,
    width: realWidth,
  }, `<svg xmlns="http://www.w3.org/2000/svg" width="${realWidth}" height="${realHeight}">
<foreignObject width="100%" height="100%">
<div xmlns="http://www.w3.org/1999/xhtml"
  ${style(styles.container)}>
  <div ${style(styles.fakeLocation)}></div>
  <div ${style(styles.infoSection)}>
    <div ${style(styles.info)}>
      <div ${style(styles.caption)}>今日步数</div>
      <span ${style(styles.value)}>3024</span>步
    </div><div ${style(styles.info)}>
      <div ${style(styles.caption)}>今日里程</div>
      <span ${style(styles.value)}>2.3</span>公里
    </div><div ${style(styles.info)}>
      <div ${style(styles.caption)}>消耗热量</div>
      <span ${style(styles.value)}>248</span>卡
    </div>
  </div>
</div>
</foreignObject>
</svg>`),
*/
  el('text', {
    x: realWidth / 2 - 90,
    y: realHeight - 36,
    fillStyle: '#999',
    font: '32px serif',
  }, '要健康上平安好医生'),
  el('text', {
    x: realWidth / 2 - 90,
    y: realHeight - 68 - 24,
    fillStyle: '#4a4a4a',
    font: '48px bold serif',
  }, '平安好医生'),
  qr({
    value: 'http://baidu.com',
    level: 3,
    width: 500,
    height: 500,
    x: realWidth / 2 - 250,
    y: realHeight / 2,
  }),
]);


render(ctx, {
  width,
  height,
}, tree, () => {
  /*
  const imageData = ctx.getImageData(0, 0, realWidth, realHeight);
  alert('Finished without errors');
  */

  const pngUrl = canvas.toDataURL();
  console.log('dataUrl', pngUrl);

  if (canvas.toBlob) {
    canvas.toBlob(function(blob) {
      var newImg = document.createElement("img"),
          url = URL.createObjectURL(blob);

      newImg.onload = function() {
        // no longer need to read the blob so it's revoked
        URL.revokeObjectURL(url);
      };

      newImg.src = url;
      document.body.appendChild(newImg);
    });
  }




});
