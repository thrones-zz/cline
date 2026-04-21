// Proto stub for checkpoints

export enum CheckpointOperation {
  CHECKPOINT_INIT = "CHECKPOINT_INIT",
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export enum CheckpointEvent_OperationType {
  CHECKPOINT_INIT = "CHECKPOINT_INIT",
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export const CheckpointEvent_OperationTypeEnum = CheckpointEvent_OperationType;

export interface CheckpointEvent {
  type: CheckpointEvent_OperationType;
  checkpointId?: string;
  taskId?: string;
  timestamp?: number;
}

export class CheckpointEventClass {
  type: CheckpointEvent_OperationType = CheckpointEvent_OperationType.CHECKPOINT_INIT;
  checkpointId?: string;
  taskId?: string;
  timestamp?: number;
  
  static create(data?: Partial<CheckpointEvent>): CheckpointEvent {
    return { type: CheckpointEvent_OperationType.CHECKPOINT_INIT, ...data } as CheckpointEvent;
  }
}

export interface CheckpointSubscriptionRequest {
  taskId: string;
}

export class CheckpointSubscriptionRequestClass {
  taskId: string = "";
  static create(data?: Partial<CheckpointSubscriptionRequest>): CheckpointSubscriptionRequest {
    return { taskId: data?.taskId || "", ...data };
  }
}
