import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';


const Login = () => {
    const [error, setError] = useState('');
    const { signIn, providerLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';


    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
                setError('');
                navigate(from, { replace: true });

            })
            .catch(error => {
                console.error(error)
                setError(error.message)
            })

    }

    const handleGoogleSignIn = () => {
        const googleProvider = new GoogleAuthProvider();
        providerLogin(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('SignIn Successful');
                navigate('/');

            })
            .catch(err => console.error(err))
    };

    return (
        <div className='w-50 mx-auto my-5'>
            <h3 className='text-center'>Login</h3>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" name='email' placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">

                    <Form.Control type="password" name='password' placeholder="Password" />
                </Form.Group>
                <Button className='form-control' variant="primary" type="submit">
                    Login
                </Button>
                <div className='text-center fw-bold my-2'>Or</div>
                <Button onClick={handleGoogleSignIn} className='form-control' variant="success">
                    Sign-In with Google
                </Button>
                <br />
                <Form.Text className='text-danger'>
                    {error}
                </Form.Text>
            </Form>

        </div>
    );
};

export default Login;