import logo from './logo.svg';
import './App.css';
import { Personas } from './Personas';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { EditPage } from './EditPage';
import { Home } from './Home';
import LoginForm from './Loginform';
import SignupForm from './SignupForm';

function App() {
  
  return (
    <>
    
      <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/persona" element={<Personas />} />
            <Route path="/editpage/:status" element={<EditPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<SignupForm />} />
          </Routes>
      </Router>
        
    </>
  );
}

export default App;
