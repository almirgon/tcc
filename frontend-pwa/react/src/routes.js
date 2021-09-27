import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import ForgotPassword from "./pages/ForgotPassword";
import AdminApproval from "./pages/AdminApproval";
import SharePromotion from "./pages/SharePromotion";
import Admin from "./pages/Admin"
import Promotion from "./pages/Promotion";
import { GlobalContext } from './hooks/GlobalContext';

const PrivateRoute = ({ component, path, redirect, exact }) => {

  const context = useContext(GlobalContext)
  const {authorized,admin} = context;
  const redirectPath = redirect ?? '/login'

  return authorized && !admin ? (<Route path={path} component={component} exact={exact} />) : (<Redirect  to={redirectPath}/>);
}


const AdminRoute = ({ component, path, redirect, exact }) => {

  const context = useContext(GlobalContext)
  const {authorized,admin} = context;
  const redirectPath = redirect ?? '/login'

  return authorized && admin ? (<Route path={path} component={component} exact={exact} />) : (<Redirect  to={redirectPath}/>);
}

export default function RoutesManager(){

  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login} />
        <Route path="/forgot" component={ForgotPassword} />
        <AdminRoute path="/admin" component={Admin} />
        <AdminRoute path="/admin-approval/:id" component={AdminApproval} />
        <PrivateRoute path="/share-promotion" component={SharePromotion}/>
        <Route path="/promotion/:id" component={Promotion}/>
        <Route path="*" component={NotFound}/>
      </Switch>
    </div>
  )
}