import React from 'react'
import { useNavigate } from 'react-router-dom';

const Reset = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = {
          email: formData.get('email')
      };
      console.log(data);
  }

  return (
    
    <div className='body'>
      <div className="auth-container">
    <h1>Forget Password</h1>
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>
      <button id="submit" type="submit">Submit</button>
      <p className="auth-footer-text">
          Already have an account?
          <a onClick={() => navigate("/signin")}>Sign In</a>
        </p>
    </form>
  </div>
    </div>
  )
}

export default Reset