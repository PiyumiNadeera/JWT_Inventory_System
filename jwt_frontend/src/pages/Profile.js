import { useEffect, useState } from "react";
import {Row, Col, Container, Form, Button, Image } from "react-bootstrap";
import { postRequestFile, getRequest } from "../services/ApiService";
import '../App.scss';

const Profile =()=>{

    const userId = sessionStorage.getItem('userId');

    // Data stored in sessionStorage will be destroyed when the browser is closed. But in localStorage, data will not be destroyed

    const [user,setUser] = useState(null);
    const [profileImage,setProfileImage] = useState(null);

    useEffect(()=>{
        const fetchUser = async ()=>{
            const response = await getRequest(`/users/${userId}`);

            if(response && response.status === 200){
                setUser(response.data);
            }
        }

        fetchUser();
    },[userId])

    const handleFileChange =(event) =>{
        setProfileImage(event.target.files[0]);
        
    }

    const handleUpload = async () =>{
         //event.preventDefault();

        const data ={
            "profileImage" : profileImage
        }

        const response = await postRequestFile(`/users/${userId}/profile`,data);

        if(response && response.status === 200){
            console.log("Profile image updated");
        }
    }



    return(
        <>
        <Container className="text-center my-5 ">
            <h1>User Profile</h1>
        </Container>
        <Container >
            {user && 
                
                <Row>
                    <Col lg={6} className='introduction'>
                    <div className="text-center">                      
                        <Image src={`http://localhost:8081/uploads/${user.profileImage}`}  height={400} alt="profile picture"/>                       
                    </div>
                    </Col>
                    
                    <Col lg={6} >
                    <div className='home-box'>
                    <Col lg={6}>
                            <h5>Username : {user.username}</h5>
                        </Col>
                        <Col lg={6}>
                            <h5>Email : {user.email}</h5>
                        </Col>
                        <Col lg={6}>
                            <h5>Profile image : </h5>
                        </Col>
                        <Col lg={6} >
                        <Form onSubmit={handleUpload}>
                        <Form.Group controlId="profile_image" className="mb-3">
                            <Form.Label className="h6">Select profile image</Form.Label>
                            <Form.Control type="file" onChange={handleFileChange}/>
                        </Form.Group>
                        <Button type="submit" variant="primary">Change Image</Button>
                        </Form>
                        </Col>

                    </div>
                        
                     </Col>


                     
                </Row>
                

            }
            
        </Container>
        </>
    )
}

export default Profile;