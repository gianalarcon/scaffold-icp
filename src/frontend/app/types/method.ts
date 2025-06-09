import { IDL } from '@dfinity/candid';

export interface MethodInfo {
  name: string;
  info: {
    argTypes: IDL.Type[];
    annotations: string[];
  };
}

export interface MethodItemProps {
  methodInfo: [string, MethodInfo['info']];
  inputBoxes: Record<string, any[]>;
  loading: Record<string, boolean>;
  errors: Record<string, string | null>;
  results: Record<string, any>;
  onMethodCall: (methodName: string) => Promise<void>;
}

export interface MethodListProps {
  methods: [string, MethodInfo['info']][];
  inputBoxes: Record<string, any[]>;
  loading: Record<string, boolean>;
  errors: Record<string, string | null>;
  results: Record<string, any>;
  onMethodCall: (methodName: string) => Promise<void>;
} 