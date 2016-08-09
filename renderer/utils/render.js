export default function render() {
  const ctx = document.getElementById('main').getContext('2d');
  ctx.font = '48px serif';
  ctx.fillText('Hello world', 8, 4);
  ctx.fillText('Hello world', 3, 5);
  ctx.fillText('Hello world', 5, 7);
}
