const express =  require('express')
const router = express.Router() ;
const {createCategory,getAllCategories, deleteCategory} = require('../controller/CategoryActuality')
router.post('/' , createCategory )
router.get('/' , getAllCategories )
router.delete('/:id' , deleteCategory )

module.exports = router ; 