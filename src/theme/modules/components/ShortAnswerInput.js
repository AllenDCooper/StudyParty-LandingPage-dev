import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from './Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, FormHelperText } from '@material-ui/core'

const styles = (theme) => ({
  button: {
    minWidth: 200,
  },
});

function ShortAnswerInput(props) {
  console.log(props)
  const { classes } = props;

  // destructure question object from props
  const { questionName, questionText } = props.questionObj;
  const questionErrorMessage1 = props.questionObj.questionErrorMessage[0];
  const questionErrorMessage2 = props.questionObj.questionErrorMessage[1]

  const questionNum = props.index + 1;

  // hooks
  const [nameValue, setNameValue] = useState(null);
  const [emailValue, setEmailValue] = useState(null);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    console.log(event.target.name)
    if (event.target.name === 'name') {
      setNameValue(event.target.value)
    }
    else {
      setEmailValue(event.target.value)
    }
  }

  const validateEmail = (emailTest) => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailTest)) {
      return (true)
    }
    return (false)
  }

  const updateValueArr = () => {
    const arr = props.valueArr;
    const nameAndEmail = { name: nameValue, email: emailValue }
    arr[props.index] = nameAndEmail;
    props.setValueArr(arr);
  }

  const checkSubmit = () => {
    if (nameValue && validateEmail(emailValue)) {
      setError(false);
      setErrorMessage("");
      updateValueArr();
      props.handleSubmit();
    } else if (!nameValue && validateEmail(emailValue)) {
      setError(true);
      setErrorMessage(questionErrorMessage1);
    } else if (nameValue && !validateEmail(emailValue)) {
      setError(true);
      setErrorMessage(questionErrorMessage2);
    } else {
      setError(true);
      setErrorMessage(`${questionErrorMessage1}. ${questionErrorMessage2}`)
    }
  }

  const handleNext = () => {
    if (nameValue && validateEmail(emailValue)) {
      setError(false);
      setErrorMessage("");
      updateValueArr();
      props.setShow(props.show + 1)
    } else if (!nameValue && validateEmail(emailValue)) {
      setError(true);
      setErrorMessage(questionErrorMessage1);
    } else if (nameValue && !validateEmail(emailValue)) {
      setError(true);
      setErrorMessage(questionErrorMessage2);
    } else {
      setError(true);
      setErrorMessage(`${questionErrorMessage1}. ${questionErrorMessage2}`)
    }
  }

  const handleBack = () => {
    setNameValue("");
    setEmailValue("");
    setError(false);
    setErrorMessage("");
    props.setShow(props.show - 1)
  }

  return (
    <>
      <Dialog
        open={props.show === questionNum}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={'sm'}
        transitionDuration={400}
      >
        <DialogTitle id="form-dialog-title">Sign up!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {questionText}
          </DialogContentText>
          <TextField
            style={{ width: '100%', color: 'black', margin: '0 auto 20px auto' }}
            type="text"
            id={questionName[0]}
            name={questionName[0]}
            label={questionName[0]}
            variant="outlined"
            value={nameValue}
            onChange={handleChange}
            error={errorMessage}
          />
          <TextField
            style={{ width: '100%', color: 'black', margin: '0 auto' }}
            type="text"
            id={questionName[1]}
            name={questionName[1]}
            label={questionName[1]}
            variant="outlined"
            value={emailValue}
            onChange={handleChange}
            error={errorMessage}
          />
          {error ?
            <FormHelperText id="helper-text" style={{ marginTop: '20px', color: 'red' }} >{errorMessage}</FormHelperText>
            : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBack} color="primary">
            Back
          </Button>
          {props.index === (props.questionArrLength - 1) ?
            <Button onClick={checkSubmit}>
              Submit
          </Button>
            :
            <Button onClick={handleNext} color="primary">
              Next
          </Button>}
        </DialogActions>
      </Dialog>
    </>
  )
}

ShortAnswerInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShortAnswerInput);