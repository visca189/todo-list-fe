import { useContext, useEffect, useState } from "react";
import Checkbox, { CheckboxChangeEvent } from "antd/es/checkbox";
import { DeleteOutlined } from "@ant-design/icons";
import { DutyContext } from "../context/dutyContext";
import { Duty, DutySchema } from "../types";
import { Task } from "./Task";

function Tasks(props: { className?: string; tasks: Duty[] }) {
  const { className = "", tasks } = props;
  const { updateDuty, deleteDuty } = useContext(DutyContext);
  const [formData, setFormData] = useState<{ [id: string]: Duty }>({});
  const [errors, setErrors] = useState<{ [id: string]: string }>({});

  useEffect(() => {
    if (tasks.length) {
      const initialFormData = tasks.reduce((acc, task) => {
        acc[task.id] = task;
        return acc;
      }, {} as { [key: string]: Duty });
      setFormData(initialFormData);
    } else {
      setFormData({});
    }
  }, [tasks]);

  const handleSubmit = async (newData: Duty) => {
    try {
      if (DutySchema.parse(newData)) {
        await updateDuty(newData);
      }
    } catch (err) {
      console.error(err);
      setErrors((prev) => ({
        ...prev,
        [newData.id]: "Unable to update task, please try again.",
      }));
    }
  };

  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: {
        ...prevFormData[id],
        [name]: value,
      },
    }));
  };

  const handleDelete = async (id: string) => {
    try {
      if (id && typeof id === "string") {
        await deleteDuty(id);
      }
    } catch (err) {
      console.error(err);
      setErrors((prev) => ({
        ...prev,
        [id]: "Unable to delete task, please try again.",
      }));
    }
  };

  const handleChecked = async (e: CheckboxChangeEvent, duty: Duty) => {
    if (DutySchema.parse(duty)) {
      await updateDuty({ ...duty, is_completed: e.target.checked });
    }
  };

  return tasks.length ? (
    tasks.map((task) => (
      <Task
        key={task.id}
        className={className}
        data={task}
        formData={formData?.[task.id]}
        onSubmit={handleSubmit}
        error={errors?.[task.id]}
      >
        <>
          <Checkbox
            checked={task.is_completed}
            onChange={(e) => handleChecked(e, task)}
          />
          <input
            data-type="text-input"
            type="text"
            name="name"
            placeholder="Title"
            autoComplete="off"
            value={formData[task.id]?.name || ""}
            onChange={(e) => {
              handleChange(task.id, e);
            }}
          />
        </>
        <DeleteOutlined className="bin" onClick={() => handleDelete(task.id)} />
      </Task>
    ))
  ) : (
    <></>
  );
}

export { Tasks };
