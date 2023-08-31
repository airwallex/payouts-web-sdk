module.exports = {
  pathPrefix: '/docs/sdk/payouts-web',
  siteMetadata: {
    title: 'Airwallex',
    siteUrl: 'https://www.airwallex.com',
    description: 'A guide to using airwallex payouts web sdk'
  },
  trailingSlash: 'never',
  plugins: [
    {
      resolve: '@airwallex/gatsby-theme-docs',
      options: {
        siteName: 'payouts web sdk',
        pageTitle: 'payouts web sdk',
        menuTitle: 'payouts web sdk',
        contentDir: 'source',
        oneTrust: true,
        baseUrl: 'https://www.airwallex.com',
        root: '/Users/shirly.chen/repos/payouts-web-sdk/docs',
        subtitle: '',
        navConfig: {
          'Payout form': {
            category: 'Core',
            url: 'https://staging.airwallex.com/docs/sdk/payout-form',
            description: 'Learn about something',
            omitLandingPage: true
          }
        },
        description: 'A guide to using airwallex payouts web sdk',
        sidebarCategories: {
          null: [ 'sdk-reference/README' ],
          'sdk reference': {
            functions: {
              null: [
                'sdk-reference/functions/createElement',
                'sdk-reference/functions/init'
              ]
            },
            interfaces: {
              null: [
                'sdk-reference/interfaces/internal_.AirwallexElement',
                'sdk-reference/interfaces/internal_.BaseOptions',
                'sdk-reference/interfaces/internal_.HostedTransfer',
                'sdk-reference/interfaces/internal_.Options'
              ]
            },
            modules: { null: [ 'sdk-reference/modules/internal_' ] },
            types: {
              null: [
                'sdk-reference/types/internal_.Env',
                'sdk-reference/types/internal_.LangKey'
              ]
            }
          }
        }
      }
    }
  ]
}