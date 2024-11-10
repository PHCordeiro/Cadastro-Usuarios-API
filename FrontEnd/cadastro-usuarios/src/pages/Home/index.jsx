import { useEffect, useState, useRef } from 'react';
import './style.css'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../services/api'

function Home() {

//Toda vez que o users alterar ele altera na tela
const [users, setUsers] = useState([])

//Usarei o useRef para alterar um valor
const inputName = useRef()
const inputAge = useRef()
const inputEmail = useRef()

async function getUsers(){
  const usersFromApi = await api.get('/usuarios')
  setUsers(usersFromApi.data)
}

async function createUsers(){
  await api.post('/usuarios',{
    //Como estou recebendo na API por body, envia body
    name: inputName.current.value,
    age: inputAge.current.value,
    email: inputEmail.current.value
  })
  //Atualizando a página com os novos Users
  getUsers()
}

async function deleteUsers(id){
  await api.delete(`/usuarios/${id}`)
  getUsers()
}

//Tudo aqui dentro ele executa quando a página iniciar
useEffect(() => {
  getUsers()
}, [])

  return (
    <>
      <div className='container'>
        <form>
          <h1>Cadastro de Usuários</h1>
          <input placeholder="Nome" name='nome' type='text' ref={inputName}/>
          <input placeholder="Idade" name='idade' type='text' ref={inputAge}/>
          <input placeholder="E-mail" name='email' type='text' ref={inputEmail}/>
          <button type='button' onClick={createUsers}>Cadastrar</button>
        </form>

      { users.map(user => (
        <div key={user.id} className="card">
          <div>
            <p>Nome:  <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <IconButton onClick={() => deleteUsers(user.id)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
      </div>
    </>
  )
}

export default Home
