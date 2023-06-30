import React,{useState,useEffect} from 'react'
import { Form, Input,message } from "antd";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import Spinner from '../components/Spinner';


const Login = () => {

  const img =
    "https://images.unsplash.com/photo-1593538312308-d4c29d8dc7f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // submit handler for login form
  const submitHandler = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      setLoading(false);
      message.success("Login Successfull");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      // setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("Invalid Credentials");
    }
  };

  // stop from directing to login
  // if already logged in
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="register-page">
        {/* creating form for login page */}

        {/* checking for spinner */}
        {loading && <Spinner />}
        <div className="row container">
          <h1>Expanse Managment System - MERN STACK</h1>
          <div className="col-md-6">
            <img src={img} alt="login-img" width={"100%"} height="100%" />
          </div>
          <div className="col-md-4 login-form">
            <Form layout="vertical" onFinish={submitHandler}>
              <h1>Login Form</h1>

              <Form.Item label="Email" name="email">
                <Input type="email" />
              </Form.Item>

              <Form.Item label="Password" name="password">
                <Input type="password" />
              </Form.Item>

              <div className="d-flex justify-content-between">
                <Link to="/register">Not a user ? Click here to Register</Link>
                <button className="btn btn-primary">Login</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login
