const AppDataSource = require("../data-source");
const User = require("../entity/User");
const bcrypt = require("bcryptjs");

const userRepository = AppDataSource.getRepository(User);

const register = async (fullName, email, password) => {
    const existingUser = await userRepository.findOneBy({ email});
    if (existingUser) {
        throw new Error("Bu email zaten kayıtlı");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = userRepository.create({
        fullName,
        email,
        password: hashedPassword,
    });

    await userRepository.save(newUser);
    return newUser;
    };
    const login = async (email, password) => {
        const user = await userRepository.findOneBy({ email });
        if (!user) {
            throw new Error("Kullanıcı bulunamadı!");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Hatalı şifre!");
        }
        return user;
    };
    module.exports = { register, login};

    