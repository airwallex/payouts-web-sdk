import { Env, HostedTransfer } from './types';

export class SDKError implements Error {
  name = 'AirwallexPayoutSDKError';
  message: string;
  code: string;
  constructor({ message, code }: { message?: string; code: string }) {
    this.message = message || code;
    this.code = code;
  }
}

export const SDKErrorCodes = {
  CREATE_ELEMENT_ERROR: {
    code: 'CREATE_ELEMENT_ERROR',
    message: 'Please init() before createElement()',
  },
  FAILED_LOAD_SCRIPT_NEED_BODY: {
    code: 'FAILED_LOAD_SCRIPT',
    message: 'Expected document.body not to be null, requires a <body> element.',
  },
  FAILED_LOAD_SCRIPT: {
    code: 'FAILED_LOAD_SCRIPT',
    message: 'Failed to load SDK script, please check your network',
  },
}

/**
 * Get static resource origin based on URL host
 * @params env environment
 * @returns static resource origin
 */
export function resolveStaticOrigin(env: Env) {
  let prefix = '';
  switch (env) {
    case 'prod':
      prefix = '';
      break;
    case 'demo':
      prefix = '-demo';
      break;
    case 'staging':
      prefix = '-staging';
      break;
  }
  return `https://static${prefix}.airwallex.com`;
}

/**
 * Inject script to body
 * @param url script url
 * @returns script element
 */
export function injectScript(url: string) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  const headOrBody = document.head || document.body;

  if (!headOrBody) {
    throw new SDKError(SDKErrorCodes.FAILED_LOAD_SCRIPT_NEED_BODY);
  }

  headOrBody.appendChild(script);

  return script;
}

let scriptPromise: Promise<HostedTransfer | null> | null = null;

/**
 * Load umd script
 * @param url script url
 * @returns umd instance
 */
export function loadScript(url: string) {
  // Ensure that we only attempt to load script at most once
  if (scriptPromise !== null) {
    return scriptPromise;
  }

  scriptPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      // Resolve to null when imported server side. This makes the module
      // safe to import in an isomorphic code base.
      resolve(null);
      return;
    }

    if (window.AirwallexHostedTransfer) {
      resolve(window.AirwallexHostedTransfer.default);
      return;
    }

    try {
      const script =
        document.querySelector(`script[src^="${url}"]`) ||
        injectScript(`${url}?_t=${Date.now()}`);

      script.addEventListener('load', () => {
        resolve(window.AirwallexHostedTransfer!.default);
      });

      script.addEventListener('error', () => {
        reject(new SDKError(SDKErrorCodes.FAILED_LOAD_SCRIPT));
      });
    } catch (error) {
      reject(error);
      return;
    }
  });

  return scriptPromise;
}
