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
    
        const login = async (req, res) => {
        try {
            const {email, password} = req.body;

            console.log("Gelen Mail:", email);
            console.log("Gelen Şire:", password);

            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOneBy({ email: email});

            if (!user) {
                return res.status(404).json({ message: "Kullanıcı bulunamadı!" });
            }
            if (user.password !== password) {
                return res.status(401).json({ message: "Hatalı şifre!" });
            }

            res.status(200).json({ message: "Giriş başarılı", user: user });

            } catch (error) {
                console.error("Hata:", error);
            }
        };

        module.exports = { register, login};

