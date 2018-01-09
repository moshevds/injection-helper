export const Main = Symbol('IH-main-symbol')

const DefPromised = Symbol('IH-promised-injectee-symbol')
const DefValued = Symbol('IH-valued-injectee-symbol')

export const PromisedInjectee = (m, ds) => [DefPromised, m, ds]
export const ValuedInjectee = (m, ds) => [DefValued, m, ds]

export const Injectee = (m, ds) =>
  (typeof m === 'string') ? PromisedInjectee(m, ds) : ValuedInjectee(m, ds)

const promisedInjecteeConstructor = function (promise, ...args) {
  const _this = this
  return promise.then(result => result.apply(_this, args))
}

const defToProcessor = (chain, [name, def]) => {
  var resolve, promise = new Promise(r => { resolve = r })
  const type = (def[0] === DefValued) + 2 * (def[0] === DefPromised)
  const creator = {
    constructor: [() => def, def[1], promisedInjecteeConstructor][type],
    dependencies: [[], def[2], [def[1]].concat(def[2])][type],
    resolve: resolve
  }
  const processor = state => ({
    creators: state.creators.concat([creator]),
    consumers: state.consumers.concat([[name, promise]])
  })
  return state => processor(chain(state))
}

const createScheduler = finder => creator => thisValue => {
  const args = creator.dependencies.map(finder)
  const result = creator.constructor.apply(thisValue, args)
  creator.resolve(result)
}

export const InjectionHelper = (appDefinition, thisValue) => {
  const thisPromise = Promise.resolve(thisValue)
  const chain = appDefinition.reduce(defToProcessor, state => state)
  const data = chain({creators: [], consumers: []})
  const consumers = new Map(data.consumers)
  const finder = consumers.get.bind(consumers)
  const schedulers = data.creators.map(createScheduler(finder))
  schedulers.map(thisPromise.then.bind(thisPromise))
  return consumers.get(Main)
}
