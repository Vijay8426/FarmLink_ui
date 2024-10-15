import React from 'react';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const JWTLogin = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      // First API call to authenticate and get JWT tokens
      const authResponse = await axios.post('https://farmlink-ewxs.onrender.com/user/login/', {
        email: values.email,
        password: values.password,
      });

      // Debugging: Check the entire response
      console.log('Auth Response:', authResponse.data);

      // Destructure the tokens and user information
      const { access, refresh } = authResponse.data.token;
      const user = authResponse.data.username; // Ensure this is extracting the user correctly
      const msg = authResponse.data.msg;

      // Store tokens and user in local storage
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      localStorage.setItem('user', user); // Make sure this is defined

      // Optional: Display login success message
      console.log(msg); // "Login Success"

      // Second API call to get the user's role
      const roleResponse = await axios.get('https://farmlinkbc.onrender.com/role', {
        headers: {
          Authorization: `Bearer ${access}`, // Send JWT as header
        },
      });

      const { role } = roleResponse.data;
      // Store role in local storage
      localStorage.setItem('userRole', role);

      // Use React Router to navigate after successful login and role fetching
      navigate('/app/dashboard/default'); // Redirect to dashboard or desired page
    } catch (error) {
      setErrors({ submit: 'Login failed. Please check your credentials and try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        email: 'farmlink@gmail.com',
        password: '123456',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={handleLogin}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              className="form-control"
              label="Email Address / Username"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.email}
            />
            {touched.email && errors.email && <small className="text-danger form-text">{errors.email}</small>}
          </div>
          <div className="form-group mb-4">
            <input
              className="form-control"
              label="Password"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
            />
            {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
          </div>

          <div className="custom-control custom-checkbox text-start mb-4 mt-2">
            <input type="checkbox" className="custom-control-input mx-2" id="customCheck1" />
            <label className="custom-control-label" htmlFor="customCheck1">
              Save credentials.
            </label>
          </div>

          {errors.submit && (
            <Col sm={12}>
              <Alert variant="danger">{errors.submit}</Alert>
            </Col>
          )}

          <Row>
            <Col mt={2}>
              <Button
                className="btn-block mb-4"
                color="primary"
                disabled={isSubmitting}
                size="large"
                type="submit"
                variant="primary"
              >
                Signin
              </Button>
            </Col>
          </Row>
        </form>
      )}
    </Formik>
  );
};

export default JWTLogin;
