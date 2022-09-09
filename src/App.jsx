import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import AdminPage from './Page/AdminPage';
import CartPage from './Page/CartPage';
import CheckoutPage from './Page/CheckoutPage';
import HomePage from './Page/HomePage';
import LoginPage from './Page/LoginPage';
import NotFound from './Page/NotFound';
import ProductDetailPage from './Page/ProductDetailPage';
import ProductsPage from './Page/ProductsPage';
import UserPage from './Page/UserPage';
import { itemsActions } from './Redux/items';
import { syncUser } from './Redux/user';
import './scss/App.scss';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get('items.json')
      .then((res) => dispatch(itemsActions.firstFetch(res.data)));
  }, [dispatch]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const localId = useSelector((store) => store.auth.localId);
  useEffect(() => {
    dispatch(syncUser(localId));
  }, [dispatch, localId]);
  const isAdmin = useSelector((state) => state.user.isAdmin);

  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/home" />
      </Route>
      <Route path="/home" exact>
        <HomePage></HomePage>
      </Route>
      <Route path="/products" exact>
        <ProductsPage></ProductsPage>
      </Route>
      <Route path="/products/:productId" exact>
        <ProductDetailPage></ProductDetailPage>
      </Route>
      <Route path="/user" exact>
        {isLoggedIn ? (
          <Redirect to="/user/profile" />
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route path="/user/:mode">
        {isLoggedIn ? <UserPage></UserPage> : <Redirect to="/login" />}
      </Route>
      <Route path="/admin" exact>
        {isAdmin ? <Redirect to="/admin/orders" /> : <Redirect to="/user" />}
      </Route>
      <Route path="/admin/:mode">
        {isAdmin ? <AdminPage></AdminPage> : <Redirect to="/user" />}
      </Route>
      <Route path="/login" exact>
        {isLoggedIn ? <Redirect to="/user" /> : <LoginPage></LoginPage>}
      </Route>
      <Route path="/cart" exact>
        {isLoggedIn ? <CartPage></CartPage> : <Redirect to="/login" />}
      </Route>
      <Route path="/admin">
        {isAdmin ? <AdminPage></AdminPage> : <Redirect to="/user" />}
      </Route>
      <Route path="/checkout">
        {isLoggedIn ? <CheckoutPage /> : <Redirect to="/login" />}
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;
