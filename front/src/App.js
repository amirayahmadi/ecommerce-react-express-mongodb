import React from 'react';
import Footer from './layouts/Footer';
import Navbar from './layouts/Navbar';
import Input from './components/Input';
import Button from './components/Button';
import Authentication from './views/Authentication';
import ForgetPassword from './views/ForgetPassword';
import ResetPassword from './views/ResetPassword';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Home from './views/Home';
import Profile from './views/Profile';
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import Dashboard from './views/Admin/Dashboard';
import Users from './views/Admin/Users';
import Categories from './views/Admin/Categories';
import Products from './views/Admin/Products';
import Orders from './views/Admin/Orders';
import Shop from './views/Shop';
import 'antd/dist/antd.css';
import Cart from './views/Cart';
function App() {
  return (
    <>

      <Router>
        <Navbar />
        <Switch>
          <PublicRoute restricted={true} path='/authentication' component={Authentication} />
          <PublicRoute restricted={true} path='/forget' component={ForgetPassword} />
          <PublicRoute restricted={false} path='/cart' component={Cart} />
          <PublicRoute restricted={true} path='/reset/:token' component={ResetPassword} />
          <PrivateRoute roles={['client', 'livreur', 'admin']} path='/profile' component={Profile} />
          <PrivateRoute roles={['admin']} path='/dashboard' component={Dashboard} />
          <PrivateRoute roles={['admin']} path='/users' component={Users} />
          <PrivateRoute roles={['admin']} path='/categories' component={Categories} />
          <PrivateRoute roles={['admin']} path='/products' component={Products} />
          <PrivateRoute roles={['admin', 'client', 'livreur']} path='/orders' component={Orders} />
          <PublicRoute restricted={false} path='/shop' component={Shop} />
          <PublicRoute restricted={false} path='/' component={Home} />
        </Switch>
        <Footer />
      </Router>


    </>
  );
}

export default App;