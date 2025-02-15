import tringapps from './Images/tringapps.svg';
import './Home.css';


export const Home=()=>{
    return(
        
        <div className='Homepage'>
            <div className='Header'>
                    <div>
                        <p>tringapps</p>
                    </div>
                    <div className='buttons'>      
                        <button className='Btn'>Logout</button>
                    </div>
            </div>
            
            <div className='bottom_container'>
                <div className='button'> 
                    <p>Persona</p>
                    <button className='Btn'>+ Add Persona</button>
                </div>
                <div className='CardList'>
                    <div className='Card'>
                        <div className='div1'>

                        </div>
                        <div className='div2'>
                            <div className='CardName'>
                                <p>Sample</p>
                            </div>
                        </div>
                    </div>
                    <div className='Card'></div>
                    <div className='Card'></div>
                    <div className='Card'></div>
                    
                </div>
            </div>
        </div>
        
    )
}