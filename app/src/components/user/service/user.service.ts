import { getRepository } from 'typeorm';
import { User } from './../entity/user.entity';
import { Role } from './../entity/role.entity';

import { verifyHash, generateHash } from './../utils/encryptions'
import { ErrorHandler } from '../../../errors/handleError';
// import { IError } from '../../../errors/IError';

export const createUser = async (params) => {

    let roleRepository = getRepository(Role);
    let role = await roleRepository.findOne({ id: params.role })

    if (!role) {
        throw new ErrorHandler(404, 'role not exists');
    }

    let user = new User();
    user = { ...params };
    user.password = await generateHash(params.password, 10);
    user.role = role;

    await getRepository(User).save(user);
    return user;
}

export const loginUser = async (username: string, password: string) => {
    // Get user from database
    const user = await getRepository(User).findOne({ username });
    if (!user) {
        throw new ErrorHandler(404, 'user not exists');
    }

    if (await verifyHash(password, user.password)) {
        user.lastLogin = new Date().getTime().toString();
        await getRepository(User).save(user);
    } else {
        throw new ErrorHandler(404, 'password not is valid');
    }

    return user
}

export const changePassword = async (userId, oldPassword, newPassword) => {

    //Get parameters from the body
    if (!(oldPassword && newPassword)) {
        throw new ErrorHandler(400, 'fields send empty')
    }

    const user = await getRepository(User).findOne({ id: userId });
    if (!user) {
        throw new ErrorHandler(404, 'user not exists')
    }

    if (await verifyHash(oldPassword, user.password)) {
        // console.log('here!')
        user.password = await generateHash(newPassword, 10);
        await getRepository(User).save(user);
    } else {
        throw new ErrorHandler(404, 'password not is valid')
    }

    return user;
}