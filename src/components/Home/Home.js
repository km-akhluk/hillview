import React, { useEffect, useState } from 'react';

// import { Link } from 'react-router-dom';

import './Home.css';

import Vehicle from '../Vehicle/Vehicle';
import vehicles from '../../Data/Data.json'

const Home = () => {

    const [ride, setRide] = useState([]);
    useEffect(() =>{
        setRide(vehicles)

    }, [])

    return (

       
        <div className = "custom-bg py-5 home">
            <div>
            <div className="row d-flex align-items-center d-flex justify-content-center  ms-5  ">
                <div className="col-lg-7">
                  <img src="https://cdn-icons-png.flaticon.com/512/822/822163.png" className="d-block w-50 ms-5" alt="..."/>
                </div>
                <div className="col-lg-5  pt-3"> 
                    <h1 >Hill View Hospital</h1>
                    <h1 >and Diagnostic Ceter</h1>
                    <p>Best Hospital in the town</p>
                    <button className="btn btn-danger">
                      Check in
                    </button>
  
                  </div>
            </div> <br /> <br />
            <div className='container'>
             
            <div className='row'>
                {ride.map((vehicle) => (
                    <Vehicle key={vehicle.id} vehicle={vehicle}></Vehicle>
                ))}
            </div>
        </div>
     </div>
     
     {/* footer */}
     <footer>
      <div className="footer-box container bg-info text-center text-white pb-2 pt-5 mt-5" >
          <div className="social-icon">
          <h5>
          <i className="fab fa-instagram p-2"></i>
          <i className="fab fa-facebook p-2"></i>
          <i className="fab fa-youtube p-2"></i>
          <i className="fab fa-linkedin p-2"></i>
          </h5>
        </div>
        <h4><img src="https://cdn.shopify.com/s/files/1/0320/8714/6541/files/SSLCommerz-Pay-With-logo-All-Size-01.png?v=1591818826" className="w-50" alt="" /></h4>
        <h5 className="pt-2">&copy; All Rights Reserved by    HVH LTD</h5>
      </div>
    </footer>






     </div>
    );
};

export default Home;