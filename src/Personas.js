import { useNavigate } from 'react-router-dom';
import tringapps from './Images/tringapps.svg';
import './Personas.css';
import { useContext } from 'react';
import { UserContext } from './UserContext';

export const Personas=()=>{
    const navigate = useNavigate();
    const {  personas, SetEditPersonaKey, editPersonaKey ,User} = useContext(UserContext);


    const SavePersonaIndex=(index)=>{
        SetEditPersonaKey(index);                      
        // Save Index for Editing Persona

        navigate('/editpage/edit');
    }
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
                <div className='button'> 
                    <p>Persona</p>
                    <button className='AddButton' 
                        // onClick={()=>navigate('/editpage/edit')}
                        >+ Add Persona</button>
                </div>
                <div className='CardList' >

                    {personas.length > 0 && personas.map((persona, index) => (
                    <div key={index} className="Card"
                        onClick={()=>SavePersonaIndex(index)}
                        >
                        <div className="div1" 
                             style={{
                                background: persona.image ? `url(${persona.image}) center/100% no-repeat` : "white"
                              }}
                            >
                            {/* <button onClick={()=>SavePersonaIndex(index)}>Edit</button> */}
                        </div>
                        <div className="div2">
                            <div className="CardName">
                                <p>{persona.name}</p>
                            </div>
                        </div>
                    </div>
                    ))}
                    
                    <div className='DefaultCard' onClick={()=>navigate('/editpage/create')}>
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