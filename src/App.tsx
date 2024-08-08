import { TaskList } from "./features/TaskList/components/TaskList";
import DutyProvider from "./features/TaskList/dutyContext";
import "./App.css";

function App() {
  return (
    <div className="App">
      <section>
        <DutyProvider>
          <TaskList />
        </DutyProvider>
      </section>
    </div>
  );
}

export default App;
