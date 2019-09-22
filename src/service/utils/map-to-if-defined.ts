import { Mapper } from '../../types'

type U = { [key: string]: any; docId?: string }

export const mapToIfDefined = <T = any>(
  documentSnapshot:
    | firebase.firestore.DocumentSnapshot
    | firebase.firestore.QueryDocumentSnapshot,
  mapper?: Mapper<T>
): U | any => {
  const data = { ...documentSnapshot.data() }
  const result: U = mapper ? mapper(data) : data

  result.docId = documentSnapshot.id

  return result
}
