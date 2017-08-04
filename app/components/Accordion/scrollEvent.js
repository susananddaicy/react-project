export default function (fn) {
  window.addEventListener('scroll', (e) => {
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(() => {
        fn(e);
      });
    } else {
      fn(e);
    }
  });
}
