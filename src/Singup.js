import React, { useEffect }  from 'react';
import { useState } from 'react';
import  './Singup.css'






function Signup() {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [courseType, setCourseType] = useState('');
  const [privacyChecked, setPrivacyChecked] =  useState(false);
  const [errors, setErrors] =useState({})
  const [data , setData] = useState({})



 
  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;

  }else{
    const  formData = {fullName,email,phoneNumber,password,courseType }
      console.log(formData)
     fetch("http://localhost:8000/register", {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
       },
         body: JSON.stringify(formData),
       })
        .then((response) => response.json())
        .then((data) => {
                console.log(data)
     if(data.status ==="success"){
          setData({bool:"from is summited"})
    }  
    })
        .catch((error) => {
           
          console.error('Error:', error);
    });
  
      

  }
}
 


  const handlePrivacyChange = (e) => {
    setPrivacyChecked(e.target.checked);
  };
  const validateForm = () => {
    const errors = {};

    // Validate full name
    if (fullName.trim() === '') {
      errors.fullName = 'Full name is required';
    
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email address';

    }
    if (phoneNumber.trim() === '') {
      errors.phoneNumber = 'Phone number is required';
    }
    if (password.trim() === '') {
      errors.password = 'Password is required';
    }

    if (courseType === '') {
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
        <input type="text" value={fullName} name="fullName" placeholder='Fullname' onChange={(e) => setFullName(e.target.value)
        }  />
        <label>{errors.email}</label>
        <input type="email" value={email}  name="Email"  placeholder='Email' onChange={(e) => setEmail(e.target.value)} />

        <label>{errors.phoneNumber}</label>
        <input type="text" value={phoneNumber}  name="PhoneNumber" placeholder='Phone number' onChange={(e) => setPhoneNumber(e.target.value)} />
        <label>{errors.password}</label>
        <input type="password" value={password} placeholder='password' name='password' onChange={(e) => setPassword(e.target.value)} />
        <label>{errors.courseType}</label>
          < div className='select-contaier'>
        <select className='select' value={courseType} name="course" onChange={(e) => setCourseType(e.target.value)}>
          <option  className='type' value="">Select a course type</option>
          <option value="cs">Computer Science</option>
          <option value="maths">Mathematics</option>
          <option value="ml">Machine Learning</option>
        </select>
        </div>
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
