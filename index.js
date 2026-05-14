require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const Todo = require("./models/Todo")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
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
app.listen(process.env.PORT||5000, () => {
    console.log(`Server running on port ${process.env.PORT||5000} 🚀`);
})