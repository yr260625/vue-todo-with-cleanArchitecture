import { TaskControllerFactory } from "@/controllers/factory/TaskControllerFactory";
import { ITaskViewState } from "@/interfaces/view/TaskViewState";
import { InjectionKey, reactive, inject } from "vue";

// provided state in task components
export const taskState = () => {
  // states
  const taskViewState = reactive<ITaskViewState>({
    categoryId: 0,
    categories: [],
    taskTitle: "",
    errorSummary: "",
    tasks: [],
  });

  return {
    taskViewState,
    controller: new TaskControllerFactory(taskViewState).create(),
  };
};

// component injection
export type taskStateType = ReturnType<typeof taskState>;
export const taskStateKey: InjectionKey<taskStateType> = Symbol("taskState");
export const useTask = () => {
  const state = inject(taskStateKey);
  if (!state) throw new Error("key is undefined");
  return state;
};
