import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  appId: {
    type: String,
  },
  dateTime: {
    type: String,
  },
  propertyname: {
    type: String,
  },
  email: {
    type: String,
  },
  place: {
    type: String,
  },
  area: {
    type: String,
  },
  bedrooms: {
    type: String,
  },
  bathrooms: {
    type: String,
  },
  colleges: {
    type: String,
  },
  hospital: {
    type: String,
  },
});

const propertyData = mongoose.model("propertyData", propertySchema);
export { propertyData };
