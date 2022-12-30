const ElEMENT_ID = 'hosted-transfer-sdk'

export const loadScript = () => {
  const sdk = window?.AirwallexHostedTransfer?.default
  if (!sdk) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.id = ElEMENT_ID
      script.async = true
      script.src =
        'https://static.airwallex.com/widgets/hosted-transfer/sdk/v0/index.js'
      script.addEventListener('load', async () => {
        resolve(window.AirwallexHostedTransfer.default)
      })
      document.getElementsByTagName('head')[0].appendChild(script)
      setTimeout(() => {
        reject('Load hosted transfer sdk error!')
      }, 15 * 1000)
    })
  }
  return sdk
}

export const removeScript = () => {
  const existingSdk =
    document.querySelector < HTMLScriptElement > `#${ElEMENT_ID}`
  if (existingSdk) {
    existingSdk.remove()
    window.AirwallexHostedTransfer = undefined
  }
}

export default { loadScript, removeScript }
