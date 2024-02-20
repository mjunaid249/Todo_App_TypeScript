export const saveTodos = (todos: TodoItemType[]): void => {
  localStorage.setItem("mytodos", JSON.stringify(todos));
};
