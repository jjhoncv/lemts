import { getRepository } from 'typeorm';
import { User } from './../entity/user.entity';
import { Role } from './../entity/role.entity';

import { verifyHash, generateHash } from './../utils/encryptions'
import { IError } from '../../../errors/IError';

const getUserByUsername = async (username: string, getHash: boolean = false) => {
    try {
        return await getRepository(User).findOne({ username });
    } catch (e) {
        return null;
    }
};

const updateUser = async (user: User) => {
    return await getRepository(User).save(user);
};

export const createUser = async (params) => {

    let roleRepository = getRepository(Role);
    let role = await roleRepository.findOne({ id: params.role })

    let user = new User();
    user.name = params.name
    user.surname = params.surname;
    user.email = params.email;
    user.username = params.username;
    user.password = await generateHash(params.password, 10);
    user.photo = params.photo;
    user.role = role;

    let userRepository = getRepository(User);

    return await userRepository.save(user);
}

export const loginUser = async (username: string, password: string) => {
    // Get user from database
    const user = await getUserByUsername(username);
    if (user) {
        if (await verifyHash(password, user.password)) {
            user.lastLogin = new Date().getTime().toString();
            updateUser(user);
            return user;
        }
    }
    return null
}

export const changePassword = async (userId, oldPassword, newPassword) => {

    //Get parameters from the body
    if (!(oldPassword && newPassword)) {
        throw new IError({ code: 400, msg: 'fail passwords not set' });
    }
    const user = await getRepository(User).findOne({ id: userId });

    if (user) {
        if (await verifyHash(oldPassword, user.password)) {
            user.password = await generateHash(newPassword, 10);
            updateUser(user);
            return user;
        }
    }

    // //Check if old password matchs
    // if (!User.checkIfUnencryptedPasswordIsValid(oldPassword, user.password)) {
    //     res.status(401).send('fail validation encript');
    //     return;
    // }

    // //Get user from the database
    // let user: User;
    // try {
    //     // user = await userRepository.findOneOrFail(id);
    //     user = await User.init(userId);
    // } catch (id) {
    //     res.status(401).send('fail pidiendo usuario');
    // }


    // //Validate de model (password length)
    // user.password = newPassword;
    // const errors = await validate(user);
    // if (errors.length > 0) {
    //     res.status(400).send(errors);
    //     return;
    // }
    // //Hash the new password and save
    // user.hashPassword();
    // User.update(user);

    // res.status(204).send('all ok');
    // };
}