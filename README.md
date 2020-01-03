# firex-store

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![CircleCI](https://circleci.com/gh/nor-ko-hi-jp/firex-store.svg?style=svg)](https://circleci.com/gh/nor-ko-hi-jp/firex-store)

- `If you use this npm, you can read and write firestore data, easily.`
- It is inspired by [vuexfire](https://github.com/vuejs/vuefire)
- With this NPM, you can read and write Firestore data like the following code
```js
import { FirestoreMapper } from 'firex-store'

class Model extends FirestoreMapper {
  static fromJson(data) {
    return new Model(data.id, `${data.family_name} ${data.first_name}` )
  }

  static toJson(data) {
    return { id: data.id, family_name: data.fullName.split(' ')[0], first_name: data.fullName.split(' ')[1] }
  }

  construnctor(id, fullName) {
    this.id = id
    this.fullName = fullName
  }
}
```

```js
import { to, from, on, firestoreMutations } from 'firex-store'
import { Model } from '~/model'
import { firestore } from '~/plugins/firebase'

// Vuex module
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
      const ref = firestore.collection('comments')
      from(ref)
        .mapOf(Model)   // options. Model.fromJson called
        .bindTo('comments')
        .subscribe(state, commit, /* { errorHandler, complectionHandler, afterMutationCalled } */)
    },
    subscribeOnce: ({ commit }) => {
      const ref = firestore.collection('comments')
      from(ref)
        .mapOf(Model)   // options. Model.fromJson called
        .bindTo('comments')
        .subscribeOnce(commit, /* { errorHandler, complectionHandler, afterMutationCalled } */)
    }
    unsubscribe: ({ state }) => {
      on('comments').unsubscribe(state)
    },
    find: async (_, { commentId }) => {
      const ref = firestore.collection('comments').doc('commentId')
      result = await from(ref)
        .once()
        .mapOf(Model)   // options. Model.fromJson called
        .find(/* { errorHandler, completionHandler } */)
      return result
    },
    add: (_, { data }) => {
      const ref = firestore.collection('comments')
      return to(ref)
        .mapOf(Model)   // options. Model.toJson called
        .add(data, /* { errorHandler, completionHandler } */)
    },
    set: (_, { data, commentId }) => {
      const ref = firestore.collection('comments').doc('commentId')
      return to(ref)
        .mapOf(Model)   // options. Model.toJson called
        .transaction()  // options
        .set(data, /* { errorHandler, completionHandler } */)
    },
    mergeSet: (_, { data, commentId }) => {
      const ref = firestore.collection('comments').doc('commentId')
      return to(ref)
        .mapOf(Model)   // options. Model.toJson called
        .transaction()  // options
        .mergeSet(data, /* { errorHandler, completionHandler } */)
    },
    delete: (_) => {
      const ref = firestore.collection('comments').doc('commentId')
      return to(ref)
        .transaction()  // options
        .delete(/* { errorHandler, completionHandler } */)
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