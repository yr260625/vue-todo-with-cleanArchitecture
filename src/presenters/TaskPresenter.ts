import { ITaskPresenter } from "@/interfaces/presenters/TaskPresenter";
import { TTaskViewState } from "@/interfaces/view/TaskView";
import {
  TCategory,
  TTask,
} from "@/interfaces/infrastructure/ITaskInfrastructure";

export class TaskPresenter implements ITaskPresenter {
  constructor(readonly taskViewState: TTaskViewState) {}

  initTaskView(categoryList: TCategory[], taskList: TTask[]) {
    this.taskViewState.categories = categoryList;
    this.taskViewState.tasks = taskList;
    this.taskViewState.categoryId = this.taskViewState.categories[0].id;
  }

  addTaskState(task: TTask) {
    this.taskViewState.tasks.push(task);
    this.taskViewState.taskTitle = "";
    this.taskViewState.categoryId = this.taskViewState.categories[0].id;
  }

  removeTaskStateById(id: number) {
    this.taskViewState.tasks = this.taskViewState.tasks.filter(
      (elm: TTask) => id !== elm.id
    );
  }

  setError(error: string) {
    this.taskViewState.errorSummary = error;
  }

  setErrorDetail(taskId: number, error: string) {
    const index = this.taskViewState.tasks.findIndex((elm) => elm.id == taskId);
    this.taskViewState.tasks[index].error = error;
  }
}