'use strict';

module.exports = (sequelize, DataTypes) => {

  const Employee = sequelize.define('Employee', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    dob: DataTypes.DATE,
    salary: DataTypes.FLOAT(11),
    profile_img: DataTypes.STRING,
    skills: {
      type: DataTypes.STRING,
      get() {
        const skills = this.getDataValue('skills');
        if (skills)
          return skills.split(';');
        else
          return [];
      },
      set(val) {
        if (val)
          this.setDataValue('skills', val.join(';'));
      },
    }
  }, {
      tableName: 'employees',
      modelName: 'Employee',
    });

  return Employee;
};
