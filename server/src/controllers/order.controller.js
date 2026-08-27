import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Cycle from "../models/Cycle.js";

const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    // 1. Validate items
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please select at least one item",
      });
    }

    // 2. Find user's cart
    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    let orderItems = [];
    let totalAmount = 0;

    // 3. Validate selected items
    for (const selectedItem of items) {
      const cartItem = cart.items.find(
        (item) =>
          item.cycle.toString() === selectedItem.cycleId
      );

      if (!cartItem) {
        return res.status(400).json({
          success: false,
          message: "Selected item is not available in cart",
        });
      }

      const quantity = selectedItem.quantity;

      if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({
          success: false,
          message: "Invalid quantity",
        });
      }

      // 4. Get latest cycle from DB
      const cycle = await Cycle.findById(
        selectedItem.cycleId
      );

      if (!cycle) {
        return res.status(404).json({
          success: false,
          message: "Cycle not found",
        });
      }

      // 5. Check stock
      if (cycle.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: `${cycle.name} has insufficient stock`,
        });
      }

      // 6. Use current DB price
      const subtotal = cycle.price * quantity;

      totalAmount += subtotal;

      orderItems.push({
        cycle: cycle._id,
        quantity,
        price: cycle.price,
      });
    }

    // 7. Create order
   const order = await Order.create({
    user: req.user._id,
    items: orderItems,
    totalAmount,
    paymentStatus: "paid",
    orderStatus: "confirmed",
  });

    // 8. Reduce stock
    for (const item of orderItems) {
      await Cycle.findByIdAndUpdate(
        item.cycle,
        {
          $inc: {
            stock: -item.quantity,
          },
        }
      );
    }

    // 9. Remove purchased items from cart
    const selectedCycleIds = items.map(
      (item) => item.cycleId
    );

    cart.items = cart.items.filter(
      (item) =>
        !selectedCycleIds.includes(
          item.cycle.toString()
        )
    );

    await cart.save();

    return res.status(201).json({
      success: true,
      message: "Order placed successfully. Payment successful.",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//GET /api/orders   

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    })
      .populate("items.cycle")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET /api/orders/:id
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      _id: id,
      user: req.user._id,
    }).populate("items.cycle");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createOrder,
  getOrders,
  getOrderById,
};  


/**
 * 1. Register
      ↓
2. Login
      ↓
3. GET /api/cycles
      ↓
4. POST /api/cart/:cycleId
      ↓
5. GET /api/cart
      ↓
6. POST /api/orders
      ↓
7. GET /api/orders
      ↓
8. GET /api/orders/:orderId
 */