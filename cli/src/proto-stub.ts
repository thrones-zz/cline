// Universal stub for OpenHarmony
import { EventEmitter } from 'events';

export { EventEmitter };

// React stubs
const React = {
  createElement: () => ({}),
  Fragment: Symbol('Fragment'),
  useState: () => [{}, () => {}],
  useEffect: () => {},
  useRef: () => ({ current: null }),
  useCallback: (fn: Function) => fn,
  useMemo: (fn: Function) => fn(),
  memo: (c: any) => c,
};
export { React };

// Missing exports that esbuild needs
export class FileEditProvider {
  constructor() {}
  dispose() {}
  onDidChangeTextDocument() {}
}

export function detectEncoding(): string { return 'utf-8'; }
export function getLanguageForFile(): string { return 'plaintext'; }
export function isLanguageSupported(): boolean { return true; }

export class ClineClient {
  constructor() {}
  dispose() {}
  getTask() { return null; }
  getRpcClient() { return null; }
}

export class ClineEndpoint {
  constructor() {}
  dispose() {}
}

export class Controller {
  constructor() {}
  dispose() {}
}

export class AuthHandler {
  constructor() {}
  dispose() {}
}

export class StateManager {
  constructor() {}
  dispose() {}
  getState() { return {}; }
  setState() {}
}

export class ExternalCommentReviewController {
  constructor() {}
  dispose() {}
}

export function getAvailableSlashCommands(): any[] { return []; }
export function setRuntimeHooksDir(dir: string): void {}
export function getRuntimeHooksDir(): string { return ''; }

export class ExternalWebviewProvider {}
export class StandaloneTerminalManager {
  constructor() {}
  dispose() {}
}
export class AuthService {
  constructor() {}
  dispose() {}
}
export class openAiCodexOAuthManager {}
export function openExternal(): Promise<void> { return Promise.resolve(); }

export class StringRequest {
  value: string = '';
  static create(data: Partial<StringRequest>): StringRequest {
    return Object.assign(new StringRequest(), data);
  }
}
export class EmptyRequest {
  static create(): EmptyRequest {
    return new EmptyRequest();
  }
}
export const openAiCodexDefaultModelId = 'claude-sonnet-4-20250514';
export const openRouterDefaultModelId = 'anthropic/claude-sonnet-4';
export async function refreshOcaModels(): Promise<void> {}

export class RuleScope {
  static create(): RuleScope { return new RuleScope(); }
}
export class Session {
  constructor() {}
  dispose() {}
}
export function showTaskWithId(taskId: string): void {}
export class ErrorService {
  constructor() {}
  reportError(error: Error): void {}
}
export class telemetryService {
  static trackEvent(name: string, properties?: Record<string, any>): void {}
}

export class GetTaskHistoryRequest {}
export class GetTaskHistoryResponse {
  items: any[] = [];
  static create(data: Partial<GetTaskHistoryResponse>): GetTaskHistoryResponse {
    return Object.assign(new GetTaskHistoryResponse(), data);
  }
}

export function getTaskHistory(): Promise<GetTaskHistoryResponse> {
  return Promise.resolve(new GetTaskHistoryResponse());
}

export function refreshOpenRouterModels(): Promise<void> {}
export function refreshVercelAiGatewayModels(): Promise<void> {}

