const moment = require("moment")
const Sequelize = require('sequelize');
const { Employee } = require('@app/models');
const EmployeeValidator = require('@app/validators/EmployeeValidator');
const ModelNotFoundError = require('@app/errors/ModelNotFoundError')

const Op = Sequelize.Op;

class EmployeeService {
  constructor() {
    this.employeeValidator = new EmployeeValidator();
  }

  /**
   * returns all employees
   *
   *
   * @return [{ Project }] [description]
   */
  async all(req, paginationData) {

    const { query: { name: queryName = '' } } = req

    const {
      rows: employees,
      meta
    } = await Employee.paginate(paginationData, {
      where: {
        [Op.or]: [
          {
            first_name: {
              [Op.like]: `%${queryName}%`
            },
          },
          {
            last_name: {
              [Op.like]: `%${queryName}%`
            },
          }
        ]
      },
      order: [
        ['createdAt', 'DESC']
      ]
    });

    return {
      rows: employees,
      meta
    };
  }

  /**
   * validates inputs and create employee
   *
   * @param  {[type]}
   * @return {[type]}
   */
  async create(inputs, profile_img) {
    await this.employeeValidator.validate(inputs, 'create');

    const employee = await Employee.create({
      first_name: inputs.first_name,
      last_name: inputs.last_name,
      profile_img: profile_img ? profile_img.path : null,
      dob: inputs.dob ? moment(inputs.dob).format('YYYY-MM-DD') : null,
      salary: inputs.salary,
      skills: inputs.skills

    });

    return employee;
  }

  /**
   * returns employee by id
   *
   * @param  {[type]}
   * @return {[type]}
   */
  async get(employeeId, throwError = true) {
    const employee = await Employee.findOne({
      where: {
        id: employeeId,
      },
    });

    if (!employee && throwError) throw new ModelNotFoundError();

    return employee;
  }

  /**
   * updates employee by id
   *
   * @param  {[type]}
   * @param  {[type]}
   * @return {[type]}
   */
  async update(employeeId, inputs, profile_img) {
    const employee = await Employee.findOne({
      where: {
        id: employeeId,
      },
    });

    if (!employee) throw new ModelNotFoundError();

    await this.employeeValidator.validate(inputs, 'update');

    await employee.update({
      first_name: inputs.first_name,
      last_name: inputs.last_name,
      profile_img: profile_img ? profile_img.path : employee.profile_img ? employee.profile_img : null,
      dob: inputs.dob ? moment(inputs.dob).format('YYYY-MM-DD') : null,
      salary: inputs.salary ? inputs.salary : null,
      skills: inputs.skills
    });

    return employee;
  }

  /**
   * delete employee by id
   *
   * @param  {[type]}
   * @return {[type]}
   */
  async destroy(employeeId) {
    const employee = await Employee.destroy({
      where: {
        id: employeeId
      }
    });

    if (employee < 1) throw new ModelNotFoundError();

    return "Employee Successfully Deleted!"
  }

}

module.exports = EmployeeService;
