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

function EmailInput(props) {
  console.log(props)
  const { classes } = props;

  // destructure question object from props
  const { questionName, questionText, questionErrorMessage } = props.questionObj;

  const questionNum = props.index + 1;

  // hooks
  const [value, setValue] = useState("");
  const [error, setError] = useState("null");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value)
    console.log(value)
  }

  const validateEmail = (emailTest) => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailTest)) {
      return (true)
    }
    return (false)
  }

  const updateValueArr = () => {
    const arr = props.valueArr;
    arr[props.index] = value;
    props.setValueArr(arr);
  }

  const handleNext = () => {
    if (validateEmail(value)) {
      setError(false);
      setErrorMessage("");
      updateValueArr();
      props.setShow(props.show + 1)
    } else {
      setError(true);
      setErrorMessage(questionErrorMessage)
    }
  }

  const handleBack = () => {
    setValue("");
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
            style={{ width: '100%', color: 'black', margin: '0 auto' }}
            type="text"
            id="email"
            name="email"
            label="email address"
            variant="outlined"
            value={value}
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
            <Button onClick={() => { updateValueArr(); props.handleSubmit() }}>
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

EmailInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmailInput);