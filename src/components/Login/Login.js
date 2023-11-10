import React, { useState, useEffect, useReducer,useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../Store/AuthContext';
import Input from '../UI/Input/input';

const emailReducer = (state, action) => {
  if (action.type === 'userinput') {
    return { value: action.value, isvalid: action.value.includes('@') };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isvalid: state.value.includes('@') };
  }
  return { value: '', isvalid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === 'userinput') {
    return { value: action.value, isvalid: action.value.trim().length > 6 };
  }
  if (action.type === '') {
    return { value: action.value, isvalid: action.value.trim().length > 6 };
  }
  return { value: '', isvalid: false };
};

const Login = (props) => {
  const [enteredcollege, setEnteredcollege] = useState('');
  const [collegeIsValid, setcollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const authctx=useContext(AuthContext)

  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isvalid: null });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isvalid: null });

  const {isvalid:emailisvalid}=emailState;
  const {isvalid:passwordisvalid}=passwordState;
 


  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'userinput', value: event.target.value });

    setFormIsValid(
      event.target.value.includes('@') &&
        passwordState.isvalid &&
        enteredcollege.trim().length > 0
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'userinput', value: event.target.value });

    setFormIsValid(
      emailState.isvalid &&
        event.target.value.trim().length > 6 &&
        enteredcollege.trim().length > 0
    );
  };

  const collegeChangeHandler = (event) => {
    setEnteredcollege(event.target.value);

    setFormIsValid(
      emailState.isvalid &&
        passwordState.isvalid &&
        event.target.value.trim().length > 0
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    
  };

  const validateCollegeHandler = () => {
    setcollegeIsValid(enteredcollege.trim().length > 7);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authctx.onLogin(emailState.value, passwordState.value, enteredcollege);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input id='email' 
        label='E-Mail' 
        type='email' 
        isvalid={emailisvalid} 
        value={emailState.value}  
        onChange={emailChangeHandler} 
        onBlur={validateEmailHandler}/>
        
         
        
          
          <Input id='password' 
        label='password' 
        type='password' 
        isvalid={passwordisvalid} 
        value={passwordState.value}  
        onChange={passwordChangeHandler} 
        onBlur={validatePasswordHandler}/>
        
       
         
        
          
          <Input id='college' 
        label='college' 
        type='text' 
        isvalid={collegeIsValid} 
        value={enteredcollege.value}  
        onChange={collegeChangeHandler} 
        onBlur={validateCollegeHandler}/>
        
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
