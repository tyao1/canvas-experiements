export default class Task { // 用来判断加载完成
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