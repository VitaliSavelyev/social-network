
export interface Admin {
  email: string,
  password: string
  returnSecureToken: boolean
}
export interface FBAuthResponse {
  idToken?: string
  expiresIn?: string
}
export interface User {
  id?: string
  name: string,
  surname: string,
  birthday: Date,
  country: string,
  city: string,
  educations: [],
  about: string,
  avatar?: any
}
export interface formEducation {
  educationTitle: string
  dateEntry: Date,
  dateEnd:  Date
}

