export class MockTransaction {
  constructor() {}
  get(documentRef: any /* DocumentReference  */) {
    return documentRef.get()
  }

  // set(
  //   documentRef: any /* DocumentReference  */,
  //   data: any,
  //   options?: { merge: boolean }
  // ) {
  //   return this
  // }

  set = jest.fn()

  // update(documentRef: any /* DocumentReference  */, data: any) {
  //   return this
  // }
  update = jest.fn()

  // update(
  //   documentRef: any /* DocumentReference  */,
  //   field: any/* string | FieldPath */,
  //   value: any,
  //   ...moreFieldsAndValues: any[]
  // ) {
  //   return this
  // }

  // delete(documentRef: any /* DocumentReference  */) {
  //   return this
  // }
  delete = jest.fn()
}
