import { useState } from "react";

function AddTasks({ onAddTaskSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div className="bg-slate-200 space-y-4 p-6 rounded-md shadow flex flex-col">
      <input
        type="text"
        placeholder="Digite o título da tarefa"
        className="border-slate-300 outline-slate-400 rounded-md px-4 py-2 bg-white"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Digite a descrição da tarefa"
        className="border-slate-300 outline-slate-400 rounded-md px-4 py-2 bg-white"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        onClick={() => {
          //verifica se o título e a descrição estão preenchidos
          if (!title.trim() || !description.trim())
            return alert("Por favor, preencha todos os campos.");

          onAddTaskSubmit(title, description);
          setTitle("");
          setDescription("");
        }}
        className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium"
      >
        Adicionar Tarefa
      </button>
    </div>
  );
}

export default AddTasks;
