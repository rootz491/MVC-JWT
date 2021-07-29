const router = require("express").Router();
const { apiGetAllData, apiGetDataById, apiUpdateData, apiDeleteData, apiAddData } = require("../Controllers/data.controller");
const { isAuthorized } = require("../Services/verification.service");

router.get('/data', apiGetAllData);
router.get('/data/:id', apiGetDataById);
router.post('/data/add', isAuthorized, apiAddData);
router.delete('/data/delete', isAuthorized, apiDeleteData);
router.patch('/data/update', isAuthorized, apiUpdateData);

module.exports = router;