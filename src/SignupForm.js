import { set, useForm } from "react-hook-form";
import "./SignupForm.css"; // Import CSS file
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
function SignupForm() {
    const navigate = useNavigate();
     const { setUser , SettingAuth } = useContext(UserContext);  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // localStorage.clear();
    // console.log("Signup Data:", data);
    
    if(localStorage && localStorage.getItem(data.email)){
      alert("Email is already exist! Go to Login");
    }
    else{
      const Obj = {name: data.name, password: data.password};
      localStorage.setItem(data.email, JSON.stringify(Obj));
      // const Obj2 = JSON.parse(localStorage.getItem(data.email));
      // console.log(Obj2.password);
      alert("User details Registered");
      setUser({name : data.name, email : data.email});
      // SettingAuth(true);
      navigate('/');
    }
    
    
  };

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
          {...register("name", { required: "Name is required" })}
          className={errors.name ? "signup_input error-input" : "signup_input"}
        />
        {errors.name && <p className="error-message">{errors.name.message}</p>}
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
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
            minLength: { value: 6, message: "Password must be at least 6 characters" },
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
