// Proto stub for task

export class TaskResponse {
  taskId?: string;
  message?: string;
  
  static create(data?: Partial<TaskResponse>): TaskResponse {
    return { ...data } as TaskResponse;
  }
}

export interface TaskResult {
  success?: boolean;
  error?: string;
}

export interface TaskStep {
  id: string;
  timestamp?: number;
}

export class GetTaskHistoryRequest {
  taskId?: string;
  limit?: number;
  
  static create(data?: Partial<GetTaskHistoryRequest>): GetTaskHistoryRequest {
    return { ...data } as GetTaskHistoryRequest;
  }
}

export interface TaskInfo {
  id: string;
  timestamp?: number;
  status?: string;
}

export interface TaskHistoryArray {
  tasks: TaskInfo[];
}

export class TaskHistoryArrayClass {
  tasks: TaskInfo[] = [];
  static create(data?: Partial<TaskHistoryArray>): TaskHistoryArray {
    return { tasks: [], ...data } as TaskHistoryArray;
  }
}

// Export as both interface and class for compatibility
export { TaskHistoryArrayClass as TaskHistoryArray };
