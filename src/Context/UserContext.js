import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [ user, setUser ] = useState({ name: null, email: null });
  const [ personas, setPersonas] = useState([]);
  
  useEffect(()=>{

    if(user.email != null){
      const storedUser = JSON.parse(localStorage.getItem(user.email)) || {};
  
      const updatedUser = {
          ...storedUser,
          personas: personas
      }; 
      localStorage.setItem(user.email, JSON.stringify(updatedUser));
    }
  }, [personas] );
  
  
  
 
  const deletePersona = (index) => {
    setPersonas(prevPersonas => {
      const updatedPersonas = [...prevPersonas]; // Create a new copy
      updatedPersonas.splice(index, 1);
      return updatedPersonas;
    })
  }
  const addPersona = (newPersona) => {
    setPersonas([...personas, newPersona]);         // Add new persona to the array
    
  };
  const setEditedPersona = (index, personadata)=>{
    setPersonas(prevPersonas => {
      const updatedPersonas = [...prevPersonas]; // Create a new copy
      updatedPersonas[index] = personadata; // Modify the copy
      return updatedPersonas;
    }
  )
  }

  return (
    <UserContext.Provider value={
        {   user,
            setUser,
            personas,
            setPersonas,
            addPersona, 
            deletePersona,
            setEditedPersona
            }
        }>
      {children}
    </UserContext.Provider>
  );
};
