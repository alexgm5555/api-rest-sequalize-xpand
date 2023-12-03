import { Request, Response } from 'express';
import {v4 as uuid} from 'uuid';

import { Note } from './notes.model';
import { NotesInterface } from './interfaces/notes.interface';

export const createNote = async (req: Request, res:Response ) => {
  try {
    let {
      id,
      ...data
    }: NotesInterface = req.body;

    if (!data.title) throw "Invalid request";
    const NoteExist = await  Note.findOne({where: {title: data.title}});
    if(NoteExist) throw "Note already exist";

    id = uuid();
    const date_created = new Date().toLocaleDateString("es-MX", {timeZone: "America/Bogota"})
  
    const response = Note.create({
      id,
      date_created,
      ...data
    });
    console.log(data, date_created);

    await response;
    console.log(`Note ${id} was Registered`);
    res.status(201).json({
      data: {
        note: {
          id,
          date_created,
          ...data
        }
      },
      message: `Note whit id: ${id} was registered.`
    });
  
  } catch (error) {
    console.log(error);
    return res.status(codeError(error)).json({
      message: error
    })
  }
}
export const findNote = async (req: Request, res:Response ) => {
  const { id  } = req.query;
  const result = 
    id ? findById(id, res) :
    findAll(res)
}

export const findAll = async (res:Response ) => {
  try {
    const result = await Note.findAll();
    if(!result) throw 'Notes table is empty';
    res.status(200).json({
      data: {
        notes: result
      }
    });
  
  } catch (error) {
    console.log(error);
    return res.status(codeError(error)).json({
      message: error
    })
  }
}

export const findById = async (id: any, res:Response ) => {
  try {
    const NoteExist = await _NoteExist(id);
    res.json({
      data: {
        note: NoteExist 
      }
    });
  
  } catch (error) {
    console.log(error);
    return res.status(codeError(error)).json({
      message: error
    })
  }
}

export const deleteOneNote = async (req: Request, res:Response ) => {
  try {
    
    const id = req.query.id?.toString();
    await _NoteExist(id);
    const result = await Note.destroy({where: {id}});
    if(result !== 1) throw 'Note not found';
    res.status(200).json({
      data: {
        notes: 'Record was deleted'
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(codeError(error)).json({
      message: error
    })
  }
}

export const updateOneNote = async (req: Request, res:Response ) => {
  try {
    const id = req.query.id?.toString();
    await _NoteExist(id);
    let {
      title,
      description,
      state,
      final_note
    } = req.body;
    if (final_note) state = 'completada';
    const result: any  = await Note.update({
      title,
      description,
      state,
      final_note
    }, { where: {id} });

    if(result[0] !== 1) throw 'Note not found';

    res.status(200).json({
      data: {
        notes: 'Record was updated',
      }
    });
  
  } catch (error) {
    console.log(error);
    return res.status(codeError(error)).json({
      message: error
    })
  }
}

const _NoteExist = async (id: any) => {
  const _NoteExist = await Note.findOne({where: {id}});
  if(!_NoteExist) throw "Note not exist";
  return _NoteExist
}


const codeError = (text: any) => {
  if(!text) return 400
  if (text === "Note not exist") return 404;
  if (text === "Notes table is empty") return 404;
  if (text === "Note already exist") return 404;
  return 400;
  
}