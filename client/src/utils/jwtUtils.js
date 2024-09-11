export const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const decoded = JSON.parse(jsonPayload);
    // console.log('Decoded JWT:', decoded);  // Check if first_name is here

    return decoded;
  } catch (error) {
    console.error('Failed to parse JWT:', error);
    return null;
  }
};