// Model constants - only define each once
export const anthropicDefaultModelId = 'claude-sonnet-4-20250514';
export const anthropicModels = ['claude-sonnet-4-20250514', 'claude-3-5-sonnet-20241022', 'claude-3-opus-20240229'];
export const openAiModels = ['gpt-4o', 'gpt-4-turbo', 'gpt-4'];
export const openRouterModels = ['anthropic/claude-sonnet-4', 'openai/gpt-4o'];
export const ollamaModels = ['llama3', 'codellama'];
export const geminiModels = ['gemini-1.5-pro', 'gemini-1.5-flash'];
export const vertexModels = ['gemini-1.5-pro', 'gemini-1.5-flash'];
export const cerebrasModels = ['llama-3.3-70b'];
export const awsBedrockModels = ['anthropic.claude-sonnet-4-v1:0'];
export const azureModels = ['gpt-4o'];
export const askSageDefaultModelId = 'sage';
export const askSageModels = ['sage'];
export const basetenDefaultModelId = 'llama-70b';
export const basetenModels = ['llama-70b', 'mistral-7b'];
export const bedrockDefaultModelId = 'anthropic.claude-sonnet-4-v1:0';
export const bedrockModels = ['anthropic.claude-sonnet-4-v1:0', 'anthropic.claude-3-5-sonnet-v2:0'];
export const cerebrasDefaultModelId = 'llama-3.3-70b';
export const claudeCodeDefaultModelId = 'claude-sonnet-4-20250514';
export const claudeCodeModels = ['claude-sonnet-4-20250514', 'claude-3-5-sonnet-20241022'];
export const deepSeekDefaultModelId = 'deepseek-chat';
export const deepseekModels = ['deepseek-chat', 'deepseek-coder'];
export const deepSeekModels = ['deepseek-chat', 'deepseek-coder'];
export const doubaoDefaultModelId = 'doubao-pro-32k';
export const doubaoModels = ['doubao-pro-32k', 'doubao-lite-32k'];
export const fireworksDefaultModelId = 'fireworks-llama-v3-70b-instruct';
export const fireworksModels = ['fireworks-llama-v3-70b-instruct', 'fireworks-llama-v3-8b-instruct'];
export const geminiDefaultModelId = 'gemini-1.5-pro';
export const groqDefaultModelId = 'llama3-70b-8192';
export const groqModels = ['llama3-70b-8192', 'llama3-8b-8192'];
export const huaweiCloudMaasDefaultModelId = 'huawei-cloud-maas';
export const huaweiCloudMaasModels = ['huawei-cloud-maas'];
export const huggingFaceDefaultModelId = 'meta-llama/Llama-3-70b-Instruct';
export const huggingFaceModels = ['meta-llama/Llama-3-70b-Instruct', 'meta-llama/Llama-3-8b-Instruct'];
export const internationalQwenDefaultModelId = 'qwen-turbo';
export const internationalQwenModels = ['qwen-turbo', 'qwen-plus'];
export const internationalZAiDefaultModelId = 'zhipu-glm-4';
export const internationalZAiModels = ['zhipu-glm-4', 'zhipu-glm-4-flash'];
export const minimaxDefaultModelId = 'abab6-chat';
export const minimaxModels = ['abab6-chat', 'abab5.5-chat'];
export const mistralDefaultModelId = 'mistral-large-2407';
export const mistralModels = ['mistral-large-2407', 'mistral-small-2409'];
export const moonshotDefaultModelId = 'moonshot-v1-128k';
export const moonshotModels = ['moonshot-v1-128k', 'moonshot-v1-32k'];
export const ollamaDefaultModelId = 'llama3';
export const perplexityDefaultModelId = 'llama-3.1-sonar-large-128k-online';
export const perplexityModels = ['llama-3.1-sonar-large-128k-online', 'llama-3.1-sonar-small-128k-online'];
export const qwenDefaultModelId = 'qwen-turbo';
export const qwenModels = ['qwen-turbo', 'qwen-plus', 'qwen-max'];
export const sakanaAiDefaultModelId = 'sakana-llm';
export const sakanaAiModels = ['sakana-llm'];
export const siliconFlowDefaultModelId = 'Qwen/Qwen2.5-72B-Instruct';
export const siliconFlowModels = ['Qwen/Qwen2.5-72B-Instruct', 'deepseek-ai/DeepSeek-V2.5'];
export const stepFunDefaultModelId = 'step-1v-8k';
export const stepFunModels = ['step-1v-8k', 'step-1-flash-8k'];
export const zerocloudDefaultModelId = 'anthropic.claude-sonnet-4-20250514';
export const zerocloudModels = ['anthropic.claude-sonnet-4-20250514', 'anthropic.claude-3-5-sonnet-20241022'];
export const nebiusDefaultModelId = 'nebius';
export const nebiusModels = ['nebius'];
export const nousResearchDefaultModelId = 'Hermes-3-Llama-3-8B';
export const nousResearchModels = ['Hermes-3-Llama-3-8B', 'Hermes-2-Mistral-7B-DPO'];
export const openAiCodexModels = ['gpt-4o', 'gpt-4o-mini', 'chatgpt-4o-latest'];
export const openAiNativeDefaultModelId = 'gpt-4o';
export const openAiNativeModels = ['gpt-4o', 'gpt-4o-mini', 'chatgpt-4o-latest'];
export const qwenCodeDefaultModelId = 'qwen-coder-plus';
export const qwenCodeModels = ['qwen-coder-plus', 'qwen-coder'];
export const sambanovaDefaultModelId = 'llama-3.1-70b-instruct';
export const sambanovaModels = ['llama-3.1-70b-instruct', 'llama-3.2-3b-instruct'];
export const sapAiCoreDefaultModelId = 'sap-ai-core';
export const sapAiCoreModels = ['sap-ai-core'];
export const vertexDefaultModelId = 'gemini-1.5-pro';
export const wandbDefaultModelId = 'wandb';
export const wandbModels = ['wandb'];
export class ClineAccountService {
  constructor() {}
  dispose() {}
}
export function buildApiHandler(): any { return {}; }
export function filterOpenRouterModelIds(ids: string[]): string[] { return ids; }
export const xaiDefaultModelId = 'grok-2';
export const xaiModels = ['grok-2', 'grok-2-vision-1212', 'grok-beta'];

