// Proto stub for MCP

export interface McpServer {
  id: string;
  name: string;
  command: string;
  args: string[];
  env: Record<string, string>;
  status?: McpServerStatus;
}

export class McpServers {
  servers: McpServer[] = [];
  static create(data?: Partial<McpServers>): McpServers {
    const obj = new McpServers();
    if (data) Object.assign(obj, data);
    return obj;
  }
}

export interface McpMarketplaceCatalog {
  servers: McpServer[];
}

export interface McpPrompt {
  name: string;
  description?: string;
  arguments?: McpPromptArgument[];
}

export interface McpPromptArgument {
  name: string;
  description?: string;
  required?: boolean;
}

export interface McpResource {
  uri: string;
  name: string;
  description?: string;
  mimeType?: string;
}

export interface McpResourceTemplate {
  uriTemplate: string;
  name: string;
  description?: string;
}

export interface McpTool {
  name: string;
  description?: string;
  inputSchema: Record<string, unknown>;
}

export enum McpServerStatus {
  DISCONNECTED = 0,
  CONNECTING = 1,
  CONNECTED = 2,
}

export const McpServerStatusEnum = {
  MCP_SERVER_STATUS_DISCONNECTED: 0,
  MCP_SERVER_STATUS_CONNECTING: 1,
  MCP_SERVER_STATUS_CONNECTED: 2,
  DISCONNECTED: 0,
  CONNECTING: 1,
  CONNECTED: 2,
};

// Re-export as namespace for backward compatibility
export const McpServersNS = { create: McpServers.create };
