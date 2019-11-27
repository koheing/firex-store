## Usage

- [Subscribe Firestore, using firex-store actions](#1-subscribe-firestore-using-firex-store-actions)
- [Subscribe Firestore, using custom actions](#2-subscribe-firestore-using-custom-actions)
- [Unsubscribe Firestore, using firex-store actions](#3-unsubscribe-firestore-using-firex-store-actions)
- [Unsubscribe Firestore, using custom actions](#4-unsubscribe-firestore-using-custom-actions)
- [Fetch at Once](#5-fetch-at-once)
- [Add to firestore](#6-add-to-firestore)
- [Set to firestore](#7-set-to-firestore)
- [MergeSet to firestore (like Update)](#8-mergeSet-to-firestore-like-update)
- [Helpers](#9-helpers)
  - [from and FirestoreReaderServiceFactory](#from-and-FirestoreReaderServiceFactory)
  - [on](#on)
  - [to and FirestoreDocumentWriterFacade](#to-and-FirestoreDocumentWriterFacade)
- [MappingModel](#mappingmodel)
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

### Import Path

- `import { } from 'firex-store'`

### 1. Subscribe Firestore, using firex-store actions

- method: `firestoreMutations`
- parameters:

  - type: 'document' | 'collection' | 'all'
    - all: 'document' and 'collection'

- method: `firestoreSubscribeAction`
- parameters:

  - firestoreSubscriber: FirestoreSubscriber instance
  - options?:
    - actionName: string | undefined
    - see [Options](#options)

- class: `FirestoreSubscriber`
- class methods:
  - from: Make instance
    - parameter:
      - ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
    - return:
      - FirestoreSubscriber
  - bindTo: Bind subscribe data to state property
    - parameter:
      - statePropName: string. state property
    - return:
      - FirestoreSubscriber
  - mapOf: Mapping data subscribed from Firestore
    - parameter:
      - className: Class inheriting FirestoreMapper
    - return:
      - FirestoreSubscriber

Ex. Subscribe collection and document

#### part1. Set Store

```javascript
import { firestoreMutations, firestoreSubscribeAction, FirestoreSubscriber } from 'firex-store'

// modules: comment
export default {
  namespaced: true,
  state: {
    comments: [],
    comment: null
  },
  mutations: {
    ...firestoreMutations('collection'),
    ...firestoreMutations('document')
    // or `...firestoreMutations('all')`
  },
  actions: {
    ...firestoreSubscribeAction(
      FirestoreSubscriber
        // .mapOf(Model)
        .from(firebase.firestore().collection('/comments'))
        .bindTo('comments')  // property name in state
    ),
    ...firestoreSubscribeAction(
      FirestoreSubscriber
        .from(firebase.firestore().collection('/comments').doc('commentId'))
        // .mapOf(Model)
        .bindTo('comment'),  // property name in state,
        { actionName: 'subscribeComment' }
    ),
  }
.....
}
```

#### part2. Call action

```javascript
<script>
import { actionTypes } from 'firex-store'

export default {
  name: 'Comments',
  created() {
    this.$store.dispatch(`comment/${actionTypes.collection.SUBSCRIBE}`)
    this.$store.dispatch(`comment/subscribeComment`) // subscribe: actionName you defined in part1
  }
}

</script>
```

### 2. Subscribe Firestore, using custom actions

- method: `firestoreMutations`
- parameters:

  - type: 'document' | 'collection' | 'all'
    - all: 'document' and 'collection'

- class: `FirestoreSubscriber`
- class methods:
  - from: Make instance
    - parameter:
      - ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
    - return:
      - FirestoreSubscriber
  - bindTo: Bind subscribe data to state property
    - parameter:
      - statePropName: string. state property
    - return:
      - FirestoreSubscriber
  - mapOf: Mapping data subscribed from Firestore
    - parameter:
      - className: Class inheriting FirestoreMapper
    - return:
      - FirestoreSubscriber
  - subscribe: Subscribe firestore data
    - parameters:
      - state: any
      - commit: Commit
      - options?:
        - see [Options](#options)

Ex. Subscribe collection

#### part1. Set Store

```javascript
import { firestoreMutations, firestoreSubscribeAction, FirestoreSubscriber } from 'firex-store'

// modules: comment
export default {
  namespaced: true,
  state: {
    comments: []
  },
  mutations: {
    ...firestoreMutations('collection')
  },
  actions: {
    subscribeAll: ({ state, commit }) => {
      FirestoreSubscriber
        .from(firebase.firestore().collection('/comments'))
        // .mapOf(Model)
        .bindTo('comments')
        .subscribe(state, commit)
    }
  }
.....
}
```

#### part2. Call action

```javascript
<script>

export default {
  name: 'Comments',
  created() {
    this.$store.dispatch(`user/subscribeAll`)
  }
}

</script>
```

### 3. Unsubscribe Firestore, using firex-store actions

Ex. Unsubscribe collection

#### part1. Set Store

- method: `firestoreUnsubscribeAction`
- argments:

  - firestoreUnsubscriber: FirestoreUnsubscriber instance
  - parameter: {
    type: 'document' | 'collection',
    actionName: string | undefined
    }

- class `FirestoreUnsubscriber`
- class method:
  - on: Make FirestoreUnsubscriber instance
    - parameter:
      - statePropName: string. state property
    - return:
      - FirestoreUnsubscriber

```javascript
import { firestoreMutations, firestoreSubscribeAction, firestoreUnsubscribeAction, FirestoreSubscriber, FirestoreUnsubscriber } from 'firex-store'
// modules: comment
export default {
  namespaced: true,
  state: {
    comments: [],
    comment: null
  },
  mutations: {
    ...firestoreMutations('all')
  },
  actions: {
    ...firestoreSubscribeAction(
      FirestoreSubscriber
        .from(firebase.firestore().collection('/comments'))
        .bindTo('comments')
    )
    ...firestoreSubscribeAction(
      FirestoreSubscriber
        .from(firebase.firestore().collection('/comments').doc('commentId'))
        .bindTo('comment')
    )
    ...firestoreUnsubscribeAction(
      FirestoreUnsubscriber
        .on('comments'),
      { type: 'collection' }
    )
    ...firestoreUnsubscribeAction(
      FirestoreUnsubscriber
        .on('comment'),
      { type: 'document' }
    )
  }
.....
}
```

#### part2. Call action

```javascript
<script>
import { actionTypes } from 'firex-store'

export default {
  name: 'Comments',
  created() {
    this.$store.dispatch(`comment/${actionTypes.collection.SUBSCRIBE}`)
    this.$store.dispatch(`comment/${actionTypes.document.SUBSCRIBE}`)
    this.$store.dispatch(`comment/${actionTypes.collection.UNSUBSCRIBE}`)
    this.$store.dispatch(`comment/${actionTypes.document.UNSUBSCRIBE}`)
  }
}

</script>
```

### 4. Unsubscribe Firestore, using custom actions

- class `FirestoreUnsubscriber`
- class method:
  - on: Make FirestoreUnsubscriber instance
    - parameter:
      - statePropName: string. state property
    - return:
      - FirestoreUnsubscriber
  - unsubscribe:
    - parameter:
      - state: any

```javascript
import { firestoreMutations, firestoreSubscribeAction, FirestoreSubscriber, FirestoreUnsubscriber } from 'firex-store'

// modules: comment
export default {
  namespaced: true,
  state: {
    comments: []
  },
  mutations: {
    ...firestoreMutations('collection')
  },
  actions: {
    subscribeAll: ({ state, commit }) => {
      FirestoreSubscriber
        .from(firebase.firestore().collection('/comments'))
        // .mapOf(Model)
        .bindTo('comments')
        .subscribe(state, commit)
    },
    unsubscribeAll: ({ state }) => {
      FirestoreUnsubscriber
        .on('comments')
        .unsubscribe(state)
    }
  }
.....
}
```

#### part2. Call action

```javascript
<script>

export default {
  name: 'Comments',
  created() {
    this.$store.dispatch(`user/subscribeAll`)
    this.$store.dispatch(`user/unsubscribeAll`)
  }
}

</script>
```

## 5. Fetch at once

- class: `FirestoreFinder`
- class methods:
  - from: Make instance
    - parameter:
      - ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
    - return:
      - FirestoreFinder
  - mapOf: Mapping data fetched from Firestore
    - parameter:
      - className: Class inheriting FirestoreMapper
    - return:
      - FirestoreSubscriber
  - find: fetch firestore data at once
    - parameter:
      - options?:
        - see [Options](#options)

EX. Call in Store Action, to fetch collection

```javascript
import { FirestoreFinder } from 'firex-store'
export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchComments: async ({ commit }) => {
      const ref = firestore.collection('/comments')
      const result = await FirestoreFinder
        .from(ref)
        // .mapOf(Model)
        .find()
      commit(***, result)
    }
  }
}
```

## 6. Add to firestore

- class: `FirestoreAdder`
- class methods:
  - to: Make instance
    - parameter:
      - ref: firebase.firestore.CollectionReference
    - return:
      - FirestoreAdder
  - add: add data to firestore
    - data: data you wanna add to firestore
    - parameter:
      - options?:
        - see [Options](#options)

Ex.

```javascript
import { FirestoreAdder } from 'firex-store'
export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    add: async (_, { data }) => {
      const result = await FirestoreAdder.to(
        firestore.collection('comments')
      )
      // .mapOf(Model)
      .add(data, { errorHandler, completionHandler })
      if (typeof result !== 'string') {
        // error process
        // ...
      }
    }
  }
}
```

## 7. Set to firestore

- class: `FirestoreSetter`
- class methods:
  - to: Make instance
    - parameter:
      - ref: firebase.firestore.DocumentReference
    - return:
      - FirestoreSetter
  - transaction: Call this if you wanna use transaction
    - `UseCase`: Call this if you wouldn't like to overwrite data
    - return:
      - FirestoreSetter
  - set: set data to firestore
    - data: data you wanna set to firestore
    - parameter:
      - options?:
        - see [Options](#options)

Ex.

```javascript
import { FirestoreSetter } from 'firex-store'
export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    set: async (_, { data }) => {
      const result = await FirestoreSetter.to(
        firestore.collection('comments').doc('commentId')
      )
        // .mapOf(Model)
        // .transaction() // <- comment out if you wanna use transaction
        .set(data, { errorHandler, completionHandler })
      if (typeof result !== 'undefined') {
        // error process
        // ...
      }
    }
  }
}
```

## 8. MergeSet to firestore (like Update)

- class: `FirestoreMergeSetter`
- class methods:
  - to: Make instance
    - parameter:
      - ref: firebase.firestore.DocumentReference
    - return:
      - FirestoreMergeSetter
  - transaction: Call this if you wanna use transaction
    - `UseCase`: Call this if you would like to overwrite data or add property to data
    - return:
      - FirestoreMergeSetter
  - mergeSet: set data to firestore
    - data: data you wanna mergeSet to firestore
    - parameter:
      - options?:
        - see [Options](#options)

Ex.

```javascript
import { FirestoreMergeSetter } from 'firex-store'
export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    mergeSet: async (_, { data }) => {
      const result = await FirestoreSetter.to(
        firestore.collection('comments').doc('commentId')
      )
        // .mapOf(Model)
        // .transaction() // <- comment out if you wanna use transaction
        .mergeSet(data, { errorHandler, completionHandler })
      if (typeof result !== 'undefined') {
        // error process
        // ...
      }
    }
  }
}
```

## 9. Helpers

### from and FirestoreReaderServiceFactory

- `from`: Method, factory of FirestoreSubscriber and FirestoreFinder

  - parameter:
    - ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
  - return: FirestoreReaderServiceFactory

- `FirestoreReaderServiceFactory`: Class, factory of FirestoreSubscriber and FirestoreFinder

  - parameter:
    - ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
  - methods:

    - `bindTo`: return `FirestoreSubscriber`

      - parameter:
        - statePropName: String, state property bound to firestore data

    - `once`: return `FirestoreFinder`

#### Ex.

```javascript
import { firestoreMutations, from } from 'firex-store'

// modules: comment
export default {
  namespaced: true,
  state: {
    comments: []
  },
  mutations: {
    ...firestoreMutations('collection')
  },
  actions: {
    subscribeAll: ({ state, commit }) => {
      from(firebase.firestore().collection('/comments'))
        .bindTo('comments')
        .subscribe(state, commit)
    },
    find: () => {
      return from(firebase.firestore().collection('/comments').doc('commentId'))
               .once()
               .find()
    }
  }
.....
}
```

### on

- `on`: Method, return FirestoreUnsubscriber instance

  - parameter:
    - statePropName: state property bound to subscribe data
  - return: FirestoreUnsubscriber

#### Ex.

```javascript
import { firestoreMutations, from, on, firestoreUnsubscriber } from 'firex-store'

// modules: comment
export default {
  namespaced: true,
  state: {
    comments: [],
    comment: null
  },
  mutations: {
    ...firestoreMutations('collection')
  },
  actions: {
    subscribeAll: ({ state, commit }) => {
      from(firebase.firestore().collection('/comments'))
        .bindTo('comments')
        .subscribe(state, commit)
    },
    find: () => {
      return from(firebase.firestore().collection('/comments').doc('commentId'))
               .once()
               .find()
    },
    unsubscribe: ({ state }) => {
      on('comments').unsubscribe(state)
    },
    ...firestoreUnsubscriber(
      on('comment'),
      { type: 'document' }
    )
  }
.....
}
```

## to and FirestoreDocumentWriterFacade

- `to`: Method, return FirestoreAdder or FirestoreDocumentWriterFacade instance.
  - parameter:
    - ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference
  - return: FirestoreAdder or FirestoreDocumentWriterFacade

- `FirestoreDocumentWriterFacade`: Class, facade of FirestoreSetter and FirestoreMergeSetter

  - parameter:
    - ref: firebase.firestore.DocumentReference
  - methods:

  - `transaction`: call this if you wanna transaction
    - return:
      - FirestoreDocumentWriterFacade
  - `set`: set data to firestore

    - data: data you wanna set to firestore
    - parameter:
      - options?:
        - see [Options](#options)

  - `mergeSet`: set data to firestore
    - data: data you wanna mergeSet to firestore
    - parameter:
      - options?:
        - see [Options](#options)


#### Ex.

```javascript
import { to } from 'firex-store'

// modules: comment
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    set: async ({ dispatch }, { data }) => {
      await to(firestore.colleciton('comments').doc('commentId'))
        .set(data)
    },
    mergeSet: async ({ dispatch }, { data }) => {
      const errorHandler = (error) => {
        dispatch(`error/OCCURED`, error, { root: true })
        console.error(error)
        return error
      }
      await to(firestore.colleciton('comments').doc('commentId'))
        .transaction()
        .mergeSet(data)
    },
    add: async ({ dispatch }, { data }) => {
      const result = await to(firestore.colleciton('comments')).add(data)
      if (typeof result === 'string') {
        console.log(`documentId is ${result}`)
      } else {
        dispatch(`error/OCCURED`, result, { root: true })
      }
    },
  }
.....
}
```

## MappingModel
- If you want to convert Subscribe or Fetched data, please use Class that inherits FirestoreMapper
```Javascript
import { FirestoreMapper, from } from 'firex-store'

class Model extends FirestoreMapper {
  static fromJson(data: { [key:string]: any }) {
    return new Model()
  }
}

...
from(firestore.collection('comments'))
  .once()
  .mapOf(Model)
  .find()
from(firestore.collection('comments'))
  .bindTo('comments')
  .mapOf(Model)
  .subscribe(state, commit)
```

## Options

- Options

  - mapper: `decrecated. It will be removed at 1.5.0~`

    - Map to something.
      - `Subscribe and Fetch case`: State prop bound to Firestore or return values map to something if mapper defined
      - `Set or Add case`: Data which set or added to firestore map to something if mapper defined

  - errorHandler

    - If it defined, call it when error occured. But if not, call `console.error(error)` and return `error`

  - completionHandler

    - If it defined, call it when completed

  - afterMutationCalled

    - `FirestoreSubscriber` and `firestoreSubscribeAction` only.
    - If it defined, call it when completed
    - This method called after mutation called
    - parameters
      - payload
        - type payload = {
          - data: { docId: string | null, [key: string]: any }, <-- subscribed data
          - isLast: boolean, <-- In 'document' subscribed , it undefined. In 'collection' subscribed, true or false.
            - UseCase: disappear and appear loading bar when subscribed 'collection' data at first
          - statePropName: string <-- state property bound to subscribe data
          - [key: string]: any }

  - notFoundHandler

    - `FirestoreSubscriber` and `firestoreSubscribeAction` only.
    - If it defined, call it when snapshot doesn't exist
      - parameters
        - type: 'document' | 'collection'
        - isAll:
          - undefined when subscribe Document data
          - true when subscribe Collection data
          - false when subscribe Collection data and document in Collection is not existed

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
   *   statePropName: string
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
import { firestoreMutations, from, to } from 'firex-store'
export default {
  namespaced: true,
  state: {
    comments: [],
    comment: null,
    isLoading: false
  },
  mutations: {
    ...firestoreMutations('collection'),
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading
    }
  },
  actions: {
    subscribe: ({ state, commit }) => {
      from(firestore.collection('/comments'))
        .bindTo('comments')
        .subscribe(state, commit, {
          mapper: mapUser,
          errorHandler,
          completionHandler,
          afterMutationCalled,
          notFoundHandler
        })
    },
    add: async (_, { data }) => {
      await to(firestore.collection('/comments'))
        .add(data, { mapper, errorHandler, completionHandler })
    }
  }
  .....
}

```
