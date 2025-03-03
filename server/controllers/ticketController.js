const Ticket = require('../models/Ticket');

// Create Ticket
exports.createTicket = async (req, res) => {
    try {
        const { title, notes } = req.body;
        const { customerId } = req.query; // Get customer ID from query parameters

        if (!customerId) {
            return res.status(400).json({ message: 'Customer ID is required' });
        }

        const newTicket = new Ticket({
            title,
            notes,
            customerId,
            status: 'pending'
        });

        await newTicket.save();

        res.status(201).json({ message: 'Ticket created successfully', ticket: newTicket });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating ticket', error: error.message });
    }
};
// Get all tickets (Admin only)
exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find().populate('customerId', 'name email'); // Populate customer details
        res.status(200).json(tickets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching tickets', error: error.message });
    }
};

// Get tickets for a specific user
exports.getUserTickets = async (req, res) => {
    try {
        const { customerId } = req.params;

        const userTickets = await Ticket.find({ customerId: customerId });

        if (userTickets.length === 0) {
            return res.status(404).json({ message: 'No tickets found for this user' });
        }

        res.status(200).json(userTickets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user tickets', error: error.message });
    }
};

// Update Ticket
exports.updateTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, notes, status, remark } = req.body;

        // Check if status is valid
        const validStatuses = ['pending', 'active', 'closed'];
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        // Find and update the ticket
        const updatedTicket = await Ticket.findByIdAndUpdate(
            id,
            {
                ...(title && { title }),
                ...(notes && { notes }),
                ...(status && { status }),
                ...(remark && { remark }),
                updatedAt: Date.now() // Update updatedAt field
            },
            { new: true, runValidators: true }
        );

        if (!updatedTicket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        res.status(200).json({ message: 'Ticket updated successfully', updatedTicket });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating ticket', error: error.message });
    }
};