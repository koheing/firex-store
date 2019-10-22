# firex-store

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![CircleCI](https://circleci.com/gh/nor-ko-hi-jp/firex-store.svg?style=svg)](https://circleci.com/gh/nor-ko-hi-jp/firex-store)

- If you use this npm, you can reference firestore data, easily
- It is inspired by [vuexfire](https://github.com/vuejs/vuefire)

- node v8.9.4 ~

## Installation

```
npm install --save firex-store
```

## Example

- [Nuxt SSR sample](https://github.com/nor-ko-hi-jp/firex-store-sample)

others comming soon

## Important

- Return values or state values bounded to Firestore has `docId`(documentId in Firestore) property.

- A store module cannot subscribe to more than one 'collection' and 'document'

- If you want to subscribe again after unsubscribing 'collection', set the property of the store you want to subscribe to `[]` and then subscribe.

## Difference from v0

### Add
- `FirestoreFetcher` class: find firestore class
- `FirestoreSubscriber` class: subscribe firestore class
- `FirestoreUnsibscriber` class: unsubscribe firestore class
- Payload interface property
  - add property: statePropName(string)

### Change
- Find method changed:
  - [v1-alpha] `FirestoreFetcher` class
  - [v0] `findFirestore` method

- Subscribe method changed:
  - [v1-alpha] `FirestoreSubscriber` class
  - [v0] `subscribeFirestore` method

- Unsubscribe method changed:
  - [v1-alpha] `FirestoreUnsubscriber` class
  - [v0] `unsubscribeFirestore` method

- firestoreSubscribeAction param changed
  - [v1-alpha] param
    - FirestoreSubscriber instance
    - json
      - actionName           : string | undefined
      - mapper               : Mapper | undefined
      - afterMutationCalled  : AfterMutationCalled | undefined
      - notFoundHandler      : NotFoundHandler | undefined
      - errorHandler         : ErrorHandler | undefined
      - completionHandler    : CompletionHandler | undefined
  - [v0] param
    - json
      - ref                  : firebase.firestore.DocumentReference | CollectionReference | Query
      - actionName           : string | undefined
      - mapper               : Mapper | undefined
      - afterMutationCalled  : AfterMutationCalled | undefined
      - notFoundHandler      : NotFoundHandler | undefined
      - errorHandler         : ErrorHandler | undefined
      - completionHandler    : CompletionHandler | undefined

- firestoreUnubscribeAction param changed
  - [v1-alpha] param
    - FirestoreUnsubscriber instance
    - actionName: string | undefined
  - [v0] param
    - type: 'document' | 'collection'
    - actionName: string | undefined

- firestoreMutations param changed
  - [v1-alpha] param
    - type: 'document' | 'collection' | 'all'
  - [v0] param
    - json
      - statePropName: string
      - type: 'document' | 'collection'
    

### Delete
- `OnCompletion` method
- `firestoreSubscribeActions` method
- `firestoreUnubscribeActions` method
- `findFirestore` method
- `subscribeFirestore` method
- `unsubscribeFirestore` method

## Usage
- see [here](v1-alpha-usage.md), please
