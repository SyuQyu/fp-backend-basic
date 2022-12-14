const noteData = require('../data/data');

function getAllNotes(req, res) {
    res.status(200).json({
        "status": "success",
        "data": noteData
    });
}

function getNotesById(req, res) {
    const { id } = req.params;
    const data = noteData.filter((data, index) => {
        return data.id === Number(id);
    })
    if(data.length !== 0) {
        res.status(200).json({
            "status": "success",
            "data": data
        });
    } else {
        res.status(404).json({
            "status": "fail",
            "message": "Catatan tidak ditemukan",
        });
    }
}

function createNote(req, res) {
    const { title, body } = req.body;
    const nextId = noteData[noteData.length - 1]?.id + 1
    const date = new Date().toISOString();

    if(title && body) {
        try {
            payload = {
                id: nextId,
                title: title,
                body: body,
                createdAt: date,
                updatedAt: date
            }
            noteData.push(payload);
            res.status(201).json({
                "status": "success",
                "message": "catatan berhasil ditambahkan",
                "data": {
                    "id": payload.id
                }
            })
        } catch (e) {
            res.status(404).json({
                Error : "Something Wrong!!"
            })
        }

    } else {
        res.status(404).json({
            Error : "Title or Body is Missing"
        })
    }
}

function updateNote(req, res) {
    const { id } = req.params;
    const { title, body } = req.body;
    const date = new Date().toISOString();
    if(title && body) {
        try {
            noteData.map((data, index) => {
                if(data.id == id) {
                    console.log("masuk sini")
                    noteData[index] = {
                        id : noteData[index]?.id,
                        title: title,
                        body: body,
                        createdAt: noteData[index]?.createdAt,
                        updatedAt: date
                    }
                    res.status(200).json({
                        "status": "success",
                        "message": "catatan berhasil diperbarui",
                        "data": {
                            "id": id
                        }
                    })
                }
            })
        } catch (e) {
            res.status(404).json({
                "status": "Error",
                "message": "Something Wrong!!",
            })
        }

    } else {
        res.status(404).json({
            Error : "Title or Body is Missing"
        })
    }
}

function deleteNote(req, res) {
    const { id } = req.params;
    noteData.map((data, index) => {
        if(data.id == id) {
            noteData.splice(index, 1)
            res.status(200).json({
                "status": "success",
                "message": "Catatan berhasil dihapus",
            })
        }
    })
}
module.exports = {
    getAllNotes,
    getNotesById,
    createNote,
    updateNote,
    deleteNote
}