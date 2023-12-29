import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Register = () => {
  const [id, idchange] = useState("");
  const [firstname, firstnamechange] = useState("");
  const [lastname, lastnamechange] = useState("");
  const [password, passwordchange] = useState("");
  const [Phone, phonechange] = useState("");
  const [role, rolechange] = useState("Passenger");
  const [licencenumber, licencenumberchange] = useState("Passenger");

  const navigate = useNavigate();

  const isValidate = () => {
    let isproceed = true;
    let errormessage = "Please enter the value in ";
    
  if (firstname === null || firstname === '') {
      isproceed = false;
      errormessage += ' Firstname';
  }
  if (password === null || password === '') {
      isproceed = false;
      errormessage += ' Password';
  }
  if (id === null || id === '') {
      isproceed = false;
      errormessage += ' Email';
  }

  if(!isproceed){
      toast.warning(errormessage)
  }else{
      if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(id)){

      }else{
          isproceed = false;
          toast.warning('Please enter the valid email')
      }
  }
    return isproceed;
  }

  const handlesubmit = (e) => {
    
      e.preventDefault();
      let regobj = { id, firstname, lastname, password, Phone, role };
      if (isValidate()) {
      //console.log(regobj);
      fetch("http://localhost:8000/user", {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(regobj)
      }).then((res) => {
        toast.success("sign up successful")
        navigate('/login');
      }).catch((err) => {
        toast.error('failed to sign up due to' + err.message);
      });
    }

  }
  return (
    <div>
      <div className="header">
                <Link to={'/'}>Home</Link>
                
            </div>
      <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={handlesubmit}>
          <div className="card">
            <div className="card-header">
              <h2>Welcome! Sign Up as a new User</h2>

            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>First Name<span className="errmsg">*</span></label>
                    <input value={firstname} onChange={e => firstnamechange(e.target.value)} className="form-control"></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Last Name</label>
                    <input value={lastname} onChange={e => lastnamechange(e.target.value)} className="form-control"></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Password<span className="errmsg">*</span></label>
                    <input type="password" value={password} onChange={e => passwordchange(e.target.value)} className="form-control"></input>
                    {password.trim().length > 0 && (
                      <div>
                        {password.trim().length < 8 && (
                          <ul>
                            <li>
                              Password length should be at least 8 characters
                              long
                            </li>
                            <li>
                            Password should contain at least one uppercase
                              letter
                            </li>
                          </ul>
                        )}
                        {!/[A-Z]/.test(password) && (
                          <ul>
                            <li>
                              Password should contain at least one uppercase
                              letter
                            </li>
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Email<span className="errmsg">*</span></label>
                    <input value={id} onChange={e => idchange(e.target.value)} type="email" className="form-control"></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Phone number<span className="errmsg">*</span></label>
                    <input value={Phone} onChange={e => phonechange(e.target.value)} className="form-control"></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    
                      <label>Role:</label>
                      <select value={role} onChange={(e) => rolechange (e.target.value)} className="form-control">
                        <option value="passenger">Passenger</option>
                        <option value="Driver">Driver</option>
                      </select>
                    </div>
                    {role === "Driver" && (
                      <div>
                        <label>
                          License Number<span className="errmsg">*</span>
                        </label>
                        <input
                          value={licencenumber}
                          onChange={(e) => licencenumberchange (e.target.value)}
                          type="text"
                          className="form-control"
                        ></input>
                      </div>
                    )}
                 
                </div>
              </div>

            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">Sign Up</button>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
}

export default Register;