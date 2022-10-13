import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const dataInput = document.querySelector('#datetime-picker');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

const addLeadingZero = value => {
  return value <= 9 ? `${value}`.padStart(2, '00') : `${value}`.padStart(3);
};

const startCount = function () {
  const convertedDataInput = new Date(dataInput.value).getTime();
  const convertedDataNow = new Date().getTime();
  const timeLeft = convertedDataInput - convertedDataNow;

  if (timeLeft <= 0) {
    clearInterval(1);
    return;
  }

  const timeLeftData = convertMs(timeLeft);

  showTime(timeLeftData);
};

const showTime = ({ days, hours, minutes, seconds }) => {
  dataDays.textContent = addLeadingZero(days);
  dataHours.textContent = addLeadingZero(hours);
  dataMinutes.textContent = addLeadingZero(minutes);
  dataSeconds.textContent = addLeadingZero(seconds);
};

startBtn.addEventListener('click', () => {
  startCount();
  setInterval(() => {
    startCount();
  }, 1000);
});
startBtn.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const dateNow = new Date();
    const dateInput = new Date(selectedDates[0]);

    const convertedDateNow = dateNow.getTime();
    const convertedDateInput = dateInput.getTime();

    if (convertedDateInput < convertedDateNow) {
      startBtn.setAttribute('disabled', '');
      Notify.failure('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
