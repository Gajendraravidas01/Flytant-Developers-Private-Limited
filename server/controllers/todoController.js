import Todo from '../models/Todo.js';


export const getTodos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const todos = await Todo.find().skip(skip).limit(limit);
    const total = await Todo.countDocuments();

    res.json({ todos, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


export const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'To-Do not found' });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    const todo = new Todo({
      title,
      description,
    });

    const createdTodo = await todo.save();
    res.status(201).json(createdTodo);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


export const updateTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    const todo = await Todo.findById(req.params.id);
    

    if (!todo) {
      return res.status(404).json({ message: 'To-Do not found' });
    }

    todo.title = title || todo.title;
    todo.description = description || todo.description;

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    // console.log(todo);

    if (!todo) {
      return res.status(404).json({ message: 'To-Do not found' });
    }

    await todo.deleteOne();
    res.json({ message: 'To-Do removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error in deleting the todo' }),console.log(error);
  }
};
