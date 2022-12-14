import React,{useState} from 'react'
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action'
import {useNavigate} from 'react-router-dom';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();  // 새로고침 방지?
    
    if(Password !== ConfirmPassword){
      return alert("Password and Confirm Password must be same.");
    }

    let body = {
      email: Email,
      name: Name,
      password: Password
    }

    dispatch(registerUser(body))
      .then(response => {
        if(response.payload.success){
          alert('Succeed to register!');
          navigate('/login');
        } else {
          alert('Failed to Register.');
        }
      });
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      <form style={{display: 'flex', flexDirection: 'column'}}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type='email' value={Email} onChange={onEmailHandler}/>
        <label>Name</label>
        <input type='password' value={Name} onChange={onNameHandler}/>
        <label>Password</label>
        <input type='password' value={Password} onChange={onPasswordHandler}/>
        <label>Confirm Password</label>
        <input type='password' value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
        <br/>
        <button>
          Sign up
        </button>
      </form>
    </div>
  )
}

export default RegisterPage;