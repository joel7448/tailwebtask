import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { config } from '../../API/api'
import "./Register.css"
function Register() {
const navigate = useNavigate();
const formik = useFormik({
  initialValues : {
    name : "",
    address:"",
    contactnumber : "",
    email:"",
    password:""
  },
  onSubmit :async (values)=>{
    try{
const data =  await axios.post(`${config().api}/server/users/register`,values);
alert(data.data.message);
navigate("/login");
    }
    catch(err){
      console.log(err);
    }
  }
})



  return (
    <div className='d-flex p-5 '>
    <div className='col-lg-6 col-sm-4 d-flex justify-content-center align-items-center logo'>
<img className='img-fluid' src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30154826/1821.png" alt=""/>
    </div>
    <form onSubmit={formik.handleSubmit} className='col-lg-6 col-sm-8 d-flex flex-column justify-content-center pe-sm-2 '>
    <div class="form-floating mb-3" >
<input type="text" name="name" onChange={formik.handleChange} value={formik.values.name}  class="form-control" id="floatingInput" placeholder="Name"/>
<label for="floatingInput">Name</label>
</div>
<div class="form-floating mb-3" >
<textarea type="text" name="address" onChange={formik.handleChange} value={formik.values.address} class="form-control" id="floatingInput" placeholder="Address"/>
<label for="floatingInput">Address</label>
</div>
<div class="form-floating mb-3" >
<input type="text" name="contactnumber" onChange={formik.handleChange} value={formik.values.contactnumber} class="form-control" id="floatingInput" placeholder="Contact number"/>
<label for="floatingInput">Contact number</label>
</div>
    <div class="form-floating mb-3" >
<input type="email" name="email" onChange={formik.handleChange} value={formik.values.email} class="form-control" id="floatingInput" placeholder="name@example.com"/>
<label for="floatingInput">Email address</label>
</div>
<div class="form-floating">
<input type="password" name="password" onChange={formik.handleChange} value={formik.values.password} class="form-control" id="floatingPassword" placeholder="Password"/>
<label for="floatingPassword">Password</label>

</div>

<button class="btn btn-outline-success mt-4 log">Register</button>
<p className='mt-2 accadd'>Already have an account | <Link to="login" className="links">Signin</Link></p>
</form>

</div>

  )
}

export default Register