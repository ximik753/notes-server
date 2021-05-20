const Note = require('../db/models/Note')

class NoteController {
  constructor() {
    this.getNotes = this.getNotes.bind(this)
    this.getNoteById = this.getNoteById.bind(this)
    this.updateNote = this.updateNote.bind(this)

    this._notesAttributes = ['id', 'title', 'data', ['updatedAt', 'last_update']]
    this._noteUpdatingFields = ['title', 'data']
  }

  async getNotes(req, res) {
    const userNotes = await Note.findAll({
      where: {owner_id: req.user.id},
      attributes: this._notesAttributes,
      order: [['updatedAt', 'DESC']]
    })

    return res.json({
      response: userNotes
    })
  }

  async getNoteById(req, res) {
    const note = await Note.findByPk(req.params.id, {
      attributes: this._notesAttributes
    })

    return res.json({
      response: note
    })
  }

  async createNote(req, res) {
    const createdNote = await Note.create({
      owner_id: req.user.id
    })

    return res.json({
      response: {
        id: createdNote.id
      }
    })
  }

  async _updateFieldByName(name, id, data) {
    await Note.update({[name]: data}, {where: {id}})
  }

  async updateNote(req, res) {
    const id = req.params.id
    for (const [key, value] of Object.entries(req.body)) {
      if (this._noteUpdatingFields.includes(key)) {
        await this._updateFieldByName(key, id, value)
      }
    }
    return res.json({
      response: 'ok'
    })
  }

  async deleteNote(req, res) {
    await Note.destroy({
      where: {id: req.params.id}
    })
    return res.json({
      response: 'ok'
    })
  }
}

module.exports = new NoteController()
