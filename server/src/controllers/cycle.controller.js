import Cycle from "../models/Cycle.js";
import { cycleSchema , updateCycleSchema } from "../validators/cycle.validator.js";
// GET /api/cycles
// GET /api/cycles?category=Mountain
const getCycles = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    const cycles = await Cycle.find(filter);

    return res.status(200).json({
      success: true,
      count: cycles.length,
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

    const cycle = await Cycle.findById(id);

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


// create cycle 
const createCycle = async (req, res) => {
  try {
    const cycleData = {
      ...req.body,
    };

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
      message: "Cycle created successfully",
      cycle,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// update cycle
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


// delete cycle 
const deleteCycle = async (req, res) => {
  try {
    const { id } = req.params;

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
  deleteCycle
};