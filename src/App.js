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

const App = () => {
    
    return(
        <Router history={createBrowserHistory()}>
          <Routes>
            <Route path="/" element={<AlertPopup />, <Home />} />
            <Route path="/customerHome" element={<CustomerHome />} />
            <Route path="/rankHome" element={<RankHome />} />
            <Route path="/voucherHome" element={<VoucherHome /> } />
          </Routes>
        </Router>
    )
}

export default App;