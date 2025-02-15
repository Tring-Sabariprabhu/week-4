import logo from './logo.svg';
import './App.css';
import { Home } from './Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EditPage } from './EditPage';
function App() {
  return (
    <>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */} 
      {/* <SamplePersona/> */}
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit" element={<EditPage />} />
          </Routes>
      </Router>
      
    </>
  );
}

export default App;
