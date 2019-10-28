# firex-store

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![CircleCI](https://circleci.com/gh/nor-ko-hi-jp/firex-store.svg?style=svg)](https://circleci.com/gh/nor-ko-hi-jp/firex-store)

- If you use this npm, you can reference firestore data, easily
- It is inspired by [vuexfire](https://github.com/vuejs/vuefire)

## Installation

```
npm install --save firex-store
```

## Example

- [Nuxt SSR sample](https://github.com/nor-ko-hi-jp/firex-store-sample)

others comming soon

## Important

- Return values or state values bound to Firestore has `docId`(documentId in Firestore) property.

- A store module cannot subscribe to more than one 'collection' and 'document'

- If you'd like to subscribe again after unsubscribing 'collection', set the property of the store you'd like to subscribe to `[]` and then subscribe.

## Difference from v0

- See [here](v1-alpha-difference-from-v0.md), please

## Usage

- See [here](v1-alpha-usage.md), please
