import React from 'react';
import { useNavigate } from 'react-router-dom';
import ParticlesBg from 'particles-bg';

function Start() {
  const navigate = useNavigate();

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
       <ParticlesBg type="cobweb" bg={true} />
      <div className='p-3 rounded loginForm text-center'>
      <marquee behavior="alternate"><h2 className='mb-5'>Login As</h2></marquee>
        <div className='d-flex flex-column'>
          <button
            className='btn btn-primary btn-lg mb-3'
            onClick={() => navigate('/employeeLogin')}
          >
            Employee
          </button>
          <button
            className='btn btn-success btn-lg'
            onClick={() => navigate('/login')}
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
}

export default Start;
