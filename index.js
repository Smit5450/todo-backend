require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const Todo = require("./models/Todo")

const app = express()

app.use(cors())
app.use(express.json())

// mongoose.connect("mongodb+srv://sam:zltZpPdkL4vWzew2@cluster0.gudyd1v.mongodb.net/Todo")
mongoose.connect("mongodb://sam:zltZpPdkL4vWzew2@ac-id5lblz-shard-00-00.gudyd1v.mongodb.net:27017,ac-id5lblz-shard-00-01.gudyd1v.mongodb.net:27017,ac-id5lblz-shard-00-02.gudyd1v.mongodb.net:27017/Todo?ssl=true&replicaSet=atlas-osu8pd-shard-0&authSource=admin&appName=Cluster0")
    .then(() => {
        console.log("MongoDB Connected 😎")
    })
    .catch((error) => {
        console.log(error)
    })


app.get("/todos", async (req, res) => {

    const todos = await Todo.find()

    res.json(todos)
})

app.post("/todos", async (req, res) => {

    const newTodo = await Todo.create({

        text: req.body.text

    })

    res.status(201).json(newTodo)
})

app.delete("/todos/:id", async (req, res) => {

    await Todo.findByIdAndDelete(req.params.id)

    res.json({
        message: "Todo deleted"
    })
})

app.patch("/todos/:id", async (req, res) => {
    const todo = await Todo.findById(req.params.id)
    todo.completed = !todo.completed
    await todo.save()
    res.json(todo)
})
app.listen(5000, () => {
    console.log("Server running on port 5000 🚀");
})