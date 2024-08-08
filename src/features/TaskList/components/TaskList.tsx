import { useContext, useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Duty } from "../types";
import { DutyContext } from "../dutyContext";
import { Tasks } from "./Tasks";
import { Task } from "./Task";
import "../css/TaskList.scss";

// TODO: handle line drop when overflow

function TaskList() {
  const { duties, fetchDuties, addDuty } = useContext(DutyContext);

  const [pendingTasks, setPendingTasks] = useState<Duty[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Duty[]>([]);

  const [newTask, setNewTask] = useState("");
  const [addTaskError, setAddTaskError] = useState<string | null>(null);

  useEffect(() => {
    fetchDuties();
  }, []);

  useEffect(() => {
    if (duties.length) {
      const filtered = duties.reduce(
        (acc: { completed: Duty[]; tasks: Duty[] }, cur) => {
          if (cur.is_completed) {
            acc.completed.push(cur);
          } else {
            acc.tasks.push(cur);
          }

          return acc;
        },
        { completed: [], tasks: [] }
      );
      setCompletedTasks(filtered.completed);
      setPendingTasks(filtered.tasks);
    } else {
      setCompletedTasks([]);
      setPendingTasks([]);
    }
  }, [duties]);

  // handling for new task
  const handleSubmitNewTask = async (name: Duty["name"]) => {
    try {
      if (typeof name === "string") {
        await addDuty(name);
        setNewTask("");
      }
    } catch (err) {
      if (typeof err === "string") {
        setAddTaskError(err);
      } else if (err instanceof Error) {
        setAddTaskError(err.message);
      }
    }
  };

  return (
    <div className="to-do-list">
      <h4 className="list-name">My tasks</h4>
      <Tasks tasks={pendingTasks} />

      <Task
        className="new-task"
        data={""}
        formData={newTask}
        onSubmit={handleSubmitNewTask}
        error={addTaskError}
      >
        <PlusOutlined />
        <input
          data-type="text-input"
          type="text"
          name="name"
          placeholder="Add a Task"
          value={newTask}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNewTask(e.target.value);
          }}
        />
      </Task>

      <Tasks tasks={completedTasks} />
    </div>
  );
}

export { TaskList };
