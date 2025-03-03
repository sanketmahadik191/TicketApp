const express = require('express');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');
const { createTicket, getAllTickets, getUserTickets, updateTicket } = require('../controllers/ticketController');

const router = express.Router();

// Route to create a ticket (Only authenticated customers can create)
router.post('/create', authenticateUser, authorizeRoles('customer'), createTicket);

// Get all tickets (Admin only)
router.get('/all', authenticateUser, authorizeRoles('admin','agent'), getAllTickets);

// Get tickets for a specific user
router.get('/user/:customerId', authenticateUser, getUserTickets);

// Update a ticket (Admin & Assigned Customer)
router.put('/update/:id', authenticateUser,authorizeRoles('admin','agent'), updateTicket);

module.exports = router;
