const _ = require("lodash");
const { addData, deleteData, getData, getDataById, updateData } = require('../Services/data.service');

module.exports = {
    apiGetAllData: async (__, res) => {
        try {
            const data = await getData();
            if (!data) res.status(404).json({success: false, error: "no data found"});
            else res.json({success: true, data});
        } catch (error) {
            res.status(400).json({success: false, error});
        }
    },
    apiGetDataById: async (req, res) => {
        try {
            //  get ID
            const id = req.params.id || "";
            //  verify ID
            if (id && id.length !== 24) throw "invalid ID"; //  id of mongoDB document is 24 char long
            //  fetch data using ID
            const data = await getDataById(id);
            if (!data) res.status(404).json({success: false, error: "Data is either delete or not created yet"});
            else res.json({success: true, data}); 
        } catch (error) {
            res.status(400).json({success: false, error});
        }
    },
    apiDeleteData: async (req, res) => {
        try {
            //  get ID
            const { id } = req.body || "";
            //  verify ID
            if (id && id.length !== 24) throw "invalid ID"; //  id of mongoDB document is 24 char long
            //  fetch data using ID
            const data = await deleteData(id);
            if (!data) res.status(404).json({success: false, error: "Data is either already delete or not created yet"});
            else res.json({success: true, data}); 
        } catch (error) {
            res.status(400).json({success: false, error});
        }
    },
    apiAddData: async (req, res) => {
        try {
            //  get data
            const { name, age, skills } = req.body;
            //  verify data
            if (name && !_.isString(name) || (name.length < 5)) throw "invalid name or less than 5 character";
            if (age && !_.isNumber(age) || !(age > 1)) throw "invalid age";
            if (skills && !_.isArray(skills)) throw "invalid Skills array";
            if (!skills.every(s => _.isString(s))) throw "invalid Skills array - contains non-String item";
            //  post data to DB
            const data = await addData(name, age, skills);
            if (!data) res.status(404).json({success: false, error: "error while posting data"});
            else res.status(201).json({success: true, data});
        } catch (error) {
            res.status(400).json({success: false, error});
        }
    },
    apiUpdateData: async (req, res) => {
        try {
            //  get data
            const { id, name, age, skills } = req.body;
            //  verify data
            if (id && id.length !== 24) throw "invalid ID";
            if (name && !_.isString(name) || (name.length < 5)) throw "invalid name or less than 5 character";
            if (age && !_.isNumber(age) || !(age > 1)) throw "invalid age";
            if (skills && !_.isArray(skills)) throw "invalid Skills array";
            if (!skills.every(s => _.isString(s))) throw "invalid Skills array - contains non-String item";
            //  update data on DB
            const data = await updateData(id, name, age, skills);
            if (!data) res.status(404).json({success: false, error: "invalid ID or no changes were made"});
            else res.status(200).json({success: true, data: "data successfully updated"});
        } catch (error) {
            res.status(400).json({success: false, error});
        }
    }
}