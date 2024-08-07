import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useDuty } from "../useDuty";
import { Task } from "./Task";
import { Duty, DutySchema, TaskDataSchema } from "../types";
import "../TaskList.css";

// TODO: handle line drop when overflow
// TODO: handle hover
// TODO: update error handling to have one per row instead of shared

function TaskList() {
  const { duties, addDuty, updateDuty, error } = useDuty();

  const [tasks, setTasks] = useState<Duty[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Duty[]>([]);

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
      setTasks(filtered.tasks);
    } else {
      setCompletedTasks([]);
      setTasks([]);
    }
  }, [duties]);

  const handleChecked = (e: CheckboxChangeEvent, duty: Duty) => {
    if (DutySchema.parse(duty)) {
      updateDuty({ ...duty, is_completed: e.target.checked });
    }
  };

  return (
    <div className="to-do-list">
      <h4 className="list-name">My tasks</h4>
      {tasks.length ? (
        tasks.map((task) => (
          <Task
            key={task.id}
            data={task}
            onSubmit={(data) => {
              // TODO: should have form schema instead of taskDataSchema since duplicated with dutySchema?
              if (DutySchema.parse(data)) {
                updateDuty(data);
              }
            }}
            inputProps={{
              placeholder: "Title",
              prefix: <Checkbox onChange={(e) => handleChecked(e, task)} />,
            }}
            error={error}
          />
        ))
      ) : (
        <></>
      )}

      <Task
        data={{ id: "", name: "", is_completed: false }}
        onSubmit={(data) => {
          if (TaskDataSchema.pick({ name: true }).parse(data)) {
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

      {completedTasks.length ? (
        completedTasks.map((task) => (
          <Task
            key={task.id}
            data={task}
            onSubmit={(data) => {
              // TODO: should have form schema instead of taskDataSchema since duplicated with dutySchema?
              if (DutySchema.parse(data)) {
                updateDuty(data);
              }
            }}
            inputProps={{
              disabled: true,
              placeholder: "Title",
              prefix: (
                <Checkbox
                  defaultChecked={task.is_completed}
                  onChange={(e) => handleChecked(e, task)}
                />
              ),
            }}
            error={error}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

export { TaskList };
