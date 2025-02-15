import './EditPage.css';
import DefaultImage from './Images/Banner.png';
import { useState } from 'react';
import { useForm } from "react-hook-form";

export const EditPage=()=>{
    const [ SavedImage, SetSavedImage] = useState(null);
    const [ ImageSelected, setImageSelected] = useState(false);
    const [ EditImagePopup, setEditImagePopup] = useState(false);

    const SetEditImage=(value)=>{
        setEditImagePopup(value);
    }
    const SaveImage=(event)=>{
        setImageSelected(URL.createObjectURL(event.target.files[0]));   // Store Selected Image Temporary
    }
    const AfterClickSave=()=>{
        SetSavedImage(ImageSelected);   // Save Selected Image
        setEditImagePopup(false);    // Hide Popup
    }
    const EditPopup=()=>{
        return(
            <div className='EditImagePopup'>
                <label className="block font-medium">Upload Image:</label>
                <input 
                    type="file"
                    accept="image/*"
                    onChange={SaveImage}
                    // {...register("image", { required: "Image is required" })}
                />
                <div >
                    <button onClick={()=>AfterClickSave()}>Save</button>
                    <button onClick={()=>SetEditImage(false)}>Cancel</button>
                </div>
            </div>
        )
    };
    return(
        <div className="EditPage" >
             {   
                 EditImagePopup && EditPopup() 
                }
            <div className="Image_container" style={{backgroundImage: `url(${ImageSelected ? SavedImage : DefaultImage})`,}}>
                <div className='Content' >
                    <p className='title'>Persona Name</p>
                    {/* <p className='personaName'>Sample</p> */}
                    <input type='text' className="personaName" placeholder="Sample"/>
                </div>
                <button className='editImageBtn' onClick={()=>SetEditImage(true)}>
                        Edit Image
                </button>
            </div>
            <div className='Input_container'>
                <div className='Input'>
                    <label>Notable Quote</label><br/>
                    <textarea placeholder='Enter quote that identifies the persona'/>
                </div>
                <div className='Input'>
                    <label>Notable Quote</label><br/>
                    <textarea placeholder='Enter quote that identifies the persona'/>
                </div>
                <div className='Input'>
                    <label>Notable Quote</label><br/>
                    <textarea placeholder='Enter quote that identifies the persona'/>
                </div>
                <div className='Input'>
                    <label>Notable Quote</label><br/>
                    <textarea placeholder='Enter quote that identifies the persona'/>
                </div>
                <div className='Input'>
                    <label>Notable Quote</label><br/>
                    <textarea placeholder='Enter quote that identifies the persona'/>
                </div>
                <div className='Input'>
                    <label>Notable Quote</label><br/>
                    <textarea placeholder='Enter quote that identifies the persona'/>
                </div>
            </div>
           
            <div className='Submit_container'>
                    <div className='LeftSide'>
                        <button className='Btn1'>Delete</button>
                    </div>
                    <div className='RightSide'>
                        <button className='Btn2'>Close</button>
                        <button className='Btn3'>Update Persona</button>
                    </div>
            </div>
        </div>
    )
}