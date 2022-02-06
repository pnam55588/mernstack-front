import React, {useEffect} from "react";

import {Switch, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from "./components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from "./pages/user/History";
import UserRoute from "./components/routes/UserRoute";

import {auth} from './firebase'
import {useDispatch} from 'react-redux'
import { currentUser } from "./functions/auth";



const App = () => {
    const dispatch = useDispatch()
    // to check firebase auth state
    useEffect(()=>{
        const unsubcribe = auth.onAuthStateChanged(async (user)=>{
            if(user){
                const idTokenResult = await user.getIdTokenResult()
                currentUser(idTokenResult.token)
                .then((res) =>{
                    // console.log("aaaa", idTokenResult)
                    dispatch({
                        type: 'LOGGED_IN_USER',
                        payload: {
                            name: res.data.name,
                            email: res.data.email,
                            token: idTokenResult.token,
                            role: res.data.role,
                            _id: res.data._id,
                        }
                    })
                })
                .catch(err => console.log(err))
            }
        })
    return () => unsubcribe();
    },[])

    return(
        <>
        <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        <Header/>
        <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/login" component={Login} exact/>
            <Route path="/register" component={Register} exact/>
            <Route path="/register/complete" component={RegisterComplete} exact/>
            <Route path="/forgot/password" component={ForgotPassword} exact/>
            <UserRoute path="/user/history" component={History} exact/>
        </Switch>
        </>
    )
};

export default App;
