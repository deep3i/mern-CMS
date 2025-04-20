const Customer = require('../models/customer.js');

exports.addCustomer = async (req, res) => {
  const { name, email, phone, company } = req.body;
  try {
    const customer = new Customer({ name, email, phone, company });
    await customer.save();
    res.status(201).json({
      success: true,
      message: 'Customer added successfully',
      customer,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add customer', error });
  }
};

exports.getCustomers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  try {
    const customers = await Customer.find()
      .skip((page - 1) * limit)
      .limit(limit);
    const count = await Customer.countDocuments();

    res.json({
      success: true,
      message: 'Customers fetched successfully',
      customers,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch customers', error });
  }
};

exports.addComment = async (req, res) => {
  const { customerId, comment } = req.body;
  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found',
      });
    }

    customer.comments.push(comment);
    await customer.save();
    res.json({
      success: true,
      message: 'Comment added successfully',
      customer,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add comment', error });
  }
};
