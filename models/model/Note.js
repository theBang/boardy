module.exports = class Note {
    constructor(id, title, text, user) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.user = user;
    }
}