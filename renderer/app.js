import render from './render';
import el from './elements/element';
import Qr from './elements/Qr';
import Image from './elements/Image';
import Text from './elements/Text';
import View from './elements/View';

// import { stringStyle as style} from './styles/inlineStyle';
// import styles from './styles/app.styles.js';


const canvas = document.getElementById('main');
if (!canvas) {
  console.error('Canvas is not supported');
}

const width = window.innerWidth;
const height = window.innerHeight;

const ctx = canvas.getContext('2d');

const tree = el(View, {
  x: 0,
  y: 0,
  height,
  width,
  fillStyle: '#fff',
  direction: 'column',
  padTop: 0,
}, [
  el(Image, {
    src: './logo.png',
    position: 'absolute',
    x: 12,
    y: 12,
    width: 50,
    height: 50,
  }),
  el(View, {
    position: 'absolute',
    fillStyle: '#affeaf',
    x: 0,
    y: height - 200,
    width,
    height: 200,
  }),
  el(Text, {
    fillStyle: '#333',
    font: '28px serif',
    textAlign: 'center',
    grow: 0,
    height: 20,
  }, '走路真的能赚钱!'),
  el(Text, {
    grow: 0,
    fillStyle: '#eee',
    font: '18px serif',
    height: 20,
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
      el(Text, {
        grow: 0,
        height: 42,
        font: '40px serif',
        fillStyle: '#a06c6c',
        textAlign: 'center',
      }, '0.00'),
      el(Text, {
        font: '20px serif',
        fillStyle: '#666',
        textAlign: 'center',
      }, '累计赚钱'),
    ]),
    el('empty', {
      direction: 'column',
    }, [
      el(Text, {
        grow: 0,
        height: 42,
        font: '40px serif',
        fillStyle: '#a06c6c',
        textAlign: 'center',
      }, '0'),
      el(Text, {
        font: '20px serif',
        fillStyle: '#666',
        textAlign: 'center',
      }, '累计赚钱'),
    ]),
    el('empty', {
      direction: 'column',
    }, [
      el(Text, {
        grow: 0,
        height: 42,
        font: '40px serif',
        fillStyle: '#a06c6c',
        textAlign: 'center',
      }, '0'),
      el(Text, {
        font: '20px serif',
        fillStyle: '#666',
        textAlign: 'center',
      }, '参与天数'),
    ]),
  ]),
  el('empty', {
    position: 'absolute',
    width: 420,
    x: width - 200,
    y: height - 420 - 80,
    direction: 'column',
  }, [
    el(View, {
      fillStyle: '#f33',
      height: 24,
    }, [
      el(Text, {
        font: '20px',
        fillStyle: '#a06c6c',
        textAlign: 'center',
      }, '长按识别二维码加入'),
    ]),
    el(View, {
      position: 'absolute',
      fillStyle: '#fff',
      strokeStyle: '#ccc',
      x: width / 2 - 90,
      y: height - 20 - 220,
      width: 180,
      height: 180,
    }),
    el(Qr, {
      position: 'absolute',
      value: 'http://baidu.com',
      level: 3,
      height: 180,
      width: 180,
      x: width / 2 - 90,
      y: height - 20 - 220,
    }),
  ]),

]);


render(ctx, {
  width,
  height,
  ratio: 1,
}, tree, () => {
  // const pngUrl = canvas.toDataURL();
  // console.log('dataUrl', pngUrl);
});


/*
  legacy code
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
