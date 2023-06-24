import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleUsernameValidation = () => {
    // Realizar la solicitud POST al backend para validar el nombre de usuario
    fetch('http://localhost:3001/api/users/checkUsername', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre: username }),
    })
    .then((response) => response.json(

      console.log(response)
    ))
      .then((data) => {
        // Aquí puedes realizar acciones según la respuesta del backend
        if (data) {
          setIsUsernameValid(true);
          // Realizar una solicitud GET al backend para obtener el usuario completo
          console.log(data)
          setUsername = data.nombre;
          fetch(`/getUserByUsername/${username}`)
            .then((response) => response.json())
            .then((userData) => {
              // Aquí puedes hacer uso del objeto userData, que contiene todas las propiedades del usuario
            })
            .catch((error) => {
              console.error('Error al obtener el usuario:', error);
            });
        } else {
          alert('Nombre de usuario no existe');
          setIsUsernameValid(false);
          console.log('Nombre de usuario no válido');
        }
      })
      .catch((error) => {
        console.error('Error al validar el nombre de usuario:', error);
      });
  };
  
  const handleLogin = () => {
    // Realizar la solicitud POST al backend para autenticar al usuario
    fetch('http://localhost:3001/api/users/checkPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre: username, contraseña: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Aquí puedes realizar acciones según la respuesta del backend, como redirigir al usuario a otra página
        if (data.contraseña === password) {
          // Autenticación exitosa, redireccionar al componente de usuarios
          // window.location.href = '/users';
          navigate('/home', { state: { user: data } });
          alert('Ingreso exitoso');
          window.location.replace('/home')
        } else {
          // Autenticación fallida, mostrar mensaje de error o realizar alguna acción adecuada
          alert('Contraseña erronea')
          window.location.reload()
        }
      })
      .catch((error) => {
        console.error('Error al realizar el inicio de sesión:', error);
      });
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setIsUsernameValid(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsPasswordValid(false);
  };

  return (
    <div className="App">
      <h2>Iniciar sesión</h2>
      {!isUsernameValid && (
        <div>
          <label>Nombre de usuario:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
          <button onClick={handleUsernameValidation}>Validar nombre de usuario</button>
        </div>
      )}
      { isUsernameValid && (
        <div>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
          <button onClick={handleLogin}>Iniciar sesión</button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
