import { AirwallexElement } from './element';

export type Env = 'staging' | 'demo' | 'prod';
export type LangKey = 'de' | 'en' | 'es' | 'fr' | 'it' | 'ja' | 'ko' | 'zh';

export interface Options {
  /** language key */
  langKey: LangKey;
  /** environment for integration */
  env: Env;
  /** used for access token exchange */
  authCode: string;
  /** The ID of platform application issued by Airwallex */
  clientId: string;
  /** Proof Key for code exchange in authorization code flow. */
  codeVerifier: string;
}

export interface HostedTransfer {
  /**
   * initialize the SDK
   * @param options
   * @returns
   */
  init: (options: Options) => Promise<void>;
  /**
   * create element instance
   * @param type element type
   * @param options element config
   * @returns element instance
   */
  createElement: (
    type: string,
    options?: Record<string, unknown>
  ) => Promise<AirwallexElement>;
}
