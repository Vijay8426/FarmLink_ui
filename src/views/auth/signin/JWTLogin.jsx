import React from 'react';
import { Row, Col, Alert, Button, Card } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JWTLogin = () => {
  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      // First API call to authenticate and get JWT tokens and role
      const authResponse = await axios.post('https://farmlink-ewxs.onrender.com/user/login/', {
        email: values.email,
        password: values.password,
      });

      // Debugging: Check the entire response
      console.log('Auth Response:', authResponse.data);

      // Destructure the tokens, user information, and role from the response
      const { access, refresh } = authResponse.data.token;
      const user = authResponse.data.username; // Ensure this is extracting the user correctly
      const userRole = authResponse.data.role; // Extract the role directly from the response
      const msg = authResponse.data.msg;

      // Store tokens, user, and role in local storage
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      localStorage.setItem('user', user);
      localStorage.setItem('userRole', userRole); // Store the user role

      // Optional: Display login success message
      console.log(msg); // "Login Success"

      // Redirect to dashboard or desired page
      navigate('/app/dashboard/default'); 
    } catch (error) {
      setErrors({ submit: 'Login failed. Please check your credentials and try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',  // Hardcoded credentials for showcase
        password: '',  // Hardcoded credentials for showcase
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
              placeholder='email'
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
              placeholder='password'
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

          {/* Card to display the credentials */}
          <Card className="mt-4">
            <Card.Body>
              <Card.Title>Demo Credentials for Buyer</Card.Title>
              <Card.Text>
                <strong>Email:</strong> magnus12@example.com
                <br />
                <strong>Password:</strong> magnus1234
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="mt-4">
            <Card.Body>
              <Card.Title>Demo Credentials for Farmer</Card.Title>
              <Card.Text>
                <strong>Email:</strong> vinodhkanna@gmail.com
                <br />
                <strong>Password:</strong> ishu@vkhome
              </Card.Text>
            </Card.Body>
          </Card>
        </form>
      )}
    </Formik>
  );
};

export default JWTLogin;
