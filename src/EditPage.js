import './EditPage.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DefaultImage from './Images/Banner.png';
import { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from './UserContext';


import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const EditPage=()=>{
    const navigate = useNavigate();
    
    const URLStatus = useParams();       // Getting URL
 
    const editPersonaKey = URLStatus.key == undefined ? undefined : Number.parseInt(URLStatus.key);      // Saving Persona key from the URL
    
    const [ EditStatus, setEditStatus] = useState();                   // It declares Whether this page for Creation or Editing
    
    
    const { User, personas, addPersona,  deletePersona } = useContext(UserContext);
    

    const [ SavedImage, setSavedImage] = useState(null);           // Storing Image using State
    const [ ImageSelected, setImageSelected] = useState(false);         // Temporarily storing Image for Preview 


    const [ EditImageState, setEditImageState] = useState(false);    // For Edit Image popup
    const [ DeleteCardState, setDeleteCardState] = useState(false);  // For Delete Card popup
    const [ personaData , setPersonaData ] = useState({ name: null, image: null, quote: null, description: null, attitudes: null, painpoints: null, jobs: null, activities: null});
    // Storing All inputs using this State 

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: personaData
    });

    useEffect( ()=>{
        if(URLStatus.key == undefined){      // Create Persona 
            setEditStatus(false);
            
        }
        else if(personas.length == 0){      // what If User come for Edit and Refresh the Page 
            navigate(-1);
        }
        else{                                       // Editing Persona 
            setEditStatus(true);                   
            const Prev_data = personas[editPersonaKey];   // Fetching Previous persona data   
            setPersonaData(Prev_data);
                          
            if(Prev_data.image != null ){
                setSavedImage(Prev_data.image);
            }    
        }
       
    }, [URLStatus.key]);

   
    
    const DeletePopup=()=>{          // Deleting Persona Confirmation
        return(
        <div className='Popup Delete_Popup'>
            <p>Do you want to Delete</p>
            <div className='Buttons_container'>
                    <div className='LeftSide'>
                        
                    </div>
                    <div className='RightSide'>
                        <button type='button' className='Btn1' onClick={()=>setDeleteCardState(false)}>Cancel</button>
                        <button type='button'  className='button_color' onClick={()=>DeleteCard()}>Confirm</button>
                    </div>
                </div>
        </div>)
    }
    const EditPopup=()=>{                          // Image Preview for User
        return(
            <div className='Popup'>
                <div className='Image_container' style={{backgroundImage: `url(${ImageSelected ? ImageSelected : DefaultImage})`,}}>

                </div>
                <button type='button' id='image_Browse_button' onClick={()=> document.getElementById('image_input').click()}> Browse</button>
                <input
                        type="file"
                        // accept=".jpg,.jpeg,.png,.svg"
                        id='image_input'
                        onChange={handleSelected}
                        accept="image/*"
                        style={{display:"none"}}
                        // {...register("image", { required: "Image is required" })}
                    />
                <div className='Buttons_container'>
                    <div className='LeftSide'>
                        {  (SavedImage!=null && SavedImage==ImageSelected ) &&
                            <button type='button' className='Btn1' onClick={()=>SetImageRemoved()} >Remove</button>}
                    </div>
                    <div className='RightSide'>
                        <button type='button' onClick={()=>SetEditImgPopup(false)} className='Btn1'>Cancel</button>
                        <button type='button' onClick={()=>AfterClickSave() } className='button_color'>Save</button>
                    </div>
                </div>
            </div>
        )
    };

    const SetImageRemoved=()=>{              // After clicking Delete Button in Image Preview
   
        if(SavedImage){
            setSavedImage(null);
            setImageSelected(null);   // Optional
            setEditImageState(false);            
        }
    }
    const SetEditImgPopup=(BoolValue)=>{                       // Set Edit Image Popup
        if(BoolValue && SavedImage)
            setImageSelected(SavedImage);      // Show SavedImage 
        else    
            setImageSelected(null);        

        setEditImageState(BoolValue);      
    }

    const handleSelected=(event)=>{                              // Onchange event for Image  (After Choosing Image)
        const allowedExtensions = [".jpg", ".jpeg", ".png",".svg"];
        const ImgURL = (event.target.files[0].name);
        const ext = ImgURL.slice(ImgURL.indexOf("."));
        
        if(allowedExtensions.includes(ext) == false){
            setEditImageState(false);
            alert("Invalid !!.  acceptable Image file Extensions are (.png, .jpg, .jpeg, .svg)");
        }
        else{
            setImageSelected(URL.createObjectURL(event.target.files[0]));   // Store Selected Image Temporary
        }
        
    }

    const AfterClickSave=()=>{                          // After click Save in Image Preview
        if(ImageSelected == null && SavedImage == null){
            alert("No Image Selected");
        }
        else if(SavedImage && ImageSelected == SavedImage){
            alert("Selected Image is already exist");
        }
        else if(ImageSelected){
            setSavedImage(ImageSelected);   // Save Selected Image
            setEditImageState(false);    // Hide Popup
        }
        else{
            alert("Please select any Image file before click \'Save\'");
        }
    }

    const handleChange=(event)=>{                                    // Onchange Function for input Fields (text, textArea inputs)
        // console.log('event',event?.target?.name, ':', event?.target?.value)         
        setPersonaData({...personaData, [event?.target?.name] : event?.target?.value});
    }
  
    const handleQuillChange=(field, value)=>{                       // Onchange Function for RichTextArea inputs
        setPersonaData({...personaData, [field] : value});
    }
 
    const onSubmit = (data) => {                                    // After Submitting form
        
        console.log(data);
        console.log("image : " + SavedImage);
        if(personaData.name == "" || personaData.name == null)
        {
            alert("Persona Name is Required");
        }
        else if (EditStatus) {
            personas[editPersonaKey].name = personaData.name;
            
            personas[editPersonaKey].image = SavedImage;
            personas[editPersonaKey].quote = personaData.quote;                
            personas[editPersonaKey].description = personaData.description;
            personas[editPersonaKey].attitudes = personaData.attitudes;
            personas[editPersonaKey].painpoints = personaData.painpoints;
            personas[editPersonaKey].jobs = personaData.jobs;
            personas[editPersonaKey].activities = personaData.activities;
            navigate(-1);
            
        } else {
            
            data.image = SavedImage;
            addPersona(data);
            navigate(-1);
        }
        
        
    };

    const DeleteCard=()=>{                                   // For Deleting Card
        deletePersona(editPersonaKey);
        setDeleteCardState(false);
        navigate(-1);
    }

    return(
        <>
        {   
            EditImageState && EditPopup()                  // Edit Image Popup
           }
        {
            DeleteCardState && DeletePopup()                  // Delete Card Popup
           }

        <form className="EditPage"  onSubmit={handleSubmit(onSubmit)}>                  
            <div className="Image_container" style={{backgroundImage: `url(${SavedImage ? SavedImage : DefaultImage})`,}}>
                <div className='Input_Area'>
                    <div className='Content' >
                        <p className='title'>Persona Name <span className='asterick'>*</span></p>
                        <input                                   
                                type="text"
                                className="personaName"
                                name='name'
                                placeholder="Sample"
                                {...register("name", {                             
                                    pattern: {
                                    value: /^[A-Za-z\s]*$/,
                                    message: 'Quote should only contain alphabets'
                                }
                            })} 
                                value={(personaData.name)}
                                onChange={handleChange}
                                // onChange={()=>handleChange}
                                autoComplete="off"
                                />
                            {errors.name && <span className='error_msg'>{errors.name.message}</span>} 
                       
                        
                    </div>
                    <button type='button' className='editImageBtn' onClick={()=>SetEditImgPopup(true)}>
                        {SavedImage ? "Edit Image" : "Upload Image"}
                    </button>
                </div>
                
            </div>
            <div className='Input_container'>
                <div className='Input'>
                    <label>Notable Quote</label><br/>
                    <textarea placeholder='Enter quote that identifies the persona' name='quote' 
                        {...register('quote', { 
                            pattern: {
                                value: /^[A-Za-z\s]*$/,
                                message: 'Quote should only contain alphabets'
                            }
                        })} 
                        value={personaData.quote} onChange={handleChange}/>
                        {errors.quote && <span className='error_msg'>{errors.quote.message}</span>}
                </div>
                <div className='Input'>
                    <label>Description</label><br/>
                    <textarea placeholder='Enter a general description/bio about the persona' name='description' 
                        {...register('description', { 
                            pattern: {
                                value: /^[A-Za-z\s]*$/,
                                message: 'Description should only contain alphabets'
                            }
                        })}
                        value={personaData.description} onChange={handleChange} />
                        {errors.description && <span className='error_msg'>{errors.description.message}</span>}
                </div>
                <div className='Input'>
                    <label>Attitudes / Motivations</label><br/>
                    <textarea placeholder='What drives and incentives the persona to reach desired goals? What mindset the persona have?' name='attitudes'  
                        {...register('attitudes', { 
                            pattern: {
                                value: /^[A-Za-z\s]*$/,
                                message: 'Attitudes should only contain alphabets'
                            }
                        })} 
                        value={personaData.attitudes} onChange={handleChange}/>
                        {errors.attitudes && <span className='error_msg'>{errors.attitudes.message}</span>}
                </div>
                <div className='Input react_quill'>
                    <label>Pain Points</label><br/>
                    <ReactQuill theme="snow"   value={personaData.painpoints} 
                     placeholder='What are the biggest challenges that the persona faces in their job?' 
                     onChange={(value)=>handleQuillChange("painpoints", value)}/>
                </div>
                <div className='Input react_quill'>
                    <label>Jobs / Needs </label><br/>
                     <ReactQuill  theme="snow" 
                     placeholder="What are the persona's functional, social and emotional needs to be successful at their job?" 
                     value={personaData.jobs} onChange={(value)=>handleQuillChange("jobs", value)}/> 
                </div>
                <div className='Input react_quill'>
                    <label>Activities</label><br/>
                    <ReactQuill  theme="snow"   
                     placeholder='What does the persona like to do in their free time?' 
                     value={personaData.activities} onChange={(value)=>handleQuillChange("activities", value)}/> 
                </div>
            </div>
           
            <div className='Submit_container Buttons_container'>
                    <div className='LeftSide'>
                        {
                            EditStatus && <button type='button' className='Btn1' onClick={()=>setDeleteCardState(true)} >Delete</button>
                        }
                    </div>
                    <div className='RightSide'>
                        <button type='button' className='Btn1' onClick={()=>navigate(-1)}>Close</button>
                        <button type='submit' className='Btn2 button_color' >
                            { EditStatus ? "Update Persona" : "Create Persona"}
                        </button>
                    </div>
            </div>
        </form>
        </>
    )
}