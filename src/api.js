export const API_URL = 'https://huergo.com.br/lot-api/json';

export function TOKEN_POST (body) {
  return {
    url: API_URL + '/jwt-auth/v1/token',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  }
}

export function TOKEN_VALIDATE_POST (token) {
  return {
    url: API_URL + '/jwt-auth/v1/token/validate',
    options: {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  }
}

export function USER_GET (token) {
  return {
    url: API_URL + '/api/user',
    options: {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }
  }
}

export function USER_POST (body) {
  return {
    url: API_URL + '/api/user',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  }
}

export function PHOTO_POST (formData, token) {
  return {
    url: API_URL + '/api/photo',
    options: {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    }
  }
}

export function PHOTO_GET () {
  return {
    url: API_URL + '/api/photo',
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  }
}

export const PHOTO_EDIT = (formData, token, postId) => {
  return {
      url: API_URL + `/api/photo/edit?post_id=${postId}`,
      options: {
          method: 'POST',
          headers: {
              Authorization: `Bearer ${token}`,
          },
          body: formData,
      },
  };
};
