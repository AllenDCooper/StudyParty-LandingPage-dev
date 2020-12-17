import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import './CalendarView.css';

const CalendarView = (props) => {
  console.log(`props.index: ${props.index + 1}`)
  console.log(`props.calendarNum: ${props.calendarNum}`)

  const renderButtons = (calendarNum) => {
    if (window.innerWidth <= 740) {
      if (calendarNum === 1) {
        return { start: false, center: 'title', end: 'nextButton' }
      } else if (calendarNum === 5) {
        return { start: 'backButton', center: 'title', end: false }
      } else {
        return { start: 'backButton', center: 'title', end: 'nextButton' }
      }
    } else {
      return ({ start: false, center: 'title', end: false })
    }
  }

  return (
    <div className='demo-app' style={props.calendarNum === (props.index + 1) ? { display: 'inherit' } : { display: 'none' }}>
      <div style={{marginBottom: '20px'}}>{`All times are ${new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1]}`}</div>
      <div>{props.error ? props.error : null}</div>
      <div className='demo-app-main'>
        <FullCalendar
          contentHeight={800}
          timeZone='local'
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={renderButtons(props.calendarNum)}
          initialView='timeGrid'
          editable={false}
          selectable={false}
          selectMirror={true}
          // dayMaxEvents={true}
          allDaySlot={false}
          allDayMaintainDuration={true}
          // slotMinTime={'06:00:00'}
          // slotMaxTime={'24:00:00'}
          customButtons={{
            nextButton: {
              text: <span>&gt;</span>,
              click: () => props.handleRangeChange(1)
            },
            backButton: {
              text: <span>&lt;</span>,
              click: () => props.handleRangeChange(-1)
            }
          }
          }
          visibleRange={window.innerWidth <= 740 ? props.range : props.fullRange}
          initialEvents={window.innerWidth <= 740 ? props.slicedEvents : props.allEvents}
          eventContent={props.renderEventContent} // custom render function
          eventClick={props.handleEventClick}
          eventsSet={props.handleEvents} // called after events are initialized/added/changed/removed
        />
      </div>
    </div>
  )
}

export default CalendarView;