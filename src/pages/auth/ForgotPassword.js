import React, { useEffect, useState } from "react";
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { useSelector } from "react-redux";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = ({history}) => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const {user} = useSelector((state) => ({...state}))

    useEffect(()=> {
        if(user && user.token)
            history.push("/")
    },[user])

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        
        await sendPasswordResetEmail(auth, email) 
        .then (()=>{
            setEmail('')
            setLoading(false)
            toast.success('Check your email for password reset link', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
        .catch((error)=>{
            setLoading(false)
            toast.error(error.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    }

    return (
        <div className="container col-md-6 offset-md-3 p-5">
            {loading ? (
                <h4 className="text-danger">Loading</h4>
            ) : (
                <h4>Forgot Password</h4>
            )}
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        className="form-control" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                    />
                    <br />
                    <button className="btn bnt-raised" disabled={!email}>
                        submit
                    </button>
                </form>
        </div>
    )
}
export default ForgotPassword