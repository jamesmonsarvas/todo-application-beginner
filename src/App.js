import React, { useState, useEffect } from 'react';
import './App.css';

// Importing Components
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
    // States
    const [inputText, setInputText] = useState('');
    const [todos, setTodos] = useState([]);
    const [status, setStatus] = useState('All');
    const [filteredTodos, setFilteredTodos] = useState([]);

    // Use Effect

    useEffect(() => {
        getLocalTodos();
    }, []);

    useEffect(() => {
        filterHandler();
        saveLocalTodos();
    }, [todos, status]);

    // Functions
    const filterHandler = () => {
        switch (status) {
            case 'completed':
                setFilteredTodos(
                    todos.filter((todo) => todo.completed === true)
                );
                break;
            case 'uncompleted':
                setFilteredTodos(
                    todos.filter((todo) => todo.completed === false)
                );
                break;
            default:
                setFilteredTodos(todos);
                break;
        }
    };

    // Save to Local
    const saveLocalTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const getLocalTodos = () => {
        if (localStorage.getItem('todos') === null) {
            localStorage.setItem('todos', JSON.stringify([]));
        } else {
            let todoLocal = JSON.parse(localStorage.getItem('todos'));
            setTodos(todoLocal);
        }
    };

    return (
        <div className="App">
            <header>
                <h1>Todo Lists</h1>
            </header>
            <Form
                setStatus={setStatus}
                inputText={inputText}
                setInputText={setInputText}
                todos={todos}
                setTodos={setTodos}
            />
            <TodoList
                filteredTodos={filteredTodos}
                setTodos={setTodos}
                todos={todos}
            />
        </div>
    );
}

export default App;
