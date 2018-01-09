export default async (React, ReactDOM) => {
  console.info('Module 2 started')
  console.info('Module 2 depends on React, resolves to: ', await React)
  console.info('Module 2 depends on ReactDOM, resolves to: ', await ReactDOM)
  console.info('Module 2 finished')
  const result = Symbol('The Result of Module 2')
  console.info('Module 2 finished, return value: ', result)
  return result
}
