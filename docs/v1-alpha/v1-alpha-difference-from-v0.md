## Difference from v0

### Add

- `FirestoreFinder` class: find firestore class
- `FirestoreSubscriber` class: subscribe firestore class
- `FirestoreUnsibscriber` class: unsubscribe firestore class
- `from` method: Factory of FirestoreFinder and FirestoreSubscriber
- `on` method: return FirestoreUnsubscriber instance
- Payload interface property
  - add property: statePropName(string)

### Change

- Find method changed:

  - [v1-alpha] `FirestoreFinder` class
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
    - json | undefined
      - actionName : string | undefined
      - mapper : Mapper | undefined
      - afterMutationCalled : AfterMutationCalled | undefined
      - notFoundHandler : NotFoundHandler | undefined
      - errorHandler : ErrorHandler | undefined
      - completionHandler : CompletionHandler | undefined
  - [v0] param
    - json
      - ref : firebase.firestore.DocumentReference | CollectionReference | Query
      - actionName : string | undefined
      - mapper : Mapper | undefined
      - afterMutationCalled : AfterMutationCalled | undefined
      - notFoundHandler : NotFoundHandler | undefined
      - errorHandler : ErrorHandler | undefined
      - completionHandler : CompletionHandler | undefined

- firestoreUnubscribeAction param changed

  - [v1-alpha] param
    - FirestoreUnsubscriber instance
    - json
      - type: 'collection' | 'document'
      - actionName: string | undefined
  - [v0] param
    - type: 'document' | 'collection'
    - json | undefined
      - actionName: string

- firestoreMutations param changed
  - [v1-alpha] param
    - type: 'document' | 'collection' | 'all'
  - [v0] param

    - json
      - statePropName: string
      - type: 'document' | 'collection'
- default return value of find and findAll, FirestoreFinder method in case of error occured
  - [v1-alpha]
    - return value: void
  - [v0]
    - return value: any(error)

### Delete

- `OnCompletion` method
- `firestoreSubscribeActions` method
- `firestoreUnubscribeActions` method
- `findFirestore` method
- `subscribeFirestore` method
- `unsubscribeFirestore` method
