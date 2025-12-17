// const http = require('http')

// const server = http.createServer((req,res)=>{
//     if(req.url=="/about"){
//         res.end("The about page")
//     }
//     if(req.url=="/profile"){
//         res.end("The about page")
//     }

//     res.end("Hello world")
// })
// app.use((req,res,next)=>{
//     console.log("Using Middleware")
//     return next()
// })
// server.listen(3000)


const express = require("express");

const morgan = require("morgan");

const app = express();

const userModel = require('/media/prakhar/Windows/Node_tut/models/user.js')

const dbConnection = require('/media/prakhar/Windows/Node_tut/config/db.js')

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

app.set('view engine','ejs')

app.get("/",(req,res)=>{
    res.render('index')
})
app.get('/about',(req,res)=>{
    res.send("The about page")
})

app.get('/register',(req,res)=>{
    res.render('register')
})

app.post('/register',async (req,res)=>{
    console.log(req.body)
    const {username, email, password} = req.body
    const newUser = await userModel.create({
        username: username,
        email: email,
        password: password
    })

    res.send(newUser)
})

app.get('/get-users',(req,res)=>{
    userModel.findOne({username: 'admin'}).then((users)=>{
        res.send(users)
    })
})

app.get('/update-user',async (req,res)=>{
    await userModel.findOneAndUpdate(
        {
        username: 'admin'
        },
        {
            email: 'admin1@gmail'
        }
    )

    res.send("user updated")
})

app.get('/delete-user',async (req,res)=>{
    await userModel.findOneAndDelete(
        {
            username: 'user1'
        }
    )
    res.send('user deleted')
})

app.post('/get-form-data',(req,res)=>{
    console.log(req.body)
    res.send("Data received")
})

app.listen(3000)
