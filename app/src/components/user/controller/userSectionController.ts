import { User } from "../entity/user";
import { Request, Response } from "express";
import * as sectionService from '../service/section.service'


export class userSectionController {
  static list = async (req: Request, res: Response) => {
    let { id } = req.params;
    const sections = await sectionService.getSectionByUser(id);

    if (sections) {
      res.send(sections);
    } else {
      res.status(401).send('invalid credentials');
    }
  };

  static add = async (req: Request, res: Response) => {
    let { id } = req.params;
    let { sectionsIds } = req.body;

    // console.log('controller', sectionsIds)
    
    // console.log('controller', sectionsIds)

    const sections = await sectionService.addSectionByUser(id, sectionsIds);

    // if (sections) {
    //   res.send('');
    // } else {
    //   res.status(401).send('invalid credentials');
    // }
  };

  static remove = async (req: Request, res: Response) => {

  };
}
