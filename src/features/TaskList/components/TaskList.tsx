import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useDuty } from "../useDuty";
import { Task } from "./Task";
import { Duty, DutySchema, TaskDataSchema } from "../types";
import "../css/TaskList.scss";

// TODO: handle line drop when overflow
// TODO: checked -> uncheck should go to the top of the list

function TaskList() {
  const { duties, addDuty, updateDuty, deleteDuty } = useDuty();

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

  // TODO: move to component
  const handleChecked = async (e: CheckboxChangeEvent, duty: Duty) => {
    if (DutySchema.parse(duty)) {
      await updateDuty({ ...duty, is_completed: e.target.checked });
    }
  };

  const onSubmit = async (data: Duty) => {
    // TODO: should have form schema instead of taskDataSchema since duplicated with dutySchema?
    if (DutySchema.parse(data)) {
      await updateDuty(data);
    }
  };

  const onDelete = async (id: string) => {
    if (id && typeof id === "string") {
      await deleteDuty(id);
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
            onSubmit={onSubmit}
            onDelete={onDelete}
            inputProps={{
              placeholder: "Title",
              prefix: <Checkbox onChange={(e) => handleChecked(e, task)} />,
            }}
          />
        ))
      ) : (
        <></>
      )}

      <Task
        className="new-task"
        data={{ id: "", name: "", is_completed: false }}
        onSubmit={async (data) => {
          if (TaskDataSchema.pick({ name: true }).parse(data)) {
            await addDuty(data.name);
          }
        }}
        onDelete={async () => {}}
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
            onSubmit={onSubmit}
            onDelete={onDelete}
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
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

export { TaskList };
