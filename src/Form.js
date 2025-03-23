import { useState } from 'react';
import './Form.css';
import { useForm } from 'react-hook-form';
import { makeToast } from './MakeToast';
export const Form = () => {
    const [inputBoxes, setInputBoxes] = useState([]);
    const [Index, setIndex] = useState(null);
    const [addButtonState, setAddButtonState] = useState(false);
    const [delButtonState, setDelButtonState] = useState(false);
    const [editButtonState, setEditButtonState] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm({ defaultValues: { name: "", age: "", skill: "", designation: "", address: "" } });

    const SetAddBtnState = (value) => {

        setAddButtonState(value);
        if (value) {
            reset({ name: "", age: "", designation: "", skill: "", address: "" });
        }

    }
    const SetEditBtnState = (value, EditIndex) => {
        setEditButtonState(value);
        if (value) {
            setIndex(EditIndex);
            const ExistData = inputBoxes[EditIndex];
            Object.keys(ExistData).forEach((key) => {
                setValue(key, ExistData[key]); // Update form fields
            });
        }
        else {
            setIndex(null);
        }
    }
    const SetDelBtnState = (value, DeleteIndex) => {
        setDelButtonState(value);
        if (value) {
            setIndex(DeleteIndex);
        }
        else {
            setIndex(null);
        }
    }


    const onSubmit = (data) => {
        if (addButtonState) {
            setInputBoxes([...inputBoxes, data]);
            makeToast('Record added', 'success');
            setAddButtonState(false);
        }
        else if (editButtonState) {
            inputBoxes[Index] = data;
            makeToast('Record updated', 'success');
            setEditButtonState(false);
        }
    }
 
    const AfterDeleteClick = () => {
        const OldInputBoxes = [...inputBoxes];
        OldInputBoxes.splice(Index, 1);
        setInputBoxes(OldInputBoxes);
        makeToast('Record deleted', 'success');
        SetDelBtnState(false, null);
    };

    const OperationStart = () => {

        return (
            <form className='PopupMessage' onSubmit={handleSubmit(onSubmit)}>
                {(editButtonState || addButtonState) && 
                <>
                    <div className='Input-div'>
                        <label>Name</label>
                        <input type="text" name="name" id='name' value={watch("name") || ""}
                            {...register("name", {
                                pattern: {
                                    value: /^[A-Za-z\s]*$/,
                                    message: "Name should only contain alphabets",
                                },
                                validate: {
                                    requiredCheck: (value) => value?.length > 0 || "Name is required",
                                    SpacesContained: (value) => (value?.trim()?.length > 0) || "Name Should be valid"
                                }
                            })} />
                    </div>
                    <p className='error'>{errors?.name?.message}</p>
                    <div className='Input-div'>
                        <label>Age</label>
                        <input type="text" name="age" id="age" value={watch("age") || ""}
                            {...register("age", {
                                pattern: {
                                    value: /^[0-9]*$/,
                                    message: "Age should be only numbers",
                                },
                                validate: {
                                    requiredCheck: (value) => value?.length > 0 || "Age is required",
                                    SpacesContained: (value) => (value?.trim()?.length > 0) || "Age Should be valid"
                                }
                            })} />
                    </div>
                    <p className='error'>{errors?.age?.message}</p>
                    <div className='Input-div'>
                        <label>Skill</label>
                        <input type="text" name="skill" id="skill" value={watch("skill") || ""}
                            {...register("skill", {
                                pattern: {
                                    value: /^[A-Za-z\s]*$/,
                                    message: "Skill should only contain alphabets",
                                },
                                validate: {
                                    requiredCheck: (value) => value?.length > 0 || "Skill is required",
                                    SpacesContained: (value) => (value?.trim()?.length > 0) || "Skill Should be valid"
                                }
                            })} />
                    </div>
                    <p className='error'>{errors?.skill?.message}</p>
                    <div className='Input-div'>
                        <label>Designation</label>
                        <input type="text" name="designation" id="designation" value={watch("designation") || ""}
                            {...register("designation", {
                                pattern: {
                                    value: /^[A-Za-z\s]*$/,
                                    message: "Designation should only contain alphabets",
                                },
                                validate: {
                                    requiredCheck: (value) => value?.length > 0 || "Designation is required",
                                    SpacesContained: (value) => (value?.trim()?.length > 0) || "Designation Should be valid"
                                }
                            })} />
                    </div>
                    <p className='error'>{errors?.designation?.message}</p>
                    <div className='Input-div'>
                        <label>Address</label>
                        <input type="text" name="address" id="address" value={watch("address") || ""}
                            {...register("address", {
                                validate: {
                                    requiredCheck: (value) => value?.length > 0 || "Address is required",
                                    SpacesContained: (value) => (value?.trim()?.length > 0) || "Address Should be valid"
                                }
                            })} />
                    </div>
                    <p className='error'>{errors?.address?.message}</p>
                </>}
                <div className='Buttons'>
                    {addButtonState &&
                        <>
                            <button type='submit'
                                className='yellowButton button1'>Save</button>
                            <button type='button'
                                onClick={() => SetAddBtnState(false)}
                                className='button2 '>Close</button>
                        </>}
                    {editButtonState &&
                        <>
                            <button type='submit'
                                className='yellowButton button1'>Update</button>
                            <button type='button'
                                onClick={() => SetEditBtnState(false, null)}
                                className='button2'>Close</button>
                        </>}
                    {delButtonState &&
                        <>
                            <label>Delete record</label><br /><br />
                            <button type='button'
                                onClick={() => AfterDeleteClick()}
                                className='redButton button1'>Delete</button>
                            <button type='button'
                                onClick={() => SetDelBtnState(false, null)}
                                className='button2'>Cancel</button>
                        </>}
                </div>
            </form>
        )
    }

    return (
        <div className='box-container'>

            <button className='addNewButton' onClick={() => SetAddBtnState(true)} > Add New</button>

            {
                addButtonState === true && OperationStart()
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

                {inputBoxes.map((value, key) => (
                    <tr key={key}>
                        <td>{value.name}</td>
                        <td>{value.age}</td>
                        <td>{value.skill}</td>
                        <td>{value.designation}</td>
                        <td>{value.address}</td>
                        <td><button className='bluebutton' onClick={() => SetEditBtnState(true, key)} > Edit</button>
                            {editButtonState === true && OperationStart()}
                            <button className='redButton' onClick={() => SetDelBtnState(true, key)}> Delete</button>
                            {
                                delButtonState === true && OperationStart()
                            }
                        </td>
                    </tr>
                ))}
            </table>

        </div>
    );
}