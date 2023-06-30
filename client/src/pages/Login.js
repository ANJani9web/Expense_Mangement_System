import React from 'react'
import { Form, Input } from "antd";
import { Link } from "react-router-dom";

const Login = () => {

    // submit handler for login form
    const submitHandler = (values) => {
      console.log(values);
    };

  return (
    <>
      <div className="register-page">
        {/* creating form for login page */}

        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Login Form</h1>

          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input type="password" />
          </Form.Item>

          <div className="d-flex justify-content-between">
            <Link to="/register">
              Not a user ? Click here to Register
            </Link>
            <button className="btn btn-primary">Login</button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Login