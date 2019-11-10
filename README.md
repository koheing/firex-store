# firex-store

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![CircleCI](https://circleci.com/gh/nor-ko-hi-jp/firex-store.svg?style=svg)](https://circleci.com/gh/nor-ko-hi-jp/firex-store)

- `If you use this npm, you can read or write firestore data, easily`
- It is inspired by [vuexfire](https://github.com/vuejs/vuefire)

## Installation

```
npm install --save firex-store
```

## Example

- [firex-store-sample](https://github.com/nor-ko-hi-jp/firex-store-sample)

others comming soon

## Important

- Return values or state values bound to Firestore has `docId`(documentId in Firestore) property.

- A store module cannot subscribe to more than one 'collection' and 'document'

- If you'd like to subscribe again after unsubscribing 'collection', set the property of the store you'd like to subscribe to `[]` and then subscribe.


## Usage

- See [here](docs/v1/v1-usage.md), please


## Difference from v0

- See [here](docs/v1/v1-difference-from-v0.md), please

## v0 Usage

- See [here](docs/v0/v0-usage.md), please