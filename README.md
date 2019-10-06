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

## Important!

- Return values or state values bounded to Firestore has `docId`(documentId in Firestore) property.

- A store module cannot subscribe to more than one 'collection' and 'document'

- If you want to subscribe again after unsubscribing 'collection', set the property of the store you want to subscribe to `[]` and then subscribe.

## Usage

- [Subscribe Firestore, using firex-store actions](#1-subscribe-firestore-using-firex-store-actions)
- [Subscribe Firestore, using custom actions](#2-subscribe-firestore-using-custom-actions)
- [Unsubscribe Firestore, using firex-store actions](#3-unsubscribe-firestore-using-firex-store-actions)
- [Unsubscribe Firestore, using custom actions](#4-unsubscribe-firestore-using-custom-actions)
- [Fetch at Once](#5-fetch-at-once)
- [Options](#options)

### Before Start...

- You have to initailize firebase

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
  - statePropName: you want to bind in the state
  - type: 'collection' or 'document'

Ex. Subscribe collection

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
  - options?: see [Options](#options)

Ex. Subscribe collection

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

Ex. Subscribe collection

```javascript
<script>
import { actionTypes } from 'firex-store'

export default {
  name: 'Comments',
  created() {
    this.$store.dispatch(`comment/${actionTypes.collection.SUBSCRIBE}`)
  }
}

</script>
```

### 2. Subscribe Firestore, using custom actions

#### part1. Add below mutations to namespaced Store

- method: `firestoreMutations`
- argments:
  - statePropName: you want to bind in the state
  - type: 'collection' or 'document'

Ex. Subscribe collection

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
  - options?: see [Options](#options)

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

Ex. Unsubscribe collection

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
    this.$store.dispatch(`comment/${actionTypes.collection.UNSUBSCRIBE}`)
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
  - options?: see [Options](#options)

- Return `null` if data not found

EX. Call in Store Action, to fetch collection

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

  - CompletionHandler

    - If it defined, call it when completed

  - OnCompleted   ※ It is deprecated and removed on v1.0.0~

    - If it defined, call it when completed

  - afterMutationCalled

    - `subscribeFirestore` and `subscribeFirestoreActions` only.
    - If it defined, call it when completed
    - This method called after mutation called
    - @param payload
      - type payload = {
         - data: { docId: string | null, [key: string]: any }, <-- subscribed data
        - isLast: boolean,  <-- In 'document' subscribed , it undefined. In 'collection' subscribed, true or false.
          - UseCase: disappear and appear loading bar when subscribed 'collection' data at first 
        - [key: string]: any }


  - notFoundHandler
    - If it defined, call it when snapshot doesn't exist
    - @param type: 'document' | 'collection'
    - @param isAll:
      - undefined  when subscribe Document data
      - true       when subscribe Collection data
      - false      when subscribe Collection data and document in Collection is not existed
    
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
const completionHandler = () => {
  console.log('completed!')
}
```

```javascript
const afterMutationCalled = (payload) => {
  /**
   * payload = {
   *   data: { docId: string | null, [key: string]: any },
   *   isLast: boolean,
   *   [key: string]: any
   * }
   * */
  if (payload.isLast === false) {
    commit('SET_LOADING', true)
  } else if (payload.isLast === true) {
    commit('SET_LOADING', false)
  }
}
```

```javascript
const notFoundHandler = (type, isAll) => {
  console.log('not found')
}
```

```javascript
export default {
  namespaced: true,
  state: {
    comments: [],
    comment: null,
    isLoading: false
  },
  mutations: {
    ...firestoreMutations({ statePropName: 'comments', type: 'collection' }),
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading
    }
  },
  actions: {
    subscribe: ({ state, commit }) => {
      subscribeFirestore({
        state,
        commit,
        ref: firestore.collection('/comments'),
        options: {
          mapper: mapUser,
          errorHandler,
          completionHandler,
          // onCompleted, <- deprecated
          afterMutationCalled,
          notFoundHandler
        }
      })
    }
  }
  .....
}

```
