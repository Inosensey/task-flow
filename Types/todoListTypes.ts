export interface todoListDetails {
  id: number;
  title: string;
  description: string;
  PriorityLevel: {
    level: number;
    description: string;
    color: string;
  };
  Frequencies: {
    id: number;
    frequency: string;
  };
  TodoListStatus: {
    id: number;
    status: string;
  };
}

export interface todoListResponseInterface {
  unsortedTodoList: todoListDetails[];
  sortedTodoList: sortedTodoListInterface;
}
export type sortedTodoListType = {
  todoList: todoListDetails[];
  color: string;
};
export interface sortedTodoListInterface {
  Urgent: sortedTodoListType;
  HighPriority: sortedTodoListType;
  MedPriority: sortedTodoListType;
  LowPriority: sortedTodoListType;
}
