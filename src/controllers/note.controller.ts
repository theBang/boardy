import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Note } from "../entity/Note";
import createError from "http-errors";

function getNoteRepo(res: Response): Repository<Note> {
    return res.app.get("dataSource").getRepository(Note);
}

async function getNotes(req: Request, res: Response) {
    const notes = await getNoteRepo(res).find();
    res.send(notes);
}

async function getNoteById(req: Request, res: Response) {
    const note = await getNoteRepo(res).findOneBy({
        id: parseInt(req.params.id, 10)
    });
    res.send(note);
}

async function createNote(req: Request, res: Response) {
    const note = new Note();
    note.title = req.body.title;
    note.text = req.body.text;
    const results = await getNoteRepo(res).save(note);

    res.send(results);
}

async function updateNote(req: Request, res: Response, next: NextFunction) {
    const noteRepo = getNoteRepo(res);
    const note = await noteRepo.findOneBy({
        id: parseInt(req.params.id, 10)
    });
    if (note) {
        const results = await noteRepo.save(note);
        res.send(results);
    }
    else {
        next(createError(404));
    }
}

async function deleteNote(req: Request, res: Response) {
    const results = await getNoteRepo(res).delete(req.params.id);
    res.send(results);
}

export default {
    getNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
};