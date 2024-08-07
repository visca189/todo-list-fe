import { useCallback, useEffect, useRef, useState } from "react";
import isEqual from "lodash.isequal";
import { DeleteOutlined } from "@ant-design/icons";
import { TaskData, TaskProps } from "../types";
import { useDetectBlur } from "../useDetectBlur";
import { Input } from "./Input";

function Task(props: TaskProps) {
  const { className = "", data, onSubmit, onDelete } = props;
  const [formData, setFormData] = useState(data);
  const [error, setError] = useState("");

  // detect component blur
  const formRef: React.RefObject<HTMLFormElement> = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const { isBlur } = useDetectBlur(formRef, isEditing);

  const handleSubmit = useCallback(
    async (newData: TaskData) => {
      try {
        await onSubmit(newData);

        // Clear up
        if (!newData.id) {
          setFormData(data);
        }
      } catch (err) {
        if (typeof err === "string") {
          setError(err);
        } else if (err instanceof Error) {
          setError(err.message);
        }
      }
    },
    [data, onSubmit]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDelete = async (id: string) => {
    try {
      await onDelete(id);
    } catch (err) {
      if (typeof err === "string") {
        setError(err);
      } else if (err instanceof Error) {
        setError(err.message);
      }
    }
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
        className={`task-form${error ? " error" : ""}${
          className ? ` ${className}` : ""
        }`}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(formData);
        }}
        onClick={() => setIsEditing(true)}
      >
        <Input
          {...props.inputProps}
          value={formData.name}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <DeleteOutlined className="bin" onClick={() => handleDelete(data.id)} />
        <input type="submit" hidden />
      </form>
      {error ? <p className="error-message">{error}</p> : <></>}
    </>
  );
}

export { Task };
