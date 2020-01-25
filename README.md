### Time Slicing
A simple trick to slice long-run task and run it in background.

### Example
Sync way:
```js
const button = document.querySelector('#button');

document.addEventListener('mousemove', ({ pageX, pageY }) => {
  button.style.top = `${pageY}px`;
  button.style.left = `${pageX}px`;
});

setTimeout(() => {
  for(let i = 0; i < 1000000; i++) {
    button.innerHTML = i;
  }
}, 1000);
```

"Async" way:
```js
const button = document.querySelector('#button');

document.addEventListener('mousemove', ({ pageX, pageY }) => {
  button.style.top = `${pageY}px`;
  button.style.left = `${pageX}px`;
})

window.requestIdleCallback(
  timeSlicing(
    // 这里相当于把这个 for 循环分割成了 1000000 个任务
    function*() {
      for(let i = 0; i < 1000000; i++) {
        yield;
        button.innerHTML = i;
      }
    }
  )
);
```