const Express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const Todo = require('./models/todo')

const app = Express();
app.use(Express.json())
app.use(cors())

const PORT = process.env.PORT || 4444;
const dbURI =
  "mongodb+srv://admin:admin@todo.zmkzk83.mongodb.net/test?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);
mongoose
  .connect(dbURI)
  .then((res) =>
    app.listen(PORT, () => {
      console.log("Server ok!");
    })
  )
  .catch((err) => console.log(err));

app.get("/todos", (req, res) => {
    try {
        Todo.find()
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                console.log(err)
            })
    } catch (error) {
        console.log(error);
    }
})

app.post("/todos", (req, res) => {
  try {
    const todo = new Todo({
        title: req.body.title,
        completed: req.body.completed,
        important: req.body.important
    })

    todo.save()
        .then((result) => {
            res.json(result)
        })
        .catch(err => {
            console.log(err)
        })
  } catch (error) {
    console.log(error);
  }
});

app.put("/todos/:id", (req, res) => {
    try {
        Todo.findOneAndUpdate({_id: req.params.id}, req.body)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                console.log(err)
            })
    } catch (error) {
        console.log(error)
    }
})

app.delete('/todos/:id', (req, res) => {
    try {
        Todo.findOneAndDelete({_id: req.params.id})
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                console.log('Bad request');
            })
    } catch (error) {
        console.log(error);
    }
})