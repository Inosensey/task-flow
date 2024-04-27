export interface todoListDetails {
    id: number,
    title: string,
    description: string,
    PriorityLevel: {
        level: number,
        description: string,
        color: string
    },
    Frequencies : {
        frequency: string
    }
    TodoListStatus: {
        id: number,
        status: string,
    }
}