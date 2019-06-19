'use strict'
// Models
const User = require('../models/user');

async function Create( req, res ) {
    const params = req.body;

    if ( !params.name || !params.surname || !params.email ) return res.status(404).send({message: "Llena todos los campos."});

    try {
        const userFound = await User.findOne({name: params.name});

        if ( userFound ) return res.status(400).send({message: "Usuario ya creado."});
    
        const user = new User({
            name: params.name,
            surname: params.surname,
            email: params.email
        });
    
        const userSaved = await user.save();
    
        userSaved ? res.status(200).send({user: userSaved}) : res.status(404).send({message: "User Error"});
    } catch (error) {
        return res.status(400).send({message: "Server error"});
    }

}

async function GetUsers(req, res) {
    try {
        const users = await User.find().limit(100);
        users.length > 0 ? res.status(200).send({user: users}) : res.status(404).send({message: "Users not found."});

    } catch (error) {
        return res.status(400).send({message: "Server error" + error.message});
    }
}

module.exports = {
    Create,
    GetUsers
}