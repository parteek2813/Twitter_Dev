import Like from "../models/likes.js";
import CrudRepository from "./crud-repository.js";

class LikeRepository extends CrudRepository {
  constructor() {
    super(Like);
  }
}

export default LikeRepository;
