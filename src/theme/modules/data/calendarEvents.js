const getNewDate = (dayChange, dateName, hourNum) => {
  var date = new Date();
  date.setDate(date.getDate() + dayChange)
  date.setUTCHours(hourNum, 0, 0, 0);
  return { title: `${dateName}`, start: date }
}

const buildDateArr = () => {
  let dateArr = [];
  for (let i = 1; i < 6; i++) {
    for (let v = 13; v < 29; v++) {
      var dateName = `${i}-${v}`
      console.log(JSON.stringify(getNewDate(i, dateName, v)))
      dateArr.push(getNewDate(i, dateName, v))
    }
  }
  console.log(dateArr)
  return dateArr
}

const calendarEvents = buildDateArr();

export default calendarEvents;