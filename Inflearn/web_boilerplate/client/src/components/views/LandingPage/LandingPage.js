import React, {useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

function LandingPage() {

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/test')
    .then(response => {console.log(response.data)})
  }, []);

  const logoutHandler = () => {
    axios.get(`/api/users/logout`)
      .then(response => {
        if(response.data.success === true){
          navigate('/');
        } else {
          alert('Failed to logout!');
        }
      })

  };

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      <h2>Home</h2>
      <br/><br/><button onClick={logoutHandler}>
      Logout
      </button>
    </div>
  )
}

export default LandingPage;