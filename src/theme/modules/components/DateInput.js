import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from './Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormHelperText } from '@material-ui/core'
import { DatePicker } from "@material-ui/pickers";

const styles = (theme) => ({
  button: {
    minWidth: 200,
  },
});

function DateInput(props) {
  const { classes } = props;

  // destructure question object from props
  const { questionName, questionText, questionErrorMessage } = props.questionObj;

  const questionNum = props.index + 1;

  // hooks
  const [value, setValue] = useState(new Date());
  const [error, setError] = useState("null");
  const [errorMessage, setErrorMessage] = useState("");

  const curDate = new Date();

  const getFutureDate = () => {
    const curDateCopy = new Date();
    curDateCopy.setMonth(curDateCopy.getMonth() + 12);
    return curDateCopy
  };

  const updateValueArr = () => {
    const arr = props.valueArr;
    arr[props.index] = value;
    props.setValueArr(arr);
  }

  const handleNext = () => {
    if (value) {
      setError(false);
      setErrorMessage("");
      updateValueArr();
      props.setShow(props.show + 1)
    } else {
      setError(true);
      setErrorMessage(questionErrorMessage);
    };
  };

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
          <form className={classes.container} noValidate>
            <DatePicker
              views={["year", "month"]}
              label="Year and Month"
              // helperText="With min and max"
              minDate={curDate}
              maxDate={getFutureDate()}
              value={value}
              onChange={setValue}
            />
          </form>
          {error ?
            <FormHelperText id="helper-text" style={{ marginTop: '20px', color: 'red' }} >{errorMessage}</FormHelperText>
            : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBack} color="primary">
            Back
          </Button>
          {props.index === props.questionArrLength ?
          <Button onClick={props.handleSubmit}>
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

DateInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DateInput);