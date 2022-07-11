import { v4 as uuidv4 } from 'uuid'

class Volunteer {
  id?: string
  name: string
  email: string
  password: string
  created_at?: number

  private constructor ({ name, email, password }: Volunteer) {
    this.id = uuidv4()
    this.created_at = Date.now()

    return Object.assign(this, {
      name,
      email,
      password
    })
  }

  static create ({ name, email, password }: Volunteer): Volunteer {
    const user = new Volunteer({ name, email, password })

    return user
  }
}

export { Volunteer }
