const moment = require('moment');

const Validator = require('./Validator');
const { core: { skills } } = require('@config');

const skillArrayString = Object.keys(skills).join(',');


class EmployeeValidator extends Validator {

  /**
   * Validation rules.
   *
   * @param  string type
   * @param  array data
   * @return Object
   */
  getRules(type, data = {}) {
    let rules = {};

    switch (type) {
      case 'create':
        rules = {
          first_name: 'required|string|max:255',
          last_name: 'required|string|max:255',
          salary: 'numeric',
          skills: `in:${skillArrayString}`
        };

        break;

      case 'update':
        rules = {
          first_name: 'string|max:2555',
          last_name: 'string|min:1|max:2555',
          salary: 'numeric',
          skills: `in:${skillArrayString}`
        };

        break;

    }

    return rules;
  }


}

module.exports = EmployeeValidator;
