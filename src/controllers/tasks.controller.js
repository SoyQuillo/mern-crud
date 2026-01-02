import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find({
    user: req.user.id,
  }).populate("user");

  res.json(tasks);
};

export const CreateTask = async (req, res) => {
  try{
const { title, description, date } = req.body;

  console.log(req.user);

  const newTask = new Task({
    title,
    description,
    date,
    user: req.user.id,
  });

  const saveTask = await newTask.save();

  res.json(saveTask);
  }catch(e){
    return res.status(404).json({ msg: "Task not found" });
  }
  
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("user");

    if (!task) return res.status(404).json({ msg: "Task not found" });

    res.json(task);
  } catch (e) {
    return res.status(404).json({ msg: "Task not found" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) return res.status(404).json({ msg: "Task not found" });

    return res.sendStatus(204);
  } catch (e) {
    return res.status(404).json({ msg: "Task not found" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!task) return res.status(404).json({ msg: "Task not found" });

    res.json(task);
  } catch (e) {
    return res.status(404).json({ msg: "Task not found" });
  }
};
