// import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('.form');
const inputDeley = document.querySelector('[name="delay"]');
const inputStep = document.querySelector('[name="step"]');
const inputAmount = document.querySelector('[name="amount"]');

form.addEventListener('submit', sbmHandler);

let data = null;

function sbmHandler(event) {
  event.preventDefault();

  const baseStep = +inputStep.value;
  const deley = +inputDeley.value;
  const amount = +inputAmount.value;

  setTimeout(() => {
    for (let i = 0; i < amount; i++) {
      createPromise(i + 1, deley + baseStep * i)
        .then(({ position, step }) => {
          console.log(`✅ Fulfilled promise ${position} in ${step}ms`);
          Notify.success(`✅ Fulfilled promise ${position} in ${step}ms`);
        })
        .catch(({ position, step }) => {
          console.log(`❌ Rejected promise ${position} in ${step}ms`);
          Notify.failure(`❌ Rejected promise ${position} in ${step}ms`);
        });
    }
  }, deley);
}

function createPromise(position, step) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (Math.random() > 0.3) res({ position, step });
      else rej({ position, step });
    }, step);
  });
}
