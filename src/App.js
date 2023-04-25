import { createBrowserHistory } from 'history';
import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import CustomerHome from './view/CustomerHome.js';
import RankHome from './view/RankHome.js';

import Home from "./view/Home.js";
import AlertPopup from './component/common/Arlert.js';
import VoucherHome from './view/VoucherHome.js';
import TransactionHome from './view/TransactionHome.js';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import CheckoutHome from './view/CheckoutHome.js';


const App = () => {
    
    return(
        <Router history={createBrowserHistory()}>
          <Routes>
            <Route path="/" element={<TransactionHome />}/>
            <Route path="/dashBoard" element={<AlertPopup />, <Home />} />
            <Route path="/customerHome" element={<CustomerHome />} />
            <Route path="/rankHome" element={<RankHome />} />
            <Route path="/voucherHome" element={<VoucherHome /> } />
            <Route path="/checkoutAlternative" element={<CheckoutHome /> } />
          </Routes>
        </Router>
    )
}

export default App;