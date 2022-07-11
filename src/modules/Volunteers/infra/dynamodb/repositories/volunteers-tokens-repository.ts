import { Volunteer_Token } from 'src/entities/Volunteer_Token'
import { document } from 'src/helpers/database/dynamodb-client'
import { IVolunteersTokensRepository } from 'src/modules/Volunteers/repositories/IVolunteersTokensRepository'

class VolunteersTokensRepository implements IVolunteersTokensRepository {
  private repository: typeof document

  constructor () {
    this.repository = document
  }

  async create (data: Volunteer_Token): Promise<void> {
    await this.repository.put({
      TableName: 'volunteers_token',
      Item: {
        id: data.id,
        refresh_token: data.refresh_token,
        volunteer_id: data.volunteer_id,
        expires_date: data.expires_date,
        created_at: data.created_at
      }
    }).promise()
  }

  async deleteVolunteerTokenById (id: string): Promise<void> {
    await this.repository.delete({
      TableName: 'volunteers_token',
      Key: {
        id
      }
    }).promise()
  }

  async findTokenByVolunteerId (volunteer_id: string): Promise<Volunteer_Token> {
    const response = await this.repository.query({
      TableName: 'volunteers_token',
      IndexName: 'VolunteerId',
      KeyConditionExpression: 'volunteer_id = :volunteer_id',
      ExpressionAttributeValues: {
        ':volunteer_id': volunteer_id
      }
    }).promise()

    const volunteer_token = response.Items[0] as Volunteer_Token

    return volunteer_token
  }

  async findByRefreshToken (refresh_token: string): Promise<Volunteer_Token> {
    const response = await this.repository.query({
      TableName: 'volunteers_token',
      IndexName: 'RefreshToken',
      KeyConditionExpression: 'refresh_token = :refresh_token',
      ExpressionAttributeValues: {
        ':refresh_token': refresh_token
      }
    }).promise()

    const volunteer_token = response.Items[0] as Volunteer_Token

    return volunteer_token
  }

  async findByVolunteerAndRefreshToken (volunteer_id: string, refresh_token: string): Promise<Volunteer_Token> {
    const response = await this.repository.query({
      TableName: 'volunteers_token',
      KeyConditionExpression: 'refresh_token = :refresh_token, volunteer_id = :volunteer_id',
      ExpressionAttributeValues: {
        ':refresh_token': refresh_token,
        ':volunteer_id': volunteer_id
      }
    }).promise()

    const volunteer_token = response.Items[0] as Volunteer_Token

    return volunteer_token
  }
}

export { VolunteersTokensRepository }
