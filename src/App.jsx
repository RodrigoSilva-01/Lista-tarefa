import AddTasks from "./components/AddTasks";
import Tasks from "./components/Tasks";
import "./index.css";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState([
    ...(JSON.parse(localStorage.getItem("tasks")) || []),
  ]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const fetchTask = async () => {
      //CHAMA A API
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10',
      {
      method: 'GET',
    });
    //PEGA OS DADOS QUE ELA RETORNA
    const data = await response.json();

    //ARMAZENA OS DADOS NO STATE
    setTasks(data);
    }
    //AQUI VOCÊ PODE CHAMAR UMA API PARA PEGAR AS TAREFAS
    //fetchTask();
  }, []);


  function onTaskClick(id) {
    const newTasks = tasks.map((task) => {
      //Atualiza a tarefa clicada
      if (task.id === id) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }

      // Se a tarefa não for a clicada, retorna ela mesma
      return task;
    });

    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };

    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-5">
        <h1 className="text-3xl font-bold text-slate-100 text-center">
          Gerenciador de Tarefas
        </h1>

        <AddTasks onAddTaskSubmit={onAddTaskSubmit} />

        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
