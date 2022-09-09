import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  faCartPlus,
  faCartShopping,
  faHeart,
  faHeartCrack,
  faLock,
  faMapLocationDot,
  faTrash,
  faTruck,
  faUser,
  faUserLarge,
  faUserPen,
  faShirt,
  faUsers,
  faPlus,
  faPen,
  faCoins,
  faHeadset,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import store from './Redux/store';
library.add(
  far,
  faTrash,
  faCartShopping,
  faCartPlus,
  faHeart,
  faUser,
  faLock,
  faUserPen,
  faHeartCrack,
  faTruck,
  faUsers,
  faShirt,
  faUserLarge,
  faMapLocationDot,
  faPlus,
  faPen,
  faCoins,
  faHeadset
);
axios.defaults.baseURL = 'https://react-e8310-default-rtdb.firebaseio.com/';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <ScrollToTop />
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
