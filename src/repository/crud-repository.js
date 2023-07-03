import Tweet from "../models/tweet.js";
import User from "../models/user.js";

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    // here is the error
    try {
      const result = await this.model.create(data);
      return result;
    } catch (error) {
      console.log("Something went wrong in the crud repo");
      throw error;
    }
  }
  async destroy(id) {
    try {
      const result = await this.model.findByIdAndDelete(id);
      return result;
    } catch (error) {
      console.log("Something went wrong in the crud repo");
      throw error;
    }
  }
  async get(id) {
    try {
      const result = await this.model.findById(id);
      return result;
    } catch (error) {
      console.log("Something went wrong in the crud repo");
      throw error;
    }
  }
  async getAll() {
    try {
      const result = await this.model.find({});
      return result;
    } catch (error) {
      console.log("Something went wrong in the crud repo");
      throw error;
    }
  }
  async update(id, data) {
    try {
      const result = await this.model.findByIdAndUpdate(id, data, {
        new: true,
      });
      return result;
    } catch (error) {
      console.log("Something went wrong in the crud repo");
      throw error;
    }
  }
}

export default CrudRepository;
