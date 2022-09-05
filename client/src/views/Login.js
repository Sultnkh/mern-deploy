import React, { useState } from 'react'
import { useHistory} from 'react-router-dom';
import { useContext } from 'react';
import axios from 'axios';
import UserSession from '../contexts/session';
import '../styles/style.css'


const New = () => {
    const userSess=useContext(UserSession)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    // const [user,setUser]=useState({});
    const[message, setMessage] = useState('');
    const history=useHistory();
    
    const LoginHandler = e => {
        e.preventDefault();
        axios.get(`http://localhost:8000/api/login/${email}`,)
        .then(res=>{
            if (res.data ===null){
                setMessage("User doesn't exist!")
            }
            else{
                    if (res.data.password===password){
                        userSess.setUser(res.data);
                        history.push('/pirates')
                    }else {
                        setMessage("Wrong password or email!")
                    }
            }

        })
        .catch(err=> console.log(err))
    };

    return (
            <div className='logreg'>
                <form onSubmit={LoginHandler} className="login">
                {message}
                <label>Email:</label>
                <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                <label>Password:</label>
                <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} />
                <input type="submit" value='Login' />
                </form>
            </div>
    )
}

export default New;