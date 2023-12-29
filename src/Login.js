import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login=()=>{
const[username,usernameupdate]=useState("");
const[password,passwordupdate]=useState("");

const navigate=useNavigate();

useEffect(()=>{
    sessionStorage.clear();
},[]);

const ProceedLogin=(e)=>{
    e.preventDefault();
    if (validate()) {
        ///implentation
        console.log('proceed');
        fetch("http://localhost:8000/user/" + username).then((res) => {
            return res.json();
        }).then((resp) => {
            console.log(resp)
            if (Object.keys(resp).length === 0) {
                toast.error('Please Enter valid username');
            } else {
                if (resp.password === password && resp.role==='Passenger') {
                    toast.success('Success');
                    sessionStorage.setItem('username',username);
                    navigate('/')
                }else if(resp.password === password && resp.role==='Driver'){
                    toast.success('Success');
                    sessionStorage.setItem('username',username);
                    navigate('/driver')

                }
                else{
                    toast.error('Please Enter valid credentials');
                }
            }
        }).catch((err) => {
            toast.error('Login Failed due to :' + err.message);
        });
    }
}
const validate = () => {
    let result = true;
    if (username === '' || username === null) {
        result = false;
        toast.warning('Please Enter Username');
    }
    if (password === '' || password === null) {
        result = false;
        toast.warning('Please Enter Password');
    }
    return result;
}

    return(
        <div>
            <div className="header">
                <Link to={'/'}>Home</Link>
                {/* <Link style={{ float: 'right' }} to={'/login'}>  Logout</Link> |
                <Link to={'/'}>  About Us</Link>
                <Link style={{ float: 'right' }} to={'/'}>Ride History  |</Link>
                <Link style={{ float: 'right' }} to={'/'}>Profile  |</Link> */}
            </div>
        
        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form onSubmit={ProceedLogin} className="container">
                    <div className="card">
                        <div className="card-header">
                        <h2>Continue to Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>User name<span className="errmsg">*</span></label>
                                <input value={username} onChange={e=>usernameupdate(e.target.value)} type='email' className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Password<span className="errmsg">*</span></label>
                                <input value={password} onChange={e=>passwordupdate(e.target.value)} type='password' className="form-control"></input>
                            </div>

                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Login</button> | 
                            <Link className="btn btn-success" to={'/register'}> New User</Link>

                        </div>
                    </div>
                </form>
            </div>
            
        </div>

        </div>
        
    );
}

export default Login;