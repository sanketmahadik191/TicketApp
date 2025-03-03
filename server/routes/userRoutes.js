const express = require('express');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');
const { getAllUser, getUserById, updateUser, deleteUser} = require('../controllers/userController');

const router = express.Router();

router.get('/all', authenticateUser, authorizeRoles('admin'), getAllUser); 
router.get('/:id', authenticateUser, getUserById);
router.put('/:id', authenticateUser, authorizeRoles('admin'), updateUser);
router.delete('/:id', authenticateUser, authorizeRoles('admin'), deleteUser);
module.exports = router;