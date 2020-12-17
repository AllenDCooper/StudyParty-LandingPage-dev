import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import calendarEvents from '../data/calendarEvents';
import CalendarView from './CalendarView';
import './CalendarSelect.css'

class CalendarSelect extends React.Component {

  state = {
    eventsClickedArr: [],
    fullRange: {},
    calendarNum: 1,
    events: calendarEvents,
  }

  componentDidMount() {
    this.getVisibleRange();
  }

  buildRanges = (eventArr) => {
    eventArr.map((item, index) => {
      let eventNum = index + 1
      let eventArr = []
      if (eventNum === 1 || eventNum % 16 === 0) {
        eventArr.push(item)
      }
      return eventArr
    })
  }


  getVisibleRange = () => {
    const startDate = calendarEvents[0].start;
    const mobileEndDate = calendarEvents[15].start
    const normalEndDate = calendarEvents[79].start;
    if (window.innerWidth <= 740) {
      this.setState({
        fullRange: {
          start: startDate,
          end: mobileEndDate
        }
      })
    } else {
      this.setState({
        fullRange: {
          start: startDate,
          end: normalEndDate
        }
      })
    }
  }

  toggleStyle = (element) => {
    element.style.backgroundColor === 'green' ? element.style.backgroundColor = '#3788d8' : element.style.backgroundColor = 'green'
  }

  moveToInWindow = (x, y) => {
    console.log(`moveToInWindow run`);
    window.moveTo(x, y);
  }

  handleEventClick = (clickInfo) => {
    clickInfo.jsEvent.preventDefault()
    console.log(clickInfo.view.type)
    console.log(clickInfo.jsEvent.pageY)

    const eventId = clickInfo.event._instance.instanceId
    const timeClicked = clickInfo.event._instance.range
    console.log(`timeClicked: ${JSON.stringify(timeClicked)}`);
    this.props.onChange(timeClicked);

    this.setState(prevState => {
      let eventsClickedArr = [...prevState.eventsClickedArr]
      let matchFound = false
      let matchIndex = ''
      eventsClickedArr.forEach((item, index) => {
        if (item.eventId === eventId) {
          matchFound = true;
          matchIndex = index;
        }
      })
      if (matchFound) {
        eventsClickedArr.splice(matchIndex, 1)
        clickInfo.el.style.backgroundColor = 'rgb(55, 136, 216)'
      } else if (matchFound === false
        // && eventsClickedArr.length < 3
        ) {
        clickInfo.el.style.backgroundColor = 'green'
        let dateObj = { eventId: eventId, timeClicked: timeClicked }
        eventsClickedArr.push(dateObj)
      }
      return {
        eventsClickedArr
      }
    },
      () => {
        this.props.onChange(this.state.eventsClickedArr);
        this.moveToInWindow(clickInfo.jsEvent.pageX, clickInfo.jsEvent.pageY);
      }
    )
  }

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

  handleRangeChange = (num) => {
    console.log(num)
    this.setState(state => {
      let calendarNum = state.calendarNum;
      if (num === 1 && calendarNum < 5) {
        calendarNum++
      } else if (num === -1 && calendarNum > 1) {
        calendarNum--
      }
      return {
        calendarNum
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
      <>
        <b>{eventInfo.timeText}</b>
      </>
    )
  }

  renderSidebarEvent = event => {
    return (
      <b>{formatDate(event, { year: 'numeric', month: 'short', day: 'numeric', timeZoneName: 'short', timeZone: 'local' })}</b>
    )
  }

  render() {
    return (
      <div>
        <div className='demo-app-sidebar-section'>
          <p className='availability-error-msg'>{this.props.error}</p>
        </div>
        {this.state.events.map((item, index) => (
          index < 65 ?
            index + 1 === 1 || (index % 16) === 0 ?
              <CalendarView
                calendarNum={this.state.calendarNum}
                handleRangeChange={this.handleRangeChange}
                range={this.createNewRange(index)}
                fullRange={this.state.fullRange}
                index={Math.floor((index + 1) / 16)}
                handleEventClick={this.handleEventClick}
                handleEvents={this.handleEvents}
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

export default CalendarSelect;