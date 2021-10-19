import React, { useContext } from 'react';
// import { Col, Container, Nav, Row } from 'react-bootstrap';
// import Navbar from 'react-bootstrap/Navbar';
import './Header.css';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {

    const [signInUser, setSignInUser]   =  useContext(UserContext);
    const history = useHistory();
    const login = () =>{
        history.push('/login');
    }
    return (

        <div>

        <nav className='navbar navbar-expand-lg navbar-light bg-info '>
                <div className='container'>
                    <Link to='/' className='navbar-brand fs-3 text-uppercase text-white'>Hill View Clinic BD</Link>
                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                        <ul className='navbar-nav ml-auto mb-2 mb-lg-0'>
                            <li className='nav-item px-3 pt-2 mod'>
                                <Link to='/home' className='nav-link active text-white' >Home</Link>
                            </li>
                            <li className='nav-item px-3 pt-2 mod'>
                                <Link to='/home' className='nav-link active text-white'>Services</Link>
                            </li>
                            <li className='nav-item px-3 pt-2 mod'>
                                <Link to='/contact' className='nav-link active text-white'>Contact</Link>
                            </li>                    
                        {
                            (signInUser?.email) ? 
                            <li className="nav-item px-3 pt-2">
                            <p className='nav-link active text-center'>
                            {signInUser.displayName}
                            </p> 
                            </li> : ''
                        }
                        {
                             (signInUser?.email)? <button style={{height: '50px'}} onClick={()=>setSignInUser({})} className="btn btn-danger nav-link active text-white">LOGOUT</button> : <button style = {{height: '45px'}} onClick={login} className="btn btn-primary nav-link active text-white text-center">LOGIN</button>
                        }

                        </ul>

                    </div>
                </div>
            </nav>


        </div>


    );
};

export default Header;