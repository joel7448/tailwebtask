import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { config } from '../../API/api';

function Edit() {

    const {id} = useParams();
const formik  = useFormik({
  initialValues : {
    name : "",
    subject : "",
    marks : ""
  },
  validate:(values)=>{
    const errors={};
    if(!values.name){
      errors.name = "please enter Student name"
    }
    if(!values.subject ){
      errors.subject = "please enter subject"
    }
    if(!values.marks ){
      errors.marks = "please enter marks"
    }
   
    return errors;
  },
  onSubmit:async(values)=>{
  
    
    try{
        console.log(id);
   const addstudent = await axios.put(`${config().api}/server/students/edit/${id}`,values,{
    
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
   });
  alert(addstudent.data.message);
    }
    catch(err){
      console.log(err);
    }


   }
})

  return (
    <div className=" addedit    col-lg-12">
    <form onSubmit={formik.handleSubmit} className="d-flex flex-column justify-content-around addeditform ">
        <div class="form-floating mb-3">
  <input type="text" name="name" onChange={formik.handleChange} value={formik.values.name} class="form-control" id="floatingInput" placeholder="Name"/>
  <label for="floatingInput">Name</label>
  </div>
<div class="form-floating">
  <input type="text" name="subject" onChange={formik.handleChange} value={formik.values.subject} class="form-control" id="floatingInput" placeholder="Subject"/>
  <label for="floatingInput">Subject</label>
</div>
<div class="form-floating">
  <input type="text" name="marks" onChange={formik.handleChange} value={formik.values.marks} class="form-control" id="floatingInput " placeholder="Marks"/>
  <label for="floatingInput">Marks</label>
</div>
<button className="btn btn-secondary">Add/Edit</button>
<Link to={`/dashboard/${localStorage.getItem("_id")}`} className="btn btn-success">Back</Link>
    </form>
    
    </div>
   
  )
}

export default Edit