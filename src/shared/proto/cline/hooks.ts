// Proto stub for hooks

export interface HookInfo {
  id: string;
  name: string;
  enabled: boolean;
}

export interface HooksToggles {
  hooks: HookInfo[];
}

export interface WorkspaceHooks {
  hooks: HookInfo[];
}

export interface HookModelContext {
  modelId?: string;
}

export interface NotificationData {
  type: string;
  message: string;
}

export interface PostToolUseData {
  tool: string;
  input: Record<string, unknown>;
  output?: string;
}

export interface PreToolUseData {
  tool: string;
  input: Record<string, unknown>;
}

export interface PreCompactData {
  // Pre-compact hook data
}

export interface TaskCancelData {
  reason?: string;
}

export interface TaskCompleteData {
  // Task complete data
}

export interface TaskResumeData {
  // Task resume data
}

export interface TaskStartData {
  // Task start data
}

export interface UserPromptSubmitData {
  prompt: string;
}

export class HookInput {
  static create(data: Partial<HookInput>): HookInput {
    return Object.assign(new HookInput(), data);
  }
}

export class HookOutput {
  cancel?: boolean;
  contextModification?: Record<string, unknown>;
  errorMessage?: string;

  static create(data: Partial<HookOutput>): HookOutput {
    return Object.assign(new HookOutput(), data);
  }
}
