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
    function monthDiff(startDate, endDate) {
      let months;
      months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
      months -= startDate.getMonth() + 1;
      months += endDate.getMonth();
      if (endDate.getDate() >= startDate.getDate()) months++;
      return months <= 0 ? 0 : months;
    }
    function daysInMonth(date) {
      return new Date(date.getYear(), date.getMonth() + 1, 0).getDate();
    }
    function getDaysAsResult(startDate, endDate) {
      let days = 0;
      if (
        daysInMonth(endDate) >= 30 &&
        endDate.getDate() > startDate.getDate()
      ) {
        days = endDate.getDate() - startDate.getDate();
      }
      if (daysInMonth(time) === 30 && endDate.getDate() < startDate.getDate()) {
        days = 7 + endDate.getDate();
      }
      if (daysInMonth(time) === 31 && endDate.getDate() < startDate.getDate()) {
        days = 6 + endDate.getDate();
      }
      return days;
    }
    function getHoursAsResult(startDate, endDate) {
      let hours = 0;
      if (endDate.getHours() === startDate.getHours()) {
        hours = 0;
      }
      if (endDate.getHours() > startDate.getHours()) {
        hours = endDate.getHours() - startDate.getHours();
      }
      if (
        endDate.getHours() >= 0 &&
        endDate.getHours() < startDate.getHours()
      ) {
        hours = endDate.getHours() + (24 - startDate.getHours());
      }
      return hours;
    }

    secs.textContent = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    mins.textContent = this.pad(
      (time.getMinutes() + (60 - this.targetDate.getMinutes())) % 60
    );
    hours.textContent = this.pad(getHoursAsResult(this.targetDate, time));
    days.textContent = this.pad(getDaysAsResult(this.targetDate, time));
    month.textContent = this.pad(monthDiff(this.targetDate, time));
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
