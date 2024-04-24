export interface todoListDetails {
    id: number,
    title: string,
    description: string,
    PriorityLevel: {
        level: number,
        description: string
    },
    Frequencies : {
        frequency: string
    }
}