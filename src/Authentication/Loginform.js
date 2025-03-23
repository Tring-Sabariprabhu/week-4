import { useForm } from "react-hook-form";
import "./LoginForm.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { makeToast } from "../Toast/MakeToast";


function LoginForm() {
    const navigate = useNavigate();
    const { setUser, setPersonas, SettingAuth } = useContext(UserContext);  
  const {
    register,
    handleSubmit,
    formState: { errors },
    
  } = useForm({ mode: "onChange"});


  const onSubmit = (data) => {
    // localStorage.clear()
    data.email = data.email.toLowerCase();
    if((localStorage.length == 0)){
      makeToast('Local storage is Empty, Go to Register!', 'info');
    }
    else if(localStorage.getItem(data.email))
    {
      const User = JSON.parse(localStorage.getItem(data.email));
      if(data.password === User.password){
          // localStorage.setItem(data.email, JSON.stringify(updatedUser));
          makeToast('Login Successful', 'success');
          setUser({name : User.name, email : data.email});
          setPersonas(User.personas);
          
          // console.log(User);
          navigate('/persona');
        }
      else{
        makeToast('Password Wrong', 'error');
      }
    }
    else{
      makeToast('This email not Registered', 'error');
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
          type="text"
          {...register("email", 
            {                             
                validate: {
                    requiredCheck: (value) =>   value?.length > 0 || "Email is required"
                  },
                pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email should be valid"
                }
              })}
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
            minLength: {value: 8, message:"Password Should contain at least 8 Characters"}
           
          })}
          className={errors.password ? "login_input error-input" : "login_input"}
        />
        {errors.password && <p className="error-message">{errors.password.message}</p>}
      </div>

      <button type="submit" className="login-button button_color">Login</button>
      <div className="NewAcc">
            <p>Don't have an Account?</p>
            <Link to="/register" className="redirect_tag" >Register</Link>
      </div>
    </form>
  );
}

export default LoginForm;
