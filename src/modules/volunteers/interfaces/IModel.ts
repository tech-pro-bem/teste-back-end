import mongoose from "mongoose";

interface IModel {
  schema: mongoose.Schema<any>
  model: mongoose.Model<any, {}>
}

export { IModel };
