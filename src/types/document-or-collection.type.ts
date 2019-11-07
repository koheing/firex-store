import { Either } from './either.type'

export type DocumentOrCollection = Either<
  firebase.firestore.DocumentReference,
  firebase.firestore.CollectionReference
>
