import Cycle from "../models/Cycle.js";
import { cycleSchema } from "../validators/cycle.validator.js";

// GET /api/cycles
// GET /api/cycles?category=Mountain
const getCycles = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = {};

    if (category) {
      filter.category = category.trim();
    }

    const cycles = await Cycle.find(filter)
      .sort({ createdAt: -1 })
      .limit(100);

    const totalCycles = cycles.length;

    if (totalCycles === 0) {
      return res.status(200).json({
        success: true,
        count: 0,
        message: "No cycles found",
        cycles: [],
      });
    }

    return res.status(200).json({
      success: true,
      count: totalCycles,
      cycles,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET /api/cycles/:id
const getCycleById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Cycle ID is required",
      });
    }

    const cycle = await Cycle.findById(id).lean();

    if (!cycle) {
      return res.status(404).json({
        success: false,
        message: "Cycle not found",
      });
    }

    return res.status(200).json({
      success: true,
      cycle,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// POST /api/cycles
const createCycle = async (req, res) => {
  try {
    const cycleData = {
      ...req.body,
    };

    if (cycleData.name) {
      cycleData.name = cycleData.name.trim();
    }

    if (cycleData.brand) {
      cycleData.brand = cycleData.brand.trim();
    }

    if (cycleData.category) {
      cycleData.category = cycleData.category.trim();
    }

    if (cycleData.description) {
      cycleData.description = cycleData.description.trim();
    }

    if (req.file) {
      cycleData.image = req.file.filename;
    }

    const { error, value } = cycleSchema.validate(cycleData);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const cycle = await Cycle.create(value);

    return res.status(201).json({
      success: true,
      message: "New cycle created successfully",
      cycle,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// PUT /api/cycles/:id
const updateCycle = async (req, res) => {
  try {
    const { id } = req.params;

    // Check cycle exists
    
    const existingCycle = await Cycle.findById(id);

    if (!existingCycle) {
      return res.status(404).json({
        success: false,
        message: "Cycle not found",
      });
    }

    // Prepare update data

    const cycleData = {
      ...req.body,
    };

    // New image selected

    if (req.file) {
      cycleData.image = req.file.filename;
    }

    // Validate update data

    const { error, value } =
      updateCycleSchema.validate(cycleData);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    // Update cycle
   
    const cycle = await Cycle.findByIdAndUpdate(
      id,
      value,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Cycle updated successfully",
      cycle,
    });
  } catch (error) {
    console.error("Update cycle error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// DELETE /api/cycles/:id
const deleteCycle = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Cycle ID is required",
      });
    }

    const cycle = await Cycle.findByIdAndDelete(id);

    if (!cycle) {
      return res.status(404).json({
        success: false,
        message: "Cycle not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cycle deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export {
  getCycles,
  getCycleById,
  createCycle,
  updateCycle,
  deleteCycle,
};