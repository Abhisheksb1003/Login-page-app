import React, {useState,useEffect}from 'react';

const AuthContext=React.createContext({
    isLoggedIn:false,
    onLogout:()=>{},
    onLogin:(email,password)=>{}

});

export const AuthContextProvider=(props)=>{
    const [isLoggedIn,setIsLoggedIn]=useState(false);

    useEffect(()=>{
        const storageinformation=localStorage.getItem('isLoggedIn');
    
      if(storageinformation=== '1'){
        setIsLoggedIn(true)
      }
    
      },[]);

    const logouthandler=()=>{
        localStorage.removeItem('isLoggedIn')
        setIsLoggedIn(false)
    };

const loginhandler=()=>{
    localStorage.setItem('isLoggedIn','1');
    setIsLoggedIn(true)
};


    return <AuthContext.Provider value={{
        isLoggedIn:isLoggedIn,
         onLogout:logouthandler,
         onLogin:loginhandler}}
         >
            {props.children}
         </AuthContext.Provider>
    }
     
     
   

export default AuthContext