import React, { useState } from 'react'
import Card from './Card'
import {CiSearch } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
 

const Home = () => {

    const [selectedTodo, setSelectedTodo] = useState(null);
    const [todos, setTodos] = useState([]);

    const handleCardClick = (todo) => {
        setSelectedTodo(todo);
    };

    const handleClick = async() => {
        try {
            const response = await fetch(`http://localhost:4000/api/todos/${selectedTodo._id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  title: selectedTodo.title,
                  description: selectedTodo.description,
                }),
            });
            if (response.ok) {
            // Update the todo list immediately
            const updatedTodos = todos.map((todo) =>
                todo._id === selectedTodo._id ? selectedTodo : todo
            );
            setTodos(updatedTodos);
            // Clear the right-side div
            setSelectedTodo(null);
            }
        } catch (error) {
            console.log("error in updating the todo", error);
        }
    }

    const handleDeleteClick = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/todos/${selectedTodo._id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Filter out the deleted todo from the todos list
                const updatedTodos = todos.filter((todo) => todo._id !== selectedTodo._id);
                setTodos(updatedTodos);
                // Clear the right-side div
                setSelectedTodo(null);
            }
        } catch (error) {
            console.log("error in deleting the todo", error);
        }
    };
  return (
    <div className='h-screen flex m-20 '>
        <div className="leftside w-2/5 pr-14 pl-2">
            <div className="flex justify-between">
                <Link to={'/todo'}>
                    <img 
                    src="../../public/Frame 50.png" 
                    alt="" 
                    className=' cursor-pointer'
                    />
                </Link>
                <button className='bg-white w-14 text-3xl rounded-lg flex justify-center items-center '>
                    <CiSearch  />
                </button>
            </div>
            <div className="card">
                <Card todos={todos} setTodos={setTodos} onCardClick = {handleCardClick}/>
            </div>
        </div>
        <div className="right w-3/5 shadow-md">
            {selectedTodo ? (
                <div className="box bg-white h-full rounded-2xl p-10">
                <div className='flex justify-between items-center '>
                    <h2 className='text-2xl font-bold  border-b-2 items-center'>Edit Todo</h2>
                    <MdDelete className="icon"
                        style={{
                        
                        }}
                        size="50px"
                        color="red"
                        cursor= "pointer"
                        onClick={handleDeleteClick}
                    />
                        
                        
                </div>

                <input
                    type="text"
                    value={selectedTodo.title.replace(/<\/?[^>]+(>|$)/g, "")}
                    onChange={(e) =>
                    setSelectedTodo({ ...selectedTodo, title: e.target.value })
                    }
                    className="border border-black rounded-lg w-full p-2 mb-8 text-lg mt-10"
                />
                <ReactQuill
                    value={selectedTodo.title}
                    onChange={(value) =>
                        setSelectedTodo({ ...selectedTodo, title: value })
                    }
                    className="border border-black rounded-lg w-full p-2 mb-8 text-lg mt-10"
                />
                <textarea
                    value={selectedTodo.description}
                    onChange={(e) =>
                    setSelectedTodo({
                        ...selectedTodo,
                        description: e.target.value,
                    })
                    }
                    className="border border-black rounded-lg w-full p-4 text-lg"
                />
                <button 
                    className='bg-black  p-4 mt-6 text-white rounded-lg '
                    onClick={handleClick}
                >Save Changes</button>
                </div>
            ) : (
                <div className="box bg-white h-full rounded-2xl p-10">
                <p className='font-bold text-center text-2xl '>Select a todo to edit.</p>
                </div>
            )}
        </div>
    </div>
  )
}

export default Home