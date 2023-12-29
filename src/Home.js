import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./App.css";
import Book from "./Book";

const Home = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(-1);
    const [selectedRoweta, setSelectedRoweta] = useState();
    const [sourcelocation, setSourcelocation] = useState("");
    const [destination, setDestination] = useState("");
    const [showPopUp, setShowPopUp] = useState(false);
    
    const searchride = (e) => {
        e.preventDefault();

        if (validate()) {
            console.log('proceed');
            console.log(sourcelocation)
            fetch(`http://localhost:8000/drivers`)
                .then((response) => response.json())
                .then((actualData) => {
                    console.log(actualData);
                    var count=0;
                    for(let i=0;i<actualData.length;i++){
                    if(actualData[i].id!==sourcelocation){
                        count+=1;
                        
                    }
                    if(count===actualData.length){
                        toast.warning("Sorry! No driver found, Please try again later");

                    }
                    }
                    
                    setData(actualData);
                    //console.log(data);

                })
                .catch((err) => {
                    console.log(err.message);
                });

        }

    }

    const showPopupHandler = () => {
        setShowPopUp(true);
        timerRef.current = setTimeout(() =>{
            setShowPopUp(false);
             alert('Driver arrived')}, selectedRoweta);
    }

    function validate() {
        let result = true;
        if (sourcelocation === '' || sourcelocation === null) {
            result = false;
            toast.warning('Please Enter pickup location');
        }
        if (destination === '' || destination === null) {
            result = false;
            toast.warning('Please Enter drop location');
        }
        return result;
    }


    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if (username === "" || username === null) {
            navigate('/login');
        }
    }, [navigate])

const timerRef=useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timerRef.current);
        
        }
    },[]);

  

    let popup = null;
         
    if (showPopUp) {
        popup = <div>
            
            <h4><i>Driver on the way. would reach approximately in : {Math.round(selectedRoweta/60000)}mins</i></h4>
            <p>Ride booked successfully.You can cancel the ride anytime before driver arrives</p>
            <button type="button" onClick={()=>{setSelectedRow(-1);
                                            setShowPopUp(false)   }}>cancel</button>
            
        </div>;
    }

    
    return (
        <div>
            <div className="header">
                <Link to={'/'}>Home</Link>
                <Link style={{ float: 'right' }} to={'/login'}>  Logout</Link> |
                <Link to={'/'}>  About Us</Link>
                <Link style={{ float: 'right' }} to={'/'}>Ride History  |</Link>
                <Link style={{ float: 'right' }} to={'/'}>Profile  |</Link>
            </div>


            <h1 className="text-center">Welcome to Rideshare</h1>
            
            <form className="container" onSubmit={searchride}>
                {/* <div className="row"> */}
                <div className="col-lg-6">

                    <div className="card">
                        <div className="card-header">
                        <Book/>  
                        </div> 
                        <div className="card-body">
                            <div className="form-group">
                                <label>Enter Pickup location</label>
                                <input type='text' value={sourcelocation} onChange={e => setSourcelocation(e.target.value)} className="form-control"></input>
                                                           
                               
    
                            </div>
                            <div className="form-group">
                                <label>Enter drop location</label>
                                <input type='text' value={destination} onChange={e => setDestination(e.target.value)} className="form-control"></input>
                            </div>

                        </div>

                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">search ride</button>
                        </div>

                    </div>
                </div>
            </form>

            <div className="col-lg-2"></div>
            <div className="confirmride">

                <h5>Driver details</h5>

                <table id="table1">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>License</th>
                            <th>phonenumber</th>
                            <th>ETA in mins</th>
                            <th>fare</th>
                        </tr>
                        {data.map((item, index) =>
                            item.id === sourcelocation ? (
                                <tr key={index} onClick={() => {

                                    setSelectedRow(item.License);
                                    setSelectedRoweta(item.ETA);
                                    console.log("driver selected" + item.name);

                                }}
                                    className={"clickable-row ".concat(selectedRow === item.License ? "selected" : "")}
                                >
                                    <td>{item.name}</td>
                                    <td>{item.License}</td>
                                    <td>{item.phonenumber}</td>
                                    <td>{Math.round(item.ETA/60000)}</td>
                                    <td>{item.fare}</td>
                                   

                                </tr>
                            ) : null)}


                    </tbody>

                    

                </table>
               
                

                {selectedRow!== -1 && (
                    <div> {popup}
                    <button id="confirmride" onClick={showPopupHandler}>confirm ride</button>
                    </div>
                )}

                <Link className="btn btn-success" style={{ float: 'right' }} to={'/feedback'}>Provide feedback</Link>
                
            </div>


        </div>






    );
}

export default Home;