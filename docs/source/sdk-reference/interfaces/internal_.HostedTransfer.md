---
title: internal_.HostedTransfer
description: internal_.HostedTransfer
---

# Interface: HostedTransfer

[<internal>](../modules/internal_.md).HostedTransfer

## Table of contents

### Properties

- [createElement](internal_.HostedTransfer.md#createelement)
- [init](internal_.HostedTransfer.md#init)

## Properties

### createElement

• **createElement**: (`type`: `string`, `options?`: `Record`<`string`, `unknown`\>) => [`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )<[`AirwallexElement`](internal_.AirwallexElement.md)<[`BaseOptions`](internal_.BaseOptions.md)\>\>

#### Type declaration

▸ (`type`, `options?`): [`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )<[`AirwallexElement`](internal_.AirwallexElement.md)<[`BaseOptions`](internal_.BaseOptions.md)\>\>

create element instance

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | element type |
| `options?` | `Record`<`string`, `unknown`\> | element config |

##### Returns

[`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )<[`AirwallexElement`](internal_.AirwallexElement.md)<[`BaseOptions`](internal_.BaseOptions.md)\>\>

element instance

#### Defined in

[types/index.ts:32](https://github.com/airwallex/payouts-web-sdk/blob/dd0956d/src/types/index.ts#L32)

___

### init

• **init**: (`options`: [`Options`](internal_.Options.md)) => [`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )<`void`\>

#### Type declaration

▸ (`options`): [`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )<`void`\>

initialize the SDK

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`Options`](internal_.Options.md) |

##### Returns

[`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )<`void`\>

#### Defined in

[types/index.ts:25](https://github.com/airwallex/payouts-web-sdk/blob/dd0956d/src/types/index.ts#L25)
