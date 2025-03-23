import { toast } from "react-toastify";
export const makeToast = (message, Toasttype) => {
    // console.log(message);
  toast(message,{
    autoClose: 3000,       
    type: Toasttype,         
    closeOnClick: true,    
    // pauseOnHover: true,    
  });
};

