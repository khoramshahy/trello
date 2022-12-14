import "./StatusCols.css";

import Modal from "../Modal";
import { useState } from "react";

function StatusCols() {
  const [cols, setCols] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );
  const [input, setInput] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const closeModal = () => {
    setSelectedTask(null);
    setIsModal(false);
  };
  const openModal = (taskInfo) => {
    setSelectedTask(taskInfo);
    setIsModal(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addNewCol();
    }
  };
  const handleInput = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const addNewCol = () => {
    if (input) {
      const updateCol = [...cols];
      updateCol.push({ name: input, tasks: [] });
      setCols(updateCol);
      setInput("");
    }
  };

  const createOrEditTask = (newTask, statusId, taskId) => {
    const updateDate = [...cols];
    console.log("newTask", newTask);
    //create task
    if (taskId === null) {
      updateDate[statusId].tasks.push(newTask);
      console.log("new task");
    }
    //edit task
    else {
      if (statusId !== selectedTask.statusId) {
        //task status is chenged
        console.log("task status is chenged");
        updateDate[selectedTask.statusId].tasks.splice(taskId, 1);
        updateDate[statusId].tasks.push(newTask);
      } else {
        //update task
        updateDate[statusId].tasks[taskId] = newTask;
        console.log("update");
      }
    }

    setCols(updateDate);

    closeModal();
  };

  const deleteColumn = (statusId) => {
    const updateData = [...cols];
    updateData.splice(statusId, 1);
    setCols(updateData);
  };

  const deleteTask = (statusId, taskId) => {
    const updateData = [...cols];
    updateData[statusId].tasks.splice(taskId, 1);
    setCols(updateData);
  };

  const save = () => {
    if (cols) {
      localStorage.setItem("data", JSON.stringify(cols));
    }
  };

  return (
    <>
      {cols.length !== 0 && <button onClick={save}>save trello data</button>}

      <div className="container">
        {cols.map((item, index) => {
          return (
            <div className="item" key={index}>
              <span className="title">{item.name}</span>
              <button
                onClick={() => openModal({ statusId: index, taskId: null })}
              >
                add new task
              </button>
              <button
                onClick={() => deleteColumn(index)}
              >
                delete
              </button>
              <div className="task">
                {item.tasks.map((task, i) => {
                  return (
                    <div key={i}>
                      <span>{task.name} </span>
                      <button
                        onClick={() =>
                          openModal({ statusId: index, taskId: i, ...task })
                        }
                      >
                        edit
                      </button>
                      <button onClick={() => deleteTask(index, i)}>
                        delete
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <div className="item">
          <input
            value={input}
            type="text"
            placeholder="status name"
            onChange={handleInput}
            onKeyDown={handleKeyDown}
          />
          <button onClick={addNewCol}>new status col</button>
        </div>
        {isModal && selectedTask && (
          <Modal
            handleClose={closeModal}
            handleSubmit={createOrEditTask}
            task={selectedTask}
            statusList={cols}
          />
        )}
      </div>
    </>
  );
}

export default StatusCols;
