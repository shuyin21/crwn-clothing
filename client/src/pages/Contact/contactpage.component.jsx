import  React,{useState} from 'react';
import "./contactpage.styles.scss"
import {db} from '../../firebase/firebase.utils';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

const ContactPage = ()=>{
const [name, setName]= useState("");
const [email, setEmail]= useState("");
const [message, setMessage]= useState("");
const [loader, setLoader] = useState(false);

const handleSubmit = (e) => {
  e.preventDefault()
  setLoader(true);


  db.collection('contacts').add({
    name:name,
    email:email,
    message:message,
  })
  .then(() => {
    alert('Message has been submitted');
    setLoader(false);
  })
  .catch(error=> {alert(error.message);
    setLoader(false);
  });
  setName('');
  setEmail('');
  setMessage('');
};

return(<div className='contact-container'><h1>Contact Us</h1>
<form className="form-container"
onSubmit={handleSubmit}>
      <div>
      <FormInput
      className='form'
      type='text'
      name='fullName'
      value={name}
      onChange={(e) => setName(e.target.value)}
      label='full name'
      required
       /></div>
        <FormInput
            type='text'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label='email'
            required
          />
<div>
      
      <h3>Add your message</h3>
      <textarea 
      type='text'
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      label='message'
      required
      ></textarea>
      </div>
      
      <CustomButton className='submit-button' type="submit" >Submit</CustomButton>
    </form></div>
  );
}
export default ContactPage;