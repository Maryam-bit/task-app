const express = require("express")
const Task = require("../models/task");
const auth = require("../middleware/auth")
const router = new express.Router()


router.post("/tasks", auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user.id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

// GET /tasks?completed=true|false
// GET /tasks?limit-10&skip=10
// GET /tasks?soryBy=createdAt:asc
router.get("/tasks", auth, async (req, res) => {
    try {
        //two ways
        // const tasks = await Task.find({ owner: req.user._id })
        const match = {}
        const sort = {}
        
        if(req.query.completed) {
            match.completed = req.query.completed == "true"
        }

        if(req.query.sortBy) {
            const parts = req.query.sortBy.split(":")
            sort[parts[0]] = parts[1] === "desc" ? -1 : 1
        }
        await req.user.populate({
            path: "tasks",
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        })
        // await req.user.populate('tasks')
        res.send(req.user.tasks)
    } catch (error) {
        res.status(500).send()
    }
})

router.get("/tasks/:id", auth,  async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({ _id, owner: req.user._id})
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})

router.patch("/tasks/:id", auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description", "completed"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update) )
    if(!isValidOperation) {
        return res.status(400).send({error: "Invalid updates!"})
    }
    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
        if(!task) {
            return res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete("/tasks/:id", auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOneAndDelete({_id, owner: req.user._id})
        if(!task) {
            return res.status(404).send()
        }
        return res.send(task)
    } catch (error) {
        res.status(500).send(error)        
    }
})

module.exports = router