import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json());
//Habilita qualquer página acessar seu backend
//Só usei em teste, normalmente coloca o endereço do Front que vai acessar
app.use(cors())

app.post('/usuarios', async (req, res) => {
    try {
        //Verifica se o email já existe
        const existingUser = await prisma.user.findUnique({
            where: { email: req.body.email },
        });

        if (existingUser) {
            return res.status(400).send({ message: 'Email já cadastrado' });
        }

        //Criação do usuário se o email for único
        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                name: req.body.name,
                age: req.body.age,
            },
        });

        res.status(201).send({ message: 'Usuário adicionado com sucesso', user });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Erro ao adicionar usuário' });
    }
});

//1) Precisa do tipo de rota / Método HTTP
//2) Endereço
//3) Requisição (Req) , Resposta (Res) - Padrão

app.get('/usuarios', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Erro ao buscar usuários' });
    }
});

//Editando um usuário - Usando Route Params Por ser só um
//Os : antes de id indica que é uma variável
app.put('/usuarios/:id', async (req, res) => {
    try {
        const user = await prisma.user.update({
            where: {
                id: req.params.id,
            },
            data: {
                email: req.body.email,
                name: req.body.name,
                age: req.body.age,
            },
        });

        res.status(200).send({ message: 'Usuário alterado com sucesso', user });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Erro ao alterar usuário' });
    }
});

app.delete('/usuarios/:id', async(req, res) => {
    await prisma.user.delete({
        where: { 
            id: req.params.id
        }
    })

    res.status(200).json({message: 'Usuário deletado com sucesso!'})
})

//Avisando onde o server vai rodar, qual porta do meu PC
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});


