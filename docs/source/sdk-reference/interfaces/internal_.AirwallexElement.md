---
title: internal_.AirwallexElement
description: internal_.AirwallexElement
---

# Interface: AirwallexElement<Options\>

[<internal>](../modules/internal_.md).AirwallexElement

## Type parameters

| Name | Type |
| :------ | :------ |
| `Options` | extends [`BaseOptions`](internal_.BaseOptions.md) = [`BaseOptions`](internal_.BaseOptions.md) |

## Table of contents

### Properties

- [mount](internal_.AirwallexElement.md#mount)
- [on](internal_.AirwallexElement.md#on)
- [options](internal_.AirwallexElement.md#options)
- [unmount](internal_.AirwallexElement.md#unmount)

## Properties

### mount

• **mount**: (`ele`: `string` \| `HTMLElement`) => `void`

#### Type declaration

▸ (`ele`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `ele` | `string` \| `HTMLElement` |

##### Returns

`void`

#### Defined in

[types/element.ts:7](https://github.com/airwallex/payouts-web-sdk/blob/dd0956d/src/types/element.ts#L7)

___

### on

• **on**: (`eventName`: `string`, `callback`: (`data`: `any`) => `void`) => `number`

#### Type declaration

▸ (`eventName`, `callback`): `number`

##### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `callback` | (`data`: `any`) => `void` |

##### Returns

`number`

#### Defined in

[types/element.ts:9](https://github.com/airwallex/payouts-web-sdk/blob/dd0956d/src/types/element.ts#L9)

___

### options

• **options**: `Options`

#### Defined in

[types/element.ts:6](https://github.com/airwallex/payouts-web-sdk/blob/dd0956d/src/types/element.ts#L6)

___

### unmount

• **unmount**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[types/element.ts:8](https://github.com/airwallex/payouts-web-sdk/blob/dd0956d/src/types/element.ts#L8)
