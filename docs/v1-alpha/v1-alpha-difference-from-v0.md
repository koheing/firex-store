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
