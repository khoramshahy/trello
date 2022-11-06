import { useState } from "react";

function Modal({ handleClose, handleSubmit, task, statusList }) {
  const [state, setState] = useState({
    name: task?.name || "",
    desc: task?.desc || "",
    statusId: task.statusId,
  });

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const onSubmit = () => {
    if (state.name) {
      handleSubmit(
        { name: state.name, desc: state.desc },
        state.statusId,
        task.taskId
      );
    }
  };

  return (
    <div className="modal">
      <div className="modal-main ">
        <input
          type="text"
        placeholder="task name"
          name="name"
          value={state.name}
          onChange={handleChange}
        />
        <select name="statusId" onChange={handleChange} value={state.statusId}>
          {statusList.map((s, k) => {
            return (
              <option key={k} value={k}>
                {s.name}
              </option>
            );
          })}
        </select>
        <br />
        <textarea 
        placeholder="write some desc"
          type="textarea"
          name="desc"
          value={state.desc}
          onChange={handleChange}
        />
        <br />

        <br />

        <button onClick={handleClose}>close</button>
        <button onClick={onSubmit}>save changes</button>
      </div>
    </div>
  );
}

export default Modal;
