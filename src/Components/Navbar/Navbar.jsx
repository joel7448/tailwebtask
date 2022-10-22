import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { config } from "../../API/api";
import "./Navbar.css";
function Navbar() {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "please enter name";
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        const user = await axios.get(
          `${config().api}/server/students/${values.name}`
        );
        console.log(user.data);
      } catch (err) {
        console.log(err);
      }
    },
  });
const navigate = useNavigate();
  const logout = ()=>{
    localStorage.removeItem("_id");
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
      <nav class="navbar navbar-expand-lg ">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img
              className="img-fluid"
              src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30154826/1821.png"
              alt=""
            />
          </a>
          
          <button onClick={()=>{logout()}} className="btn btn-danger">Logout</button>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
         
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
           
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
