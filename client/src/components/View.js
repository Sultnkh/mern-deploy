import React ,{useEffect,useContext} from "react";
import { useState } from "react";
import { useParams,useHistory,Link } from "react-router-dom";
import UserSession from '../contexts/session';
import axios from "axios";

const View =()=>{
    const userSess=useContext(UserSession)
    const history=useHistory();
    const {id}=useParams();
    const [pirate,setPirate]=useState({});
    const [eye, setEye] = useState(false);
    const [peg, setPeg] = useState(false);
    const [hook, setHook] = useState(false);

    useEffect(()=>{
        if(userSess.user==null){
            history.push('/')
        }else{
        axios.get('http://localhost:8000/api/'+id)
        .then(res=>setPirate(res.data))
        .catch(err=>console.log(err))
}},[id,pirate])

    const logOut=()=>{
        userSess.setUser(null)
        history.push('/');
    }

    return(
        <>
        <button onClick={logOut}>Logout</button>
        <Link to="/pirates"><button>Dashboard</button></Link>
        <h1>{pirate.name}</h1>
        <p>{pirate.catchf}</p>
        <h3>About</h3>
        <p>Position: {pirate.pos}</p>
        <p>Treasure: {pirate.tres}</p>
        <p>Peg Leg: {pirate.peg? 'Yes':'No'} 
        <button onClick={e =>{
                            axios.put("http://localhost:8000/api/" + pirate._id, {"peg": pirate.peg ? false : true});
                            setPeg(peg ? false : true);
                        }}>
                            {peg ? "Yes" : "No"}</button></p>
        
        <p>Eye Patch: {pirate.eye? 'Yes':'No'}
        <button onClick={e =>{
                            axios.put("http://localhost:8000/api/" + pirate._id, {"eye": pirate.eye ? false : true});
                            setEye(eye ? false : true);
                        }}>
                            {eye ? "Yes" : "No"}</button>
                            </p>
        <p>Hook Hand: {pirate.hook? 'Yes':'No'}
        <button onClick={e =>{
                            axios.put("http://localhost:8000/api/" + pirate._id, {"hook": pirate.hook ? false : true});
                            setHook(hook ? false : true);
                        }}>
                            {hook ? "No" : "Yes"}</button>
                            </p>
        </>
    )
}

export default View;