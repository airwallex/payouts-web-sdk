---
title: Technical overview 
description: Airwallex Payouts Web SDK includes the Embedded Payout component and the Embedded Beneficiary component
---
# Airwallex Payouts Web SDK

Airwallex Payouts Web SDK includes the Embedded Payout component and the Embedded Beneficiary component, which are pre-built UI elements you can integrate into your own user flows. Instead of building a flow from scratch, you can now use them to deliver a user experience that fully leverages Airwallex’s coverage while reducing development efforts and improving speed to market.

## Demo and documentation

To view and interact with the Embedded components, go to the [Embedded components demo site](https://demo.airwallex.com/widgets/embedded-components).

To view the high-level integration sequence and a step-by-step guide, see our Product Docs for [Embedded Payout component](https://www.airwallex.com/docs/payouts__embedded-payout-component) and [Embedded Beneficiary component](https://www.airwallex.com/docs/payouts__embedded-beneficiary-component).


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
| `env`          | `string` | **NO**    | `prod`        | The Airwallex environment you want to integrate your application with. Options include: `staging`, `demo`, `prod`                                                  |
| `langKey`      | `string` | **NO**    | `en`          | Language. Options include: `en`, `zh`                                                                                                                               |
| `clientId`     | `string` | **YES**   | -             | Your unique Client ID issued by Airwallex. You can find the client id on [`Airwallex WebApp - Developer - API Keys`](https://www.airwallex.com/app/account/apiKeys) |
| `authCode`     | `string` | **YES**   | -             | Auth code to authenticate account retrieved from [`Embedded components API`](https://www.airwallex.com/docs/api#/Scale/Embedded_Components/Intro)                                                                    |
| `codeVerifier` | `string` | **YES**   | -             | Serves as proof key for code exchange (see RFC 7636 Section 4). A random string picked by yourself, and used to generate the codeChallenge.                         |

### Initialization Errors

| Code               | Message                                                           | Next Step                                                                                                                                                            |
|--------------------|-------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| FAILED_LOAD_SCRIPT | Expected document.body not to be null, requires a \<body\> element. | Make sure you added SDK in client and with \<body\> element in HTML                                                                                                    |
| FAILED_LOAD_SCRIPT | Failed to load SDK script, please check your network              | Please check your network and try again                                                                                                                              |
| INVALID_PARAMS     | Invalid {option_key}                                              | The SDK received an unsupported parameter while initializing. Please check the params table for valid options.                                                       |
| INVALID_PARAMS     | No {parameter} provided                                           | Missing required parameter. Please check the params table for required options.                                                                                      |
| UNAUTHORIZED       | `clientId`, `authCode` and `codeVerifier` do not match.           | Please check if the authentication was completed, the code verifier was generated successfully, and matching values are provided for the same authorization chain.   |
| TOKEN_EXPIRED      | Refresh token expired                                             | The `refreshToken` has expired (valid for 1 hour). Please restart the entire flow by retrieving a new authCode and initializing the SDK, and then create the element again. |
| AUTH_TIMEOUT       | Auth timeout after 30 seconds, please check your network          | Please restart the entire flow to get a new authCode, initialize the component, and create the component again.                        |


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
| `options` | `Record<string, unknown>`         | **NO**    | Options when creating an Element. Refer to the following table. |

#### `options` object properties

| Supported Component                               | Property       | Type                   | Required | DefaultValue | Description                                                   |
|-----------------------------------------|----------------|------------------------|----------|--------------|---------------------------------------------------------------|
| Payout Component, Beneficiary Component | defaultValues  | Record<string, unkown> | false    | undefined    | Specify default values for fields rendered in the component.  |
| Payout Component, Beneficiary Component | customizations | Record<string, unkown> | false    | undefined    | Customizations on the component.                              |
| Payout Component, Beneficiary Component | theme          | Record<string, unkown> | false    | undefined    | Supported color theme for the Payout component.               |


#### `defaultValues` object properties:

Fields that can be specified with default values are listed in the objects below

* Payout Component: [Payment Object defined in API docs](https://www.airwallex.com/docs/api#/Payouts/Payments/_api_v1_payments_create/post)
* Beneficiary Component: [Beneficiary Object defined in API docs](https://www.airwallex.com/docs/api#/Payouts/Beneficiaries/_api_v1_beneficiaries_create/post)


```ts
// Field examples where defaultValue can be specified in the Payout component
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

Customizations allow you to disable or hide some fields or UI components  from the Payout component

| Supported Component                     | Property | Type   | Required | DefaultValue | Description                                                                                                          |
|-----------------------------------------|----------|--------|----------|--------------|----------------------------------------------------------------------------------------------------------------------|
| Payout Component, Beneficiary Component | fields   | Object | false    | undefined    | Configuration for disabling or hiding individual fields. We recommend providing default values when using the fields property. |
| Beneficiary Component                   | layout   | Object | false    | undefined    | Configuration for hiding certain groups of fields so you can render the form selectively.                                                                                  |
| Payout Component, Beneficiary Component | ui   | Object | false    | undefined    | Configuration for hiding certain UI components. |

#### `fields` object properties:
```ts
// Fields and UI components that can be customized in the Payout component
const type Customizations = {
  ui?: {
    hideTransferFee?: boolean;
    hideFeeConfig?: boolean;
    hideFlightTime?: boolean;
  },
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

The beneficiary form contains information that can be grouped into three categories, the beneficiary bank conditions, bank details, and beneficiary details. You can render any part of the forms with the layout customization feature.

If you want to hide any fields or sections, make sure default values are provided.

```ts
import { createElement } from '@airwallex/payouts-web-sdk'

// When you have collected address information from your beneficiaries
// and do not want to collect again using the component
const beneficiaryComponentElement = sdk.createElement('beneficiaryForm',{
  customizations: {
    layout: [
      { name: 'address', hidden: true },
    ]
  }
});

// When you have a preferred payment_method and local_clearing_system
// and only needs to collect bank details, you need to provide default values
// for the beneficiary bank conditions
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

We support theming for embedded components. To best match your branding needs with our comprehensive systems of themes, please contact your Account Manager so we can provide a tailored JSON for you to set the value of the theme property.

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
| INVALID_ELEMENT_TYPE | The component type passed is not supported | Please check the supported element types and try again.                                                                            |
| CREATE_ELEMENT_ERROR | Please init() before createElement()       | Please confirm you have correctly loaded the SDK script using the init() function from our package or the CDN link. |



## Interact with `element` object

```ts
export type EVENT_TYPE = 'ready' | 'change' | 'error' | 'formState'

interface Element {
  /**
   * Mount element to your HTML DOM element
   */
  mount(domElement: string | HTMLElement): void;
  /**
   * Use this function to unmount the element
   * The element instance remains
   */
  unmount(): void;
  /**
   * Use this function to destroy the element instance
   */
  destroy(): void;
  /**
   * Use this function to Submit form and get final formValues
   */
  submit(): FormValues
  /**
   * Listen to events
   */
  on(eventCode: EVENT_TYPE, handler: (eventData: Record<string, unknown>) => void): void;
}
```

### Mount element

Once the element is created, mount it to your web page

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

### Subscribe to Events

Add event listeners to handle events received from Airwallex. Events can be used to facilitate other flows in your user interface where applicable. Please find more details in the list of events below.

You can introduce different call-to-actions based on the user input by monitoring the values in the change event. For example, you can trigger an approval flow based on the source amount, i.e., when it is above a certain threshold amount, you can guide the user to go through a different user flow.

You can also monitor errors as part of the formState event and provide additional guidance for the users so they can fix the errors. The list of possible errors can be found in the Errors and events section.

The following types of events can be emitted during the lifecycle of the payoutComponent.

#### `Ready`

This event fires when the component in the page is ready for user interaction.

```ts
element.on('ready', () => void);
```

#### `Error`

This event fires when the component in the page is mounted but failed to work with errors. Handle these errors when they occur.

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

This event fires when the form state of the component changes. States include loading, validating, and errors during form rendering.

```ts
type OnFormState = {
  loading: boolean;
  validating: boolean;
  errors: { code: ErrorCodes } | null;
}

element.on('formState', (state: OnFormState) => void);
```
#### Possible Error Codes

You can map your own messages with the error codes below. The error  messages suggested by Airwallex are also available for your reference.


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
| Beneficiary Component                   | VALIDATION_FAILED                 | The request failed our schema validation                                                                       | Check the errors on the form and update with accepted values.                                                                                           |




### Get final payload from `submit` method

When you are ready to retrieve the final payload, you can call the submit function. It will trigger the validation of all fields in the component and return you the payload.

```ts
  const results = await element.submit()
```

#### Result payload
| Supported Component                     | Property       | Type               | Description                                                                                                           |
|-----------------------------------------|----------------|--------------------|-----------------------------------------------------------------------------------------------------------------------|
| Payout Component, Beneficiary Component | values         | Object             | Values that the users specify in the component.                                                            |
| Payout Component, Beneficiary Component | errors         | FormStateErrors | Errors surfaced in the component. Check the formState errors for details.                                                                             |
| Payout Component                        | additionalInfo | Object             | Additional information including the supported reasons that can be selected for the payout and the quote information. |


#### `additionalInfo` object

```ts
const type AdditionalInfo = {
  // The supported reasons for the payment_method and local_clearing_system selected
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



