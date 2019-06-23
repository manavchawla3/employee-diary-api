const _ = require('lodash');

const TransformerError = require('@app/errors/TransformerError');
const ApplicationError = require('@app/errors/ApplicationError');

class BaseTransformer {

  constructor(req, data) {
    this.req = req;
    this.data = data;
  }

  /**
   * @return {[type]}
   */
  async computeTransform() {
    const transform = this.transform();

    return {
      ...transform
    };
  }

  /**
   * transformer array of objects
   *
   * @param  {[type]} message         [description]
   * @param  {[type]} transformerType [description]
   * @param  {[type]} data            [description]
   * @return {[type]}                 [description]
   */
  async transformItems(transformerClassOrData, data) {
    let transformedArray = [];

    if (typeof data !== 'undefined' && data.constructor !== Array) {
      throw new TransformerError({
        message: 'Data needs to be an array'
      }, 500)
    }

    if (typeof transformerClassOrData === 'function') {
      data.forEach(async (item) => {
        const transformer = new transformerClassOrData(null, item);

        const computed = await transformer.computeTransform();
        transformedArray.push(computed);
      });
    } else {
      transformedArray = transformerClassOrData;
    }

    return transformedArray;
  }

  /**
   * transformer single entity
   *
   * @param  {[type]} message         [description]
   * @param  {[type]} transformerType [description]
   * @param  {[type]} data            [description]
   * @return {[type]}                 [description]
   */
  async transformItem(transformerClassOrData, data) {
    let body = [];

    if (typeof data !== 'undefined' && data.constructor == Array) {
      throw new TransformerError('DATA_NEEDS_TO_BE_AN_OBJECT', 500)
    }

    if (typeof transformerClassOrData === 'function') {
      const transformer = new transformerClassOrData(null, data);

      body = await transformer.computeTransform(data);

    } else {
      body = transformerClassOrData;
    }

    return body;
  }
}

module.exports = BaseTransformer;
