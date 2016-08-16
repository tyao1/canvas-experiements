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
const height = window.innerHeight;

const realWidth = width * 2;
const realHeight = height * 2;

const ctx = canvas.getContext('2d');

const tree = el('rect', {
  x: 0,
  y: 0,
  height: realHeight,
  width: realWidth,
  fillStyle: '#fff',
  direction: 'column',
  padTop: 278,
}, [
  el('rect', {
    position: 'absolute',
    fillStyle: '#affeaf',
    x: 0,
    y: realHeight - 400,
    width: realWidth,
    height: 400,
  }),
  el('text', {
    fillStyle: '#333',
    font: '28px serif',
    textAlign: 'center',
    grow: 0,
    height: 50,
  }, '走路真的能赚钱!'),
  el('text', {
    grow: 0,
    fillStyle: '#eee',
    font: '18px serif',
    height: 50,
    textAlign: 'center',
  }, '我用平安好医生计步，每天赚6元'),
  el('empty', {
    direction: 'row',
    padLeft: 60,
    padRight: 60,
    padTop: 40,
  }, [
    el('empty', {
      direction: 'column',
    }, [
      el('text', {
        grow: 0,
        height: 42,
        font: '40px serif',
        fillStyle: '#a06c6c',
        textAlign: 'center',
      }, '0.00'),
      el('text', {
        font: '20px serif',
        fillStyle: '#666',
        textAlign: 'center',
      }, '累计赚钱'),
    ]),
    el('empty', {
      direction: 'column',
    }, [
      el('text', {
        grow: 0,
        height: 42,
        font: '40px serif',
        fillStyle: '#a06c6c',
        textAlign: 'center',
      }, '0'),
      el('text', {
        font: '20px serif',
        fillStyle: '#666',
        textAlign: 'center',
      }, '累计赚钱'),
    ]),
    el('empty', {
      direction: 'column',
    }, [
      el('text', {
        grow: 0,
        height: 42,
        font: '40px serif',
        fillStyle: '#a06c6c',
        textAlign: 'center',
      }, '0'),
      el('text', {
        font: '20px serif',
        fillStyle: '#666',
        textAlign: 'center',
      }, '参与天数'),
    ]),
  ]),
  el('rect', {
    position: 'absolute',
    fillStyle: '#fff',
    strokeStyle: '#ccc',
    x: realWidth / 2 - 180,
    y: realHeight - 360 - 80 - 40,
    width: 360,
    height: 360,
  }),
  qr({
    position: 'absolute',
    value: 'http://baidu.com',
    level: 3,
    width: 420,
    height: 420,
    x: realWidth / 2 - 200,
    y: realHeight - 420 - 80,
  }),
]);


render(ctx, {
  width,
  height,
}, tree, () => {
  // const pngUrl = canvas.toDataURL();
  // console.log('dataUrl', pngUrl);
});


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

  /*
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
  */
