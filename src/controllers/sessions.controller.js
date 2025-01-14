export const register = async (req, res) => {
    console.log(req.session)
    res.send({ status: "success", message: "User registered" });
}

export const failRegister = async (req, res) => {
    console.log("Error en el registro")
    res.status(400).send({ status: "error", error: "Registry fail" });
}

export const successRegister = async (req, res) => {
    console.log("Usuarrio creado exitosamente")
    // preocupate que tu API retorne respuestas consistentes y no de redireccionar a una vista
    res.status(200).send({ status: "success", message: "User created" });
}

export const login = async (req, res) => {
    try {
        if (!req.user) return res.status(400).send({ status: "error", error: "Incorrect credentials" });
        req.session.user = {
            name: `${req.user.first_name} ${req.user.last_name}`,
            email: req.user.email,
            age: req.user.age
        }
        console.log(req.session.user)
        res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
    } catch (error) {
        console.log(error)
    }
}

export const failLogin = async (req, res) => {
    res.status(400).send({ status: "error", error: "Login fail" });
}

export const logout = async (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: "error", error: "Couldn't logout" });
        res.redirect('/login');
    })
}

export const githubCallback = async (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
}