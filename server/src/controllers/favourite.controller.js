import Favourite from "../models/Favourite.js";
import Cycle from "../models/Cycle.js";

const addFavourite = async (req, res) => {
  try {
    const { cycleId } = req.params;

    // 1. Check cycle exists
    const cycle = await Cycle.findById(cycleId);

    if (!cycle) {
      return res.status(404).json({
        success: false,
        message: "Cycle not found",
      });
    }

    // 2. Find user's favourite document
    let favourite = await Favourite.findOne({
      user: req.user._id,
    });

    // 3. Create favourite document if doesn't exist
    if (!favourite) {
      favourite = await Favourite.create({
        user: req.user._id,
        cycles: [cycleId],
      });

      return res.status(201).json({
        success: true,
        message: "Cycle added to favourites",
        favourite,
      });
    }

    // 4. Check already favourite
    const alreadyFavourite = favourite.cycles.some(
      (id) => id.toString() === cycleId
    );

    if (alreadyFavourite) {
      return res.status(409).json({
        success: false,
        message: "Cycle already in favourites",
      });
    }

    // 5. Add cycle
    favourite.cycles.push(cycleId);

    await favourite.save();

    return res.status(200).json({
      success: true,
      message: "Cycle added to favourites",
      favourite,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getFavourites = async (req, res) => {
  try {
    const favourite = await Favourite.findOne({
      user: req.user._id,
    }).populate("cycles");
// .populate("cycles")
//मुळे फक्त Cycle IDs न येता पूर्ण cycle information मिळेल.
    if (!favourite) {
      return res.status(200).json({
        success: true,
        count: 0,
        cycles: [],
      });
    }

    return res.status(200).json({
      success: true,
      count: favourite.cycles.length,
      cycles: favourite.cycles,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const removeFavourite = async (req, res) => {
  try {
    const { cycleId } = req.params;

    const favourite = await Favourite.findOne({
      user: req.user._id,
    });

    if (!favourite) {
      return res.status(404).json({
        success: false,
        message: "Favourite list not found",
      });
    }

    const cycleExists = favourite.cycles.some(
      (id) => id.toString() === cycleId
    );

    if (!cycleExists) {
      return res.status(404).json({
        success: false,
        message: "Cycle is not in favourites",
      });
    }

    favourite.cycles = favourite.cycles.filter(
      (id) => id.toString() !== cycleId
    );

    await favourite.save();

    return res.status(200).json({
      success: true,
      message: "Cycle removed from favourites",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  addFavourite,
  getFavourites,
  removeFavourite,
};
