export interface BaseOptions {
  targetOrigin: string;
}

export interface AirwallexElement<Options extends BaseOptions = BaseOptions> {
  options: Options;
  /**
   * mount the element on DOM
   * @param ele CSS selector or html element instance
   */
  mount: (ele: string | HTMLElement) => void;
  /**
   * unmount the component from DOM tree
   */
  unmount: () => void;
  /**
   * destroy the element instance
   */
  destroy: () => void;
  /**
   * listen to events triggered by elements
   * @param eventName event name
   * @param callback callback function
   * @returns unique event id
   */
  on: (eventName: string, callback: (data: any) => void) => number;
  /**
   * submit form and get final formValues
   */
  submit?: () => Promise<unknown>;
}
