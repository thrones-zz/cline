// Proto stub for state

export class State {
  static create(): State {
    return new State();
  }
}

export interface OnboardingModel {
  id: string;
  name: string;
  provider: string;
}

export interface OnboardingModelGroup {
  id: string;
  name: string;
  models: OnboardingModel[];
}

export interface ClineAuthState {
  apiKey?: string;
}

export interface OcaAuthState {
  apiKey?: string;
  user?: OcaUserInfo;
}

export interface OcaUserInfo {
  id: string;
  name: string;
  email?: string;
}

// Feature flags
export enum Setting {
  ENABLED = 1,
  DISABLED = 2,
  UNSUPPORTED = 3,
}

export const SettingEnum = {
  ENABLED: 1,
  DISABLED: 2,
  UNSUPPORTED: 3,
};
