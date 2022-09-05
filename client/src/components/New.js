import React, { useState ,useEffect} from 'react'
import { Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import UserSession from '../contexts/session';
import { useContext } from 'react';


const positions = [
    'Captain',
    'First Mate',
    'Quarter Master',
    'Boatswain',
    'Powder Monkey'
];

const New = () => {
    const user=useContext(UserSession)

    const [name, setName] = useState(''); 
    const [imgg, setImgg] = useState('');
    const [tres, setTres] = useState(0);
    const [catchf, setCatchf] = useState('');
    const [pos, setPos] = useState(positions[0]);
    const [eye, setEye] = useState(true);
    const [peg, setPeg] = useState(true);
    const [hook, setHook] = useState(true);
    const[error, setError] = useState([])
    const [nameError, setNameError] = useState(""); 
    // const [ageError, setAgeError] = useState("");
    const history=useHistory();
    
    const onSubmitHandler = e => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/new", {name,imgg,tres,catchf,pos,eye,peg,hook})
        .then(res=>history.push("/pirates"))
        .catch(err=> {
            const errorObj = err.response.data.errors
            let errArr = []
            for (const key of Object.keys(errorObj)){
                errArr.push(errorObj[key].message)
            }
            setError(errArr)})
    };

    useEffect(()=>{
        if(user.user==null){
            history.push('/')
        }
    },[])

    const handleName = (e) =>{
        if(e.target.value.length < 1){
            setNameError("Name is required")
        }
        else if(e.target.value.length<3){
            setNameError("Name has to be more than 3 characters")
        }
        else{
            setNameError("")
        }
        setName(e.target.value)
    }

    const logOut=()=>{
        user.setUser(null)
        history.push('/');
    }

    return (
        <>
        <button onClick={logOut}>Logout</button>
        <form onSubmit={onSubmitHandler}>
            <Link to='/pirates'><button>Crew Board</button></Link>
            {error.map((error,i) => <p key={i}>{error}</p>)}
            <p>
                <label>Name</label><br/>
                {nameError}<br/>
                <input type="text" onChange={handleName} value={name}/>
            </p>
            <p>
                <label>Image URL:</label><br/>
                {/* {ageError}<br/> */}
                <input type="text" onChange={(e)=>setImgg(e.target.value)} value={imgg}/>
            </p>
            <p>
                <label># of treasures Chests:</label><br/>
                {/* {ageError}<br/> */}
                <input type="number" onChange={(e)=>setTres(e.target.value)} value={tres}/>
            </p>
            <p>
                <label>Catch phrase:</label><br/>
                {/* {ageError}<br/> */}
                <input type="text" onChange={(e)=>setCatchf(e.target.value)} value={catchf}/>
            </p>
            <p>
                <label>Crew Position:</label><br/>
                {/* {ageError}<br/> */}
                <select value={pos} onChange={e => setPos(e.target.value)}>
                {positions.map( (position, i) => 
                    <option key={i} value={position}>{position}</option>
                )}
            </select>
            </p>
            <label>
                <input type="checkbox" checked={peg} onChange={e => setPeg(e.target.checked)}/> Peg Leg
            </label>
            <label>
                <input type="checkbox" checked={eye} onChange={e => setEye(e.target.checked)}/>Eye Patch
            </label>
            <label>
                <input type="checkbox" checked={hook} onChange={e => setHook(e.target.checked)}/> Hook Hand
            </label>
            <input type="submit" value="Add Pirate"/>
        </form>
        </>
    )
}

export default New;