const Documents = require('../models/documents');

exports.createDocument = async (req, res) => {
    try {
        const { title, category, description } = req.body;
        const files = req.files ? req.files.map(file => file.path) : []; 
        const document = new Documents({ title, category, description, files });
        await document.save();
        res.status(201).json(document);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

 exports.getAllDocuments = async (req, res) => {
    try {
        const documents = await Documents.find();
        res.json(documents);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

 exports.getDocumentById = async (req, res, next) => {
    let document;
    try {
        document = await Documents.findById(req.params.id);
        if (document == null) {
            return res.status(404).json({ message: 'Document not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.document = document;
    next();
};

 exports.updateDocument = async (req, res) => {
    if (req.body.title != null) {
        res.document.title = req.body.title;
    }
    if (req.body.category != null) {
        res.document.category = req.body.category;
    }
    if (req.body.description != null) {
        res.document.description = req.body.description;
    }
    if (req.body.files != null) {
        res.document.files = req.body.files.map(file => file.path);
    }
    try {
        const updatedDocument = await res.document.save();
        res.json(updatedDocument);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

 exports.deleteDocument = async (req, res) => {
    try {
        await res.document.remove();
        res.json({ message: 'Document deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = exports;
