
import { useState } from "react";
import './Form.css';

function Form() {
    const [rows, setRows] = useState([
        { name: "", age: "", location: "" }
    ]);

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const newRow = [...rows];
        newRow[index][name] = value;
        setRows(newRow);
    };


    const addRow = () => {
        setRows([...rows, { name: "", age: "", location: "" }]);
    };


    const removeRow = (index) => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
    };


    const getValues = () => {
        console.log(rows);
    };

    return (
        <form>
            <h1>Form with Multiple Inputs</h1>
            <table>
                {rows.map((row, index) => (
                    <div key={index} className="inputsRow">
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={row.name} 
                                    onChange={(event) => handleChange(index, event)}/>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="age"
                                    placeholder="Age"
                                    value={row.age}
                                    onChange={(event) => handleChange(index, event)} />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Location"
                                    value={row.location}
                                    onChange={(event) => handleChange(index, event)} />
                            </td>

                            <td>
                                <button type="button" onClick={addRow} className="addButton item">+</button>
                                {
                                    rows.length > 1 && <button type="button" onClick={() => removeRow(index)} className="removeButton item">-</button>
                                    }
                            </td>
                        </tr>
                    </div>
                ))}
                <tr>
                    <td>
                        <button type="submit" onClick={getValues} className="submitButton">Submit</button>
                    </td>
                </tr>
            </table>
        </form>

    );
}


export default Form;  