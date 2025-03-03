const User = require('../models/User');

exports.getAllUser= async(req,res)=>{
    // res.status(201).json({ message: 'Ticket gets successfully'});
    try {
        const customers = await User.find({ role: 'customer' }); // Exclude password from the response
       console.log(customers);
       
       res.status(200).json(customers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching customers', error: error.message });
    }
}

// Get a specific customer by ID
exports.getUserById = async (req, res) => {
    try {
        const customer = await User.findOne({ _id: req.params.id, role: 'customer' }).select('-password');
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching customer', error: error.message });
    }
};

// Update a customer by ID
exports.updateUser = async (req, res) => {
    try {
        const updatedCustomer = await User.findOneAndUpdate(
            { _id: req.params.id, role: 'customer' }, 
            { $set: req.body }, 
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedCustomer) {
            return res.status(404).json({ message: 'Customer not found or not authorized' });
        }

        res.status(200).json({ message: 'Customer updated successfully', updatedCustomer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating customer', error: error.message });
    }
};

// Delete a customer by ID
exports.deleteUser = async (req, res) => {
    try {
        const deletedCustomer = await User.findOneAndDelete({ _id: req.params.id, role: 'customer' });

        if (!deletedCustomer) {
            return res.status(404).json({ message: 'Customer not found or not authorized' });
        }

        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting customer', error: error.message });
    }
};