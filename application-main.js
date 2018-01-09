export default async (ModuleThree, ModuleFour) => {
  console.info('Main started');
  console.info('Main depends on Module 3, resolves to: ', await ModuleThree);
  console.info('Main depends on Module 4, resolves to: ', await ModuleFour);
  console.info('Main finished');

  return async (currentScript, reactAnchor, bodyElement) => {
    /* */
  }
}
