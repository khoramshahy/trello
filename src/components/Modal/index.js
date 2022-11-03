import{useState} from "react";

function Modal({ handleClose, handleSubmit, task, statusList }) {
    const [state, setState] = useState({
      name: task?.name || "",
      statusId: task.statusId,
    });
  
    const handleChange = (evt) => {
      const { value, name } = evt.target;
      setState({
        ...state,
        [name]: value,
      });
    };
  
    return (
      <div className="modal">
        <div className="modal-main ">
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
          />
          <select
            name="statusId"
            onChange={handleChange}
            value={state.statusId}
          >
            {statusList.map((s, k) => {
              return (
                <option key={k} value={k}>
                  {s.name}
                </option>
              );
            })}
          </select>
          <br />
  
          <br />
  
          <button onClick={handleClose}>close</button>
          <button onClick={() => handleSubmit({name:state.name}, state.statusId, task.taskId)}>
            save changes
          </button>
        </div>
      </div>
    );
  }

export default Modal;