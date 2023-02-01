import { Env, HostedTransfer } from './types';

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
    throw new Error(
      'Expected document.body not to be null, requires a <body> element.'
    );
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
        document.querySelector(`script[src="${url}"], script[src="${url}/"]`) ||
        injectScript(url);

      script.addEventListener('load', () => {
        resolve(window.AirwallexHostedTransfer!.default);
      });

      script.addEventListener('error', () => {
        reject(new Error('Failed to load Payouts SDK'));
      });
    } catch (error) {
      reject(error);
      return;
    }
  });

  return scriptPromise;
}
