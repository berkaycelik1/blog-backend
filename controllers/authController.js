const authService = require("../services/authService");
const { AppSuccessResponse, AppFailResponse } = require("../utils/response");

const register = async (req, res) => {
    try {
        const{ fullName, email, password } = req.body;
        const user = await authService.register(fullName, email, password);
        res.status(201).json(new AppSuccessResponse("Kayıt başarılı!", user));
    } catch (error) {
        res.status(400).json(new AppFailResponse(error.message));
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authService.login(email, password);

        res.status(200).json(new AppSuccessResponse("Giriş başarılı", user));
    } catch (error) {
        res.status(401).json(new AppFailResponse(error.message));
    }
};

module.exports = { register, login};