import React from "react";
import { TaskList } from "./features/TaskList/components/TaskList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <section>
        <TaskList />
      </section>
    </div>
  );
}

export default App;
