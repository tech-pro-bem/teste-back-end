import { IVolunteersRepository } from "../IVolunteersRepository";
import { Volunteer } from "../../entities/Volunteer";
import { Entity, Model } from "dynamodb-onetable";
import {
  ONE_TABLE_SCHEMA,
  onetable,
} from "../../../../shared/dynamodb/DynamoDBClient";

export class OneTableVolunteersRepository implements IVolunteersRepository {
  private volunteerEntity: Model<
    Entity<typeof ONE_TABLE_SCHEMA.models.Volunteer>
  >;

  constructor() {
    this.volunteerEntity =
      onetable.getModel<Entity<typeof ONE_TABLE_SCHEMA.models.Volunteer>>(
        "Volunteer"
      );
  }

  async update(updatedVolunteer: Partial<Volunteer>): Promise<Volunteer> {
    return this.volunteerEntity.update(updatedVolunteer);
  }

  async findById(id: string): Promise<Volunteer> {
    return this.volunteerEntity.get({ id });
  }

  async delete(id: string): Promise<void> {
    await this.volunteerEntity.remove({ id });
  }

  async create({
    email,
    fullName,
    id,
    password,
    phoneNumber,
  }: Volunteer): Promise<Volunteer> {
    const volunteer = await this.volunteerEntity.create({
      email,
      fullName,
      id,
      password,
      phoneNumber,
    });

    return volunteer;
  }

  async findByEmail(email: string): Promise<Volunteer> {
    const volunteer = await this.volunteerEntity.get(
      { email },
      { index: "email_index" }
    );

    return volunteer;
  }
}
