/* eslint-disable react-hooks/exhaustive-deps */
import { Router, Switch, useHistory } from 'react-router-dom';
import { HomeTemplate } from './Templates/HomeTemplate/HomeTemplate';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Detail from './Pages/Detail/Detail';
import CheckOut from './Pages/CheckOut/CheckOut';
import CheckOutTemplate from './Templates/CheckOutTemplate/CheckOutTemplate';
import { UserTempalate } from './Templates/UserTemplate/UserTemplate';
import Loadding from './Components/Loadding/Loadding';
import Profile from './Pages/Proflie/Profile';
import AdminTemplates from './Templates/AdminTemplate/AdminTemplates';
import Film from './Pages/Admin/Films/Film';
import User from './Pages/Admin/User/User';
import AddNew from './Pages/Admin/Films/AddNew/AddNew';
import Edit from './Pages/Admin/Films/Edit/Edit';
import Showtime from './Pages/Admin/Showtime/Showtime';
import AddUser from './Pages/Admin/User/AddNew/AddUser';
import EditUser from './Pages/Admin/User/EditUser/EditUser';
import PageNotFound from './Pages/PageNotFound/PageNotFound'
import { ProfileTemplate } from './Templates/ProfileTemplate/ProfileTemplate';


function App() {

 const history = useHistory();
 
  return (

    <Router history={history}>
      <Loadding />
      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path='/detail/:id' exact Component={Detail} />
        <UserTempalate path='/login' exact history={history} Component={Login} />
        <UserTempalate path='/register' history={history} exact Component={Register} />
        <CheckOutTemplate path='/checkout/:id' history={history} exact Component={CheckOut} />
        <ProfileTemplate history={history} path='/profile' exact Component={Profile} />
        <AdminTemplates history={history} path='/admin/users' exact Component={User} />
        <AdminTemplates history={history} path='/admin/users/addnew' exact Component={AddUser} />
        <AdminTemplates history={history} path='/admin/users/edit/:text' exact Component={EditUser} />
        <AdminTemplates path='/admin/films/addnew' exact Component={AddNew} />
        <AdminTemplates history={history} path='/admin/films' exact Component={Film} />
        <AdminTemplates history={history} path='/admin/films/edit/:id' exact Component={Edit} />
        <AdminTemplates history={history} path='/admin/films/showtime/:id' exact Component={Showtime} />
        <HomeTemplate path="/" exact Component={Home} />
        <PageNotFound path='*' />
      </Switch>
    </Router>
  );
}

export default App;