// More missing exports
export function supportsReasoningEffortForModel(modelId: string): boolean { return false; }
export function refreshSkills(): Promise<void> {}
export function toggleSkill(skillId: string, enabled: boolean): void {}
export function convertProtoToClineMessage(proto: any): any { return proto; }
export class CommentReviewController {
  constructor() {}
  dispose() {}
}

// More missing exports
export class WebviewProvider {
  constructor() {}
  dispose() {}
}
export class OcaAuthService {
  constructor() {}
  dispose() {}
}
export function getHooksEnabledSafe(): boolean { return false; }
export function refreshClineRecommendedModels(): Promise<void> {}
export class PostHogClientProvider {
  constructor() {}
  dispose() {}
}

// More missing exports
export function getProviderModelIdKey(provider: string, modelId: string): string { return `${provider}:${modelId}`; }
export function isOpenaiReasoningEffort(modelId: string): boolean { return false; }
export const OPENAI_REASONING_EFFORT_OPTIONS = ['low', 'medium', 'high'];
export const ProviderToApiKeyMap: Record<string, string> = {};
export default {};

// More missing exports
export function getMcpSettingsFilePath(): string { return ''; }
export class ServerConfigSchema {}
export const fetch = globalThis.fetch;
export function getRequestRegistry(): any { return {}; }
export function subscribeToState(key: string, callback: (value: any) => void): void {}

// Final missing exports
export function arePathsEqual(path1: string, path2: string): boolean { return path1 === path2; }
export interface ExtensionRegistryInfo {}
// Value export to satisfy type-only imports
export const ExtensionRegistryInfo = class ExtensionRegistryInfo {};
export function createStorageContext(): any { return {}; }
export const serviceHandlers: any[] = [];
export class GrpcRecorderBuilder {
  build(): any { return {}; }
}
export interface ExtensionRegistryInfo {}
export class GrpcRequestRegistry {
  add(method: string, handler: any): void {}
}

export class Logger {
  debug() {}
  info() {}
  warn() {}
  error() {}
}

export class HostProvider {
  constructor() {}
  dispose() {}
  onMessage() {}
  sendMessage() {}
}

export interface ClineStorage {
  get<T>(key: string): Promise<T | undefined>;
  set<T>(key: string, value: T): Promise<void>;
  delete(key: string): Promise<void>;
}

export type ClineAccount = any;
export type TelemetrySetting = any;
export type AutoApprovalSettings = any;
export type ExtensionMessage = any;
export type HistoryItem = any;
export type SlashCommand = any;
export type ApiMetrics = any;
export type McpHandler = any;
export type WebviewMessage = any;
export type HttpResponse = any;
