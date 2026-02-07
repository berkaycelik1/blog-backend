const AppDataSource = require("../data-source");
const User = require("../entity/User");

const register = async (req, res) => {
    try {
        const { fullName, email, password} = req.body;
        const userRepository = AppDataSource.getRepository(User);
        const existingUser = await userRepository.findOneBy({ email: email});

        if (existingUser) {
            return res.status(400).json({ message: "Bu email zaten kayıtlı!" });
        }

        const newUser = userRepository.create({
            fullName: fullName,
            email: email,
            password: password,
        });

        await userRepository.save(newUser);

        res.status(201).json({ message: "Kayıt başarılı!", user: newUser });

    } catch (error) {
        console.error("Kayıt Hatası:", error);
        res.status(500),json({ message: "Sunucu hatası oluştu."});
        }
    };

    module.exports = { register};