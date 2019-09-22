# firex-store

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

- if you use this npm, you can reference firestore data, easily
- it is influenced by [vuexfire](https://github.com/vuejs/vuefire)
- node v10 ~

## Installation

```
npm install --save firex-store
```

## Example

- [Nuxt SSR sample](https://github.com/nor-ko-hi-jp/firex-store-sample)

others comming soon

## Important!

- Return values or state values bounded to Firestore has `docId`(documentId in Firestore) property.

- This npm library methods use only one 'document' and 'collection' type in one store module

- A store module cannot subscribe to more than one 'collection' and 'document'

- If you want to subscribe again after unsubscribing 'collection', set the property of the store you want to subscribe to `[]` and then subscribe.

## Usage

- [Subscribe Firestore, using firex-store actions](#1-subscribe-firestore-using-firex-store-actions)
- [Subscribe Firestore, using custom actions](#2-subscribe-firestore-using-custom-actions)
- [Unsubscribe Firestore, using firex-store actions](#3-unsubscribe-firestore-using-firex-store-actions)
- [Unsubscribe Firestore, using custom actions](#4-unsubscribe-firestore-using-custom-actions)
- [Fetch at Once](#5-fetch-at-once)
- [Options](#Options)

### Before Start...

- you must initailize firebase

```javascript
.....

firebase.initializeApp({
  apiKey: [your firebase api key],
  projectId: [your project id],
  .....
})

export const firestore = firebase.firestore()
```

### 1. Subscribe Firestore, using firex-store actions

#### part1. Add below mutations to namespaced Store

- method: `firestoreMutations`
- argments:
  - stateKey: you want to bind in the state
  - mutationType: 'collection' or 'document'

Ex. subscribe collection

```javascript

export default {
  namespaced: true,
  state: {
    comments: [],
    comment: null
  },
  mutations: {
    ...firestoreMutations({ statePropName: 'comments', type: 'collection' })
  },
  .....
}

```

#### part2. Add below actions to namespaced Store

- method: `firestoreSubscribeActions`
- argments:

  - ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
  - actionName?: action property you want to define.
  - options?: see [Options](#Options)

Ex. subscribe collection

```javascript

// modules: comment
export default {
  namespaced: true,
  state: {
    comments: [],
    comment: null
  },
  mutations: {
    ...firestoreMutations({ statePropName: 'comments', type: 'collection' })
  },
  actions: {
    ...firestoreSubscribeActions({ ref: firestore.collection('/comments') })
  }
.....
}
```

#### part3. Call firex-store actionType to subscribe data

Ex. subscribe collection

```javascript
<script>
import { actionTypes } from 'firex-store'

export default {
  name: 'Comments',
  created() {
    this.$store.dispatch(`comment/${actionTypes.COLLECTION_SUBSCRIBE}`)
  }
}

</script>
```

### 2. Subscribe Firestore, using custom actions

#### part1. Add below mutations to namespaced Store

- method: `firestoreMutations`
- argments:
  - stateKey: you want to bind in the state
  - mutationType: 'collection' or 'document'

Ex. subscribe collection

```javascript

export default {
  namespaced: true,
  state: {
    comments: [],
    comment: null
  },
  mutations: {
    ...firestoreMutations({ statePropName: 'comments', type: 'collection' })
  },
  .....
}

```

#### part2. Add `subscribeFirestore` in custom-actions

- method: `subscribeFirestore`
- argments:
  - state: State
  - commit: Commit
  - ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
  - options?: see [Options](#Options)

```javascript
export default {
  namespaced: true,
  state: {
    comments: [],
    comment: null
  },
  mutations: {
    ...firestoreMutations({ statePropName: 'comments', type: 'collection' })
  },
  actions: {
    subscribe: ({ state, commit }) => {
      subscribeFirestore({
        state,
        commit,
        ref: firestore.collection('/comments'),
        options
      })
    }
  }
.....
}
```

### 3. Unsubscribe Firestore, using firex-store actions

Ex. unsubscribe collection

#### part1. Add `firestoreUnsubscribeActions` in actions

- method: `firestoreUnsubscribeActions`
- argments:

  - type: 'document' | 'collection'
  - actionName?: string

```javascript
export default {
  namespaced: true,
  state: {
    comments: [],
    comment: null
  },
  mutations: {
    ...firestoreMutations({ statePropName: 'comments', type: 'collection' })
  },
  actions: {
    ...firestoreSubscribeActions({ ref: firestore.collection('/comments') }),
    ...firestoreUnsubscribeActions({ type: 'collection' })
  }
.....
}
```

#### part2. Call firex-store actionType to unsubscribe data

```javascript
<script>
import { actionTypes } from 'firex-store'

export default {
  name: 'Comments',
  created() {
    this.$store.dispatch(`comment/${actionTypes.COLLECTION_UNSUBSCRIBE}`)
  }
}

</script>
```

### 4. Unsubscribe Firestore, using custom actions

- method: `unsubscribeFirestore`
- argments:

  - type: 'document' | 'collection'
  - state: State

```javascript
export default {
  namespaced: true,
  state: {
    comments: [],
    comment: null
  },
  mutations: {
    ...firestoreMutations({ statePropName: 'comments', type: 'collection' })
  },
  actions: {
    subscribe: ({ state, commit }) => {
      subscribeFirestore({
        state,
        commit,
        ref: firestore.collection('/comments'),
        options
      })
    },
    unsubscribe: ({ state }) => {
      unsubscribeFirestore({
        state,
        type: 'collection'
      })
    }
  }
.....
}
```

### 5. Fetch at Once

- method: `findFirestore`
- argments:

  - ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
  - options?: see [Options](#Options)

EX. call in Store Action, to fetch collection

```javascript
export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchComments: async ({ commit }) => {
      const ref = firestore.collection('/comments')
      const result = await findFirestore({ ref })
      commit(***, result)
    }
  }
}
```

## Options

- Options

  - mapper:

    - Map to something. State prop bound to Firestore or return values map to something if mapper defined

  - errorHandler

    - If it defined, call it when error occured. But if not, call `console.error(error)`

  - onCompleted

    - If it defined, call it when completed

Ex.

```javascript
const mapUser = (data) => ({
  id: data.id
  name: data.name
  .....
})
```

```javascript
const errorHandler = (error) => {
  console.error(`[App Name]:  ${error}`)
}
```

```javascript
const onCompleted = () => {
  console.log('completed!')
}
```

```javascript
export default {
  namespaced: true,
  state: {
    comments: [],
    comment: null
  },
  mutations: {
    ...firestoreMutations({ statePropName: 'comments', type: 'collection' })
  },
  actions: {
    subscribe: ({ state, commit }) => {
      subscribeFirestore({
        state,
        commit,
        ref: firestore.collection('/users').doc('userId'),
        options: {
          mapper: mapUser,
          errorHandler,
          onCompleted
        }
      })
    }
  }
  .....
}

```
