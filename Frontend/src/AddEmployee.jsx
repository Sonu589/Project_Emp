import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    salary: '',
    image: null
  });

  const [validation, setValidation] = useState({
    name: true,
    email: true,
    password: true,
    address: true,
    salary: true,
    image: true
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append('name', data.name);
    formdata.append('email', data.email);
    formdata.append('password', data.password);
    formdata.append('address', data.address);
    formdata.append('salary', data.salary);
    formdata.append('image', data.image);

    // Perform validation
    const isValid = validateForm();

    if (isValid) {
      axios
        .post('http://localhost:8081/create', formdata)
        .then((res) => {
          navigate('/employee');
          alert('Data inserted successfully!');
        })
        .catch((err) => console.log(err));
    }
  };

  const validateForm = () => {
    const { name, email, password, address, salary, image } = data;
    const isValid = {
      name: name.trim() !== '',
      email: validateEmail(email),
      password: password.trim() !== '',
      address: address.trim() !== '',
      salary: validateSalary(salary),
      image: image !== null
    };

    setValidation(isValid);

    // Check if all fields are valid
    return Object.values(isValid).every((valid) => valid);
  };

  const validateEmail = (email) => {
    // Simple email validation, you can use a more robust validation approach
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const validateSalary = (salary) => {
    // Simple salary validation, you can use a more specific validation approach
    return !isNaN(salary) && parseFloat(salary) >= 0;
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Add Employee</h2>
      <form className="row g-3 w-50 w-md-70 w-lg-50" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="inputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className={`form-control ${
              !validation.name ? 'is-invalid' : validation.name ? 'is-valid' : ''
            }`}
            id="inputName"
            placeholder="Enter Name"
            autoComplete="off"
            onChange={(e) => {
              const name = e.target.value;
              const isValid = name.trim() !== '';
              setValidation({ ...validation, name: isValid });
              setData({ ...data, name });
            }}
          />
          {!validation.name && (
            <div className="invalid-feedback">Please enter a valid name</div>
          )}
          {validation.name && (
            <div className="valid-feedback">Name is correct!</div>
          )}
        </div>
        <div className="col-12">
          <label htmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input
            type="email"
            className={`form-control ${
              !validation.email ? 'is-invalid' : validation.email ? 'is-valid' : ''
            }`}
            id="inputEmail4"
            placeholder="Enter Email"
            autoComplete="off"
            onChange={(e) => {
              const email = e.target.value;
              const isValid = validateEmail(email);
              setValidation({ ...validation, email: isValid });
              setData({ ...data, email });
            }}
          />
          {!validation.email && (
            <div className="invalid-feedback">Please enter a valid email</div>
          )}
          {validation.email && (
            <div className="valid-feedback">Email is correct!</div>
          )}
        </div>
        <div className="col-12">
          <label htmlFor="inputPassword4" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${
              !validation.password ? 'is-invalid' : validation.password ? 'is-valid' : ''
            }`}
            id="inputPassword4"
            placeholder="Enter Password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          {!validation.password && (
            <div className="invalid-feedback">Please enter a password</div>
          )}
          {validation.password && (
            <div className="valid-feedback">Password is correct!</div>
          )}
        </div>
        <div className="col-12">
          <label htmlFor="inputSalary" className="form-label">
            Salary
          </label>
          <input
            type="text"
            className={`form-control ${
              !validation.salary ? 'is-invalid' : validation.salary ? 'is-valid' : ''
            }`}
            id="inputSalary"
            placeholder="Enter Salary"
            autoComplete="off"
            onChange={(e) => {
              const salary = e.target.value;
              const isValid = validateSalary(salary);
              setValidation({ ...validation, salary: isValid });
              setData({ ...data, salary });
            }}
          />
          {!validation.salary && (
            <div className="invalid-feedback">Please enter a valid salary</div>
          )}
          {validation.salary && (
            <div className="valid-feedback">Salary is correct!</div>
          )}
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className={`form-control ${
              !validation.address ? 'is-invalid' : validation.address ? 'is-valid' : ''
            }`}
            id="inputAddress"
            placeholder="1234 Main St"
            autoComplete="off"
            onChange={(e) => {
              const address = e.target.value;
              const isValid = address.trim() !== '';
              setValidation({ ...validation, address: isValid });
              setData({ ...data, address });
            }}
          />
          {!validation.address && (
            <div className="invalid-feedback">Please enter an address</div>
          )}
          {validation.address && (
            <div className="valid-feedback">Address is correct!</div>
          )}
        </div>
        <div className="col-12 mb-3">
          <label className="form-label" htmlFor="inputGroupFile01">
            Select Image
          </label>
          <input
            type="file"
            className={`form-control ${
              !validation.image ? 'is-invalid' : validation.image ? 'is-valid' : ''
            }`}
            id="inputGroupFile01"
            onChange={(e) => {
              const image = e.target.files[0];
              const isValid = image !== null;
              setValidation({ ...validation, image: isValid });
              setData({ ...data, image });
            }}
          />
          {!validation.image && (
            <div className="invalid-feedback">Please select an image</div>
          )}
          {validation.image && (
            <div className="valid-feedback">Image is correct!</div>
          )}
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;
