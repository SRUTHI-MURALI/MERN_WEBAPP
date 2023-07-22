import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import Store from './Store/Store.js'
import { Provider } from 'react-redux'
import {createBrowserRouter,createRoutesFromElements,RouterProvider,Route} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import HomeScreen from './Screens/homeScreen.jsx'
import LoginScreen from './Screens/LoginScreen.jsx'
import RegisterScreen from './Screens/RegisterScreen.jsx'
import PrivateRoute from './components/Private/PrivateRoute.jsx'
import ProfileScreen from './Screens/ProfileScreen.jsx'
import AdminLogin from './Screens/Admin/adminLoginScreen.jsx'

const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen/>}/>
      <Route  path='/login' element={<LoginScreen/>}/>
      <Route  path='/register' element={<RegisterScreen/>}/>
      <Route path='' element={<PrivateRoute/>}>
        <Route  path='/profile' element={<ProfileScreen/>}/>
      </Route>
      <Route  path='/adminLogin' element={<AdminLogin/>}/>
   
    </Route>
    
      
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={Store}>
    <React.StrictMode>
      <RouterProvider router = { router } />
    </React.StrictMode>,
  </Provider>

)
