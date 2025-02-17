import './EditPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import DefaultImage from './Images/Banner.png';
import { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from './UserContext';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const EditPage=()=>{
    const navigate = useNavigate();
    const URLStatus = useParams();
 
    const EditStatus = (URLStatus.status == "create" ? false : true);
    const { User, personas, addPersona, editPersonaKey, deletePersona } = useContext(UserContext);
    

    const [ SavedImage, setSavedImage] = useState(null);
    
    const [ ImageSelected, setImageSelected] = useState(false);
    const [ EditImageState, setEditImageState] = useState(false);    // For edit Popup
    const [ DeleteCardState, setDeleteCardState] = useState(false);
    // const [ RemovedState, setRemovedState] = useState(false); 
    const [ personaData , setPersonaData ] = useState({ name: null, image: null, quote: null, description: null, attitudes: null, painpoints: "", jobs: null, activities: null});
    // const [ Name, SetName ] = useState("");

    useEffect( ()=>{
        if(EditStatus){
            const Prev_data = personas[editPersonaKey];   // Fetching Prev persona data   
            setPersonaData(prevState => ({
                ...prevState,
                name: Prev_data.name , 
                quote: Prev_data.quote ,
                description: Prev_data.description ,
                attitudes: Prev_data.attitudes,
                painpoints: Prev_data.painpoints,
                jobs: Prev_data.jobs,
                activities: Prev_data.activities
            }));
            if(Prev_data.image != null ){
                setSavedImage(Prev_data.image);
            }
            
            
        }
    }, []);

   
    
    const DeletePopup=()=>{
        return(
        <div className='Popup Delete_Popup'>
            <p>Do you want to Delete</p>
            <div className='Buttons_container'>
                    <div className='LeftSide'>
                        
                    </div>
                    <div className='RightSide'>
                        <button  className='Btn1' onClick={()=>setDeleteCardState(false)}>Cancel</button>
                        <button  className='button_color' onClick={()=>DeleteCard()}>Confirm</button>
                    </div>
                </div>
        </div>)
    }
    const EditPopup=()=>{
        
        return(
            <div className='Popup'>
                <div className='Image_container' style={{backgroundImage: `url(${ImageSelected ? ImageSelected : DefaultImage})`,}}>

                </div>
                <input
                        type="file"
                        // accept=".jpg,.jpeg,.png,.svg"
                        onChange={handleSelected}
                        accept="image/*"
                        // {...register("image", { required: "Image is required" })}
                    />
                <div className='Buttons_container'>
                    <div className='LeftSide'>
                        {  (SavedImage!=null && SavedImage==ImageSelected ) &&
                            <button className='Btn1' onClick={()=>SetImageRemoved()} >Remove</button>}
                    </div>
                    <div className='RightSide'>
                        <button onClick={()=>SetEditImgPopup(false)} className='Btn1'>Cancel</button>
                        <button onClick={()=>AfterClickSave() } className='button_color'>Save</button>
                    </div>
                </div>
            </div>
        )
    };

    const SetImageRemoved=()=>{
   
        if(SavedImage){
            setSavedImage(null);
            setImageSelected(null);   // Optional
            setEditImageState(false);            
        }
    }
    const SetEditImgPopup=(status)=>{
        if(status && SavedImage)
            setImageSelected(SavedImage);      // Show SavedImage 
        
        setEditImageState(status);
    }
    const handleSelected=(event)=>{
        setImageSelected(URL.createObjectURL(event.target.files[0]));   // Store Selected Image Temporary
    }
    const AfterClickSave=()=>{
        if(ImageSelected == SavedImage){
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

    const handleChange=(event)=>{                                            // Onchange Function for input Fields
        setPersonaData({...personaData, [event.target.name] : event.target.value});
    }
  
    const handleQuillChange=(field, value)=>{
        setPersonaData({...personaData, field : value});
    }
    const AfterSubmit=()=>{                  // After click UPDATE PERSONA (OR) CREATE PERSONA
        if(personaData.name == null){
            alert("Name is Required");
        }
        else{
            if(EditStatus){
                personas[editPersonaKey].name = personaData.name;
                personas[editPersonaKey].image = SavedImage;
                personas[editPersonaKey].quote = personaData.quote;
                personas[editPersonaKey].description = personaData.description;
                personas[editPersonaKey].attitudes = personaData.attitudes;
                personas[editPersonaKey].painpoints = personaData.painpoints;
                personas[editPersonaKey].jobs = personaData.jobs;
                personas[editPersonaKey].activities = personaData.activities;
            }
            else{
                personaData.image = SavedImage;     // Store Image and Pass Persona Card
                addPersona(personaData); 
            }
            console.log(personaData);
            navigate(-1);
        }
            
        
    }

    const DeleteCard=()=>{
        deletePersona(editPersonaKey);
        setDeleteCardState(false);
        navigate(-1);
    }
    return(
    <>
        {   
            EditImageState && EditPopup() 
           }
        {
            DeleteCardState && DeletePopup()
           }
        <div className="EditPage"  >
            
            <div className="Image_container" style={{backgroundImage: `url(${SavedImage ? SavedImage : DefaultImage})`,}}>
                <div className='Input_Area'>
                    <div className='Content' >
                        <p className='title'>Persona Name</p>
                        
                        {
                            EditStatus ? <input                                   // For Edit Name
                                            type="text"
                                            className="personaName"
                                            placeholder="Sample"
                                            onChange={handleChange}
                                            value={personaData.name}
                                            name='name'
                                        /> : <input                              // For Create Name
                                                type="text"
                                                className="personaName"
                                                placeholder="Sample"
                                                onChange={handleChange}
                                                name='name'
                                            />
                        }
                        
                    </div>
                    <button className='editImageBtn' onClick={()=>SetEditImgPopup(true)}>
                        {SavedImage ? "Edit Image" : "Upload Image"}
                    </button>
                </div>
                
            </div>
            <div className='Input_container'>
                <div className='Input'>
                    <label>Notable Quote</label><br/>
                    <textarea placeholder='Enter quote that identifies the persona' name='quote' onChange={handleChange} value={personaData.quote}/>
                </div>
                <div className='Input'>
                    <label>Description</label><br/>
                    <textarea placeholder='Enter a general description/bio about the persona' name='description' onChange={handleChange} value={personaData.description}/>
                </div>
                <div className='Input'>
                    <label>Attitudes / Motivations</label><br/>
                    <textarea placeholder='What drives and incentives the persona to reach desired goals? What mindset the persona have?' name='attitudes' onChange={handleChange} value={personaData.attitudes}/>
                </div>
                <div className='Input'>
                    <label>Pain Points</label><br/>
                    { EditStatus ?  <ReactQuill theme="snow"  onChange={(value)=>handleQuillChange("painpoints", value)} value={personaData.painpoints} /> : <ReactQuill theme="snow"  onChange={(value)=>handleQuillChange("painpoints", value)}  />  }
                </div>
                <div className='Input'>
                    <label>Jobs / Needs </label><br/>
                    {/* <textarea placeholder="What are the persona's functional, social and emotional needs to be successful at their job?"/> */}
                    { EditStatus ?  <ReactQuill theme="snow"  onChange={(value)=>handleQuillChange("jobs", value)} value={personaData.jobs} /> : <ReactQuill theme="snow"  onChange={(value)=>handleQuillChange("jobs", value)}  />  }
                </div>
                <div className='Input'>
                    <label>Activities</label><br/>
                    {/* <textarea placeholder='What does the persona like to do in their free time?'/> */}
                    { EditStatus ?  <ReactQuill theme="snow"  onChange={(value)=>handleQuillChange("activities", value)} value={personaData.activities} /> : <ReactQuill theme="snow"  onChange={(value)=>handleQuillChange("activities", value)}  />  }
                </div>
            </div>
           
            <div className='Submit_container Buttons_container'>
                    <div className='LeftSide'>
                        {
                            EditStatus && <button className='Btn1' onClick={()=>setDeleteCardState(true)} >Delete</button>
                        }
                    </div>
                    <div className='RightSide'>
                        <button className='Btn1' onClick={()=>navigate(-1)}>Close</button>
                        <button  className='Btn2 button_color' onClick={()=>AfterSubmit()}>
                            { EditStatus ? "Update Persona" : "Create Persona"}
                        </button>
                    </div>
            </div>
        </div>
        </>
    )
}