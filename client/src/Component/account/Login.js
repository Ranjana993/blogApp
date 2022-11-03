import React, { useState } from 'react'
import { Box, Button, TextField, styled, Typography } from '@mui/material'
import { API } from '../../service/api';
const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

const initialSignupData = {
    name: "",
    username: "",
    passward: ""
}

const Login = () => {
    const [error, setError] = useState("")
    const [account, setAcount] = useState('login')
    const [signup, setSignUp] = useState(initialSignupData)


    const toggleAccount = () => account === 'signup' ? setAcount('login') : setAcount('signup')
    const onInputChange = (e) => setSignUp({ ...signup, [e.target.name]: e.target.value })



    const signupUser = async () => {
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            setError('');
            setSignUp(initialSignupData);
            toggleAccount('login');
        } 
        else {
            setError('Something went wrong! please try again later');
        }
    }
    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="" />
                {
                    account === 'login' ?
                        <Wrapper>
                            <TextField label="Enter userName" variant="standard" />
                            <TextField label="Enter passward" variant="standard" />
                            <LoginBtn variant="contained">Login</LoginBtn>
                            {error && <Error>{error}</Error>}
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <SignUp onClick={() => toggleAccount()} >Create an account</SignUp>
                        </Wrapper> :
                        <Wrapper>
                            <TextField onChange={e => onInputChange(e)} name='name' value={signup.name} label="Enter Name" variant="standard" />
                            <TextField onChange={e => onInputChange(e)} name='username' value={signup.username} label="Enter userName" variant="standard" />
                            <TextField onChange={e => onInputChange(e)} name='passward' value={signup.passward} label="Enter passward" variant="standard" />
                            <SignUp onClick={() => signupUser()}>Signup</SignUp>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <LoginBtn variant="contained" onClick={() => toggleAccount()}  >Already have an account</LoginBtn>
                        </Wrapper>
                }
            </Box>
        </Component>
    )
}

export default Login;


const Component = styled(Box)`
    width: 450px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgba(0 ,0 , 0 , 0.6);
`

const Image = styled('img')({
    width: 100,
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0'
})

const Wrapper = styled(Box)`
    display: flex;
    padding: 25px 35px ;
    flex: 1;
    flex-direction: column;
    & > div , & > button, &>p{
        margin-top: 20px;
    }
`

const LoginBtn = styled(Button)`
    text-transform: none;
    background: #fB641B;
    height: 48px;
    border-radius: 2px;
    color:#fff
`

const SignUp = styled(Button)`
    text-transform: none;
    background: #fff;
    height: 48px;
    border-radius: 2px;
    color:#2874f0;
    box-shadow: 0 2px 4px 0 rgba(0 0 0/ 20%);

`
const Text = styled(Typography)`
color: #878787;
font-size: 15px;

`

const Error = styled(Typography)`
font-size: 10px;
color: #ff6161;
line-height: 0;
margin-top: 10px;
font-weight: bold;

`