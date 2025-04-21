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

exports.addComments = async (req, res) => {
  const commentMap = req.body;

  try {
    const customerIds = Object.keys(commentMap);

    for (const customerId of customerIds) {
      const comment = commentMap[customerId];

      const customer = await Customer.findById(customerId);

      if (!customer) {
        console.warn(`Customer not found: ${customerId}`);
        continue;
      }

      customer.comments.push(comment);
      await customer.save();
    }

    res.json({
      success: true,
      message: 'All comments saved successfully',
    });
  } catch (error) {
    console.error("Error saving comments:", error);
    res.status(500).json({
      success: false,
      message: 'Failed to save comments',
      error,
    });
  }
};

