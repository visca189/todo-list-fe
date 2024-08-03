import axios from "axios";
import { useEffect, useState } from "react";

interface Duty {
  id: string;
  name: string;
}

function useDuty() {
  const [duties, setDuties] = useState<Duty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDuties = async () => {
    try {
      // const response = await axios.get<Duty[]>("http://localhost:5000/duties");
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
      // const response = await axios.post<Duty>("http://localhost:5000/duties", {
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
      // await axios.put(`http://localhost:5000/duties/${id}`, { name });
      setDuties((prevDuties) =>
        prevDuties.map((duty) => (duty.id === id ? { ...duty, name } : duty))
      );
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
    loading,
    error,
  };
}

export { useDuty };
