import React from 'react'
import FullCalendar from '@fullcalendar/react'
import { DateTime } from "luxon";
import calendarEvents from '../data/calendarEvents';
import CalendarPage from './CalendarPage';
import './CalendarPageContainer.css'

class CalendarPageContainer extends React.Component {

  state = {
    eventsClickedArr: [],
    calendarPageNum: 1,
  }

  // function to prevent autoscroll back to top of calendar after event click
  moveToInWindow = (x, y) => {
    console.log(`moveToInWindow run`);
    window.moveTo(x, y);
  }

  // For some reason, FullCalendar changes timezone from local to GMT, so this function corrects the start time to be what it would in GMT timezone
  formatDate = (timeObj) => {
    console.log(timeObj)
    // start by getting users current timezone
    let newDate = new Date()
    const timeZoneDif = newDate.getTimezoneOffset()
    const timeZoneName = newDate.toString().match(/\(([A-Za-z\s].*)\)/)[1]
    // correct starting timeslot to match with UTC timezone
    let newStart = new Date(timeObj.start)
    newStart.setMinutes(newStart.getMinutes() + timeZoneDif);
    let newStartFormatted = DateTime.fromMillis(newStart.getTime())
    // time slot ends 1 hour after start time
    let newEnd = new Date(newStart)
    newEnd.setMinutes(newEnd.getMinutes() + 60)
    let newEndFormatted = DateTime.fromMillis(newEnd.getTime())
    console.log(newEnd.toUTCString())
    // convert to EST
    let newStart_AmericaNewYork = DateTime.fromMillis(newStart.getTime(), { zone: "America/New_York" });
    let newEnd_AmericaNewYork = DateTime.fromMillis(newEnd.getTime(), { zone: "America/New_York" })
    // get timezone location
    const timeZoneLocation = DateTime.fromMillis(newStart.getTime()).zoneName

    return (
      {
        // originalObj: {start: timeObj.start, end: timeObj.end},
        // dateObj: {start: newStart, end: newEnd},
        local: { start: newStartFormatted.toFormat('ccc MMM dd yyyy TTTT'), end: newEndFormatted.toFormat('ccc MMM dd yyyy TTTT') },
        newYork: { start: newStart_AmericaNewYork.toFormat('ccc MMM dd yyyy TTT'), end: newEnd_AmericaNewYork.toFormat('ccc MMM dd yyyy TTT') },
        time: { start: newStart.getTime(), end: newEnd.getTime() },
        timeZoneLocation: timeZoneLocation,
        timeZoneOffset: timeZoneDif,
        timeZone: timeZoneName
      }
    )
  }

  handleEventClick = (clickInfo) => {
    clickInfo.jsEvent.preventDefault()

    // get the eventId and the timeClicked from the timeslot clicked
    const eventId = clickInfo.event._instance.instanceId
    const timeClicked = clickInfo.event._instance.range
    console.log(timeClicked)

    // then store the timeslot into state
    this.setState(prevState => {
      let eventsClickedArr = [...prevState.eventsClickedArr]
      let matchFound = false
      let matchIndex = ''
      // first check to see if the timeslot has already been clicked
      eventsClickedArr.forEach((item, index) => {
        // ...if it has, get the index of the timeslot in the eventsClickedArr...
        if (item.eventId === eventId) {
          matchFound = true;
          matchIndex = index;
        }
      })
      // ...then remove it from the array, and change its color back to the original blue
      if (matchFound) {
        eventsClickedArr.splice(matchIndex, 1)
        clickInfo.el.style.backgroundColor = 'rgb(55, 136, 216)'
      }
      // if it hasn't been clicked, add it to the array and change its color to green
      else if (matchFound === false) {
        clickInfo.el.style.backgroundColor = 'green'
        let formattedDateObj = this.formatDate(timeClicked)
        console.log(formattedDateObj);
        console.log(typeof formattedDateObj)
        formattedDateObj.eventId = eventId
        eventsClickedArr.push(formattedDateObj)
      }
      // then store the updated eventsClickedArr in state
      return {
        eventsClickedArr
      }
    },
      // callback function that pushes the updated eventsClickedArr up to valueArr stored on the DialogModal component and passed down as props
      () => {
        this.props.onChange(this.state.eventsClickedArr);
        this.moveToInWindow(clickInfo.jsEvent.pageX, clickInfo.jsEvent.pageY);
      }
    )
  }

  handleCalendarPageChange = (num) => {
    console.log(num)
    this.setState(state => {
      let calendarPageNum = state.calendarPageNum;
      if (num === 1 && calendarPageNum < 5) {
        calendarPageNum++
      } else if (num === -1 && calendarPageNum > 1) {
        calendarPageNum--
      }
      return {
        calendarPageNum
      }
    })
  }

  createNewRange = (index) => {
    const rangeObj = { start: calendarEvents[index].start, end: calendarEvents[(index + 15)].start }
    if (index + 15 < 80) {
      return rangeObj
    }
  }

  renderEventContent = eventInfo => {
    return (
      <b>{eventInfo.timeText}</b>
    )
  }

  render() {
    return (
      <div>
        <div>
          <p className='availability-error-msg'>{this.props.error}</p>
        </div>
        {/* map through all of the time slots and create a new page for every 16 events */}
        {calendarEvents.map((item, index) => (
          index <= (calendarEvents.length - 16) ?
            index + 1 === 1 || (index % 16) === 0 ?
              <CalendarPage
                calendarPageNum={this.state.calendarPageNum}
                handleCalendarPageChange={this.handleCalendarPageChange}
                range={this.createNewRange(index)}
                fullRange={{ start: calendarEvents[0].start, end: calendarEvents[calendarEvents.length - 1].start }}
                index={Math.floor((index + 1) / 16)}
                handleEventClick={this.handleEventClick}
                allEvents={calendarEvents}
                slicedEvents={calendarEvents.slice(index, index + 16)}
                renderEventContent={this.renderEventContent} />
              :
              null
            : null
        ))
        }
      </div>
    )
  }
}
export default CalendarPageContainer;