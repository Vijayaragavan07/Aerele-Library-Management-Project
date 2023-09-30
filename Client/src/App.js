import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from './Components/HomePage/HomePage';
import { AdminLogin } from './Components/Admin/AdminLogin/AdminLogin';
import { AdminSignup } from './Components/Admin/AdminSignup/AdminSignup';
import { AdminDashboard } from './Components/Admin/AdminDashboard/AdminDashboard';
import { ViewBookdetails } from './Components/Admin/AdminDashboard/ViewBookdetails';
import { Update } from './Components/Admin/AdminDashboard/Update';
import { Viewuserdetails } from './Components/Admin/UserDetails/Viewuserdetails';
import { Transaction } from './Components/Admin/AdminDashboard/Transaction';
import { UpdateUser } from './Components/Admin/UserDetails/UpdateUserdetails';
import { Demo } from './Components/Admin/AdminDashboard/demo';
import { Transactiondetails } from './Components/Admin/AdminDashboard/TransactionDetails';
function App(){
    return(
        <>
        <BrowserRouter>
        <Routes>
            <Route path='/' element={[<HomePage/>]}/>
            <Route path='/adminlogin' element={[<AdminLogin/>]}/>
            <Route path='/adminsignuppage' element={[<AdminSignup/>]}/>
            <Route path='/admindashboard/:id' element={[<AdminDashboard/>]}/>
            <Route path='/admindashboard' element={[<AdminDashboard/>]}/>
            <Route path='/viewbookdetails' element={[<ViewBookdetails/>]}/>
            <Route path='/update/:book_id' element={[<Update/>]}/>
            <Route path='/viewuserdetails' element={[<Viewuserdetails/>]}/>
            <Route path='/transaction' element={[<Transaction/>]}/>
            <Route path='/updateuser/:member_id' element={[<UpdateUser/>]}/>
            <Route path='/demo' element={[<Demo/>]}/>
            <Route path='/transactiondetails' element={[<Transactiondetails/>]}/>
        </Routes>
        </BrowserRouter>
        </>
    );
}
export default App;

