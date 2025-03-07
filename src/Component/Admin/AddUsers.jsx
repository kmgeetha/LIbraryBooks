import React, { useRef } from 'react'
import '../../Styles/addusers.css'

const AddUsers = () => {
    let fname= useRef()
    let lname=useRef()
    let mail=useRef()
    let phno=useRef()
    let place=useRef()
    let dob=useRef()


    let handlesubmit=(e)=>{
        e.preventDefault()
    let newUser={
        firstname: fname.current.value,
        lastname: lname.current.value,
        emailaddress: mail.current.value,
        phoneno: phno.current.value,
        place: place.current.value,
        dateofbirth: dob.current.value,
        Cart :[]
    }
    fetch(`http://localhost:4000/users`,{
        method:"POST",
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify(newUser)
    })
    alert('User Added successfully......!');
    // clear  Input fields  
    fname.current.value="";
    lname.current.value="";
    mail.current.value="";
    place.current.value="";
    phno.current.value="";
    dob.current.value="";
}
  return (
    <>
    <div className="addusers">
          <h1>
            Add Users
            </h1>
        <div>
            <form onSubmit={handlesubmit}>
                <input ref={fname} type="text" placeholder='Enter First name' />
                <input ref={lname} type="text" placeholder='Enter Last name' />
                <input  ref={mail} type="email" placeholder='Enter Email address' />
                <input ref={phno} type="tel" placeholder='Enter Phone Number' />
                <input ref={place} type="text" placeholder='Enter Place' />
                <input ref={dob} type="date" placeholder='Enter Date of Birth' />

                <button>ADD USERS</button>
            </form>
        </div>
    </div>
    </>
  )
}

export default AddUsers