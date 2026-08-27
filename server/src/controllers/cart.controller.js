import Cart from "../models/Cart.js";
import Cycle from "../models/Cycle.js";

const addToCart = async (req, res) => {
  try {
    const { cycleId } = req.params;
    const { quantity = 1 } = req.body;

    // 1. Validate quantity
    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    // 2. Find cycle
    const cycle = await Cycle.findById(cycleId);

    if (!cycle) {
      return res.status(404).json({
        success: false,
        message: "Cycle not found",
      });
    }

    // 3. Check stock
    if (cycle.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock",
      });
    }

    // 4. Find user's cart
    let cart = await Cart.findOne({
      user: req.user._id,
    });

    // 5. Create cart if doesn't exist
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [
          {
            cycle: cycle._id,
            quantity,
            price: cycle.price,
          },
        ],
      });

      return res.status(201).json({
        success: true,
        message: "Cycle added to cart",
        cart,
      });
    }

    // 6. Check if cycle already exists
    const existingItem = cart.items.find(
      (item) => item.cycle.toString() === cycleId
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;

      if (newQuantity > cycle.stock) {
        return res.status(400).json({
          success: false,
          message: "Requested quantity exceeds available stock",
        });
      }

      existingItem.quantity = newQuantity;

      // Keep current database price
      existingItem.price = cycle.price;
    } else {
      cart.items.push({
        cycle: cycle._id,
        quantity,
        price: cycle.price,
      });
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cycle added to cart",
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.cycle");

    if (!cart) {
      return res.status(200).json({
        success: true,
        items: [],
        totalAmount: 0,
      });
    }

    let totalAmount = 0;

    const items = cart.items.map((item) => {
      const subtotal = item.price * item.quantity;

      totalAmount += subtotal;

      return {
        _id: item._id,
        cycle: item.cycle,
        quantity: item.quantity,
        price: item.price,
        subtotal,
      };
    });

    return res.status(200).json({
      success: true,
      items,
      totalAmount,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCartQuantity = async (req, res) => {
  try {
    const { cycleId } = req.params;
    const { quantity } = req.body;

    // 1. Validate quantity
    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    // 2. Find cycle
    const cycle = await Cycle.findById(cycleId);

    if (!cycle) {
      return res.status(404).json({
        success: false,
        message: "Cycle not found",
      });
    }

    // 3. Check stock
    if (quantity > cycle.stock) {
      return res.status(400).json({
        success: false,
        message: "Quantity exceeds available stock",
      });
    }

    // 4. Find cart
    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // 5. Find item
    const item = cart.items.find(
      (item) => item.cycle.toString() === cycleId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Cycle not found in cart",
      });
    }

    // 6. Update
    item.quantity = quantity;
    item.price = cycle.price;

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart quantity updated",
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { cycleId } = req.params;

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const itemExists = cart.items.some(
      (item) => item.cycle.toString() === cycleId
    );

    if (!itemExists) {
      return res.status(404).json({
        success: false,
        message: "Cycle not found in cart",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.cycle.toString() !== cycleId
    );

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cycle removed from cart",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
};