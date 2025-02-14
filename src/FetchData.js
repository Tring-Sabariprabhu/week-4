import {useEffect , useState} from 'react';
import axios from 'axios';
import { Card } from './Card';
import { CardList } from './CardList';
export const FetchData=()=>{
    const [data, setData] = useState(null);
    
    const handleChange=(event)=>{
        const value = event.target.value;
        if(value == "asc")
            setData([...data].sort((a, b) => a.name.localeCompare(b.name)))
        else if(value == "desc")
            setData([...data].sort((a, b) => b.name.localeCompare(a.name)))
         
        // data.map((value)=>{
        //     console.log(value.name);
        // })
    }
   
    
    useEffect(()=>{
        axios.get("https://api.restful-api.dev/objects")
        .then((response) => {
            setData(response.data);
            // console.log(response.data);
        })
    },[]);
    
    if(data == null){
        return <p>Error! </p>;
    }
    return(
        <>
        <select id="Sort" onChange={()=>handleChange}>
            <option value="asc">Asc order</option>
            <option value="desc">Desc Order</option>
        </select>
        
       {/* <CardList data={data}/> */}
        </>
    );
};