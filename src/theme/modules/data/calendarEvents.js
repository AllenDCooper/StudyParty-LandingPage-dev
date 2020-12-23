// function that will build for us a new date object based on some future day (dayChange) and some hour (hourNum) on that day
const getNewDate = (dayChange, dateName, hourNum) => {
  var date = new Date();
  date.setDate(date.getDate() + dayChange)
  date.setUTCHours(hourNum, 0, 0, 0);
  return { title: date.getTime(), start: date }
}

// function that builds an array of time slots for a given date range (tomorrow is equivalent to firstDay === 1) and hour range (UTC)
const buildDateArr = (firstDay, lastDay, firstHour, lastHour) => {
  let dateArr = [];
  // first loop through days we want to create time slots for
  for (let i = firstDay; i <= lastDay; i++) {
    // then loop through the hours we want to create time slots for, in UTC time: 
    for (let v = firstHour; v <= lastHour; v++) {
      var dateName = `${i}-${v}`
      // build a new date object for each timeslot and push into dateArr
      dateArr.push(getNewDate(i, dateName, v))
    }
  }
  console.log(dateArr)
  return dateArr
}

// build array of time slots 1 to 5 days out, with each day having time slots that start at 13:00UTC/08:00AM-EST through 28:00UTC/11:00PM-EST each day
const calendarEvents = buildDateArr(1, 5, 13, 28);

export default calendarEvents;