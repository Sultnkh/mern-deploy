import React, { useState,useContext } from 'react'
import { useHistory,Link} from 'react-router-dom';
import axios from 'axios';
import UserSession from '../contexts/session';
import '../styles/style.css'


const New = () => {
    const userSess=useContext(UserSession)
    const [user,setUser]=useState({});
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const[error, setError] = useState([]);
    const history=useHistory();
    
    const RegHandler = e => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/register", {firstName,lastName,email,password})
        .then(res=>history.push("/pirates"),userSess.setUser(user))
        .catch(err=> {
            const errorObj = err.response.data.errors
            let errArr = []
            for (const key of Object.keys(errorObj)){
                errArr.push(errorObj[key].message)
            }
            setError(errArr)})
    };


    return (
        <div className="logreg">
            <div className="reg">
                <form onSubmit={RegHandler} className="reg">
                {error.map((error,i) => <p key={i}>{error}</p>)}
                <label>First Name:</label>
                <input type="text" onChange={(e)=>setFirstName(e.target.value)} value={firstName}/>
                <label>Last Name:</label>
                <input type="text" onChange={(e)=>setLastName(e.target.value)} value={lastName}/>
                <label>Email:</label>
                <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                <label>Password:</label>
                <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} />
                <input type="submit" value='Register' />
                </form>
            </div>
            <Link to='/login'><button>To Login</button></Link>
            </div>
    )
}

export default New;