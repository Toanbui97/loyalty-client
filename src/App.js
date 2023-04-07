import { createBrowserHistory } from 'history';
import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import CustomerHome from './view/CustomerHome.js';

import Home from "./view/Home.js";

const App = () => {
    
    return(
        <Router history={createBrowserHistory()}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/customerHome" element={<CustomerHome />} />
          </Routes>
        </Router>
    )
}

export default App;