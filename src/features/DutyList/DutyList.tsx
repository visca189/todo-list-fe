import React, { useCallback, useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { z } from "zod";
import isEqual from "lodash.isequal";
import { useDuty } from "./useDuty";
import { useDetectBlur } from "./useDetectBlur";
import "./DutyList.css";

//TODO: handle line drop when overflow

function DutyList() {
  const { duties, addDuty, updateDuty, error } = useDuty();

  return (
    <div className="to-do-list">
      <h4 className="list-name">My tasks</h4>
      {duties.length ? (
        duties.map((duty) => (
          <Task
            key={duty.id}
            data={duty}
            onSubmit={(data: { id: string; name: string }) => {
              updateDuty(data.id, data.name);
            }}
            error={error}
          />
        ))
      ) : (
        <></>
      )}
      <Task
        data={{ name: "" }}
        onSubmit={(data) => {
          addDuty(data.name);
        }}
        error={error}
        newTask
      />
    </div>
  );
}

const TaskDataSchema = z.object({
  name: z.string().trim().min(1),
});

type TaskData = z.infer<typeof TaskDataSchema>;

type TaskProps<Data extends TaskData> = {
  onSubmit: (data: Data) => void;
  error: string | null;
  data: Data;
  newTask?: boolean;
};

function Task<Data extends TaskData>(props: TaskProps<Data>) {
  const { newTask = false, data, error, onSubmit } = props;
  const [formData, setFormData] = useState(data);

  // detect component blur
  const formRef: React.RefObject<HTMLFormElement> = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const { isBlur } = useDetectBlur(formRef, isEditing);

  const handleSubmit = useCallback(
    (newData: Data) => {
      try {
        if (TaskDataSchema.parse(newData)) {
          onSubmit(newData);

          // Clear up
          if (newTask) {
            setFormData(data);
          }
        }
      } catch (err) {
        //TODO: error handling
        console.error(err);
      }
    },
    [newTask, data, onSubmit]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isBlur) {
      if (!isEqual(data, formData)) {
        handleSubmit(formData);
      }
      setIsEditing(false);
    }
  }, [isBlur, handleSubmit, formData, data]);

  return (
    <>
      <form
        ref={formRef}
        className={`task-form${error ? " error" : ""}`}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(formData);
        }}
        onClick={() => setIsEditing(true)}
      >
        {newTask ? <PlusOutlined /> : <Checkbox />}
        <input
          type="text"
          name="name"
          autoFocus={newTask}
          placeholder={newTask ? "Add a new Task" : "Title"}
          value={formData.name}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <input type="submit" hidden />
      </form>
      {error ? <p className="error-message">{error}</p> : <></>}
    </>
  );
}

export { DutyList };
