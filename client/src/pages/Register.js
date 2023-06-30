import React from "react";
import { Form, Input } from "antd";
import { Link } from "react-router-dom";

const Register = () => {

    // submit handler for register form
    const submitHandler = (values) => {
        console.log(values);
    }
    

  return (
    <>
      <div className="register-page">
        {/* creating form for register */}

        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Register Form</h1>

          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input type="email"/>
          </Form.Item>

          <Form.Item label="Password" name="password" >
            <Input type="password"/>
          </Form.Item>

          <div className="d-flex justify-content-between">
            <Link to='/login'>Already Registered ? Click here to login</Link>
            <button className="btn btn-primary">
              Register
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;
