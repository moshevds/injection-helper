export default async (ModuleOne, ModuleFour) => {
  console.info('Module 3 started')
  console.info('Module 3 depends on Module 1, resolves to: ', await ModuleOne)
  console.info('Module 3 circularly depends on Module 4: ', ModuleFour)
  ModuleFour.then(loadedModuleFour => console.info('Module 3 just received the finished Module 4 dependency: ', loadedModuleFour))
  const result = Symbol('The Result of Module 3')
  console.info('Module 3 finished, return value: ', result)
  return result
}
