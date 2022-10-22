import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { config } from '../../API/api';
import './Login.css'
function Login() {
const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
        email: '',
        password: '',
    },
    validate:(values)=>{
      const errors={};
      if(!values.email){
        errors.email = "please enter Email Address"
      }
      if(!values.password ){
        errors.password = "please enter a password of min-8 characters"
      }
     
      return errors;
    },
   
    onSubmit:async(values)=>{
     try{
const user = await axios.post(`${config().api}/server/users/signin`,values);
localStorage.setItem("token",user.data.token);
localStorage.setItem("_id",user.data._id);
navigate(`/dashboard/${user.data._id}`);
alert(user.data.message);

     }
     catch(err){
      alert("Not  Authorized");
      console.log(err);
     }      

    }
})


  return (
    
    <div className='d-flex' >
        <div className='col-lg-6 col-sm-4 d-flex justify-content-center align-items-center logo'>
 <img className='img-fluid' src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30154826/1821.png" alt=""/>
        </div>
        <form className='col-lg-6 col-sm-8 d-flex flex-column justify-content-center p-5' onSubmit={formik.handleSubmit}>
        <div class="form-floating mb-3" >
    <input type="email" name="email" onChange={formik.handleChange} value={formik.values.email} class="form-control" id="floatingInput" placeholder="name@example.com"/>
    <label for="floatingInput">Email address</label>
  </div>
  <div class="form-floating">
    <input type="password" class="form-control" name="password" onChange={formik.handleChange} value={formik.values.password} id="floatingPassword" placeholder="Password"/>
    <label for="floatingPassword">Password</label>
    
  </div>

    <button type="submit" class="btn btn-outline-success mt-4 log">Login</button>
<p className='mt-2 text-center'>New here | <Link className='links' to="/">SignUp</Link></p>
  </form>
 
  </div>

  
  )
}

export default Login