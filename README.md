# firex-store

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![CircleCI](https://circleci.com/gh/nor-ko-hi-jp/firex-store.svg?style=svg)](https://circleci.com/gh/nor-ko-hi-jp/firex-store)

- `If you use this npm, you can read or write firestore data, easily.`
- It is inspired by [vuexfire](https://github.com/vuejs/vuefire)
- You can read or write firestore data, the following code, if you use this package.
```Javascript
import { to, from, on, firestoreMutations } from 'firex-store'
import { firestore } from '~/plugins/firebase'


export default {
  state: {
    comments: []
  },
  mutations: {
    ...firestoreMutations('collection'),
    // ...firestoreMutations('all')
  },
  actions: {
    subscribe: ({ state, commit }) => {
      from(firestore.collection('comments'))
        .bindTo('comments')
        .subscribe(state, commit, /* { mapper, errorHandler, complectionHandler, afterMutationCalled } */)
    },
    unsubscribe: ({ state }) => {
      on('comments').unsubscribe(state)
    },
    find: async (_, { commentId }) => {
      result = await from(firestore.collection('comments').doc(commentId))
        .once()
        .find(/* { mapper, errorHandler, completionHandler } */)
    },
    add: (_, { data }) => {
      return to(firestore.collection('comments'))
        .add(data, /* { mapper, errorHandler, completionHandler } */)
    },
    set: (_, { data, commentId }) => {
      to(firestore.collection('comments').doc(commentId))
        // .transaction()
        .set(data, /* { mapper, errorHandler, completionHandler } */)
    },
    mergeSet: (_, { data, commentId }) => {
      to(firestore.collection('comments').doc(commentId))
        // .transaction()
        .mergeSet(data, /* { mapper, errorHandler, completionHandler } */)
    }
  }
}
```

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
- If you'd like to know more, see [here](docs/v1/v1-usage.md), please


## Difference from v0

- If you'd like to know more, see [here](docs/v1/v1-difference-from-v0.md), please

## v0 Usage

- If you'd like to know more, see [here](docs/v0/v0-usage.md), please