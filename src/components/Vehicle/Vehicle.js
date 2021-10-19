import React from 'react';
import { Link } from 'react-router-dom';

const Vehicle = (props) => {
    const {id, services, image, desc} = props.vehicle;
    return (
        <div className='col-md-3 col-sm-1 p-2'>
            <Link to={`/destination/${id}`}>
                <div style = {{height: '100%'}} className='card text-center bg-info custom-card'>
                    <img
                        className='card-img-top p-5'
                        src={image}
                        alt={services}
                    />
                    <div className='card-title'>
                        <h5 className='text-light text-uppercase  '>{services}</h5>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Vehicle;