import { useForm } from "react-hook-form";
import "./LoginForm.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";

function LoginForm() {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log("Login Data:", data);

    if((localStorage.length == 0)){
      alert("Local storage is Empty, Go to Register!");
    }
    else if(localStorage.getItem(data.email)){
      const User = JSON.parse(localStorage.getItem(data.email));
      if(data.password === User.password){
          alert("User is Valid");
          setUser( {name : (data.name), email: (data.email)})
          navigate('/');
        }
      else{
        alert("Password Wrong!!");
        console.log(User.password);
      }
    }
    else{
      alert("User Invalid!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="login_header">
            <h2>Login</h2>
            <p className="logo">tringapps</p>
          </div>


      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          className={errors.email ? "login_input error-input" : "login_input"}
        />
        {errors.email && <p className="error-message">{errors.email.message}</p>}
      </div>

      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Password must be at least 6 characters" },
          })}
          className={errors.password ? "login_input error-input" : "login_input"}
        />
        {errors.password && <p className="error-message">{errors.password.message}</p>}
      </div>

      <button type="submit" className="login-button button_color">Login</button>
      <div className="NewAcc">
            <p>Haven't an Account?</p>
            <Link to="/register" className="redirect_tag" >Register</Link>
      </div>
    </form>
  );
}

export default LoginForm;
