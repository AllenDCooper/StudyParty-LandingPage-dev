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

  handleEventClick = (clickInfo) => {
    clickInfo.jsEvent.preventDefault()

    // toggle the background color on event click
    clickInfo.el.style.backgroundColor === 'green' ? clickInfo.el.style.backgroundColor = 'rgb(55, 136, 216)' : clickInfo.el.style.backgroundColor = 'green'

    // get the title of the timeslot clicked; the title is the start time in UTC milliseconds
    console.log(clickInfo.event._def.title);
    const dateInMS = parseInt(clickInfo.event._def.title)

    // then store the timeslot into state
    this.setState(prevState => {
      let eventsClickedArr = [...prevState.eventsClickedArr]
      let matchFound = false
      let matchIndex = ''
      // first check to see if the timeslot has already been clicked
      eventsClickedArr.forEach((item, index) => {
        // ...if it has, get the index of the timeslot in the eventsClickedArr...
        if (dateInMS === item) {
          matchFound = true;
          matchIndex = index;
        }
      })
      // ...then remove it from the array
      if (matchFound) {
        eventsClickedArr.splice(matchIndex, 1)
      }
      // if it hasn't been clicked, add it to the array
      else if (matchFound === false) {
        clickInfo.el.style.backgroundColor = 'green'
        eventsClickedArr.push(dateInMS)
      }
      return {
        eventsClickedArr
      }
    },
      // callback function that pushes the updated eventsClickedArr up to valueArr stored on the DialogModal component and passed down as props
      () => {
        this.props.onChange(this.state.eventsClickedArr);
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