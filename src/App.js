
import './App.css';
import Login from './Components/Login/Login';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Register from './Components/Register/Register';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Mainpage from './Components/Mainpage/Mainpage';
import Addstudent from './Components/Addstudent/Addstudent';
import Edit from './Components/Edit/Edit';

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/dashboard/:id" element={<Mainpage/>}/>
    <Route path="/Addstudent/:id" element={<Addstudent/>}/>
    <Route path="Edit/:id" element={<Edit/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
