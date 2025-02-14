import './Card.css';
import phoneImage from './Images/VIVO_Y18.jpg';
export const Card=(props)=>{
    const obj = props.card.data;
    return(
        <div className="Card">
            <div className='Title'>
                <h3>{props.card.name}</h3>
            </div>
            <img src={phoneImage} alt=''/>
            <div className='Content'>
            { obj!=null && Object.entries(obj).map(([key, value])=>(
                <h4><span>{key} :</span>{value}</h4>
            ))}
            </div>
        </div>
    )
};