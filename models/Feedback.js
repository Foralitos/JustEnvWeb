import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

const feedbackSchema = mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      private: true,
      required: true,
    },
    message: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

feedbackSchema.plugin(toJSON);

export default mongoose.models.Feedback ||
  mongoose.model("Feedback", feedbackSchema);
