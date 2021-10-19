import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Footer from '../Footer/Footer';



import './Destination.css'

const Destination = () => {
    const {id} = useParams();


    const [datas, setData] = useState([]);
    useEffect ( () => {
        fetch('https://api.jsonbin.io/b/616e791caa02be1d445b7842')
        .then(res => res.json())
        .then(data => setData(data))
    }, [])
    console.log(datas);
  return (
  
        <div className='container py-3'>
            {
                datas.map(data => data.id ==  id ?  <div> <div className=' d-flex justify-content-center p-2'>
                
                    <div style = {{height: '100%'}} className='card text-center border '>
                        <h1 className="text-center"><img
                            className='card-img-top p-5 w-25' 
                            src={data.image}
                        /></h1>
                        <div className='card-title'>
                            <h5 className='text-dark text-uppercase  '>{data.services}</h5>
                            
                            <p>{data.desc}</p>
                            
                            <p>{data.capacity}</p>
                            
                            <h5>{data.capacity}</h5>
                        </div>
                    </div>
                
            </div> </div> : <div></div>  )
            }


<Footer></Footer>

        </div>
    );
};

export default Destination;