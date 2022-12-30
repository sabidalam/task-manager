import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const SignUp = () => {
    const navigate = useNavigate();
    const { createUser, providerLogin } = useContext(AuthContext);

    const handleSignUp = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate('/');
                toast.success('Account Created Successfully, PLease Login');
                form.reset();
            })
            .catch(error => console.error(error))
    }


    const handleGoogleSignIn = () => {
        const googleProvider = new GoogleAuthProvider();
        providerLogin(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('SignIn Successful');

            })
            .catch(err => console.error(err))
    };

    return (
        <div className='w-50 mx-auto my-5'>
            <h3 className='text-center'>Sign-Up</h3>
            <Form onSubmit={handleSignUp}>
                <Form.Group className="mb-3" controlId="formBasicName">

                    <Form.Control type="text" name='name' placeholder="Enter name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">

                    <Form.Control type="email" name='email' placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">

                    <Form.Control type="password" name='password' placeholder="Password" />
                </Form.Group>
                <Button className='form-control' variant="primary" type="submit">
                    SignUp
                </Button>
                <div className='text-center fw-bold my-2'>Or</div>
                <Button onClick={handleGoogleSignIn} className='form-control' variant="success">
                    Sign-In with Google
                </Button>
            </Form>

        </div>
    );
};

export default SignUp;