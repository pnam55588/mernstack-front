import React, { useState, useEffect} from "react";
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { signInWithEmailAndPassword, 
        signInWithPopup, GoogleAuthProvider} 
        from 'firebase/auth'
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom"
import {createOrUpadateUser} from "../../functions/auth"

const provider = new GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
auth.languageCode = 'it';
provider.setCustomParameters({
    'login_hint': "pnam55588@gmail.com"
});

const Login = ({ history }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    let dispatch = useDispatch()
    const {user} = useSelector((state) => ({...state}))

    const roleBaseRedirect = (res) =>{
        if(res.data.role ==='admin'){
            history.push("/admin/dashboard")
        }else {
            history.push("/user/history")
        }
    }

    useEffect(()=> {
        if(user && user.token)
            history.push("/")
    },[user])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            const { user } = result
            const idTokenResult = await user.getIdTokenResult()

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
                    roleBaseRedirect(res)
                })
                .catch((err) => console.log(err))
            // history.push('/')
        } catch (error) {
            toast.error(error.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setLoading(false)
        }
    }
    const googleLogin = async () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {

                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                const idTokenResult = await user.getIdTokenResult()
                // console.log(idTokenResult)
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
                    roleBaseRedirect(res)
                })
                .catch()
                // history.push("/")
            })
            .catch((err) => {
                console.log(err)
                toast.error(err.message, {
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
    const loginForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="email" className="form-control"
                        value={email}
                        onChange={
                            (e) => setEmail(e.target.value)
                        }
                        placeholder="Your email"
                        autoFocus
                    />
                </div>

                <div className="form-group">
                    <input type="password" className="form-control"
                        value={password}
                        onChange={
                            (e) => setPassword(e.target.value)
                        }
                        placeholder="Your password"
                    />
                </div>
                <br />
                <Button
                    onClick={handleSubmit}
                    type="primary"
                    className="mb-3"
                    block
                    shape="round"
                    icon={<MailOutlined />}
                    size="large"
                    disabled={!email || password.length < 6}
                >
                    Login with Email/Password
                </Button>
            </form>
        )
    }
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? <h4 className="text-danger">Loading...</h4> : <h4 >Login</h4>}
                    {loginForm()}
                    <Button
                        onClick={googleLogin}
                        type="danger"
                        className="mb-3"
                        block
                        shape="round"
                        icon={<GoogleOutlined />}
                        size="large"
                    >
                        Login with Google
                    </Button>

                    <Link to = "/forgot/password" className="text-danger float-right">
                        Forgot Password
                    </Link>
                </div>
            </div>
        </div>
    )

}

export default Login;
