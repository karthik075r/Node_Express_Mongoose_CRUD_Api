import mongoose from "mongoose";

abstract class BaseRepository {
  model(): any {}

  // public async add(info: any, id = null) {
  //   let model = id ? this.model() : this.model();

  //   return await model.collection.insertOne(info);
  // }
  async add(data: any) {
    const model = this.model();

    const obj = new model(data);
    await obj.save();
    return obj;
  }
  public async addBatch(info: any) {
    let model = this.model();
    return await model.collection.insert(info);
  }

  public async find(predicate = null, projection = null) {
    let model = this.model();

    if (projection) {
      let objs = await model.find(predicate, projection);
      return objs;
    } else {
      let objs = await model.find(predicate);
      return objs;
    }
  }

  public async findOneAndPopulate(predicate: any, keysToPopulate: any, attributesOfKeysToPopulate: any) {
    let model;

    model = this.model();
    let obj = await model.findOne(predicate).populate(keysToPopulate, attributesOfKeysToPopulate);
    return obj;
  }

  public async findOneAndUpdate(predicate: any, info: any) {
    let model = this.model();

    let obj = await model.findOneAndUpdate(predicate, info);
    return obj;
  }
  public async findOne(predicate: any) {
    let model;

    model = this.model();

    let obj = await model.findOne(predicate);
    return obj;
  }
  public async remove(predicate: any) {
    let model = this.model();
    let res = await model.deleteMany(predicate);
    if (res.deletedCount >= 1) {
      return "Records deleted Successfully";
    } else {
      return "Error";
    }
  }
}

export default BaseRepository;
