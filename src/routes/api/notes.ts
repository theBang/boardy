import { Router, Response } from "express";
import { Repository } from "typeorm";
import { Note } from "../../entity/Note";
import createError from "http-errors";

const noteRouter = Router();

function getNoteRepo(res: Response): Repository<Note> {
    return res.app.get("dataSource").getRepository(Note);
}

noteRouter.get("/", async (req, res) => {
    console.log(this);
    const notes = await getNoteRepo(res).find();
    res.send(notes);
});

noteRouter.get("/:id", async (req, res) => {
    const note = await getNoteRepo(res).findOneBy({
        id: parseInt(req.params.id, 10)
    });
    res.send(note);
})

noteRouter.post("/", async (req, res) => {
    const note = new Note();
    note.title = req.body.title;
    note.text = req.body.text;
    const results = await getNoteRepo(res).save(note);

    res.send(results);
});

noteRouter.put("/:id", async (req, res, next) => {
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
})

noteRouter.delete("/:id", async (req, res) => {
    const results = await getNoteRepo(res).delete(req.params.id);
    res.send(results);
});
export default noteRouter;

