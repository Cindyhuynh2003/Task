import './App.css';
import Home from './pages/Home';
import Product from './pages/Product'
import User from './pages/User'
import { Routes, Route, Link } from 'react-router-dom'
import AddUser from './todo/AddUser';
import EditUser from './todo/EditUser';
import Category from './pages/Category';
import AddCat from './todo/AddCat'
import EditCat from './todo/EditCat'
import EditPro from './todo/EditPro'
import AddPro from './todo/AddPro'
import LoginFrom from './auth/LoginFrom';
import RegistrationForm from './auth/RegistrationForm';
import Shop from './pages/Shop';
import View from './pages/View';
function App() {
  return (
    <>

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/shop' element={<Shop />}></Route>
        <Route path='/view/:id' element={<View />}></Route>
        <Route path='/category' element={<Category />}></Route>
        <Route path='/addcat' element={<AddCat />}></Route>
        <Route path='/editcat/:id' element={<EditCat />}></Route>
        <Route path='/product' element={<Product />}></Route>
        <Route path='/addpro' element={<AddPro />}></Route>
        <Route path='/editpro/:id' element={<EditPro />}></Route>
        <Route path='/user' element={<User />}></Route>
        <Route path='/adduser' element={<AddUser />}></Route>
        <Route path='/edituser/:id' element={<EditUser />}></Route>
        <Route path='/login' element={<LoginFrom />}></Route>
        <Route path='/signup' element={<RegistrationForm />}></Route>
      </Routes>
    </>

  );
}



export default App;
