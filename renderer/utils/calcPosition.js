/*
  - parentStyle caclulated style of parentStyle
  - currentProp props contained style defination
  - return calculated current style
*/
export default function calcPosition(parentStyle, currentProp) {
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