import { Main, Injectee } from './injection-helper.js'

import ModuleOne from './module-one.js'
import ModuleTwo from './module-two.js'
import ModuleThree from './module-three.js'
import ModuleFour from './module-four.js'
import AppMain from './application-main.js'

/*
 * This is the injection manifest.
 *
 * It is an array of arrays with the following format:
 * [[name, definition], ...]
 *
 * First of all, the definition can be any object or promise.
 * In addition to those, special values can be created with the Injectee
 * function. Dependencies are resolved and injected for these injectees. This
 * is done by creating promises for all of the dependencies and wiring
 * everything together as you would expect.
 *
 * The name also has a special value (Main) available, whitch is the item that
 * will be returned from the InjectionHelper call.
 */
export default [
  ['Immutable',             Immutable],
  ['React',                 React],
  ['ReactDOM',              ReactDOM],

  /* Order is not important, reversed here for a more interesting console output. */
  [Main,                    Injectee(AppMain, ['ModuleThree', 'ModuleFour'])],
  ['ModuleFour',            Injectee(ModuleFour, ['ModuleTwo', 'ModuleThree'])],
  ['ModuleThree',           Injectee(ModuleThree, ['ModuleOne', 'ModuleFour'])],
  ['ModuleTwo',             Injectee(ModuleTwo, ['React', 'ReactDOM'])],
  ['ModuleOne',             Injectee(ModuleOne, ['Immutable'])]
]
