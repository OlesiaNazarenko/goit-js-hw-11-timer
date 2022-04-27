class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.intervalId = null;
  }

  getRefs() {
    const container = document.querySelector(this.selector);
    const month = container.querySelector(' [data-value="month"]');
    const days = container.querySelector(' [data-value="days"]');
    const hours = container.querySelector('[data-value="hours"]');
    const mins = container.querySelector('[data-value="mins"]');
    const secs = container.querySelector('[data-value="secs"]');
    return { month, days, hours, mins, secs };
  }
  pad(value) {
    return String(value).padStart(2, "0");
  }

  updateDate({ month, days, hours, mins, secs }) {
    const time = new Date();
    month.textContent = time.getMonth() - this.targetDate.getMonth();
    days.textContent = this.pad(
      this.pad(time.getDate() - this.targetDate.getDate())
    );
    hours.textContent = this.pad(time.getHours() - this.targetDate.getHours());
    mins.textContent = this.pad(
      (time.getMinutes() + (60 - this.targetDate.getMinutes())) % 60
    );
    secs.textContent = this.pad(Math.floor((time % (1000 * 60)) / 1000));
  }

  interval() {
    this.intervalId = setInterval(() => {
      this.updateDate(this.getRefs());
    }, 1000);
  }
}

const timer = new CountdownTimer({
  selector: "#timer-2",
  targetDate: new Date("feb 24, 2022 03:40:00"),
});
timer.interval();
