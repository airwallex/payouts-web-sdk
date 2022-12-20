let existingSDK = null
export function initSDK(src) {
  const SDKId = 'airwallex-payouts-web-sdk'
  return new Promise((resolve, reject) => {
    const hasScript = document.getElementById(SDKId)
    if (hasScript) {
      if (existingSDK) resolve(existingSDK)
    } else {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.id = SDKId
      script.async = true
      script.src = src
      script.addEventListener('load', () => {
        const SDK = window.AirwallexHostedTransfer.default
        resolve(SDK)
      })
      script.addEventListener('error', reject)
      document.getElementsByTagName('head')[0].appendChild(script)
    }
  })
}

export default initSDK
