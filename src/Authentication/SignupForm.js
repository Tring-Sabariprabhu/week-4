import { set, useForm } from "react-hook-form";
import "./SignupForm.css"; // Import CSS file
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { makeToast } from "../Toast/MakeToast";
function SignupForm() {
    const navigate = useNavigate();
     const { setUser, setPersonas  } = useContext(UserContext);  
     
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange"});

  const onSubmit = (data) => {
    // localStorage.clear();
    
    if(localStorage && localStorage.getItem(data.email)){
      makeToast('Email is already exist! Go to Login', 'error');
    }
    else{
      data.email = data?.email.toLowerCase();
      data.name = data?.name.trim();
      // console.log("Object-->", data);
      const Obj = {name: data.name, password: data.password, personas: []};
      localStorage.setItem(data.email, JSON.stringify(Obj));
      makeToast('User details Registered', 'success');
      setUser({name : data.name, email : data.email});
      setPersonas([]);
      navigate('/persona');
    }
    
    
  };

  const restrictSpaces = (event)=>{
    if(event === " "){
      event.preventDefault();
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
      <div className="signup_header">
        <h2>Register</h2>
        <p className="logo">tringapps</p>
      </div>

      <div className="form-group">
        <label>Name:</label>
        <input
          type="text" 
          {...register("name", {                             
            pattern: {
              value: /^[A-Za-z\s]*$/,
              message: "Name should only contain alphabets",
            },
            validate: {
              requiredCheck: (value) =>   value?.length > 0 || "Name is required",
              SpacesContained: (value) => ( value?.trim()?.length > 0) || "Name Should be valid"
            }
          })} 
          className={errors.name ? "signup_input error-input" : "signup_input"}
        />
        {errors.name && <p className="error-message">{errors.name.message}</p>}
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="text" id="name_input"
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
          className={errors.email ? "signup_input error-input" : "signup_input"}
        />
        {errors.email && <p className="error-message">{errors.email.message}</p>}
      </div>

      <div className="form-group">
        <label>Password:</label>
        <input
          type="password" 
          {...register("password", {
            required: "Password is required", 
            minLength: {value: 8, message:"Password Should contain at least 8 Characters"},
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[!@#$&*_])(?=.*[0-9])(?=.*[a-z])/  ,
              message: "Password Should contain at least one Uppercase, Lowercase letters, and a Special Symbol, a number"
              }
          })}
          className={errors.password ? "signup_input error-input" : "signup_input"}
        />
        {errors.password && <p className="error-message">{errors.password.message}</p>}
      </div>

      <div className="form-group">
        <label>Confirm Password:</label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === watch("password") || "Passwords do not match",
          })}
          className={errors.confirmPassword ? "signup_input error-input" : "signup_input"}
        />
        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
      </div>

      <button type="submit" className="signup-button button_color">Register</button>
      <div className="OldAcc">
            <p>Have an Account?</p>
            <Link to="/login" className="redirect_tag" >Login</Link>
      </div>
    </form>
  );
}

export default SignupForm;
