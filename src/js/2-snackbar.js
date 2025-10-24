import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('.form');

const makePromise = (delay, state) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        return resolve(delay);
      } else {
        return reject(delay);
      }
    }, delay);
  });
};

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = form.elements.delay.value;
  const state = form.elements.state.value;

  makePromise(delay, state)
    .then(delay => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
});
