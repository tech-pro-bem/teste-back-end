import { Volunteer } from 'src/entities/Volunteer'
import { document } from 'src/helpers/database/dynamodb-client'
import { IUpdateVolunteerRequestDTO } from 'src/modules/Volunteers/dtos/IUpdateVolunteerRequestDTO'
import { IVolunteersRepository } from 'src/modules/Volunteers/repositories/IVolunteersRepository'

class VolunteersRepository implements IVolunteersRepository {
  private repository: typeof document

  constructor () {
    this.repository = document
  }

  async create ({ name, email, password, id, created_at }: Volunteer): Promise<void> {
    await this.repository.put({
      TableName: 'volunteers',
      Item: {
        id,
        name,
        email,
        password,
        created_at
      }
    }).promise()
  }

  async checkIfVolunteerExistsByEmail (email: string): Promise<boolean> {
    const response = await this.repository.query({
      TableName: 'volunteers',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email
      }
    }).promise()

    if (response.Count !== 0) {
      return true
    }

    return false
  }

  async getOneVolunteer (email: string): Promise<Volunteer> {
    const response = await this.repository.query({
      TableName: 'volunteers',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email
      }
    }).promise()

    const volunteer = response.Items[0] as Volunteer

    return volunteer
  }

  async updateVolunteer (dataToUpdate: IUpdateVolunteerRequestDTO): Promise<void> {
    const params = {
      TableName: 'volunteers',
      Key: {
        email: dataToUpdate.email
      },
      UpdateExpression: 'set #nameToUpdate = :newName, password = :newPassword',
      ExpressionAttributeValues: {
        ':newName': dataToUpdate.newName,
        ':newPassword': dataToUpdate.newPassword
      },
      ExpressionAttributeNames: {
        '#nameToUpdate': 'name'
      },
      ReturnValues: 'UPDATED_NEW'
    }

    await this.repository.update(params).promise()
  }

  async deleteVolunteer (email: string): Promise<void> {
    await this.repository.delete({
      TableName: 'volunteers',
      Key: {
        email
      }
    }).promise()
  }
}

export { VolunteersRepository }
