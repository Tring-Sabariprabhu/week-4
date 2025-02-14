import { Card } from './Card';
export const CardList=(props)=>{
    return(
        <div className='CardList'>
        {props.data.map((item) => {
            return (<Card card={item}/>)
        })}
        
        </div>
    )
}