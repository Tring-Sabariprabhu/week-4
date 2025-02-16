import { useNavigate, useParams } from 'react-router-dom';
import tringapps from './Images/tringapps.svg';
import './Personas.css';
import './Home.css';
import { UserContext } from './UserContext';
import { useContext } from 'react';

export const Home=()=>{
    const navigate = useNavigate();
    const params = useParams();
    const { user, setUser } = useContext(UserContext);

    // const AfterClickLogout=()=>{
    //     setUser({name: null, email: null});
    //     navigate('/login');
    // };  
    
    return(
        
        <div className='HomePage CardListPage'>
            <div className='Header'>
                {console.log(params)}
                    <div className='logo'>
                        <p >tringapps</p>
                    </div>
                    <div className='buttons'>      
                        {
                            user.email == null ? 
                            <>
                            <button className='button_color' onClick={()=>navigate('/login')}>Login</button>
                            <button className='button_color' onClick={()=>navigate('/register')}>Register</button>
                            </>
                            :
                            <>
                            <button className='button_color' 
                                // onClick={()=>AfterClickLogout()}
                                >Logout</button>
                            </>
                        }
                        
                    </div>
            </div>
            
            <div className='bottom_container'>
                    <button className='button_color' onClick={()=>navigate('/persona')}>Go to Persona Page</button>
            </div>
        </div>
        
    )
}