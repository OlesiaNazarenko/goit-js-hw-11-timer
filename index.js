class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.refs = {
    timerDays:document.querySelector('[data-value="days"]'),
    timerHours: document.querySelector('[data-value="hours"]'),
    timerMins: document.querySelector('[data-value="mins"]'),
    timerSecs:document.querySelector('[data-value="secs"]'),
    }
}

  time = this.targetDate - Date.now();

  pad(value) {
    return String(value).padStart(2, '0')
  }

 updateTimer(time) {
  const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
  return { days, hours, mins, secs };
}
 updateDate({ days, hours, mins, secs }) {
    this.refs.timerDays.textContent = `${days}`
    this.refs.timerHours.textContent = `${hours}`
    this.refs.timerMins.textContent = `${mins}`
    this.refs.timerSecs.textContent = `${secs}`
  }
  interval() {
   setInterval(()=> {
      this.updateDate(this.updateTimer(this.targetDate - Date.now()))
      }, 1000);
 }  
  
  stopInterval(targetDate) {
    if (!targetDate < Date.now()) {
      clearInterval(this.interval);
      this.refs.timerDays.textContent = 0
      this.refs.timerHours.textContent = 0
      this.refs.timerMins.textContent = 0
      this.refs.timerSecs.textContent = 0
      return;
    }
}
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Dec 10, 2021'),
});
timer.interval(this.updateDate);
timer.stopInterval(this.targetDate);