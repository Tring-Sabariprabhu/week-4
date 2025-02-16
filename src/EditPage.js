import './EditPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import DefaultImage from './Images/Banner.png';
import { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from './UserContext';

export const EditPage=()=>{
    const navigate = useNavigate();
    const URLStatus = useParams();
 
    const { User, personas, addPersona, editPersonaKey, deletePersona } = useContext(UserContext);
    const EditStatus = (URLStatus.status == "create" ? false : true);

    const [ SavedImage, setSavedImage] = useState(null);
    
    const [ ImageSelected, setImageSelected] = useState(false);
    const [ EditImageState, setEditImageState] = useState(false);
    const [ DeleteCardState, setDeleteCardState] = useState(false);
    const [ RemovedState, setRemovedState] = useState(false);
    const [ Persona , setPersona ] = useState({ name: null, image: null});
    const [ Name, SetName ] = useState("");

    useEffect( ()=>{
        if(EditStatus){
            const Prev_Persona = personas[editPersonaKey];
            if(EditStatus){
                if(Prev_Persona.name){
                    SetName(Prev_Persona.name);
                }
                if(Prev_Persona.image){
                    setSavedImage(Prev_Persona.image);
                }
                
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
                        accept=".jpg,.jpeg,.png,.svg"
                        onChange={handleSelected}
                        // {...register("image", { required: "Image is required" })}
                    />
                <div className='Buttons_container'>
                    <div className='LeftSide'>
                        { SavedImage &&
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
            setRemovedState(true);
            setImageSelected(null);
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
        if(RemovedState){
            setSavedImage(null);
            setRemovedState(false);
            setEditImageState(false);
        }
        else if(ImageSelected){
            setSavedImage(ImageSelected);   // Save Selected Image
            setEditImageState(false);    // Hide Popup
        }
        else{
            alert("Please select any Image file before click \'Save\'");
        }
    }

    const handleName=(event)=>{
        SetName(event.target.value);
    }
    
    const AfterSubmit=()=>{
        const updatedPersona = { name: Name, image: SavedImage };

        if(EditStatus){
            (personas[editPersonaKey]).name = Name;
            (personas[editPersonaKey]).image = SavedImage;
        }
        else{
            setPersona((prevState) => {    
                addPersona(updatedPersona); 
                return updatedPersona;
            });
        }
        navigate(-1);
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
                <div className='Content' >
                    <p className='title'>Persona Name</p>
                    {/* <p className='personaName'>Sample</p> */}
                    {
                        EditStatus && <input
                                        type="text"
                                        className="personaName"
                                        placeholder="Sample"
                                        onChange={handleName}
                                        value={Name}
                                    />
                    }
                    {
                        EditStatus == false && <input
                                                type="text"
                                                className="personaName"
                                                placeholder="Sample"
                                                onChange={handleName}
                                            />
                        }
                </div>
                <button className='editImageBtn' onClick={()=>SetEditImgPopup(true)}>
                    Edit Image
                </button>
            </div>
            <div className='Input_container'>
                <div className='Input'>
                    <label>Notable Quote</label><br/>
                    <textarea placeholder='Enter quote that identifies the persona'/>
                </div>
                <div className='Input'>
                    <label>Description</label><br/>
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