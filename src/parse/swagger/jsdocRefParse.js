function jsdocRefParse(definitions){
  return [{
    name:'ApplicationContext',
    defStr:`
/**
 * @typedef {Object} ApplicationContext
 * @property {string} applicationName
 * @property {AutowireCapableBeanFactory} autowireCapableBeanFactory
 * @property {number} beanDefinitionCount
 * @property {string[]} beanDefinitionNames
 */`
  }];
}

module.exports = {
  jsdocRefParse
}