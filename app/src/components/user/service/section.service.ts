import { getRepository } from 'typeorm';
import { User } from '../entity/user.entity';
import { Section } from '../entity/section.entity';

export const getSectionByUser = async (idUser: any) => {
    const user = await getRepository(User).findOne(idUser, { relations: ["sections"] })
    return user.sections;
}

export const addSectionByUser = async (idUser: any, sectionsIds: any[]) => {

    const sections = sectionsIds.map(idSection => {
        const section = new Section()
        section.id = idSection;
        return section;
    })

    const userRepository = getRepository(User);

    const user = await userRepository.findOne(idUser);
    user.sections = sections;

    return await userRepository.save(user);
}

export const removeSectionByUser = async (idUser: any, sectionsIds: any[]) => {

    const sectionsAll = await getSectionByUser(idUser);
    const sectionsfilter = sectionsAll.filter(section => !sectionsIds.includes(section.id))
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(idUser);
    user.sections = sectionsfilter;

    return await userRepository.save(user);
}


