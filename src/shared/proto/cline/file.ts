// Proto stub for file operations

// Export interfaces as values for esbuild compatibility
export const RefreshedRules = {} as { rules: string[] };
export const RefreshedSkills = {} as { skills: SkillInfo[] };
export const RefreshedClineRules = {} as { rules: ClineRule[] };
export const RefreshedHooks = {} as { hooks: HookInfo[] };
export const HooksToggles = {} as { hooks: HookInfo[] };
export const WorkspaceHooks = {} as { hooks: HookInfo[] };
export const ToggleClineRules = {} as { rules: ToggleCelineRule[] };
export const ClineRulesToggles = {} as { rules: ToggleCelineRule[] };
export const ToggleHookResponse = {} as { success: boolean };
export const SkillsToggles = {} as { skills: ToggleSkill[] };
export const SkillInfo = {} as SkillInfo;
export const HookInfo = {} as HookInfo;

export interface SkillInfo {
  id: string;
  name: string;
  enabled: boolean;
}

export interface ClineRule {
  id: string;
  name: string;
  enabled: boolean;
}

export interface HookInfo {
  id: string;
  name: string;
  enabled: boolean;
}

export interface RefreshedRules {
  rules: string[];
}

export interface RefreshedSkills {
  skills: SkillInfo[];
}

export interface RefreshedClineRules {
  rules: ClineRule[];
}

export interface RefreshedHooks {
  hooks: HookInfo[];
}

export interface HooksToggles {
  hooks: HookInfo[];
}

export interface WorkspaceHooks {
  hooks: HookInfo[];
}

export interface ToggleClineRuleRequest {
  id: string;
  scope: string;
  enabled: boolean;
}

export interface ToggleClineRules {
  rules: ToggleCelineRule[];
}

export interface ToggleCelineRule {
  id: string;
  scope: string;
  enabled: boolean;
}

export interface ClineRulesToggles {
  rules: ToggleCelineRule[];
}

export interface ToggleHookRequest {
  id: string;
  enabled: boolean;
}

export interface ToggleHookResponse {
  success: boolean;
}

export interface ToggleSkillRequest {
  id: string;
  enabled: boolean;
}

export interface ToggleWorkflowRequest {
  id: string;
  scope: string;
  enabled: boolean;
}

export interface SkillsToggles {
  skills: ToggleSkill[];
}

export interface ToggleSkill {
  id: string;
  enabled: boolean;
}

// Rule scope
export enum RuleScope {
  GLOBAL = "GLOBAL",
  LOCAL = "LOCAL",
  REMOTE = "REMOTE",
}

export const RuleScopeEnum = {
  GLOBAL: "GLOBAL",
  LOCAL: "LOCAL",
  REMOTE: "REMOTE",
};
