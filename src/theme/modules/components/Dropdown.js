import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from './Button';
import { Select, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormHelperText } from '@material-ui/core'

const styles = (theme) => ({
  button: {
    minWidth: 200,
  },
});

function Dropdown(props) {
  console.log(props);
  const { classes } = props;

  // destructure question object from props
  const { questionName, questionText, answerOptionsArr, questionErrorMessage } = props.questionObj;

  const questionNum = props.index + 1;

  // hooks
  const [value, setValue] = useState("");
  const [error, setError] = useState("null");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value)
  };

  const updateValueArr = () => {
    const arr = props.valueArr;
    arr[props.index] = value;
    console.log(arr);
    props.setValueArr(arr);
  }

  const handleNext = () => {
    if (value) {
      setError(false);
      setErrorMessage("");
      updateValueArr();
      props.setShow(props.show + 1);
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
          <Select
            aria-label="test-type"
            name="test-type"
            style={{ width: '100%' }}
            onChange={handleChange}
            value={value}>
            {answerOptionsArr.map(item =>
              <MenuItem value={item}>{item}</MenuItem>
            )}
          </Select>
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

Dropdown.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dropdown);