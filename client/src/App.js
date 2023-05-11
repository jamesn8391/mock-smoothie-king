import React from 'react';
import './App.css';
import MainNavbar from './components/main_navbar';
import ManagerNavbar from './components/manager_navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Drinks from './pages/drinks';
import Checkout from './pages/checkout';
import Server from './pages/Server';
import CustomerView from './pages/CustomerView';
import SalesReport from './pages/salesReport'
import XReport from './pages/xzReport';
import InventoryView from './pages/inventoryView';
import Success from './pages/success';
import RestockReport from './pages/restockReport';
import ExcessReport from './pages/excessReport';

function App() {
return (
    <Router>  
    <Routes>
        <Route path='/' element={<><MainNavbar/><CustomerView/></>} />
        <Route path='/CustomerView' element={<><MainNavbar/><CustomerView/></>} />
        <Route path='/drinks' element={<><MainNavbar/><Drinks/></>} />
        <Route path='/checkout' element={<><MainNavbar/><Checkout/></>} />
        <Route path='/Server' element={<><MainNavbar/><Server/></>} />
        <Route path = '/salesReport' element={<><ManagerNavbar/><SalesReport/></>} />
        <Route path = '/xzReport' element={<><ManagerNavbar/><XReport/></>} />
        <Route path = '/restockReport' element={<><ManagerNavbar/><RestockReport/></>} />
        <Route path = '/excessReport' element={<><ManagerNavbar/><ExcessReport/></>} />
        <Route path = '/inventoryView' element={<><ManagerNavbar/><InventoryView/></>} />
        <Route path = '/success' element={<><MainNavbar/><Success/></>} />
    </Routes>
    </Router>
);
}
  
export default App;