import {Row, Col} from 'react-bootstrap';
import backgroundImage from '../assests/background.png';
import '../App.scss';



const Home =()=>{

const userName = sessionStorage.getItem('username');

    return(
        <>
        <Row>
            <Col lg={6} className='introduction'>
            
            <div className='home-box'> 
            <h1 className='mb-5'>Hi {userName}.....</h1>
            <p>Welcome to our simple and efficient online inventory management system. 
                Easily add, edit, and delete items to keep your inventory up-to-date and organized.
                Log in to start managing your inventory with ease and streamline your stock management process from anywhere.
            </p>
                
            </div>

            
            </Col>
            <Col lg={6}>
                 <img src={backgroundImage} className="Images" height={600} width={600} alt='home'/>
            </Col>
        </Row>
        </>
    )
}

export default Home;