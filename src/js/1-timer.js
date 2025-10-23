//library flatpickr
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
//library izitoast
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
let userSelectedDate = null;
let timer = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  dateFormat: 'Y-m-d H:i',
  minuteIncrement: 1,

  onClose(selectedDates) {
    const picked = selectedDates?.[0];
    if (!picked) return;
    if (picked <= new Date()) {
      userSelectedDate = null;
      startBtn.disabled = true;
      //console.log('Invalid date selected:', picked);
      iziToast.warning({
        title: 'Warning',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    } else {
      userSelectedDate = picked;
      startBtn.disabled = false;
      //console.log('Valid date selected:', picked);
    }
  },
};
flatpickr(dateInput, options);
startBtn.addEventListener('click', () => {
  if (!userSelectedDate) return;

  startBtn.disabled = true;
  dateInput.disabled = true;

  onclick();
  timer = setInterval(onclick, 1000);
});

function onclick() {
  const remainingTime = userSelectedDate - new Date();

  if (remainingTime <= 0) {
    clearInterval(timer);
    updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    dateInput.disabled = false;
    startBtn.disabled = true;
    return;
  }

  updateTimer(convertMs(remainingTime));
}

//
function updateTimer({ days, hours, minutes, seconds }) {
  // console.log(`Update timer ${days} ${hours} ${minutes} ${seconds}`);
  dataDays.textContent = String(days).padStart(2, '0');
  dataHours.textContent = String(hours).padStart(2, '0');
  dataMinutes.textContent = String(minutes).padStart(2, '0');
  dataSeconds.textContent = String(seconds).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
