import { useEffect, useState, useRef } from 'react';
import './style.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../services/api';

function Home() {
  // Toda vez que os users alterarem, ele altera na tela
  const [users, setUsers] = useState([]);

  // Usarei o useRef para alterar um valor
  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  // Estado para controlar o modo de edição de um usuário específico
  const [editingUser, setEditingUser] = useState(null);

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios');
    setUsers(usersFromApi.data);
  }

  async function createUsers() {
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    });
    getUsers();
    alert("Usuário cadastrado com sucesso!");

    inputName.current.value = '';
    inputAge.current.value = '';
    inputEmail.current.value = '';
  }

  async function deleteUsers(id) {
    //Pop-up de confirmação
    const isDeleteConfirmed = window.confirm('Tem certeza que deseja excluir este usuário?');
    if (isDeleteConfirmed) {
      await api.delete(`/usuarios/${id}`);
      getUsers();
      alert("Usuário deletado com sucesso!");
    }
  }

  async function updateUser(id) {
    const isUpdateConfirmed = window.confirm('Tem certeza que deseja editar este usuário?');
    if(isUpdateConfirmed){
      await api.put(`/usuarios/${id}`, {
        name: inputName.current.value,
        age: inputAge.current.value,
        email: inputEmail.current.value,
      });
      setEditingUser(null);
      getUsers();
      alert("Usuário atualizado com sucesso!");
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>
        <input
          placeholder="Nome"
          name="nome"
          type="text"
          ref={inputName}
        />
        <input
          placeholder="Idade"
          name="idade"
          type="text"
          ref={inputAge}
        />
        <input
          placeholder="E-mail"
          name="email"
          type="text"
          ref={inputEmail}
        />
        <button type="button" onClick={createUsers}>
          Cadastrar
        </button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            {editingUser === user.id ? (
              <div className="editing-form">
                <p>
                  Nome: <input type="text" defaultValue={user.name} ref={inputName} />
                </p>
                <p>
                  Idade: <input type="number" defaultValue={user.age} ref={inputAge} />
                </p>
                <p>
                  Email: <input type="email" defaultValue={user.email} ref={inputEmail} />
                </p>
                <div className="buttons">
                  <button onClick={() => updateUser(user.id)}>Salvar</button>
                  <button onClick={() => setEditingUser(null)}>Cancelar</button>
                </div>
              </div>
            ) : (
              <div className="user-info">
                <p>
                  Nome: <span>{user.name}</span>
                </p>
                <p>
                  Idade: <span>{user.age}</span>
                </p>
                <p>
                  Email: <span>{user.email}</span>
                </p>
                <button onClick={() => setEditingUser(user.id)}>Editar</button>
              </div>
            )}
          </div>
          <IconButton onClick={() => deleteUsers(user.id)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
    </div>
  );
}

export default Home;
