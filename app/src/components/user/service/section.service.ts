import { getRepository } from 'typeorm';
import { User } from '../entity/user.entity';
import { Section } from '../entity/section.entity';

export const getSectionByUser = async (idUser) => {
    return await getRepository(User).findOne(idUser, { relations: ["sections"] })
}

export const addSectionByUser = async (idUser, sectionsIds) => {

    let sections = sectionsIds.map(idSection => {
        let section = new Section()
        section.id = idSection;
        return section;
    })

    let user = new User();
    user.sections = sections;

    let userRepository = getRepository(User);
    return await userRepository.save(user);
}
