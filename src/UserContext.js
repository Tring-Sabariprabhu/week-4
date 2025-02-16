import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [ user, setUser ] = useState({ name: null, email: null });
  const [ personas, setPersonas] = useState([]);
  const [ editPersonaKey, setEditPersonaKey ] = useState(null);
//   const [ TEMP_Persona , setTEMP_Persona] = useState({name: null, image: null});


  const SetEditPersonaKey = (index)=>{
    setEditPersonaKey(index);
    
  }
 
  const deletePersona = (index) => {
    const OldPersonas = personas;
    OldPersonas.splice(index, 1);
    setPersonas(OldPersonas);
  }
  const addPersona = (newPersona) => {
    setPersonas([...personas, newPersona]);         // Add new persona to the array
  };
  return (
    <UserContext.Provider value={
        {   user,
            setUser,
            personas,
            setPersonas,
            addPersona, 
            editPersonaKey, 
            SetEditPersonaKey,
            deletePersona
            }
        }>
      {children}
    </UserContext.Provider>
  );
};
