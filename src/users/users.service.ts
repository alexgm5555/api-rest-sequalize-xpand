import { Request, Response } from 'express';
import {v4 as uuid} from 'uuid';

import { User } from './users.model';
import { UserInterface } from './interfaces/users.interface';

export const createUser = async (req: Request, res:Response ) => {
  try {
    const body: UserInterface = req.body;
    const userExist = await  User.findOne({where: {login: body.login}});

    if(userExist) throw "User already exist";

    const response = User.create({...body});
    await response;
    console.log(`User ${userExist} was Registered`);
    res.json({
      login: body.login
    });
  
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error
    })
  }
}

export const findAllUser = async (req: Request, res:Response ) => {
  try {
    const result = await User.findAll();
    if(!result) throw 'Character table is empty';
    res.json({
      login: result
    });
  
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error
    })
  }
}