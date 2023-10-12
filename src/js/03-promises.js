function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position: position, delay: delay });
      } else {
        reject({ position: position, delay: delay, error: true });
      }
    }, delay);
  });
}

document.querySelector('.form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const delay = Number(event.target.elements.delay.value);
  const step = Number(event.target.elements.step.value);
  const amount = Number(event.target.elements.amount.value);
  
  for (let i = 1; i <= amount; i++) {
    try {
      await createPromise(i, delay + step * (i - 1));
      Notiflix.Notify.success(`✅ Fulfilled promise ${i} in ${delay + step * (i - 1)}ms`);
    } catch ({ position, delay, error }) {
      if (error) {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }
  }
});
