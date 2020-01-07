import { getRepository } from 'typeorm';
import { User } from '../entity/user.entity';
import { Section } from '../entity/section.entity';

export const getSectionByUser = async (idUser) => {

    return await getRepository(User).findOne(idUser, { relations: ["sections"] })

    // let roleRepository = getRepository(Role);
    // let role = await roleRepository.findOne({ id: params.idRole })

    // let user = new User();
    // user.name = params.name
    // user.surname = params.surname;
    // user.email = params.email;
    // user.username = params.username;
    // user.password = await generateHash(params.password, 10);
    // user.photo = params.photo;
    // user.role = role;

    // let userRepository = getRepository(User);

    // return await userRepository.save(user);
}

export const addSectionByUser = async (idUser, sectionsIds) => {

    console.log('sectionsIds', sectionsIds)

    let sections = sectionsIds.map(idSection => {
        let section = new Section()
        section.id = idSection;
        return section;
    })

    let user = new User();
    // user.id = idUser;
    user.sections = sections;


    let userRepository = getRepository(User);
    // let role = await userRepository.


    return await userRepository.save(user)



}

// export class Section {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     name: string;

//     @Column()
//     url: string;

//     @Column()
//     status: boolean;

//     @ManyToOne(type => Module, module => module.sections)
//     module: Module;

//     @ManyToMany(type => User, user => user.sections)
//     @JoinTable()
//     users: User[];
// }


// }