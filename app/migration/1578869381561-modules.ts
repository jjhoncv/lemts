import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { Module } from "../src/components/module/moduleEntity";
import { Role } from "../src/components/role/roleEntity";
import { User } from "../src/components/user/userEntity";
import { generateHash } from "../src/components/user/userUtil";
import { Section } from "../src/components/section/sectionEntity";

export class modules1578869381561 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let roleRepository = getRepository(Role);
    let moduleRepository = getRepository(Module);
    let userRepository = getRepository(User);
    let sectionRepository = getRepository(Section);

    const modules = [
      { id: 1, name: "Home" },
      { id: 2, name: "Configuration" },
      { id: 3, name: "Section" }
    ].map(async item => {
      let module = new Module();
      module = { ...item };
      await moduleRepository.save(module);
    });

    await Promise.all(modules);

    const roles = [
      { id: 1, name: "Home" },
      { id: 2, name: "Invited" }
    ].map(async item => {
      let role = new Role();
      role = { ...item };
      await roleRepository.save(role);
    });

    await Promise.all(roles);

    const sections = [
      {
        id: 1,
        name: "home",
        url: "/home",
        status: true,
        module: 1
      },
      {
        id: 2,
        name: "page",
        url: "/page",
        status: true,
        module: 3
      },
      {
        id: 3,
        name: "user",
        url: "/user",
        status: true,
        module: 2
      }
    ].map(async (item: any) => {
      let section = new Section();
      section = { ...item };
      section.module = await moduleRepository.findOne({ id: item.module });
      await sectionRepository.save(section);
    });

    await Promise.all(sections);

    const users = [
      {
        name: "Jhonnatan",
        surname: "Castro",
        username: "jjhoncv",
        password: "123456",
        email: "jjhoncv@gmail.com",
        photo: "me.jpg",
        role: 1,
        sections: [1, 2, 3]
      },
      {
        name: "Desly",
        surname: "Portal",
        username: "desly.ipr",
        password: "123456",
        email: "desly.ipr@gmail.com",
        photo: "me.jpg",
        role: 2,
        sections: [1, 2]
      }
    ].map(async (item: any) => {
      let user = new User();
      user = { ...item };
      user.password = await generateHash(item.password, 10);
      user.role = await roleRepository.findOne({ id: item.role });
      user.sections = await Promise.all(
        item.sections.map(async id => await sectionRepository.findOne({ id }))
      );
      await userRepository.save(user);
    });

    await Promise.all(users);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
