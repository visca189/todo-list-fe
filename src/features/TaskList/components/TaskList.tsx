import { PlusOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { useDuty } from "../useDuty";
import { Task } from "./Task";
import { TaskDataSchema } from "../types";
import "../TaskList.css";

//TODO: handle line drop when overflow

function TaskList() {
  const { duties, addDuty, updateDuty, error } = useDuty();

  //TODO
  const handleCompleted = () => {};

  return (
    <div className="to-do-list">
      <h4 className="list-name">My tasks</h4>
      {duties.length ? (
        duties.map((duty) => (
          <Task
            key={duty.id}
            data={duty}
            onSubmit={(data) => {
              if (TaskDataSchema.parse(data)) {
                updateDuty(data.id, data.name);
              }
            }}
            inputProps={{
              placeholder: "Title",
              prefix: <Checkbox onClick={handleCompleted} />,
            }}
            error={error}
          />
        ))
      ) : (
        <></>
      )}
      <Task
        data={{ id: "", name: "" }}
        onSubmit={(data) => {
          if (TaskDataSchema.omit({ id: true }).parse(data)) {
            addDuty(data.name);
          }
        }}
        error={error}
        inputProps={{
          placeholder: "Add a task",
          prefix: <PlusOutlined />,
          autoFocus: true,
        }}
      />
    </div>
  );
}

export { TaskList };
