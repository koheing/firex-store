import { Mapper } from '../../types'
import { DocumentResult } from '../../models'

export const mapToIfDefined = <T = any>(
  documentSnapshot:
    | firebase.firestore.DocumentSnapshot
    | firebase.firestore.QueryDocumentSnapshot,
  mapper?: Mapper<T>
): DocumentResult => {
  const data = { ...documentSnapshot.data() }
  const result: DocumentResult = mapper ? mapper(data) : data

  result.docId = documentSnapshot.id

  return result
}
