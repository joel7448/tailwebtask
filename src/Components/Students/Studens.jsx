import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { config } from '../../API/api'
import "./Students.css"
function Students () {
const [info,setinfo] = useState([]);
const {id} = useParams();
var fetch = async()=>{
  console.log(id)
var data = await axios.get(`${config().api}/server/students/students/${id}`,
{
  headers: {
    Authorization: `${localStorage.getItem("token")}`,
  },
  
} );
setinfo(data.data);
}
const formik = useFormik({
  initialValues:{
    name : ""
  },
  onSubmit :async (values)=>{
    values.teacher = localStorage.getItem("_id");
    try{
const filterdata = await axios.post(`${config().api}/server/students/filter`,values,{
  
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
});
setinfo(filterdata.data);
    }
    catch(err){
      console.log(err);
    }

  }
})

const deletedata = async(dataid)=>{
  try{
    console.log(dataid);
  const datadelete = await axios.delete(`${config().api}/server/students/delete/${dataid}`,
    {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
  });
  alert(datadelete.data.message);
  fetch();
  }
  catch(err){
    console.log(err);
  }
}

useEffect(()=>{
fetch();
},[])

  return (
    <div className='wrapper mt-5'>
      <form onSubmit={formik.handleSubmit} className='container d-flex  justify-content-around align-items-center' style={{width:"400px",height:"50px"}}>
        <Link to={`/Addstudent/${localStorage.getItem("_id")}`} className='btn btn-outline-primary  mb-5'>Add new Student / Add marks</Link>
        <input className='form-control ms-5 search' name="name" onChange={formik.handleChange} value={formik.values.name}  type="text" placeholder='Search Students'/>
        <button className='btn btn-success '>Search</button>
        </form>
        <div className='tablewrapper container border'>
    <table class="table">
  <thead className='headers'>
    <tr>
     
      <th scope="col">Name</th>
      <th scope="col">Subject</th>
      <th scope="col">Marks</th>
      <th scope="col">CRUD</th>
    </tr>
  </thead>
  <tbody className='border'>
   { info.map((x)=>{
    return(<tr>
      
      <td >{x.Name}</td>
      <td>{x.subject}</td>
      <td>{x.marks}</td>
      <td className='d-flex flex-column  align-items-start'><Link to={`/edit/${x._id}`} className='btn btn-outline-info mb-2 crud-edit'>Edit</Link><button onClick={()=>{deletedata(x._id)}} className='btn btn-outline-danger mb-2 crud-delete'>Delete</button>
      </td>
    </tr>)
   })
}
  
    
  </tbody>
</table>
</div>
</div>
  )
}

export default Students