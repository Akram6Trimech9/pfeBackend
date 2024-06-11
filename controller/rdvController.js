const Rdv = require('../models/rdv');
const user = require('../models/user')
const asyncHandler = require('express-async-handler');
const socket = require('socket.io-client')("http://localhost:3000/");
const Notification = require('../models/notifications')
const mongoose = require('mongoose');
const { sendEmailWithAttachments } = require('../services/emailService');

const createRdv = asyncHandler(async (req, res) => {
    const { idUser } = req.params;
    const rdv = await Rdv.create(req.body);
    const updateUser = await user.findByIdAndUpdate(
        idUser,
        { $push: { rendezVous: rdv._id } },
        { new: true }  
    );
    rdv.user = updateUser._id;  
    await rdv.save();  
    const admin = await user.findOne({ email: 'addmin@yahoo.com' });
    const notification = new Notification({
        message: "Le rendez-vous created",
        user: admin._id
    });

    try {
        const notification_created = await notification.save();
        if(notification_created){
         await  socket.emit('rdv-created', {clientId: admin._id, notification: notification_created});
        }
    } catch (err) {
        return res.status(400).json({ message: 'Error creating notification' });
    }
    
    if (updateUser && rdv) {
        res.status(201).json(rdv);
    } else {
        res.status(500).json({ message: "Failed to create rdv or update user" });
    }
});
const getAllRdvs = asyncHandler(async (req, res) => {
    const rdvs = await Rdv.find().populate('user');
    res.json(rdvs);
});

 const getRdvById = asyncHandler(async (req, res) => {
    const rdv = await Rdv.findById(req.params.id);
    if (!rdv) {
        res.status(404);
        throw new Error('Rdv not found');
    }
    res.json(rdv);
});

 const updateRdv = asyncHandler(async (req, res) => {
    const rdv = await Rdv.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!rdv) {
        res.status(404);
        throw new Error('Rdv not found');
    }
    res.json(rdv);
});

 const deleteRdv = asyncHandler(async (req, res) => {
    const rdv = await Rdv.findByIdAndDelete(req.params.id);
    if (!rdv) {
        res.status(404);
        throw new Error('Rdv not found');
    }
    res.json(rdv);
});

const getRdvByUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const rdvs = await Rdv.find({ user: id }).populate('user');
    if (!rdvs || rdvs.length === 0) {
        res.status(404);
        throw new Error('Appointments not found for the user');
    }
    res.json(rdvs);
});


const acceptRdv = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const rdv = await Rdv.findByIdAndUpdate(
      id,
      { status: 'accepted' },
      { new: true }
    ).populate('user');
     if (!rdv) {
      res.status(404);
      throw new Error('Rdv not found');
    }
    const path = "templates/rdv-created.html" ;
     await sendEmailWithAttachments(rdv.user.email ,'akramtrimech97@gmail.com','Rendez vous Accepted ', path ,null,"resetURL" )
    const notification = new Notification({
        message: "votre rendez-vous a été confirmé",
        user: rdv.user._id,
        rdv:rdv
    });
    notification.save().then(notification_created => {
        if(notification_created){
            console.log(notification_created, "created");
            socket.emit('rdv-confirmed', {clientId: rdv.user._id, notification: notification_created});
        }
        else {
            return res.status(400).json({ message: 'rdv confirm failed' });
        }            
    }).catch(err => {
        return res.status(400).json({ message: 'Error creating notification' });
    });
    
    res.json(rdv);
});

const refuseRdv = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const rdv = await Rdv.findByIdAndUpdate(
      id,
      { status: 'refused' },
      { new: true }
    );
    if (!rdv) {
      res.status(404);
      throw new Error('Rdv not found');
    }
    res.json(rdv);
});

module.exports = {
    createRdv,
    getAllRdvs,
    getRdvById,
    updateRdv,
    deleteRdv,
    acceptRdv,
    refuseRdv,
    getRdvByUser
};