import {useState} from 'react';
import './Form.css';
import { PopUp } from './PopUp';
export const Form=()=>{
    const [ inputBoxes, setInputBoxes] = useState([]);
    const [ Obj , setObj] = useState({name: "" , age: "", skill: "",designation: "", address : ""});
    const [ ObjIndex, setIndex] = useState(null);
    const [ addButtonState, setAddButtonState] = useState(false);
    const [ delButtonState, setDelButtonState] = useState(false);
    const [ editButtonState, setEditButtonState] = useState(false);
    const SetAddBtnState=(value)=>{
        setAddButtonState(value);
        setObj({name: "" , age: "", skill: "",designation: "", address : ""});
    }
    const SetEditBtnState=(value, ObjIndex)=>{
        setEditButtonState(value);
        if(value){
            setIndex(ObjIndex);
            setObj(inputBoxes[ObjIndex]);
        }
        else{
            setIndex(null);
        }
    }
    
    const SetDelBtnState=(value, ObjIndex)=>{
        setDelButtonState(value);
        if(value){
            setIndex(ObjIndex);
            setObj(inputBoxes[ObjIndex]);
        }
        else{
            setIndex(null);
            setObj({name: "" , age: "", skill: "",designation: "", address : ""});
        }
    }
    
    const handleChange = (event) => {
        setObj({...Obj, [event.target.name] :  event.target.value});
    };
    const AfterClickAdd=()=>{
        setInputBoxes([...inputBoxes, Obj]) ;
        SetAddBtnState(false);
        setObj({name: "" , age: "", skill: "",designation: "", address : ""});
    }
    const AfterClickEdit=()=>{
        inputBoxes[ObjIndex].name = Obj.name;
        inputBoxes[ObjIndex].age = Obj.age;
        inputBoxes[ObjIndex].skill = Obj.skill;
        inputBoxes[ObjIndex].designation = Obj.designation;
        inputBoxes[ObjIndex].address = Obj.address;

        SetEditBtnState(false, null);
        setObj({name: "" , age: "", skill: "",designation: "", address : ""});
    }
    const AfterDeleteClick=()=>{
        const OldInputBoxes = [...inputBoxes];
        OldInputBoxes.splice(ObjIndex, 1);
        setInputBoxes(OldInputBoxes);
        SetDelBtnState(false, null);
    };
 
    const OperationStart=()=>{
        return(
            
            <div className='PopupMessage'>
                { (editButtonState || addButtonState) && <>
                    <label htmlFor='name'>Name : </label>
                    <input type="text" onChange={handleChange} name="name" id='name' value={Obj.name}/><br/>
                
                    <label htmlFor='age'>Age : </label>
                    <input type="number" onChange={handleChange} name="age" id="address" value={Obj.age}/><br/>
                
                    <label htmlFor='skill'>Skill : </label>
                    <input type="text" onChange={handleChange} name="skill" id="address" value={Obj.skill}/><br/>
                
                
                    <label htmlFor='designation' >Designation : </label>
                    <input type="text" onChange={handleChange} name="designation" id="address" value={Obj.designation}/><br/>
                
                    <label htmlFor='address' >Address : </label>
                    <input type="text" onChange={handleChange} name="address" id="address" value={Obj.address}/><br/>
                
                <br/></>}

                
                { addButtonState && <>
                    <button onClick={AfterClickAdd} className='yellowButton button1'>Save</button>
                    <button onClick={()=>SetAddBtnState(false)} className='button2 redButton'>Close</button>
                    </>}   
                    { editButtonState && <>
                        <button onClick={()=>AfterClickEdit()} className='yellowButton button1'>Update</button>
                        <button onClick={()=>SetEditBtnState(false)} className='button2 redButton'>Close</button>
                        </>}
                        {delButtonState && <>
                                <label>Delete {Obj.name} record</label><br/><br/>
                                <button onClick={()=>AfterDeleteClick()} className='yellowButton button1'>Confirm</button>
                                <button onClick={()=>SetDelBtnState(false)} className='button2 redButton'>Cancel</button>
                                </>}
              
            </div>
        )
    }
   
    return(
        <div className='box-container'>
            <button className='addNewButton' onClick={()=>SetAddBtnState(true)} > Add New</button>
            
            {
                addButtonState == true && OperationStart()
            }
            
            <table>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Skill</th>
                    <th>Designation</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
                
                {inputBoxes.map((value, key)=>(
                    <tr key={key}>
                    <td>{value.name}</td>
                    <td>{value.age}</td>
                    <td>{value.skill}</td>
                    <td>{value.designation}</td>
                    <td>{value.address}</td>
                    <td><button className='bluebutton' onClick={()=>SetEditBtnState(true, key)} > Edit</button>
                    { editButtonState == true && OperationStart()}
                    <button className='redButton' onClick={()=>SetDelBtnState(true, key)}> Delete</button>
                    {
                        delButtonState == true && OperationStart()
                        }
                    </td>
                </tr>
                ))}
                </table>
                
        </div>
    );
}