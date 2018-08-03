import React from 'react';

//In a way is simpler than redux
//we dont have to install anything else

//create the context or store
//to create the context we call createContext and pass a value
//in this case I will pass null
const AppContext = React.createContext(null);

//export the context
//like in redux you have to export the store
export default AppContext;