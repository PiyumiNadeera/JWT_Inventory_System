import axios from "axios";
import { useState } from "react";
import { Container, Form, FloatingLabel, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import registerImage from '../../assests/register.png';

const Register = () =>{

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [registerEnabled,setRegisterEnabled] = useState(false);
    const [error,setError] = useState("");

    const navigate = useNavigate();
      
    const handleUsername = (event)=>{
            setUsername(event.target.value);

            if(username === "" || username.length <4 || password==="" || email===""){
                setRegisterEnabled(false);
            }else{
                setRegisterEnabled(true);
            }
    }

    const handlePassword = (event) =>{
        setPassword(event.target.value);
        
        if(password === "" || password.length <8 || username==="" || email===""){
            setRegisterEnabled(false);
        }else{
            setRegisterEnabled(true);
        }
    }

    const handleEmail=(event) =>{
        setEmail(event.target.value);
        
        //regex= regular expression
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

        
        if(password==="" || email==="" || username.length <4 || password.length <8){
            setRegisterEnabled(false);
        }else if(email !== "" && regex.test(email)){
                setRegisterEnabled(true);
        }
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();

        const data ={
            "username": username,
            "password": password,
            "email": email
        }

        try {
            const response = await axios.post("http://localhost:8081/auth/register",data);
            if(response){
                setError("");
                navigate("/login")
            }
            
            
            
            
        } catch (error) {
            setError(error.response.data.message);
            
        }
    }

    return(
        <>
            <Container >
                <div className="login-box">
                <h1 className="topic">Inventory Management System</h1>
                <Row>
          
            <Col lg={4} className="m-5">
                <h1 className="text-center mb-5">Registration Form</h1>
                <Form onSubmit={handleSubmit}>
                    <FloatingLabel controlId="username" label="Enter the username" className="mb-3">
                        <Form.Control placeholder="Enter the username" value={username} onChange={handleUsername}></Form.Control>
                    </FloatingLabel>

                    <FloatingLabel controlId="password" label="Enter the password" className="mb-4">
                        <Form.Control type="password" placeholder="Enter the password" value={password} onChange={handlePassword}></Form.Control>
                    </FloatingLabel>

                    <FloatingLabel controlId="email" label="Enter the email address" className="mb-4">
                        <Form.Control placeholder="Enter the email address" value={email} onChange={handleEmail}></Form.Control>
                    </FloatingLabel>
                    
                    <div className="text-center">
                        <Button type="submit" variant="success" disabled={!registerEnabled}>Register</Button>
                    </div>

                    {error &&
                        <div className="text-center text-danger mb-3 mt-3 ">
                            {error}
                        </div>
                    }
                </Form>
               
                </Col>
                <Col lg={6} className="Images">
                <img src={registerImage} height={500} width={500} alt="register"/>
            </Col>
                </Row>


                
                </div>  
            </Container>

            
        </>
    );
}

export default Register;