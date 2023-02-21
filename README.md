# Airwallex Payouts Web SDK

Airwallex Payouts Web SDK provides the Embedded Payout component and Embedded Beneficiary component which are pre-build UI elements for you to integrate into your own payout flow. Instead of building a native payout flow from scratch, you can now use them to deliver a payout experience that fully leverages Airwallex’s coverage while reducing development efforts and improving speed to market. 

## Demo

To view and interact with the Embedded Payout component and Embedded Beneficiary component, checkout the [live demo site](https://demo.airwallex.com/widgets/embedded-components).


## Installation

Install with Yarn
```ts
yarn add @airwallex/payouts-web-sdk
```

Or, with NPM
```ts
npm install @airwallex/payouts-web-sdk
```

## Initialization

```ts
import { init } from '@airwallex/payouts-web-sdk';

const options = {
  langKey: 'en',
  env: 'prod',
  authCode: '<authCode>',
  clientId: '<clientId>',
  codeVerifier: '<codeVerifier>',
};

await init(options);
```

| Option         | Type     | Required? | Default value | Description                                                                                                                                                         |
| :------------- | :------- | :-------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `env`          | `string` | **NO**    | `prod`        | The Airwallex environment you want to integrate your application with. Options include: `staging`, `demo`, `prod`                                                   |
| `langKey`      | `string` | **NO**    | `en`          | Language. Options include: `en`, `zh`                                                                                                                               |
| `clientId`     | `string` | **YES**   | -             | Your unique Client ID issued by Airwallex. You can find the client id on [`Airwallex WebApp - Developer - API Keys`](https://www.airwallex.com/app/account/apiKeys) |
| `authCode`     | `string` | **YES**   | -             | Auth code to authenticate account retrieved from [`Embedded components API`](https://www.airwallex.com/docs/api#/Scale/Embedded_Components/Intro)                                                                    |
| `codeVerifier` | `string` | **YES**   | -             | Serves as proof key for code exchange (see RFC 7636 Section 4). A random string picked by yourself, and used to generate the codeChallenge.                         |

### Initialization Errors

| Code               | Message                                                           | Next Step                                                                                                                                                            |
|--------------------|-------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| FAILED_LOAD_SCRIPT | Expected document.body not to be null, requires a <body> element. | Make sure you added SDK in client and with <body> element in HTML                                                                                                    |
| FAILED_LOAD_SCRIPT | Failed to load SDK script, please check your network              | Please check your network and try again                                                                                                                              |
| INVALID_PARAMS     | Invalid {option_key}                                              | The SDK received an unsupported parameter while initializing. Please check the params table for valid options.                                                       |
| INVALID_PARAMS     | No {parameter} provided                                           | Missing required parameter. Please check the params table for required options.                                                                                      |
| UNAUTHORIZED       | `clientId`, `authCode` and `codeVerifier` do not match.           | Please check if the authentication was completed, the code verifier was generated successfully, and matching values are provided for the same authorization chain.   |
| TOKEN_EXPIRED      | Refresh token expired                                             | The `refreshToken` might be expired (currently 1 hour). Please redo the entire flow to get a new authCode and initialize the SDK, and then create the element again. |
| AUTH_TIMEOUT       | Auth timeout after 30 seconds, please check your network          | Timeout while authenticating. Please restart the entire flow to get a new authCode, initialize the component, and create the component again.                        |


## Create Element

Call `createElement(type, options)` to create an element object.

```ts
import { createElement } from '@airwallex/payouts-web-sdk';

const element = createElement(type, options);
```

### Method parameters

| Parameter | Type                              | Required? | Description                                                                                   |
| :-------- | :-------------------------------- | :-------- | :-------------------------------------------------------------------------------------------- |
| `type`    | `string`    | **YES**   | The type of element you are creating. Supported types: `payoutForm`, `beneficiaryForm`   |
| `options` | `Record<string, unknown>`         | **NO**    | Options for creating an Element, which differ for each Element. Refer to the following table. |

#### `options` object properties

| Supported Component                               | Property       | Type                   | Required | DefaultValue | Description                                                   |
|-----------------------------------------|----------------|------------------------|----------|--------------|---------------------------------------------------------------|
| Payout Component, Beneficiary Component | defaultValues  | Record<string, unkown> | false    | undefined    | Specify default values for fields rendered in the component.  |
| Payout Component, Beneficiary Component | customizations | Record<string, unkown> | false    | undefined    | Customizations on the component.                              |
| Payout Component, Beneficiary Component | theme          | Record<string, unkown> | false    | undefined    | Supported color theme for the Payout component.               |


#### `defaultValues` object properties:

Default values are followed by following schema

* Payout Component: [Payment Object defined in API docs](https://www.airwallex.com/docs/api#/Payouts/Payments/_api_v1_payments_create/post)
* Beneficiary Component: [Beneficiary Object defined in API docs](https://www.airwallex.com/docs/api#/Payouts/Beneficiaries/_api_v1_beneficiaries_create/post)


```ts
// Payout Component defaultValue type example
const type DefaultValues = {
  beneficiary_id?: string;
  source_currency?: string;
  source_amount?: number;
  payment_currency?: string;
  payment_amount?: number;
  fee_paid_by?: 'PAYER' | 'BENEFICIARY';
  payment_date?: string;
  beneficiary?: {
      bank_details?: {
          bank_country_code?: string;
          local_clearing_system?: string;
      },
      entity_type?: 'COMPANY' | 'PERSONAL'
  },
  swift_charge_option?: 'SHARED' | 'PAYER',
  payment_method: 'SWIFT' | 'LOCAL'
}
```

#### `customizations` object properties:

Customizations supports you to get customize on Payout Component

| Supported Component                     | Property | Type   | Required | DefaultValue | Description                                                                                                          |
|-----------------------------------------|----------|--------|----------|--------------|----------------------------------------------------------------------------------------------------------------------|
| Payout Component, Beneficiary Component | fields   | Object | false    | undefined    | Individual field config on disable editing or hidden, encouraged to provide default value when using fields property |
| Beneficiary Component                   | layout   | Object | false    | undefined    | Customize on rendering partial form                                                                                  |

#### `fields` object properties:
```ts
// List of supported fields customization on Payout Component
const type Customizations = {
  fields?: {
    source_currency?: {
      disabled: boolean;
    },
    source_amount?: {
      disabled: boolean;
    },
    payment_currency?: {
      disabled: boolean;
    },
    payment_amount?: {
      disabled: boolean;
    },
    payment_date?: {
      disabled: boolean;
      hidden: boolean;
    },
    'beneficiary.bank_details.bank_country_code'?: {
      disabled: boolean;
      hidden: boolean;
    },
    'beneficiary.bank_details.local_clearing_system'?: {
      disabled: boolean;
      hidden: boolean;
    },
    'beneficiary.entity_type'?: {
      disabled: boolean;
      hidden: boolean;
    },
    swift_charge_option?: {
      disabled: boolean;
      hidden: boolean;
    }
  }
}
```

#### `layout` object properties:

Beneficiary Component could be divided into three sections, including conditions, bankDetails, entityInfo and address, we provide layout customization which is able to render partial part form.

Be aware If your want to hide conditions section, make sure you've passed all defaultValues for that section.

```ts
import { createElement } from '@airwallex/payouts-web-sdk'

// If you already collected address information and won't like to show it in SDK
const beneficiaryComponentElement = sdk.createElement('beneficiaryForm',{
  customizations: {
    layout: [
      { name: 'address', hidden: true },
    ]
  }
});

// If you only like to collect bankDetails
// Requires conditions fields are all provided
const beneficiaryComponentElement = sdk.createElement('beneficiaryForm',{
  defaultValues: {
    beneficiary: {
      entity_type: 'COMPANY',
      bank_details: {
        account_currency: 'AUD',
        bank_country_code: 'AU',
        local_clearing_system: 'BANK_TRANSFER',
      },
    },
    payment_methods: ['LOCAL'],
  },
  customizations: {
    layout: [
      { name: 'conditions', hidden: true },
    ]
  }
});
```

#### `theme` object properties:

We support color theming for embedded components. To receive full support in recoloring your own color theme and design/branding requirements, please contact your Account Manager.

```ts
  const type ColorPattern = {
    '10': string;
    '20': string;
    '30': string;
    '40': string;
    '50': string;
    '60': string;
    '70': string;
    '80': string;
    '90': string;
    '100': string;
  }


 const type Theme = {
  palette: {
    primary: ColorPattern;
    secondary: ColorPattern;
    error: ColorPattern;
  };
 }
```

### CreateElement Errors

| Code                 | Message                                    | Next Step                                                                                                            |
|----------------------|--------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| INVALID_ELEMENT_TYPE | The component type passed is not supported | Please check the supported element types.                                                                            |
| CREATE_ELEMENT_ERROR | Please init() before createElement()       | Please confirm you have correctly loaded the SDK script using the init() function from our package  or the CDN link. |



## Interact with `element` object

```ts
export type EVENT_TYPE = 'ready' | 'change' | 'error' | 'formState'

interface Element {
  /**
   * Mount element to your HTML DOM element
   */
  mount(domElement: string | HTMLElement): void;
  /**
   * Using this function to unmount the element, opposite to mount function
   * The element instance is still kept
   */
  unmount(): void;
  /**
   * Using this function to destroy the element instance
   */
  destroy(): void;
  /**
   * Using this function to Submit form and get final form values
   */
  submit(): FormValues
  /**
   * Listen to event
   */
  on(eventCode: EVENT_TYPE, handler: (eventData: Record<string, unknown>) => void): void;
}
```

### Mount element

After create element, mount the element to your page

```ts
import { createElement } from '@airwallex/payouts-web-sdk';

const element = createElement(type, options);

const container = document.getElementById('form-wrapper');
element.mount(container);
```

#### Mount Errors

| Code                      | Message                            | Next Step                                                                                         |
|---------------------------|------------------------------------|---------------------------------------------------------------------------------------------------|
| MOUNT_CONTAINER_NOT_EXIST | The mount container does not exist | Please check if the container dom id or the dom element passed in the mount()  function is valid. |

### Subscribe Events

Subscribe Events when form are interact with users

#### `Ready`

This event fires when the component in the page is ready for user interaction.

```ts
element.on('ready', () => void);
```

#### `Error`

This event fires when the component in the page is mounted but failed to work with errors, handle these errors while occurs.

```ts
element.on('error', () => void);
```

##### Possible Error Codes

| Component                                 | Code                   | Description                                                       | Next step                                                                                                                                         |
|-------------------------------------------|------------------------|-------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| Payout Component, Beneficiary Component | INVALID_BENEFICIARY_ID | The `beneficiary_id` you provided in the defaultValue is invalid. | Provide a valid beneficiary ID that belongs to this account, or specify parameters for the beneficiary instead.                                   |
| Payout Component, Beneficiary Component | SCHEMA_NOT_FOUND       | The `defaultValue` provided is not supported in our schema.       | Provide a supported combination of values for `sourceCurrency`, `paymentCurrency`, `bankCountryCode`, `paymentMethod`, and `localClearingSystem`. |



#### `Change`

This event fires when a value in the component changes.

```ts
element.on('change', () => FormData);
```

#### `FormState`

This event fires when the Payout component’s form state changes. States include loading, validating, and errors during form rendering. 

```ts
type OnFormState = {
  loading: boolean;
  validating: boolean;
  errors: { code: ErrorCodes } | null;
}

element.on('formState', (state: OnFormState) => void);
```
#### Possible Error Codes

Suggesting messages to surface on your user interface.


| Component                               | Code                              | Description                                                                                                    | Next step                                                                                                                                         |
|-----------------------------------------|-----------------------------------|----------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| Payout Component, Beneficiary Component | SCHEMA_NOT_FOUND                  | The values provided are not supported in our schema.                                                           | Provide a supported combination of values for `sourceCurrency`, `paymentCurrency`, `bankCountryCode`, `paymentMethod`, and `localClearingSystem`. |
| Payout Component                        | AMOUNT_ABOVE_LIMIT                | The amount exceeds the transfer limit.                                                                         | Provide a lower amount.                                                                                                                           |
| Payout Component                        | AMOUNT_ABOVE_PAYMENT_LIMIT        | The amount exceeds the transfer limit.                                                                         | Provide a lower amount.                                                                                                                           |
| Payout Component                        | AMOUNT_BELOW_LIMIT                | This amount is lower than the minimum transfer limit.                                                          | Provide a higher amount.                                                                                                                          |
| Payout Component                        | AFTER_FEE_IS_TOO_SMALL            | This amount is lower than the minimum transfer limit after deducting payout fee.                               | Provide a higher amount.                                                                                                                          |
| Payout Component                        | INVALID_AMOUNT_MAX_THREE_DECIMALS | This amount only supports three decimal places maximum.                                                        | Provide a valid amount with no more than three decimal places.                                                                                    |
| Payout Component                        | INVALID_AMOUNT_MAX_TWO_DECIMALS   | This amount only supports two decimal places maximum.                                                          | Provide a valid amount with no more than two decimal places.                                                                                      |
| Payout Component                        | INVALID_AMOUNT_NO_DECIMALS        | This amount does not support any decimal places.                                                               | Provide a valid amount without any decimal places.                                                                                                |
| Payout Component                        | INVALID_AMOUNT_MUST_POSITIVE      | This amount can only be positive.                                                                              | Provide a positive amount.                                                                                                                        |
| Payout Component                        | INVALID_SETTLEMENT_DATE           | The payout date is not supported.                                                                              | Provide a valid payout date.                                                                                                                      |
| Payout Component                        | INVALID_CURRENCY_PAIR             | The `sourceCurrency` and `paymentCurrency` combination specified is not supported or enabled for this account. | Provide a supported `sourceCurrency` and `paymentCurrency` pair.                                                                                  |
| Payout Component                        | UNSUPPORTED_CURRENCY              | The currency specified is not supported or enabled for this account.                                           | Provide a valid sourceCurrency or paymentCurrency.                                                                                                |
| Payout Component                        | MISSING_FEE_CONFIG                | There is a problem with this account’s  payout fee configuration.                                              | Contact your Account Manager and report this issue.                                                                                               |
| Beneficiary Component                   | VALIDATION_FAILED                 | The request failed our schema validation                                                                       | Check the error on the form and change to correct value                                                                                           |




### Get final payload from `submit` method

When you are ready to retrieve the final payload, you can call the submit function. It will trigger the validation of all fields in the component and return you the payload.

```ts
  const results = await element.submit()
```

#### Result payload
| Supported Component                     | Property       | Type               | Description                                                                                                           |
|-----------------------------------------|----------------|--------------------|-----------------------------------------------------------------------------------------------------------------------|
| Payout Component, Beneficiary Component | values         | Object             | Values that the end-users specify in the component.                                                            |
| Payout Component, Beneficiary Component | errors         | FormStateErrors | Errors surfaced in the component, checkout formState error part for details                                                                             |
| Payout Component                        | additionalInfo | Object             | Additional information including the supported reasons that can be selected for the payout and the quote information. |


#### `additionalInfo` object

```ts
const type AdditionalInfo = {
  // The supported reasons for the payout method selected
  reasons: Array<{
    label: string;
    value: string;
  }>,
  // The quote id used in the payout component alongside its validity, i.e., when it expires.                
  quote: {
    id: string;
    validity: {
      validFrom: string;
      validTo: string;
    }
  }
}
```



