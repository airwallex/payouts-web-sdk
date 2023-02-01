# Airwallex Payouts Web SDK

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

await init(options);
```

| Option         | Type     | Required? | Default value | Description                                                                                                                                                         |
| :------------- | :------- | :-------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `env`          | `string` | **NO**    | `prod`        | The Airwallex environment you want to integrate your application with. Options include: `staging`, `demo`, `prod`                                                   |
| `langKey`      | `string` | **NO**    | `en`          | Language. Options include: `en`, `zh`                                                                                                                               |
| `clientId`     | `string` | **YES**   | -             | Your unique Client ID issued by Airwallex. You can find the client id on [`Airwallex WebApp - Developer - API Keys`](https://www.airwallex.com/app/account/apiKeys) |
| `authCode`     | `string` | **YES**   | -             | Auth code to authenticate the connected account retrieved from `/api/v1/accounts/{id}/authorize`                                                                    |
| `codeVerifier` | `string` | **YES**   | -             | Serves as proof key for code exchange (see RFC 7636 Section 4). A random string picked by yourself, and used to generate the codeChallenge.                         |

### Usage/Examples

```ts
// initialize window.AirwallexOnboarding
await init({
  langKey: 'en',
  env: 'prod',
  authCode: 'x4D7A7wOSQvoygpwqweZpG0GFHTcQfVPBTZoKV7EibgH',
  clientId: 'BIjjMYsYTPuRqnkEloSvvf',
  codeVerifier: '~wh344Lea1FsCMVH39Fn9R2~nqq2uyD4wbvG9XCzWRxd0sZh9MFiF9gSVkM0C-ZvrdtjBFA6Cw1EvCpJcIjaeXg1-BXCfZd25ZmvuYZAqZtjJQA3NAa~7X1sgEfbMZJwQ',
});
```

## Create Element

Call `createElement(type, options)` to create an element object.

```ts
import { createElement } from '@airwallex/payouts-web-sdk';

const element = createElement(type, options);
```

### Method parameters

| Parameter | Type                              | Required? | Description                                                                                   |
| :-------- | :-------------------------------- | :-------- | :-------------------------------------------------------------------------------------------- |
| `type`    | `payoutForm` \| `beneficiaryForm`    | **YES**   | The type of element you are creating.   |
| `options` | `Record<string, unknown>`         | **NO**    | Options for creating an Element, which differ for each Element. Refer to the following table. |


### PayoutForm Component

```ts
import { createElement } from '@airwallex/payouts-web-sdk';

const element = createElement('payoutForm', options);
```

#### `options` object properties:

| Property       | Type   | Required | DefaultValue | Description                         |
|----------------|--------|----------|--------------|-------------------------------------|
| `defaultValues`  | Object | false    | undefined    | Default values to render payoutForm |
| `customizations` | Object | false    | undefined    | Customization on component          |


#### `defaultValues` object properties:

Default values are followed by [Payment Object defined in API docs](https://www.airwallex.com/docs/api#/Payouts/Payments/_api_v1_payments_create/post), PayoutForm Component supports following defaultValues to pass in

```ts
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

Customizations supports you to get customize on PayoutForm Component
| Property       | Type   | Required | DefaultValue | Description                         |
|----------------|--------|----------|--------------|-------------------------------------|
| `showConnector`  | boolean | false    | true    | Show icon connector in PayoutForm Component |
| `fields` | Object | false    | undefined    | Individual field config on disable editing or hidden, encouraged to provide default value when using fields property          |


```ts
const type Customizations = {
  showConnector?: boolean;
  fields?: {
    source_currency?: {
      disabled: boolean;
    },
    payment_currency?: {
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


### BeneficiaryForm Component

```ts
import { createElement } from '@airwallex/payouts-web-sdk';

const element = createElement('beneficiaryForm', options);
```

#### `options` object properties:

| Property       | Type   | Required | DefaultValue | Description                         |
|----------------|--------|----------|--------------|-------------------------------------|
| `defaultValues`  | Object | false    | undefined    | Default values to render payoutForm |
| `customizations` | Object | false    | undefined    | Customization on component          |


#### `defaultValues` object properties:

Default values are followed by [Beneficiary Object defined in API docs](https://www.airwallex.com/docs/api#/Payouts/Beneficiaries/_api_v1_beneficiaries_create/post)


#### `customizations` object properties:

Customizations supports you to get customize on BeneficiaryForm

| Property       | Type   | Required | DefaultValue | Description                         |
|----------------|--------|----------|--------------|-------------------------------------|
| `layout`  | Object | false    | undefined    | Customize on rendering partial form |
| `fields` | Object | false    | undefined    | Individual field config on disable editing or hidden, encouraged to provide default value when using fields property          |


```ts
const type Customizations = {
  layout?: [
    {
      name: 'conditions' | 'bankDetails' | 'businessDetails';
      hidden: boolean;
    }
  ];
  fields?: {
    [key: string]?: {
      disabled: boolean;
    },
  }
}
```


## Interact with `element` object

```ts
export type EVENT_TYPE = 'ready' | 'change' | 'formState'

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

### Subscribe Events

Subscribe Events when form are interact with users

#### `Ready`
This event will be fired when the page is ready and mounted in the page, user is able to interact with element

```ts
element.on('ready', () => void);
```

#### `Change`

This event will be fired when form value changes

```ts
element.on('change', () => FormData);
```

### `FormState`

This event will be fired when form state changes, including loading state, validating state, error state

```ts
type OnFormState = {
  loading: boolean;
  validating: boolean;
  errors: { code: string } | null;
}

element.on('formState', (state: OnFormState) => void);
```

### Trigger `submit` to get form Values

When you are able to get formValues form element, trigger `submit` function will give you all form values

```ts
  const values = await element.submit()
```
