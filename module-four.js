export default async (ModuleTwo, ModuleThree) => {
  console.info('Module 4 started')
  console.info('Module 4 depends on Module 2, resolves to: ', await ModuleTwo)
  console.info('Module 4 circularly depends on Module 3: ', ModuleThree)
  ModuleThree.then(loadedModuleThree => console.info('Module 4 just received the finished Module 3 dependency:', loadedModuleThree))
  const result = Symbol('The Result of Module 4')
  console.info('Module 4 finished, return value: ', result)
  return result
}
