const BaseTransformer = require('./BaseTransformer');

class EmployeeTransformer extends BaseTransformer {


  constructor(req, data) {
    super(req, data);
  }

  /**
   * transformer employee
   *
   * @param  {[type]} employee [description]
   * @return {[type]}      [description]
   */
  transform() {
    const employee = this.data;

    return {
      id: employee.id,
      first_name: employee.first_name,
      last_name: employee.last_name,
      salary: employee.salary,
      dob: employee.dob,
      profile_img: employee.profile_img ? "http://" + this.req.headers.host + '/' + employee.profile_img : null,
      skills: employee.skills
    }
  }


}

module.exports = EmployeeTransformer;
