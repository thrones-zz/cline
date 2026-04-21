// Proto stub for UI messages

export enum ClineMessageType {
  Ask = "ask",
  Say = "say",
}

export enum ClineAsk {
  APPROVE = "approve",
  DENY = "deny",
  APPROVE_TASK = "approve_task",
  DENY_TASK = "deny_task",
}

// Export enums as const objects for esbuild compatibility
export const ClineMessageTypeValues = {
  Ask: "ask",
  Say: "say",
};

export const ClineAskValues = {
  APPROVE: "approve",
  DENY: "deny",
  APPROVE_TASK: "approve_task",
  DENY_TASK: "deny_task",
};

// Export interfaces as values
export const ClineMessage = {} as ClineMessageType;
export const ClineSay = {} as ClineSay;
export const ClineAskType = {} as ClineAsk;
export const ClineMessageTypeType = {} as ClineMessageType;

export interface ClineMessage {
  type: ClineMessageType;
  ask?: ClineAsk;
  say?: ClineSay;
}

export interface ClineSay {
  type: string;
  message: string;
}
