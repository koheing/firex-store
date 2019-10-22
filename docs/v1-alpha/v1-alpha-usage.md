
## Usage


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
- `import {  } from 'firex-store/v1alpha'`

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

Ex. Subscribe collection and document

#### part1. Set Store
```javascript
import { firestoreMutations, firestoreSubscribeAction, FirestoreSubscriber } from 'firex-store/v1alpha'

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
        .from(firebase.firestore().collection('/comments'))
        .bindTo('comments')  // property name in state
    ),
    ...firestoreSubscribeAction(
      FirestoreSubscriber
        .from(firebase.firestore().collection('/comments').doc('commentId'))
        .bindTo('comment')  // property name in state,
        { actionName: 'subscribeComment' }
    ),
  }
.....
}
```

#### part2. call action

```javascript
<script>
import { actionTypes } from 'firex-store/v1alpha'

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

Ex. Subscribe collection

#### part1. Set Store
```javascript
import { firestoreMutations, firestoreSubscribeAction, FirestoreSubscriber } from 'firex-store/v1alpha'

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
        .bindTo('comments')
        .subscribe(state, commit)
    }
  }
.....
}
```

#### part2. call action

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
