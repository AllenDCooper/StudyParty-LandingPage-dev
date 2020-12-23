import React, { useState } from 'react';
import { DateTime } from "luxon";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress } from '@material-ui/core'
import axios from 'axios';
// import components
import Button from './Button';
import Dropdown from './Dropdown';
import EmailInput from './EmailInput';
import DateInput from './DateInput';
import ShortAnswerInput from './ShortAnswerInput';
import CalendarInput from './CalendarInput';
// import question data
import questionArr from '../data/questionArr';

const styles = (theme) => ({
  button: {
    minWidth: 200,
  },
});

function DialogModal(props) {

  console.log(questionArr);
  const { classes } = props;

  // Instantiates an array to capture answers and to be stored in state
  const initialValueArr = questionArr.map((item) => {
    const name = item.name;
    const newObj = {}
    newObj[name] = null
    return newObj
  })

  // Hooks
  const [valueArr, setValueArr] = useState(initialValueArr);
  const [responseRecieved, setResponseRecieved] = useState(false);
  const [emailResponseReceived, setEmailResponseRecieved] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleClose = () => {
    props.setShow(0);
  };

  const formatDateArr = (availabilityArr, timeType) => {
    // put array in ascending order to make it easier to read 
    availabilityArr.sort(function (a, b) { return a - b })
    // format time based on various format
    switch (timeType) {
      case "newYork":
        let availabilityArr_EST = []
        availabilityArr.forEach((timeslot, index) => {
          let newStart_AmericaNewYork = DateTime.fromMillis(parseInt(timeslot), { zone: "America/New_York" });
          availabilityArr_EST.push(newStart_AmericaNewYork.toFormat('ccc MMM dd yyyy T ZZZZ'))
        })
        return (availabilityArr_EST)
      case "local":
        let availabilityArr_Local = []
        availabilityArr.forEach((timeslot, index) => {
          let newStart_Local = DateTime.fromMillis(parseInt(timeslot))
          availabilityArr_Local.push(newStart_Local.toFormat('ccc MMM dd yyyy T ZZZZ'))
        })
        return (availabilityArr_Local)
      case "time":
        return (availabilityArr)
    }
  }

  const getTimeZone = (timeZoneType) => {
    let newDate = new Date()
    switch (timeZoneType) {
      case "timeZoneName":
        return newDate.toString().match(/\(([A-Za-z\s].*)\)/)[1]
      case "timeZoneOffset":
        return newDate.getTimezoneOffset()
      case "timeZoneLocation":
        return DateTime.fromMillis(newDate.getTime()).zoneName
      case "currentMoment":
        let currentNYTime = DateTime.fromMillis(newDate.getTime(), { zone: "America/New_York" })
        return (currentNYTime.toFormat('ccc MMM dd yyyy T ZZZZ'))
    }
  }

  // send user name and email address to server to generate automated email
  const sendToServer = (valueArr) => {
    const [testDate, groupSize, testPrep, targetScore, targetSection, availability, nameAndEmail] = valueArr
    axios.post("https://studyparty-server.herokuapp.com/api/signup", {
      email: nameAndEmail.email,
      name: nameAndEmail.name,
      availabilityArr: formatDateArr(availability, "time"),
      timeZone: getTimeZone("timeZoneName"),
      timeZoneLocation: getTimeZone("timeZoneLocation"),
      timeZoneOffset: getTimeZone("timeZoneOffset")
    },
      {
        headers:
          { 'Access-Control-Allow-Origin': '*' }
      }
    )
      .then(response => {
        console.log("email sent")
        console.log(response.data);
        setEmailResponseRecieved(true);
      })
      .catch(error => {
        console.log(error);
        setEmailResponseRecieved(true);
        setSubmitError(true);
      });
  }

  // Sends data to populate Google Sheet
  const sendToGoogleForms = (valueArr) => {
    console.log(valueArr)
    props.setShow(props.show + 1);
    const [testDate, groupSize, testPrep, targetScore, targetSection, availability, nameAndEmail] = valueArr

    const url = 'https://script.google.com/macros/s/AKfycbxSQuoJeJTkKolxST5eVJrBi3MrNUebPlZi6tGQzmll34dl1HE/exec'
    axios.get(url, {
      params: {
        submitted: getTimeZone("currentMoment"),
        email: nameAndEmail.email,
        name: nameAndEmail.name,
        // testType: testType,
        testDateMonth: testDate.getMonth() + 1,
        testDateYear: testDate.getFullYear(),
        availabilityEST: JSON.stringify(formatDateArr(availability, "newYork")),
        availabilityLocal: JSON.stringify(formatDateArr(availability, "local")),
        availabilityTime: JSON.stringify(formatDateArr(availability, "time")),
        testPrep: testPrep,
        groupSize: groupSize,
        targetScore: targetScore,
        targetSection: targetSection,
        timeZone: getTimeZone("timeZoneName"),
        timeZoneLocation: getTimeZone("timeZoneLocation"),
        timeZoneOffset: getTimeZone("timeZoneOffset")
      }
    })
      .then(function (response) {
        setResponseRecieved(true);
        console.log("submitted");
        console.log(response)
      })
      .catch(function (error) {
        setSubmitError(true);
        console.log(error)
      })
  }

  const handleSubmit = () => {
    console.log(valueArr)
    sendToServer(valueArr);
    sendToGoogleForms(valueArr);
  }

  return (
    <>
      {/* Autogenerate form from question array */}
      {questionArr.map((item, index) =>
        item.questionType === 'dropdown' ?
          <Dropdown
            questionObj={item}
            valueArr={valueArr}
            setValueArr={setValueArr}
            show={props.show}
            setShow={props.setShow}
            index={index}
            questionArrLength={questionArr.length}
            handleSubmit={handleSubmit}
            handleClose={handleClose} />
          :
          item.questionType === 'emailInput' ?
            <EmailInput
              questionObj={item}
              valueArr={valueArr}
              setValueArr={setValueArr}
              show={props.show}
              setShow={props.setShow}
              index={index}
              questionArrLength={questionArr.length}
              handleSubmit={handleSubmit}
              handleClose={handleClose} />
            :
            item.questionType === 'dateSelect' ?
              <DateInput
                questionObj={item}
                valueArr={valueArr}
                setValueArr={setValueArr}
                show={props.show}
                setShow={props.setShow}
                index={index}
                questionArrLength={questionArr.length}
                handleSubmit={handleSubmit}
                handleClose={handleClose} />
              :
              item.questionType === 'multipleShortAnswer' ?
                <ShortAnswerInput
                  questionObj={item}
                  valueArr={valueArr}
                  setValueArr={setValueArr}
                  show={props.show}
                  setShow={props.setShow}
                  index={index}
                  questionArrLength={questionArr.length}
                  handleSubmit={handleSubmit}
                  handleClose={handleClose} />
                :
                item.questionType === 'calendar' ?
                  <CalendarInput
                    questionObj={item}
                    valueArr={valueArr}
                    setValueArr={setValueArr}
                    show={props.show}
                    setShow={props.setShow}
                    index={index}
                    questionArrLength={questionArr.length}
                    handleSubmit={handleSubmit}
                    handleClose={handleClose} />
                  :
                  null
      )}

      {/* Display upon submission */}
      <Dialog
        open={props.show === (questionArr.length + 1)}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={'sm'}
      // transitionDuration={400}
      >
        {!responseRecieved || !emailResponseReceived ?
          <DialogContentText
            style={{
              textAlign: 'center',
              height: '250px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <CircularProgress />
          </DialogContentText>
          :
          <>
            <DialogTitle id="form-dialog-title">Thank you!</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {!submitError ?
                  `Thanks for signing up! We'll be in touch soon.`
                  :
                  `There was an error. Please try again.`
                }
                <br></br><br></br>Cheers,<br></br>Team StudyParty
          </DialogContentText>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Back to Home
          </Button>
              </DialogActions>
            </DialogContent>
          </>
        }
      </Dialog>
    </>
  )
}

DialogModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DialogModal);