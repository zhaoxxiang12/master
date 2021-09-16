type Noop = () => void

interface WaitOptions {
  log: boolean;
  timeout: number;
  requestTimeout: number;
  responseTimeout: number;
}

interface WaitRequestOptions {
  intercept: string | (() => void);
  onBefore?: () => void;
  onSuccess?: (data: any) => void;
  onError?: (data: any) => void;
  waitOptions?: Partial<WaitOptions>
}

declare interface WaitRequest {
  (options: WaitRequestOptions): void
}

declare var waitRequest: WaitRequest