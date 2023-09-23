import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Headerr from './component/Headerr';
function App() {
  const [editMode,setEditMode]=useState(false);
  const [list,setList]=useState([]);
  const [firstName,setFirstName]=useState('');
  const [lastName,setLastName]=useState('');
  const [userId,setUserId]=useState('');


  const showTodos = async ()=>{
    try{
       const {data} = await  axios.get("/api/show/todos");
       setList(data);
    }catch(error){
     console.log(error);
    }
  }
// add todo
  const addTodo = async (e)=>{
    e.preventDefault();
    try{
       const add = await  axios.post('/api/create/list',{firstName, lastName});
    if(add.status === 200){
      setFirstName('');
      setLastName('');
      showTodos();

    }
    }catch(error){
     console.log(error);
    }
  }

  // delete single todo
  const deleteTodo = async (id)=>{
   
    try{
       const todoDelete = await  axios.delete(`/api/delete/todo/${id}`);
    if(todoDelete.status === 200){
      
      showTodos();

    }
    }catch(error){
     console.log(error);
    }
  }

   // show single todo
   const showSingleTodo = async (id)=>{
    setEditMode(true);
    try{
       const { data } = await  axios.get(`/api/todo/${id}`);
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setUserId(data.id);
    
    }catch(error){
     console.log(error);
    }
  }

   // Edit todo
   const editTodo = async (e)=>{
    e.preventDefault()
    try{
       const edit = await  axios.put(`/api/update/todo/${userId}`,{firstName,lastName});
   console.log(edit)
   if(edit.status === 200){
    setEditMode(false);
    setFirstName('');
    setLastName('');
    showTodos();

   }
    
    }catch(error){
     console.log(error);
    }
  }


  useEffect(()=>
  {
    showTodos();
  }, []);

  

  return (
    <>
    <h1 style={{textAlign:"center", margin:"1%"}}> Tyni application "List of users" Node.js react js mysql</h1>
    <Headerr/>
<div className='container'>
  <div className='form' style={{ display:"flex", padding:"50px",justifyContent:"center"}}>
  <form onSubmit={editMode ? editTodo : addTodo}>
    <div className='form-wrapper' style={{display: "flex", justifyContent:"space-between"}}>
      <div style={{flex:1,marginRight:"10px"}}>
        <input onChange={(e)=>setFirstName(e.target.value)} value={firstName} className='form-control' type="text" placeholder='first name' name="firstName">

        </input>

      </div>
      <div style={{flex:1}} >
        <input onChange={(e)=>setLastName(e.target.value)} value={lastName}  className='form-control' type="text" placeholder="last name" name="lastName"></input>
      </div>
      {
        editMode ?
        <button type='submit' style={{ width:"200px", marginLeft:"10px"}} className='btn btn-primary'>Edit</button>
        :
        <button type='submit' style={{ width:"200px", marginLeft:"10px"}} className='btn btn-success'>+ Add</button>

      }
    </div>
  </form>
  </div>
<table className='table'>
  <thead>
    <tr>
      <th scope='col'>#</th>
      <th scope='col'>First name</th>
      <th scope='col'>Last name</th>
      <th scope='col'>Actions</th>
    </tr>
  </thead>
  <tbody>
  {

    list && list.map(d => (

      <tr key={d.id}>
      <th scope="row">{d.id}</th>
      <td>{d.firstName}</td>
      <td>{d.lastName}</td>
      <td>
        <i onClick={()=> showSingleTodo(d.id)} className='fa-solid fa-pen-to-square' style={{ color: "green", cursor:'pointer'}}> </i>

        <i onClick={()=> deleteTodo(d.id)} style={{ color: "red", cursor:"pointer"}} className='fa-solid fa-trash-can'> </i>
      </td>
    </tr>
    ))
  }
 
   
  </tbody>
</table>
  
</div>
</>
  );
}

export default App;
