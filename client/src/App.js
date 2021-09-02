import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './page/Auth/Login';
import Register from './page/Auth/Register';
import Home from './page/Home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import PrivateRoute from './components/privateRoute/PrivateRoute';
import Dashboard from './user/Dashboard';
import DashboardSeller from './user/DashboardSeller';
import NewHotel from './page/hotel/NewHotel';
import StripeCallback from './stripe/StripeCallback';
import EditHotel from './page/hotel/EditHotel';
import HotelDetails from './page/hotel/HotelDetails';
import StripeSuccess from './stripe/StripeSuccess';
import StripeFailed from './stripe/StripeFailed';
import SearchResultPage from './page/hotel/SearchResultPage';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/hotel/edit/:hotelId" component={EditHotel} />
        <Route exact path="/hotel/:hotelId" component={HotelDetails} />
        <Route exact path="/search-result" component={SearchResultPage} />
        
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/dashboard/seller" component={DashboardSeller} />
        <PrivateRoute exact path="/hotels/new" component={NewHotel} />
        <PrivateRoute exact path="/stripe/callback" component={StripeCallback} />
        <PrivateRoute exact path="/stripe/success/:hotelId" component={StripeSuccess} />
        <PrivateRoute exact path="/stripe/cancel" component={StripeFailed} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
