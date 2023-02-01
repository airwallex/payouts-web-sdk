export interface BaseOptions {
  targetOrigin: string;
}

export interface AirwallexElement<Options extends BaseOptions = BaseOptions> {
  options: Options;
  mount: (ele: string | HTMLElement) => void;
  unmount: () => void;
  on: (eventName: string, callback: (data: any) => void) => number;
}
