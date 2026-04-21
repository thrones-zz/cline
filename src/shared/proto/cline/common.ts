// Proto stub - generated files required for build
// These are minimal type definitions for proto messages

export class EmptyRequest {
  static create(): EmptyRequest {
    return new EmptyRequest();
  }
}

export class StringRequest {
  value: string = "";
  static create(data?: Partial<StringRequest>): StringRequest {
    const req = new StringRequest();
    if (data) Object.assign(req, data);
    return req;
  }
}

// Export String as ProtoString
export { StringRequest as String };

export class Empty {
  static create(): Empty {
    return new Empty();
  }
}

export class State {
  static create(): State {
    return new State();
  }
}

export class Boolean {
  static create(): Boolean {
    return new Boolean();
  }
}

// Export other common proto types
export interface AuthState {
  apiKey?: string;
  user?: UserInfo;
}

export interface UserInfo {
  id: string;
  name: string;
  email?: string;
}

export enum DiagnosticSeverity {
  ERROR = 1,
  WARNING = 2,
  INFORMATION = 3,
  HINT = 4,
}

export const DiagnosticSeverityEnum = {
  ERROR: 1,
  WARNING: 2,
  INFORMATION: 3,
  HINT: 4,
};
