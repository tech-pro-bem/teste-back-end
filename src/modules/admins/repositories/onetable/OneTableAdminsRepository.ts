import { Entity, Model } from "dynamodb-onetable";
import { onetable, ONE_TABLE_SCHEMA } from "src/shared/dynamodb/DynamoDBClient";
import { Admin } from "../../entities/Admin";
import { IAdminsRepository } from "../IAdminsRepository";

export class OneTableAdminsRepository implements IAdminsRepository {
  private adminEntity: Model<Entity<typeof ONE_TABLE_SCHEMA.models.Volunteer>>;

  constructor() {
    this.adminEntity =
      onetable.getModel<Entity<typeof ONE_TABLE_SCHEMA.models.Volunteer>>(
        "Admin"
      );
  }

  async findByEmail(email: string): Promise<Admin> {
    return this.adminEntity.get({ email }, { index: "email_index" });
  }

  async findById(id: string): Promise<Admin> {
    return this.adminEntity.get({ id });
  }
}
