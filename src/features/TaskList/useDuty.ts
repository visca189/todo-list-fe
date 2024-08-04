import axios from "axios";
import { useEffect, useState } from "react";
import { Duty } from "./types";

const TaskListBackendUrl = import.meta.env.REACT_APP_TASK_LIST_BACKEND_URL;

function useDuty() {
  const [duties, setDuties] = useState<Duty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDuties = async () => {
    try {
      // const response = await axios.get<Duty[]>(TaskListBackendUrl);
      const response = { data: [] };
      setDuties(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch duties");
      setLoading(false);
    }
  };

  const addDuty = async (name: string) => {
    try {
      // const response = await axios.post<Duty>(TaskListBackendUrl, {
      //   name,
      // });
      const response = { data: { id: String(Math.random() * 10), name: name } };
      setDuties((prevDuties) => [...prevDuties, response.data]);
    } catch (err) {
      setError("Failed to add duty");
    }
  };

  const updateDuty = async (id: string, name: string) => {
    try {
      // await axios.put(`${TaskListBackendUrl}/${id}`, { name });
      setDuties((prevDuties) =>
        prevDuties.map((duty) => (duty.id === id ? { ...duty, name } : duty))
      );
    } catch (err) {
      setError("Failed to update duty");
    }
  };

  const deleteDuty = async (id: string) => {
    try {
      // await axios.post(`${TaskListBackendUrl}/${id}`, { name });
      setDuties((prevDuties) => prevDuties.filter((duty) => duty.id !== id));
    } catch (err) {
      setError("Failed to update duty");
    }
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
    error,
  };
}

export { useDuty };
