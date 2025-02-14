import {useEffect , useState} from 'react';
import axios from 'axios';
import { Card } from './Card';
export const FetchData=()=>{
    const [data, setData] = useState(null);
    const [ loading , setLoading] = useState(true);

    useEffect(()=>{
        axios.get("https://api.restful-api.dev/objects")
        .then((response) => {
            setData(response.data);
            // console.log(response.data);
            setLoading(false);
        })
    },[]);
    if(loading){
        return <p>Loading..</p>;
    }
    if(data == null){
        return <p>Error! </p>;
    }
    return(
        <>
        <div className='CardList'>
        {data.map((item) => {
            return (<Card card={item}/>)
        })}
        </div>
        </>
    );
};
