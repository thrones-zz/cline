// Proto stub for slash commands

export interface SlashCommandInfo {
  name: string;
  description?: string;
  section?: string;
  key?: string;
}

export interface SlashCommandsResponse {
  commands: SlashCommandInfo[];
}

export const SlashCommandInfo = {
  create(data: Partial<SlashCommandInfo>): SlashCommandInfo {
    return { name: "", description: "", section: "", key: "", ...data };
  }
};

export const SlashCommandsResponse = {
  create(data: Partial<SlashCommandsResponse>): SlashCommandsResponse {
    return { commands: [], ...data };
  }
};
