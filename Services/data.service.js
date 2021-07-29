const dataModel = require("../Models/data.model");

module.exports = {
    addData: async (name, age, skills) => {
        try {
            return await dataModel.insertMany({name, age, skills});
        } catch (err) {
            console.log(err);
            return false;
        }
    },
    getData: async () => {
        try {
            return await dataModel.find();
        } catch (err) {
            console.log(err);
            return false;
        }
    },
    getDataById: async id => {
        try {
            return await dataModel.findById(id);
        } catch (err) {
            console.log(err);
            return false;
        }
    },
    updateData: async (id, name, age, skills) => {
        try {
            const data = await dataModel.updateOne(
                {   //  filter using this prop
                    "_id": id
                }, 
                {   //  overwrite this prop
                    name,
                    age,
                    skills
                },
                {
                    $set: {date: Date.now()}
                }
            );
            return (data.nModified === 0) ? false : true 
        } catch (err) {
            console.log(err);
            return false;
        }
    },
    deleteData: async id => {
        try {
            return await dataModel.findByIdAndDelete(id);
        } catch (err) {
            console.log(err);
            return false
        }
    }
}