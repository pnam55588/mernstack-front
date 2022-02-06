import React, { useState, useEffect } from "react";
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import {updatePassword} from "firebase/auth"
import { signInWithEmailLink } from 'firebase/auth'
import { useDispatch, useSelector} from "react-redux";
import axios from "axios"

const createOrUpadateUser = async(authtoken)=>{
    return await axios.post(
        `${process.env.REACT_APP_API}/create-or-update-user`, 
        {}, 
        {
        headers: {
            authtoken,
        }
    })
}

const RegisterComplete = ({history}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let dispatch = useDispatch()


    useEffect(() =>{
        setEmail(window.localStorage.getItem("emailForRegistration"))
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // validation
        if(!email || !password){
            toast.error('Email and password is required')
            return
        }
        if(password.length < 6){
            toast.error("Password must e at least 6 charaters long", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            return
        }

        try {
            const result = await signInWithEmailLink(auth, email, window.location.href)
            if(result.user.emailVerified){
                // remove user from local storage
                window.localStorage.removeItem("emailForRegistration")
                // get user id token
                let user = auth.currentUser
                await updatePassword(user, password)
                const idTokenResult = await user.getIdTokenResult()
                // redux store
                console.log('user', user, 'idTokenResult', idTokenResult)
               
                createOrUpadateUser(idTokenResult.token)
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
                .catch((err) => console.log(err))
                // redirect
                history.push('/')

            }
        } catch (error){
            toast.error(error.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    }
    const completeRegistrationForm = () => {
        return (
            <form onSubmit={handleSubmit} >
                <input type="email" className="form-control" value={email} disabled />
                <input type="password" className="form-control" value={password} onChange= {(e) => setPassword(e.target.value)} placeholder='Password' autoFocus />
                <br/>
                <button type="submit" className="btn btn-raised">
                    Complete Registration / {email} 
                </button>
            </form>
        )
    }       
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register Complete</h4>
                    {completeRegistrationForm()}
                </div>
            </div>
        </div>
    )

}

export default RegisterComplete;