import { Schema, model } from "mongoose";

const subscriptionSchema = new Schema(
  {
    hospitalManagerId: {
      type: Schema.Types.ObjectId,
      ref: "HospitalManager", // Reference to the Hospital Manager
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true, // This is required and should be set to 1 month after startDate
    },
    amount: {
      type: Number,
      required: true,
      default: 3999, // Default monthly subscription cost
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended", "Cancelled"],
      default: "Active",
    },
    isFirstMonthFree: {
      type: Boolean,
      default: true, // First month free by default
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to set endDate based on startDate (1 month later)
subscriptionSchema.pre("save", function (next) {
  if (this.isFirstMonthFree) {
    // Set the end date to one month after the start date for the first free month
    this.endDate = new Date(this.startDate);
    this.endDate.setMonth(this.startDate.getMonth() + 1); // 1 month from startDate
  } else {
    // For subsequent months, the endDate will be set to 1 month after the previous endDate
    this.endDate = new Date(this.startDate);
    this.endDate.setMonth(this.startDate.getMonth() + 1); // One month from startDate
  }

  next();
});

const Subscription = model("Subscription", subscriptionSchema);

export default Subscription;
