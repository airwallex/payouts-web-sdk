import { HostedTransfer, Options } from './types';
import { loadScript, resolveStaticOrigin, SDKError, SDKErrorCodes } from './utils';

declare global {
  interface Window {
    AirwallexHostedTransfer?: {
      default: HostedTransfer;
    };
  }
}

const SDK_VERSION = 'v0';

/**
 * Initialize Payouts SDK
 * @param options
 * @returns SDK instance
 */
export async function init(options: Options) {
  const scriptUrl = `${resolveStaticOrigin(
    options.env
  )}/widgets/hosted-transfer/sdk/${SDK_VERSION}/index.js`;
  const hostedTransfer = await loadScript(scriptUrl);
  if (!hostedTransfer) {
    throw new SDKError(SDKErrorCodes.FAILED_LOAD_SCRIPT);
  }
  await hostedTransfer.init(options);
  return hostedTransfer;
}

/**
 * Create an element instance
 * @param type element type
 * @param options
 * @returns element instance
 */
export function createElement(type: string, options?: Record<string, unknown>) {
  if (!window.AirwallexHostedTransfer?.default) {
    throw new SDKError(SDKErrorCodes.CREATE_ELEMENT_ERROR);
  }
  return window.AirwallexHostedTransfer?.default.createElement(type, options);
}
