import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ParticlesBg from 'particles-bg';
import "./styles/EmployeeDetail.css"
import axios from "axios"
function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/get/' + id)
      .then(res => setEmployee(res.data.Result[0]))
      .catch(err => console.log(err));
  }, []);

  const handleLogout = () => {
    axios.get('http://localhost:8081/logout')
      .then(res => {
        navigate('/start');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="empDetailContainer">
      <ParticlesBg type="cobweb" bg={true} />
      <div className="imageContainer">
        <img src={`http://localhost:8081/images/` + employee.image} alt="" className="empImg" />
      </div>
      <div className="detailsContainer">
        <h3 className="responsiveText">Name: {employee.name}</h3>
        <h3 className="responsiveText">Email: {employee.email}</h3>
        <h3 className="responsiveText">Salary: {employee.salary}</h3>
      </div>
      <div className="buttonContainer">
        <button className="btn btn-danger responsiveButton" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default EmployeeDetail;
