const express =  require('express')
const router = express.Router() ;
const {createRdv,getAllRdvs,acceptRdv,deleteRdv,refuseRdv,getRdvById, getRdvByUser} = require('../controller/rdvController')
router.post('/:idUser' , createRdv )
router.get('/' , getAllRdvs )
router.get('/:id' , getRdvById )
router.patch('/accept/:id', acceptRdv);
router.patch('/refuse/:id', refuseRdv);
router.delete('/:id', deleteRdv);
router.get('/user/:id',getRdvByUser)
module.exports = router ; 