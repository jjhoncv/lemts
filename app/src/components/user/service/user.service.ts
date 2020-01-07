import { getRepository } from 'typeorm';
import { User } from './../entity/user.entity';
import { Role } from './../entity/role.entity';

import { verifyHash, generateHash } from './../utils/encryptions'

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