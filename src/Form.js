import {useState} from 'react';
import './Form.css';
import { PopUp } from './PopUp';
import { useForm } from 'react-hook-form';
import { makeToast } from './MakeToast';
export const Form=()=>{
    const [ inputBoxes, setInputBoxes] = useState([]);
    const [ Index, setIndex] = useState(null);
    const [ addButtonState, setAddButtonState] = useState(false);
    const [ delButtonState, setDelButtonState] = useState(false);
    const [ editButtonState, setEditButtonState] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
      } = useForm({defaultValues: {name: "" , age: "", skill: "",designation: "", address : ""}});

    const SetAddBtnState=(value)=>{
        
        setAddButtonState(value);
        if(value){
            reset({name: "" , age: "", designation: "", skill: "", address: ""});
            console.log(Index);        
        }
        // setExistData({name: "" , age: "", skill: "",designation: "", address : ""});
    }
    const SetEditBtnState=(value, EditIndex)=>{
        setEditButtonState(value);
        if(value){
            setIndex(EditIndex);
            const ExistData = inputBoxes[EditIndex];
            Object.keys(ExistData).forEach((key) => {
                setValue(key, ExistData[key]); // Update form fields
              });
        }
        else{
            setIndex(null);
        }
    }
    const SetDelBtnState=(value, DeleteIndex)=>{
        setDelButtonState(value);
        if(value){
            setIndex(DeleteIndex);
        }
        else{
            setIndex(null);
        }
    }
    
   
    const onSubmit = (data) => {
        if(addButtonState){
            setInputBoxes([...inputBoxes, data]) ;
            makeToast('Record added','success');
            setAddButtonState(false);
        }
        else if(editButtonState){
            inputBoxes[Index] = data;
            makeToast('Record updated','success');
            setEditButtonState(false);
        }
    }
    const ShowErrors=()=>{
        if(errors.name)
            makeToast(errors.name.message, 'error');
       if(errors.age)
           makeToast(errors.age.message, 'error');
       if(errors.skill)
           makeToast(errors.skill.message, 'error');
       if(errors.designation)
           makeToast(errors.designation.message, 'error');
       if(errors.address)
           makeToast(errors.address.message, 'error');
    }
  
    const AfterDeleteClick=()=>{
        const OldInputBoxes = [...inputBoxes];
        OldInputBoxes.splice(Index, 1);
        setInputBoxes(OldInputBoxes);
        makeToast('Record deleted','success');
        SetDelBtnState(false, null);
    };
 
    const OperationStart=()=>{
        
        return(
            
            <form className='PopupMessage' onSubmit={handleSubmit(onSubmit)}>
                { (editButtonState || addButtonState) && <>
                <div className='flex_row '>
                    <div className='flex_column Label_div'>
                        <label htmlFor='name'>Name </label>
                    
                        <label htmlFor='age'>Age </label>
                    
                        <label htmlFor='skill'>Skill </label>
                    
                        <label htmlFor='designation' >Designation </label>
                    
                        <label htmlFor='address' >Address </label>
                    </div>
                    <div className='flex_column Input_div'>
                        <input type="text" name="name" id='name' value={watch("name") || ""}
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
                                    /><br/>
                        
                        <input type="text" name="age" id="age" value={watch("age") || ""}
                                    {...register("age", {                             
                                        pattern: {
                                          value: /^[0-9]*$/,
                                          message: "Age should be only numbers",
                                        },
                                        validate: {
                                          requiredCheck: (value) =>   value?.length > 0 || "Age is required",
                                          SpacesContained: (value) => ( value?.trim()?.length > 0) || "Age Should be valid"
                                        }
                                      })} 
                                    /><br/>
                        {/* { errors.name && console.log(errors.name)} */}
                        <input type="text" name="skill" id="skill" value={watch("skill") || ""}
                                    {...register("skill", {                             
                                        pattern: {
                                          value: /^[A-Za-z\s]*$/,
                                          message: "Skill should only contain alphabets",
                                        },
                                        validate: {
                                          requiredCheck: (value) =>   value?.length > 0 || "Skill is required",
                                          SpacesContained: (value) => ( value?.trim()?.length > 0) || "Skill Should be valid"
                                        }
                                      })} 
                                    /><br/>
                        {/* { errors.name && console.log(errors.name)} */}
                        <input type="text" name="designation" id="designation" value={watch("designation") || ""}
                                    {...register("designation", {                             
                                        pattern: {
                                            value: /^[A-Za-z\s]*$/,
                                            message: "Designation should only contain alphabets",
                                          },
                                        validate: {
                                          requiredCheck: (value) =>   value?.length > 0 || "Designation is required",
                                          SpacesContained: (value) => ( value?.trim()?.length > 0) || "Designation Should be valid"
                                        }
                                      })} 
                                    /><br/>
                        {/* { errors.name && console.log(errors.name)} */}
                        <input type="text" name="address" id="address" value={watch("address") || ""}
                                    {...register("address", {                             
                                        validate: {
                                          requiredCheck: (value) =>   value?.length > 0 || "Address is required",
                                          SpacesContained: (value) => ( value?.trim()?.length > 0) || "Address Should be valid"
                                        }
                                      })} 
                                    /><br/>
                        {/* { errors.name && console.log(errors.name)} */}
                    </div>
                

                </div>
                </>}

                
                { addButtonState && <>
                    <button type='submit'
                                    onClick={ShowErrors} 
                                    className='yellowButton button1'>Save</button>
                    <button type='button' 
                                    onClick={()=>SetAddBtnState(false)}
                                    className='button2 redButton'>Close</button>
                    </>}   
                    { editButtonState && <>
                        <button type='submit' 
                                    onClick={ShowErrors} 
                                    className='yellowButton button1'>Update</button>
                        <button type='button' 
                                    onClick={()=>SetEditBtnState(false, null)} 
                                    className='button2 redButton'>Close</button>
                        </>}
                        {delButtonState && <>
                                <label>Delete record</label><br/><br/>
                                <button type='button' 
                                                onClick={()=>AfterDeleteClick()} 
                                                className='yellowButton button1'>Confirm</button>
                                <button type='button' 
                                                onClick={()=>SetDelBtnState(false, null)} 
                                                className='button2 redButton'>Cancel</button>
                                </>}
              
            </form>
        )
    }
   
    return(
        <div className='box-container'>
            
            <button className='addNewButton' onClick={()=>SetAddBtnState(true)} > Add New</button>
            
            {
                addButtonState == true && OperationStart() 
            }
            
            <table>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Skill</th>
                    <th>Designation</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
                
                {inputBoxes.map((value, key)=>(
                    <tr key={key}>
                    <td>{value.name}</td>
                    <td>{value.age}</td>
                    <td>{value.skill}</td>
                    <td>{value.designation}</td>
                    <td>{value.address}</td>
                    <td><button className='bluebutton' onClick={()=>SetEditBtnState(true, key)} > Edit</button>
                    { editButtonState == true && OperationStart()}
                    <button className='redButton' onClick={()=>SetDelBtnState(true, key)}> Delete</button>
                    {
                        delButtonState == true && OperationStart()
                        }
                    </td>
                </tr>
                ))}
                </table>
                
        </div>
    );
}