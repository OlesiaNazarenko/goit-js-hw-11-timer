class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.intervalId = null;
}

  getRefs() {
    const container = document.querySelector(this.selector);
    const days = container.querySelector(' [data-value="days"]');
    const hours = container.querySelector('[data-value="hours"]');
    const mins = container.querySelector('[data-value="mins"]');
    const secs = container.querySelector('[data-value="secs"]');
    return {days, hours, mins, secs}
}
  pad(value) {
    return String(value).padStart(2, '0')
  }
  
  updateDate({ days, hours, mins, secs }) {
  const time = this.targetDate - Date.now();
 
    if (this.targetDate <= Date.now()) {
      clearInterval( this.intervalId);
      days.textContent = '00';
      hours.textContent = '00';
      mins.textContent = '00';
      secs.textContent = '00';
    } else {
        days.textContent = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        hours.textContent = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        mins.textContent = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        secs.textContent = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    }
  }
  interval() {
    this.intervalId = setInterval(()=> {
      this.updateDate(this.getRefs())
      }, 1000);
 }  
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('dec 13, 2021 22:22:00'),
});
timer.interval();