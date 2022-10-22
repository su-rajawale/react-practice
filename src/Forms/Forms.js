import React, { useState } from 'react'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import './Forms.css'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { signUpSchema, loginSchema } from './schemas'

import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

const registerInitialValues = {
    name: '',
    email: '',
    password: '',
    confirm_password: ''
}

const loginInitialValues = {
    email: '',
    password: '',
}

function Forms() {

    // Navigate

    const navigateTo = useNavigate()

    // States

    const [isSuccessOpen, setIsSuccessOpen] = useState(false)
    const [isLoginOk, setIsLoginOk] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const handleLoginClick = () => {
        setIsSuccessOpen(false)
        const image = document.querySelector('.cover-image')
        if (image.classList.contains('change')) {
            image.classList.remove('change')
        }
    }

    const skipLogin = () => {
        navigateTo('/home/users')
    }

    // Sliding image

    function toRight() {
        const image = document.querySelector('.cover-image')
        image.classList.add('change')
    }

    function toLeft() {
        const image = document.querySelector('.cover-image')
        image.classList.remove('change')
    }

    // Formik Handle Form *Registration

    const registerForm = useFormik({
        initialValues: registerInitialValues,
        validationSchema: signUpSchema,
        onSubmit: (values, action) => {
            axios.post('http://localhost:5000/users', values)
            action.resetForm()
            setIsSuccessOpen(true)
        }
    })

    // Formik Handle Form *Login

    const loginForm = useFormik({
        initialValues: loginInitialValues,
        validationSchema: loginSchema,
        onSubmit: (values, action) => {
            // login logic
            axios.get('http://localhost:5000/users/')
                .then(function (res) {
                    const user = res.data.find((any) => {
                        return any.email === values.email && any.password === values.password
                    })
                    if (user) {
                        action.resetForm()
                        setIsLoading(true)
                        setTimeout(() => {
                            setIsLoginOk(true)
                            navigateTo("/home/users")
                            setIsLoading(false)
                        }, 2000)

                    } else {
                        setIsLoginOk(false)
                        action.resetForm()
                    }
                })
        }
    })
    

    // if (userData) {
    //     navigateTo('/home/user')
    // } else {
        return (
            <section id='forms'>
                {isLoading ? (
                    <div className='loading'>
                        <div className="spinner">
                            <div className="spinner-item"></div>
                            <div className="spinner-item"></div>
                            <div className="spinner-item"></div>
                        </div>
                    </div>
                ) : null}
                <div className={isSuccessOpen ? 'success open' : 'success'}>
                    <div className="wrapper">
                        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                        </svg>
                    </div>
                    <h2 className='success-modal-title'>Registration Successful</h2>
                    <button className='input-button' onClick={handleLoginClick}>Login</button>
                </div>
                <div className='forms-container'>
                    <article className="login-form">
                        <h1 className='form-title'>Login</h1>
                        <form onSubmit={loginForm.handleSubmit}>
                            <div className="input-block">
                                <label className='input-label' htmlFor='email'>Email</label>
                                <input
                                    type="email"
                                    name='email'
                                    autoComplete='off'
                                    id='log_email'
                                    value={loginForm.values.email}
                                    onChange={loginForm.handleChange}
                                    onBlur={loginForm.handleBlur}
                                />
                                {loginForm.errors.email && loginForm.touched.email ?
                                    (<p className='form-error'>{loginForm.errors.email}</p>) :
                                    null}
                            </div>

                            <div className="input-block">
                                <label className='input-label' htmlFor='password'>Password</label>
                                <input
                                    type='password'
                                    name='password'
                                    id='log_password'
                                    autoComplete='off'
                                    value={loginForm.values.password}
                                    onChange={loginForm.handleChange}
                                    onBlur={loginForm.handleBlur}
                                />
                                {loginForm.errors.password && loginForm.touched.password ?
                                    (<p className='form-error'>{loginForm.errors.password}</p>) :
                                    null}
                            </div>
                            <div className='button-block'>
                                <button type="submit" className='input-button'>Login</button>
                            </div>
                            {!isLoginOk ? <Alert className='login-error' severity="error">
                                <AlertTitle>Error</AlertTitle>
                                <strong> Wrong Username or Password </strong>
                            </Alert> : null}
                            <p className="sign-up">
                                Dont have an account? <span onClick={toRight}>Register now</span>
                            </p>
                        </form>
                    </article>

                    <article className='registration-form'>
                        <h2 className='form-title'>Register</h2>
                        <form onSubmit={registerForm.handleSubmit}>
                            <div className='input-block'>
                                <label className='input-label' htmlFor='name'>Name</label>
                                <input
                                    type='name'
                                    name='name'
                                    autoComplete='off'
                                    id='name'
                                    value={registerForm.values.name}
                                    onChange={registerForm.handleChange}
                                    onBlur={registerForm.handleBlur}
                                />
                                {registerForm.errors.name && registerForm.touched.name ?
                                    (<p className='form-error'>{registerForm.errors.name}</p>) :
                                    null}
                            </div>
                            <div className='input-block'>
                                <label className='input-label' htmlFor='email'>Email</label>
                                <input
                                    type='email'
                                    name='email'
                                    autoComplete='off'
                                    id='reg_email'
                                    value={registerForm.values.email}
                                    onChange={registerForm.handleChange}
                                    onBlur={registerForm.handleBlur}
                                />
                                {registerForm.errors.email && registerForm.touched.email ?
                                    (<p className='form-error'>{registerForm.errors.email}</p>) :
                                    null}
                            </div>
                            <div className='input-block'>
                                <label className='input-label' htmlFor='password'>Password</label>
                                <input
                                    type='password'
                                    name='password'
                                    autoComplete='off'
                                    id='reg_password'
                                    value={registerForm.values.password}
                                    onChange={registerForm.handleChange}
                                    onBlur={registerForm.handleBlur}
                                />
                                {registerForm.errors.password && registerForm.touched.password ?
                                    (<p className='form-error'>{registerForm.errors.password}</p>) :
                                    null}
                            </div>
                            <div className='input-block'>
                                <label className='input-label' htmlFor='confirm_password'>Confirm Password</label>
                                <input
                                    type='password'
                                    name='confirm_password'
                                    autoComplete='off'
                                    id='confirm_password'
                                    value={registerForm.values.confirm_password}
                                    onChange={registerForm.handleChange}
                                    onBlur={registerForm.handleBlur}
                                />
                                {registerForm.errors.confirm_password && registerForm.touched.confirm_password ?
                                    (<p className='form-error'>{registerForm.errors.confirm_password}</p>) :
                                    null}
                            </div>
                            <div className='button-block'>
                                <button type='submit' className='input-button'>Register</button>
                            </div>
                            <p className="sign-up">
                                Already have an account? <span onClick={toLeft}>Sign In now</span>
                            </p>
                        </form>
                    </article>
                    <article className='cover-image' onClick={skipLogin}>
                    </article>
                </div>
            </section>
        )
    }
//}

export default Forms