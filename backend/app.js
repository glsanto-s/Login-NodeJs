// imports
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const app = express();

// Dando permissão para acesso
app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

// Configuração JSON
app.use(express.json())

// Models
const User = require('./models/User')

// Registrar Usuario
app.post('/register', async(req,res)=>{
    
    const {name, email, password, confirmpassword} = req.body

    // validações
    if(!name){
        return  res.status(422).json({msg: 'O nome é obrigatório'})
    }
    if(!email){
        return  res.status(422).json({msg: 'O email é obrigatório'})
    }
    if(!password){
        return  res.status(422).json({msg: 'A senha é obrigatório'})
    }
    if(password !== confirmpassword){
        return  res.status(422).json({msg: 'As senhas não conferem!'})
    }

    // Checando se já existe o usuário
    const userExiste = await User.findOne({email:email})

    if(userExiste){
        return  res.status(422).json({msg: 'Email já existente!'})
    }

    // Criar Senha
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // Criar Usuario (MongoDB)
    const user = new User({
        name,
        email,
        password: passwordHash,
    })

    try{
        await user.save()
        return  res.status(201).json({msg: 'Usuário criado com sucesso!'})
    }
    catch(e){
        console.log(e)
        res.status(500).json({msg: 'Ops.. algo deu errado!'})
    }
})

// Login User
app.post("/", async (req, res) => {
    const {email, password} = req.body

    // validações
    if(!email){
        return  res.status(422).json({msg: 'O email é obrigatório'})
    }
    if(!password){
        return  res.status(422).json({msg: 'A senha é obrigatório'})
    }

    // checando se usuario existe
    const user = await User.findOne({email:email})

    if(!user){
        return  res.status(404).json({msg: 'Usuário não encontrado!'})
    }

    // checando se a senha está certa
    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword){
        return  res.status(422).json({msg: 'Senha inválida!'})
    }

    try{
        const secret = process.env.SECRET

        const token = jwt.sign({
            id: user._id,
        },
        secret,)
        return  res.status(200).json({msg: 'Autenticação realizada com sucesso!',token})
    }
    catch(e){
        console.log(e)
        res.status(500).json({msg: 'Ops.. algo deu errado!'})
    }
})

// Credenciais
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.dkqou2z.mongodb.net/?retryWrites=true&w=majority`).then(() =>{
    app.listen(3001)
    console.log('Concectou ao banco!');
}).catch((err) => console.log(err))

