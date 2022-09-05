import React,{useState,useEffect} from "react";
import { Link ,useHistory} from 'react-router-dom';
import axios from 'axios';
import '../styles/style.css'
import UserSession from '../contexts/session';
import { useContext } from 'react';
const List=()=>{
    const [pirates,setPirates]=useState([]);
    const user=useContext(UserSession)
    const history=useHistory();
    useEffect(()=>{
        if(user.user==null){
            history.push('/')
        }else{
        axios.get('http://localhost:8000/api/all')
        .then(res=>setPirates(res.data))
        .catch(err=>console.log(err))
    }},[pirates])
    
    const deletePirate=(pirateId)=>{
        axios.delete(`http://localhost:8000/api/${pirateId}`)
        .then(res=>{console.log(res)})
        .catch(err=>console.error(err));
    }

    const logOut=()=>{
        user.setUser(null)
        history.push('/');
    }
    
    return(
        <div className="container">
            <button onClick={logOut}>Logout</button>
            <Link to='/new'><button>Add a pirate</button></Link>
                {pirates.map((pirate,i)=>
                <div className="show">
                    <p>{pirate.name}</p>
                    <div className="btns">
                        <Link to={`/pirates/${pirate._id}`}><button>View Pirate</button></Link>
                        <button onClick={(e)=>{deletePirate(pirate._id)}}>Walk the Plank</button>
                    </div>
                </div>
                )
}</div>)
}


export default List;