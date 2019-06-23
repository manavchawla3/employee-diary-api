const express = require('express');
const asyncHandler = require('express-async-handler');

const indexController = require('@app/http/controllers/api/indexController');
const EmployeeController = require('@app/http/controllers/api/EmployeeController');
const { fileUpload } = require('@app/http/middlewares')

const router = express.Router();

router.get('/', [], asyncHandler(indexController.index));

//Employee CRUD Routes
router.get('/employee', [], asyncHandler(EmployeeController.index));
router.post('/employee', [fileUpload.single('profile_img')], asyncHandler(EmployeeController.create));
router.get('/employee/:id', [], asyncHandler(EmployeeController.show));
router.patch('/employee/:id', [fileUpload.single('profile_img')], asyncHandler(EmployeeController.update));
router.delete('/employee/:id', [], asyncHandler(EmployeeController.delete));

module.exports = router;
