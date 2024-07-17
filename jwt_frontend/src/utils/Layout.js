import {Outlet, useNavigate } from "react-router-dom";
import {Button, Nav, Navbar, Container} from "react-bootstrap"
import '../App.scss';

export const HomeLayout =() =>{

    const navigate = useNavigate();

    const handleLogout =()=>{
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('username');
        navigate('/login');

    }

    return(
        <>
        <Navbar expand="lg" className="nav_bar">
            <Container >
                <Navbar.Brand href="/">Inventory Management System</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link href="/" >Home</Nav.Link>
                    <Nav.Link href="/items">Items</Nav.Link>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                    <div className="text-end " >
            <Button className="mx-3 " variant="danger" onClick={handleLogout} >Log Out</Button>
        </div>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        
        <Outlet/>
        
        </>
    )
}

export const LoginLayout =()=>{
    return(
        <>
        <Navbar expand="lg" className="nav_bar">
            <Container >
                <Navbar.Brand href="/">Inventory Management System</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                
            </Container>
        </Navbar>
        
        <Outlet/>
        
        </>
    )
}

