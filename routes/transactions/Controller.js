import Activity from "../../model/Activity.js";
import mongoose from "mongoose";

export const createTransaction = async (req, res, next) => {
  const user = res.locals.user;
  const { category, date, price, title } = req.body;
  try {
    // Get user id
    const id = user._id;
    // Find activity document with user id
    let activity = await Activity.findById(id);
    // Create a transaction object
    const transaction = { category, date, price, title };

    // Check if activity document was found
    // If not create a new document
    if (!activity) {
      activity = await Activity.create({
        _id: id,
        transactions: [transaction],
      });
    }
    // Append transaction object to found activity document and save
    else {
      activity.transactions.push(transaction);
      await activity.save();
    }

    res.status(201).json({
      message: "Activity successfully created",
      activity,
    });
  } catch (error) {
    res.status(401).json({
      message: "Activity not successfully created",
      error: error.message,
    });
  }
};
