import React, { useState } from 'react';
import './Login.css';
import Movies from './Movies';

function Login({ handleSubmit }) {

   const [email, setEmail] = useState("");
   const [emailError, setEmailError] = useState("");

   const [password, setPassword] = useState("");
   const [passwordError, setPasswordError] = useState("");

   const [successMsg, setSuccessMsg] = useState("");

   const [showMovies, setShowMovies] = useState(false);
   const [movies, setMovies] = useState([]);

   const handleEmailChange = (event) => {
      setSuccessMsg('');
      setEmailError('');
      setEmail(event.target.value);
   }

   const handlePasswordChange = (event) => {
      setSuccessMsg('');
      setPasswordError('');
      setPassword(event.target.value);
   }

   const onSubmit = event => {
      if (handleSubmit) {
         handleSubmit();
      }
      event.preventDefault();

      if (email !== "") {
         const validEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
         if (validEmail.test(email)) {
            setEmailError('');
            if (email === 'viswanathdev95@gmail.com') {
               setEmailError('');
               if (password === '770nevergiveup') {
                  setSuccessMsg("You logged in successfully");
                  const moviesurl = `https://api.themoviedb.org/3/movie/top_rated?api_key=649592f41dea5ca5cec2fa57b6969e8d&language=en-US&page=1`
                  fetch(moviesurl)
                     .then((resp) => resp.json())
                     .then((data) => {
                        setMovies(data.results);
                     })
                  setShowMovies(true);
               }
               else {
                  setPasswordError('password does not match with the entered email');
               }
            }
            else {
               setEmailError('Type the correct email');
            }
         }
         else {
            setEmail('Invalid email');
         }
      }
      else {
         setEmailError('email is required');
      }

      if (password !== "") {
         //
      }
      else {
         setPasswordError('password is required');
      }
   }

   return (
      <div id="form">
         {successMsg && <div>{successMsg}</div>}

         <form onSubmit={onSubmit}>

            <div id="email">
               Email:
   <input
                  type="email"
                  id="email-input"
                  name="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={handleEmailChange}
               />

               {emailError && <div>{emailError}</div>}
            </div>
            <br></br>

            <div id="password">
               Password:
   <input
                  type="password"
                  id="password-input"
                  name="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={handlePasswordChange}
               />

               {passwordError && <div>{passwordError}</div>}
            </div>
            <br></br>

            <div>
               <button id="loginbutton" type="submit">
                  LOGIN
      </button>

            </div>

         </form>
         <div>
            {showMovies && <Movies movies={movies} />}
         </div>

      </div>

   );
}

export default Login;
