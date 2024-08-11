import "@testing-library/jest-dom/vitest";
import React from "react";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskList } from "../src/features/TaskList/components/TaskList";
import DutyProvider, {
  DutyContext,
} from "../src/features/TaskList/context/dutyContext";
import { server } from "./setup/server";

const AllTheProviders = ({ children }) => {
  return <DutyProvider>{children}</DutyProvider>;
};

beforeAll(() => server.listen());
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
afterAll(() => server.close());

describe("task list components", () => {
  it("when rendered, should have autofocus on new task input", () => {
    render(<TaskList />);

    const newTaskInputField = screen.getByPlaceholderText("Add a Task");
    expect(newTaskInputField).toHaveFocus();
  });

  describe("adding new tasks", () => {
    it("when enter is pressed on new task input, should add new task to the list", async () => {
      render(<TaskList />, { wrapper: AllTheProviders });
      const newTaskInputField = screen.getByPlaceholderText("Add a Task");

      const user = userEvent.setup();
      const task = "hello world!";
      await user.type(newTaskInputField, task);
      await user.keyboard("{enter}");

      expect(screen.getByDisplayValue(task)).toBeInTheDocument();
      expect(newTaskInputField).toHaveValue("");
    });

    it("when input is blurred on new task input, should add new task to the list", async () => {
      render(<TaskList />, { wrapper: AllTheProviders });
      const newTaskInputField = screen.getByPlaceholderText("Add a Task");

      const user = userEvent.setup();
      const task = "this is new";
      await user.type(newTaskInputField, task);
      await user.click(document.body); // trigger blur event

      expect(screen.getByDisplayValue(task)).toBeInTheDocument();
      expect(newTaskInputField).toHaveValue("");
    });

    it("when no value is entered, should not add new task", async () => {
      const addDuty = vi.fn();
      render(
        <DutyContext.Provider
          value={{
            duties: [],
            loading: true,
            addDuty: addDuty,
            fetchDuties: async () => {},
            updateDuty: async () => {},
            deleteDuty: async () => {},
          }}
        >
          <TaskList />
        </DutyContext.Provider>
      );
      const newTaskInputField = screen.getByPlaceholderText("Add a Task");
      expect(newTaskInputField).toHaveFocus();

      const user = userEvent.setup();
      await user.keyboard("{enter}");

      expect(addDuty).not.toHaveBeenCalled();
    });

    it("when no value is entered on blur, should not add new task", async () => {
      const addDuty = vi.fn();
      render(
        <DutyContext.Provider
          value={{
            duties: [],
            loading: true,
            addDuty: addDuty,
            fetchDuties: async () => {},
            updateDuty: async () => {},
            deleteDuty: async () => {},
          }}
        >
          <TaskList />
        </DutyContext.Provider>
      );
      const newTaskInputField = screen.getByPlaceholderText("Add a Task");
      expect(newTaskInputField).toHaveFocus();

      const user = userEvent.setup();
      await user.keyboard("{enter}");

      expect(addDuty).not.toHaveBeenCalled();
    });
  });

  describe("deleting tasks", () => {
    it("when bin icon is clicked, should delete task", async () => {
      render(<TaskList />, { wrapper: AllTheProviders });
      const newTaskInputField = screen.getByPlaceholderText("Add a Task");
      const user = userEvent.setup();
      const task = "delete me";
      await user.type(newTaskInputField, task);
      await user.keyboard("{enter}");

      const taskInput = screen.getByDisplayValue(task);
      expect(taskInput).toBeInTheDocument();
      const deleteBtn = taskInput.nextElementSibling;
      expect(deleteBtn).toBeInTheDocument();
      await user.click(deleteBtn!);

      expect(screen.queryByDisplayValue(task)).not.toBeInTheDocument();
    });
  });

  describe("editing tasks", () => {
    it("when task name is edited, should update task and display new name", async () => {
      render(<TaskList />, { wrapper: AllTheProviders });
      const newTaskInputField = screen.getByPlaceholderText("Add a Task");
      const user = userEvent.setup();
      const task = "update me";
      await user.type(newTaskInputField, task);
      await user.keyboard("{enter}");
      const taskInput = screen.getByDisplayValue(task);
      expect(taskInput).toBeInTheDocument();

      const updateText = " updated";
      await user.type(taskInput, updateText);
      await user.keyboard("{enter}");

      expect(screen.queryByDisplayValue(task + updateText)).toBeInTheDocument();
      let errorMessage;
      try {
        errorMessage = await screen.findByText(
          "Unable to update task, please try again.",
          { exact: false }
        );
      } catch (err) {
        // it will throw if it is not found
        expect(errorMessage).not.toBeDefined();
      }
    });

    it("when checkbox is checked, should move task to bottom and checkbox keeps checked", async () => {
      render(<TaskList />, { wrapper: AllTheProviders });
      const newTaskInputField = screen.getByPlaceholderText("Add a Task");
      const user = userEvent.setup();
      const task = "move me";
      await user.type(newTaskInputField, task);
      await user.keyboard("{enter}");
      const taskInput = screen.getByDisplayValue(task);
      expect(taskInput).toBeInTheDocument();

      const checkbox = taskInput.previousElementSibling;
      expect(checkbox).toBeInTheDocument();
      await user.click(checkbox!);

      expect(taskInput).not.toBeInTheDocument(); // input is removed from the previous list
      await waitFor(() => {
        expect(screen.getByDisplayValue(task)).toBeInTheDocument(); // re-render in the completedTask list
      });
      const completedCheckbox =
        screen.getByDisplayValue(task).previousElementSibling;
      expect(completedCheckbox).toBeInTheDocument();
      expect(
        within(completedCheckbox as HTMLElement).getByRole("checkbox")
      ).toBeChecked();
    });
  });
});
