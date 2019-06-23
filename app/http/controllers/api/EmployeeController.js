const EmployeeService = require('@app/services/EmployeeService');
const EmployeeTransformer = require('@app/transformers/EmployeeTransformer')
const { makePaginationDataFromRequest } = require('@app/utils/helpers');

const employeeService = new EmployeeService();

module.exports = {

  /**
   * get all employees
   *
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  index: async (req, res, next) => {
    const employees = await employeeService.all(req, makePaginationDataFromRequest(req));

    return res.transformPaginate(EmployeeTransformer, employees);
  },

  /**
   * create new employee
   *
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  create: async (req, res, next) => {
    req.body.skills = JSON.parse(req.body.skills);
    const employee = await employeeService.create(req.body, req.file);

    return res.transformItem(EmployeeTransformer, employee);
  },

  /**
  * get individual employee details
  *
  * @param  {[type]}   req  [description]
  * @param  {[type]}   res  [description]
  * @param  {Function} next [description]
  * @return {[type]}        [description]
  */
  show: async (req, res, next) => {
    const employee = await employeeService.get(req.params.id);

    return res.transformItem(EmployeeTransformer, employee);
  },

  /**
  * get individual employee details
  *
  * @param  {[type]}   req  [description]
  * @param  {[type]}   res  [description]
  * @param  {Function} next [description]
  * @return {[type]}        [description]
  */
  update: async (req, res, next) => {
    if (req.body.skills) {
      req.body.skills = JSON.parse(req.body.skills);
    }
    const employee = await employeeService.update(req.params.id, req.body, req.file);

    return res.transformItem(EmployeeTransformer, employee);
  },

  /**
  * delete employee by id
  *
  * @param  {[type]}
  * @param  {[type]}
  * @param  {Function}
  * @return {[type]}
  */
  delete: async (req, res, next) => {
    const msg = await employeeService.destroy(req.params.id);

    return res.success(msg);
  },


};
