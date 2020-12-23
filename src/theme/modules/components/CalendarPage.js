import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import './CalendarPage.css';

const CalendarPage = (props) => {
  console.log(`props.index: ${props.index + 1}`)
  console.log(`props.calendarPageNum: ${props.calendarPageNum}`)

  const renderButtons = (calendarPageNum) => {
    if (window.innerWidth <= 740) {
      if (calendarPageNum === 1) {
        return { start: false, center: 'title', end: 'nextButton' }
      } else if (calendarPageNum === 5) {
        return { start: 'backButton', center: 'title', end: false }
      } else {
        return { start: 'backButton', center: 'title', end: 'nextButton' }
      }
    } else {
      return ({ start: false, center: 'title', end: false })
    }
  }

  return (
    <div className='demo-app' style={props.calendarPageNum === (props.index + 1) ? { display: 'inherit' } : { display: 'none' }}>
      <div style={{marginBottom: '20px'}}>{`All times are ${new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1]}`}</div>
      <div>{props.error ? props.error : null}</div>
      <div className='demo-app-main'>
        <FullCalendar
          contentHeight={window.innerWidth <= 740 ? 1100: 800}
          timeZone='local'
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={renderButtons(props.calendarPageNum)}
          initialView='timeGrid'
          editable={false}
          selectable={false}
          selectMirror={true}
          allDaySlot={false}
          allDayMaintainDuration={true}
          // these buttons appear on the mobile view to navigate to the next or previous calendar page
          customButtons={{
            nextButton: {
              text: <span>&gt;</span>,
              click: () => props.handleCalendarPageChange(1)
            },
            backButton: {
              text: <span>&lt;</span>,
              click: () => props.handleCalendarPageChange(-1)
            }
          }
          }
          visibleRange={window.innerWidth <= 740 ? props.range : props.fullRange}
          initialEvents={window.innerWidth <= 740 ? props.slicedEvents : props.allEvents}
          eventContent={props.renderEventContent} // custom render function
          eventClick={props.handleEventClick}
        />
      </div>
    </div>
  )
}

export default CalendarPage;