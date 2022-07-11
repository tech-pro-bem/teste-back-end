import { v4 as uuidv4 } from 'uuid'

class Volunteer_Token {
  id?: string
  refresh_token: string
  volunteer_id: string
  expires_date: number
  created_at?: number

  private constructor ({ volunteer_id, refresh_token, expires_date }:Volunteer_Token) {
    this.id = uuidv4()
    this.created_at = Date.now()

    return Object.assign(this, {
      volunteer_id,
      expires_date,
      refresh_token
    })
  }

  static create ({ volunteer_id, refresh_token, expires_date }: Volunteer_Token): Volunteer_Token {
    const volunteer_token = new Volunteer_Token({ volunteer_id, refresh_token, expires_date })

    return volunteer_token
  }
}

export { Volunteer_Token }
