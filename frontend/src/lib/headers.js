import Cookies from 'js-cookie' 
import Auth from './auth'

const csrftoken = Cookies.get('csrftoken')

export const headers = includeToken => {
  
  const common =  {
    'X-CSRF-TOKEN': csrftoken
  }

  if (!includeToken) return { common }
  
  return { 
    ...common, 
    headers: { 
      Authorization: `Bearer ${Auth.getToken()}` 
    } 
  }
}