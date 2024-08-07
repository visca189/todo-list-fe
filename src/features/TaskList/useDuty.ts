import axios from "axios";
import { useEffect, useState } from "react";
import { Duty, DutySchema } from "./types";

const TaskListBackendUrl = import.meta.env.VITE_TASK_LIST_BACKEND_URL;

function useDuty() {
  const [duties, setDuties] = useState<Duty[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDuties = async () => {
    try {
      const response = await axios.get<Duty[]>(TaskListBackendUrl);

      setDuties(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const addDuty = async (name: string) => {
    const response = await axios.post<Duty>(TaskListBackendUrl, {
      name,
    });

    setDuties((prevDuties) => [...prevDuties, response.data]);
  };

  const updateDuty = async (data: Duty) => {
    if (DutySchema.parse(data)) {
      const { id, ...others } = data;
      const resp = await axios.put(`${TaskListBackendUrl}/${id}`, others);

      setDuties((prev) => {
        const index = prev.findIndex((duty) => duty.id === id);
        if (index < 0) {
          throw new Error("unable to find exisitng duty to update");
        } else {
          // update item in place
          const newList = [...prev];
          newList[index] = resp.data;
          return newList;
        }
      });
    }
  };

  const deleteDuty = async (id: string) => {
    await axios.delete(`${TaskListBackendUrl}/${id}`);
    setDuties((prevDuties) => prevDuties.filter((duty) => duty.id !== id));
  };

  useEffect(() => {
    fetchDuties();
  }, []);

  return {
    duties,
    addDuty,
    updateDuty,
    deleteDuty,
    loading,
  };
}

export { useDuty };
