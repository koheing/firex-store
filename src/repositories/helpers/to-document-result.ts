import { Mapper } from '../../types'
import { DocumentResult } from '../../models'

export const toDocumentResult = <T = any>(
  snapshot:
    | firebase.firestore.DocumentSnapshot
    | firebase.firestore.QueryDocumentSnapshot,
  mapper?: Mapper<T>
): DocumentResult | T => {
  const data = { ...snapshot.data() }
  const result: DocumentResult = mapper ? mapper(data) : data

  result.docId = snapshot.id

  return result
}
