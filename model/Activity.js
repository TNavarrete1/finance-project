import Mongoose from "mongoose";
const Schema = Mongoose.Schema;

const ActivitySchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  transactions: [
    {
      category: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },
  ],
});

export default Mongoose.model("activity", ActivitySchema);
