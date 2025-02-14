import { InputFields } from "./InputField";
import { useState } from "react";

import './Form.css';


function Form() {
    const [rows, setRows] = useState([
        { name: "", location: "" }
    ]);

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const newRow = [...rows];
        newRow[index][name] = value;
        setRows(newRow);
    };

    // Function to add a new row
    const addRow = () => {
        setRows([...rows, { name: "", location: "" }]);
    };

    // Function to remove a row
    const removeRow = (index) => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
    };

    // Function to get all values
    const getValues = () => {
        console.log(rows);
    };

    return (
        <>
        
        <table className="form">
            <h1>Form with Multiple Inputs</h1>    
            {rows.map((row, index) => (
            
                <div key={index} className="inputsRow">
                    <tr>
                    <td><input 
                        className="item"
                        type="text" 
                        name="name" 
                        placeholder="Name" 
                        value={row.name} x
                        pattern="/^[A-Za-z]+$/"
                        onChange={(event) => handleChange(index, event)} 
                    /></td>
                    <td>
                    <input 
                      className="item"
                        type="text"
                        pattern="/^[0-9]+$/"
                        name="number" 
                        placeholder="Age" 
                        value={row.age} 
                        
                        onChange={(event) => handleChange(index, event)} 
                    /></td>
                    <td>
                    <input 
                    className="item"
                        type="text" 
                        name="location" 
                        placeholder="Location" 
                        value={row.location} 
                        pattern="/^[A-Za-z]+$/	"
                        onChange={(event) => handleChange(index, event)} 
                    /></td>

                    <td><button onClick={addRow} className="addButton item">+</button>
                    {
                        rows.length > 1 && <button type="button" onClick={()=>removeRow(index)}  className="removeButton item">-</button>
                    }</td>
                    </tr>
                    
                </div>
            ))}
            <tr><td>
            <button onClick={getValues} className="submitButton">Submit</button>
            </td>
            </tr>
        </table>
        </>
    );
}

  
  export default Form;  