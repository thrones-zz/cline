// Proto stub for models

export enum ApiFormat {
  ANTHROPIC = "anthropic",
  OPENAI = "openai",
  OLLAMA = "ollama",
  BEDROCK = "bedrock",
  VERTEX = "vertex",
  GEMINI = "gemini",
  CUSTOM = "custom",
}

// JSON conversion function
export function apiFormatToJSON(value: ApiFormat): string {
  return ApiFormat[value] || "CUSTOM";
}

// Export interfaces as values for esbuild compatibility
export const ApiFormatType = {} as ApiFormat;
export const OcaModelInfo = {} as OcaModelInfo;
export const OcaCompatibleModelInfo = {} as OcaCompatibleModelInfo;
export const OnboardingModelInfo = {} as OnboardingModelInfo;
export const OnboardingModelGroup = {} as OnboardingModelGroup;

export interface OcaModelInfo {
  id: string;
  name: string;
  provider: string;
  apiFormat?: ApiFormat;
}

export interface OcaCompatibleModelInfo {
  id: string;
  name: string;
  provider: string;
  apiFormat?: ApiFormat;
  isCompatible: boolean;
}

export interface GetOnboardingModelsResponse {
  models: OnboardingModelInfo[];
  groups: OnboardingModelGroup[];
}

export interface OnboardingModelInfo {
  id: string;
  name: string;
  provider: string;
}

export interface OnboardingModelGroup {
  id: string;
  name: string;
  models: OnboardingModelInfo[];
}
