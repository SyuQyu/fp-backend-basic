const express = require('express');
const {
    getAllNotes,
    getNotesById,
    createNote,
    updateNote,
    deleteNote
} = require('../controller');


const router = express.Router();

router.get('/', getAllNotes);
router.get('/:id', getNotesById);
router.post('/create', createNote);
router.put('/update/:id', updateNote)
router.delete('/delete/:id', deleteNote);

module.exports = router;