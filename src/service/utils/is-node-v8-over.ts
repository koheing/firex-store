export const isNodeV8Over = () => {
  const currentNodeVersion = Number(process.versions.node.split('.')[0])
  return currentNodeVersion > 8
}
