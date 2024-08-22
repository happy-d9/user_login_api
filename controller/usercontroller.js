const user = require('../model/usermodel');
var jwt = require('jsonwebtoken');
var login = require('../model/indexmodel');
const storage = require('node-persist');


exports.user = async (req, res) => {
    try {
        var data = await user.create(req.body);
        res.status(200).json({
            status: "user add successfully",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: error
        })
    }
}
exports.user_find = async (req, res) => {
    try {
        var data = await user.find();
        res.status(200).json({
            status: "All user select successfully",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: error
        })
    }
}
exports.user_find_one = async (req, res) => {
    try {
        var id = req.params.id;
        var data = await user.findById(id);
        res.status(200).json({
            status: "Single user select successfully",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: error
        })
    }
}
exports.user_update = async (req, res) => {
    try {
        var id = req.params.id;
        var data = await user.findByIdAndUpdate(id, req.body);
        res.status(200).json({
            status: "user update successfully",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: error
        })
    }
}
exports.user_delete = async (req, res) => {
    try {
        var id = req.params.id;
        await user.findByIdAndDelete(id);
        var data = await user.findById(id);
        res.status(200).json({
            status: "user delete successfully",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: error
        })
    }
}