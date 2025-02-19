import { useNavigate } from 'react-router-dom';
import tringapps from './Images/tringapps.svg';
import './Personas.css';
import { useContext, useEffect } from 'react';
import { UserContext } from './UserContext';

export const Personas=()=>{
    const navigate = useNavigate();
    const { user,  personas, SaveEditPersonaKey, editPersonaKey ,User} = useContext(UserContext);


    const SetPersonaIndex=(index)=>{
        // SaveEditPersonaKey(index);                      
          navigate(`/editpage/${index}`);
    }
    useEffect(()=>{
        if(user.name == null){
            navigate('/');
        }
    },[]);

    return(

        <div className='CardListPage'>
          
            <div className='Header'>
                    <div className='logo'>
                        <p>tringapps</p>
                    </div>
                    <div className='buttons'>      
                        <button className='button_color' onClick={()=>navigate('/')}>Home</button>
                    </div>
            </div>
            
            <div className='bottom_container'>
                <div className='Header'> 
                    <p>Persona</p>
                    <button className='AddButton' 
                        onClick={()=>navigate('/editpage')}
                        ><span>+</span> Add Persona</button>
                </div>
                <div className='CardList' >
                   
              
                    {personas.length > 0 && personas.map((persona, index) => (
                        <div key={index} className="Card" onClick={()=>SetPersonaIndex(index)}>
                            <div className="div1"  style={{
                                                        background: persona.image ? `url(${persona.image}) center/100% no-repeat` : "white"
                                                    }}>
                                {/* <button onClick={()=>SavePersonaIndex(index)}>Edit</button> */}
                                { persona.image==null && <p className='ImageNotFound'>No image</p>}
                            </div>
                            <div className="div2">
                                <div className="Card_details">
                                    <p className='name'>{persona.name}</p>
                                    <p className='quote'>{persona.quote}</p>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    ))}
                         <div className='DefaultCard ' onClick={()=>navigate('/editpage')}>
                            <p className='text'>Add</p>
                            <div className='circle'>
                                <span>+</span>
                            </div>
                        </div>
                    
                   
                    
                    
                </div>
            </div>
        </div>
        
    )
}