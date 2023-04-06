import './App.css';
import { useState, useEffect } from 'react';
import Axios from "axios";


function App() {
  const [password, setPassword] = useState("");
  const [passwordPlace, setpasswordPlace] = useState("");
  const [passwordList, setPasswordList] = useState([]);

  //API Call when paged is rerendered
  useEffect(() => {
    Axios.get("http://localhost:3001/showpasswords").then((response) => {
      setPasswordList(response.data);
    });
  }, []);

  const storePassword = () => {
    Axios.post("http://localhost:3001/storepassword", {
      password: password,
      passwordplace: passwordPlace,
    });
  };


  const decryptPassword = (encryption) => {
    Axios.post("http://localhost:3001/decryptpassword", {
      password: encryption.password,
      iv: encryption.iv,
    }).then((response) => {
      setPasswordList(
        passwordList.map((val) => {
          return val.id == encryption.id
            ? {
                id: val.id,
                password: val.password,
                passwordplace: response.data,
                iv: val.iv,
              }
            : val;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className='PasswordFormContainer'>
        <label htmlFor="PasswordInput">Password to Be Stored:</label>
        <input type='text' id='PasswordInput' placeholder='Input Password Here'
        onChange={
          (e)=>
          {
            setPassword(e.target.value)
          }
        }
        />
        <label htmlFor="PasswordPlaceInput">What is the Password For:</label>
        <input type='text' id='PasswordPlaceInput' placeholder='Input Where Password Used Here'
         onChange={
          (e)=>
          {
            setpasswordPlace(e.target.value)
          }
        }
        />
        <button>Store Password</button>
      </div>
      <div className='PasswordList'>
        <h1>Password List</h1>
        {passwordList.map((val, key)=>{
                    return (
                      <div
                        className="PasswordListEntry"
                        onClick={() => {
                          decryptPassword({
                            password: val.password,
                            iv: val.iv,
                            id: val.id,
                          });
                        }}
                        key={key}
                      >
                        <h3>{val.passwordplace}</h3>
                      </div>
                    );
                  })}
        </div>
    </div>
  );
}

export default App;
