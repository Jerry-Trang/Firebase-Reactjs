import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css';
import Write from './components/Write'
import Read from './components/Read';
import UpdateRead from './components/UpdateRead';
import UpdateWrite from './components/UpdateWrite';





function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Write />}/>
          <Route path='/Write' element={<Write />}/>
          <Route path='/Read' element={<Read />}/>
          <Route path='/UpdateRead' element={<UpdateRead />}/>
          <Route path='/UpdateWrite:firebaseID' element={<UpdateWrite />}/>

        </Routes> 
      </Router>
      {/* <DatePicker /> */}
    </div>
  );
}

export default App;
