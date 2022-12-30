import React, { useContext } from 'react';
import { Button, Image } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { AuthContext } from '../../../Context/AuthProvider';

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    console.log(user);
    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error))

    }
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
                <Container>
                    <Navbar.Brand><Link to='/' className='text-decoration-none text-light fw-bold'>Task Manager</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mx-auto">
                            <Link to='/' className='text-decoration-none me-3 text-light fw-semibold'>Add Task</Link>
                            <Link to='/myTask' className='text-decoration-none me-3 text-light fw-semibold'>My Task</Link>
                            <Link to='/completedTask' className='text-decoration-none me-3 text-light fw-semibold'>Completed Task</Link>
                        </Nav>
                        <Nav>
                            {
                                user?.uid ?
                                    <>
                                        <Link >
                                            {
                                                user?.photoURL ?
                                                    <Image
                                                        className='mt-1'
                                                        roundedCircle
                                                        src={user?.photoURL}
                                                        style={{ height: '30px' }}>
                                                    </Image>
                                                    :
                                                    <FaUser className='mt-1 text-white'></FaUser>
                                            }
                                        </Link>
                                        <Button onClick={handleLogout} className='ms-2' variant="light" size="sm"><Link className='text-decoration-none text-success fw-bold' to='/login'>LogOut</Link></Button>
                                    </>
                                    :
                                    <>
                                        <Link to='/login' className='text-decoration-none me-3 text-light fw-semibold'>Login</Link>
                                        <Link to='/signUp' className='text-decoration-none me-3 text-light fw-semibold'>SignUp</Link>
                                    </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBar;