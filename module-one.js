export default async (Immutable) => {
  console.info('Module 1 started')
  console.info('Module 1 depends on Immutable.js, resolves to: ', await Immutable)
  const result = Symbol('The Result of Module 1')
  console.info('Module 1 finished, return value: ', result)
  return result
}
