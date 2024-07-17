import axios from "axios";
import { useState } from "react";
import { Container, Form, Button, FloatingLabel, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import loginImage from '../../assests/login.png';
import '../../App.scss';


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const navigateRegister = useNavigate();

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8081/auth/login",
        data
      );
      console.log(response);
      setError("");
      setUsername("");
      setPassword("");
      sessionStorage.setItem("token", response.data.jwt);
      sessionStorage.setItem("userId", response.data.id);
      sessionStorage.setItem("username", response.data.username);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.jwt}`;

      navigate("/");
    } catch (error) {
      setError("Something went wrong. Check the username and password");
    }
  };

  return (
    <>
      <Container>
        <div className="login-box">
            <h1 className="topic">Inventory Management System</h1>
          
          <Row>
          
            <Col lg={4} className="m-5">
            <h1 className=" text-center mb-2">Welcome Back</h1>
          <p className="text-center mb-4">Welcome back! Please enter your details to login</p>
              <Form onSubmit={handleSubmit}>
                <FloatingLabel
                  controlId="username"
                  label="Enter the username"
                  className="mb-3"
                >
                  <Form.Control
                    placeholder="Enter the username"
                    value={username}
                    onChange={handleUsername}
                  ></Form.Control>
                </FloatingLabel>

                <FloatingLabel
                  controlId="password"
                  label="Enter the password"
                  className="mb-4"
                >
                  <Form.Control
                    type="password"
                    placeholder="Enter the password"
                    value={password}
                    onChange={handlePassword}
                  ></Form.Control>
                </FloatingLabel>

                {error && <div className="text-danger">{error}</div>}

                <div className="text-center">
                  <Button type="submit" variant="success">
                    Login
                  </Button>
                </div>
              </Form>
              <div className="text-center mt-3">
                <p>Not registered yet?</p>
                <Button
                  type="submit"
                  variant="secondary"
                  onClick={() => navigateRegister("/register")}
                >
                  Register
                </Button>
              </div>
            </Col>
            <Col lg={6} className="Images">
                <img src={loginImage} height={500} width={500} alt="login"/>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Login;
