import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';


// useEffect
// useState


function App() {

  const BASE_URL = "https://ckiphd2ot6.execute-api.us-west-2.amazonaws.com/dev/bz-test-feb-19";

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);


  const fetchTasks = () => {
    fetch(BASE_URL)
    .then((res) => res.json())
    .then((data) => setTasks(data))
    .catch((err) => console.log("Something wrong happened"));
  };

  const addTask = () => {
      if(!title.trim()) {
        alert('Please fill the title');
        return;
      }

      fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({title: title, description: description})
      }).then((res) => res.json())
      .then(() => {
        setTitle('');
        setDescription('');
        fetchTasks();
      })
  };

  const deleteTask = (id) => {
    fetch(`${BASE_URL}?task_id=${id}`, {method: "DELETE"})
    .then(() => fetchTasks());
  }

  return (
    <div className="App">
      <h1>BZ To-do App</h1>

      <div id="input-box">
        <input 
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Please enter title'
        />
        <input 
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Please enter description'
        />
        <button onClick={addTask}>Add</button>
      </div>


      <table border="1">
        <tr>
          <th>Task ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
        <tbody>
          {
            tasks.map((task) => (
              <tr key={task.task_id}>
                  <td>{task.task_id}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.created_at}</td>
                  <td>
                    <button onClick={() => deleteTask(task.task_id)}>Delete</button>
                  </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
