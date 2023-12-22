import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateEmployee from './CreateEmployees';
import Employee from './Employees';
import UpdateEmployee from './UpdateEmployeeModal';
import MailingPage from './MailingPage';
import Nav from "./components/Nav";


const App = () => {
  
 
  
  

   return (
    <div className="App">
    <BrowserRouter>
      {/* Use the Routes component to define your routes */}
      <Routes>
       
        
        
        <Route path='/employees' element={<Employee />}></Route>
        <Route path='/create' element={<CreateEmployee />}></Route>
        <Route path='/update/:id' element={<UpdateEmployee />}></Route>
        <Route path="/mailing" element={<MailingPage />} />
      </Routes>

      <Nav />

      
    </BrowserRouter>
  </div>
  );
}

export default App;
