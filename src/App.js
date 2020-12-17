import logo from './logo.svg';
import './App.css';
import Home from './theme/Home';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="App">
        <Home />
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default App;
