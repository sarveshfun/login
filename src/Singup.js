
import { useState } from 'react';
import  './Singup.css'




function Signup() {
  const [formdata, setFormdata] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    courseType: "",
  });

  const [privacyChecked, setPrivacyChecked] =  useState(false);
  const [errors, setErrors] =useState({})




  const handle_change=(e)=>{
    const {name,value} = e.target
    setFormdata({...formdata,[name]:value})

 }

 
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('handleSubmit',privacyChecked)
    const validationErrors = validateForm();
     console.log(Object.keys(validationErrors).length)
    if (Object.keys(validationErrors).length >0 && privacyChecked) {
      console.log(errors)
      setErrors(validationErrors);
    

  }else if(privacyChecked){
     fetch("http://localhost:8000/register", {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
       },
         body: JSON.stringify(formdata),
       })
        .then((response) => response.json())
        .then((data) => {
         console.log(data.status , "from featch")
     if(data.status ==="success"){
        setFormdata({
          fullName: "",
          email: "",
          phoneNumber: "",
          password: "",
          courseType: "",
        })
    }  
    })
        .catch((error) => {
           
          console.error('Error:', error);
    });
  
      


  }else{
    
    setErrors(validationErrors)
  
  }
}



 


  const handlePrivacyChange = (e) => {
      console.log(e.target.checked)
    setPrivacyChecked(e.target.checked);
  };
  const validateForm = () => {
    const errors = {};
    if (formdata.fullName.trim() === '') {
      errors.fullName = 'Full name is required';
    
    }
    if (!/\S+@\S+\.\S+/.test(formdata.email)) {
      errors.email = 'Invalid email address';

    }
    if (formdata.phoneNumber.trim() === ''  && Number.isNaN(formdata.phoneNumber.trim())) {
      errors.phoneNumber = 'Phone number is required';
    }
    if (formdata.password.trim() === '') {
      errors.password = 'Password is required';
    }

    if (formdata.courseType === '') {
      errors.courseType = 'Course type is required';
    }

    if (!privacyChecked) {
      errors.privacyChecked = 'You must accept the privacy policy';
    }

    return errors;
  };


  return (
    <div className='Singup'>
        
        <div className='checkbox-container'> 
        <h1> REGISTER HERE </h1>
      </div>
      <form  className='from-name' onSubmit={handleSubmit}>
        <label>{errors.fullName}</label>
        <input type="text" value={formdata.fullName} name="fullName" placeholder='Fullname' onChange={handle_change}
          />
        <label>{errors.email}</label>
        <input type="email" value={formdata.email}  name="email"  placeholder='Email' onChange={handle_change}  />

        <label>{errors.phoneNumber}</label>
        <input type="text" value={formdata.phoneNumber}  name="phoneNumber" placeholder='Phone number' onChange={handle_change}  />
        <label>{errors.password}</label>
        <input type="password" value={formdata.password} placeholder='password' name='password' onChange={handle_change}  />
        <label>{errors.courseType}</label>
          < div className='select-contaier'>
        <select className='select' value={formdata.courseType} name="courseType" onChange={handle_change}>
          <option  className='type' value="">Select a course type</option>
          <option value="cs">Computer Science</option>
          <option value="maths">Mathematics</option>
          <option value="ml">Machine Learning</option>
        </select>
        </div>
        <label>{ errors.privacyChecked}</label>
         <div  className ="checkbox-containe">
        <input
            type="checkbox"
            checked={privacyChecked}
            onChange={handlePrivacyChange}
            id="privacyCheckbox"
          />
          <label htmlFor="privacyCheckbox">
            I agree to the privacy policy for the application
          </label>
</div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default Signup
