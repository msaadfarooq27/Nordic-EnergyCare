const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

async function request(endpoint, options = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    })

    const data= await response.json();

    if(!response.ok) {
        const error =  new Error(data.message || 'API request failed');
        error.status =  response.status;
        throw error;
    }

    return data;
}

export function registerUser(name, email, password){
return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({name, email, password}),
});
}

export function loginUser(email, password){
return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({email, password}),
});
}

export function logoutUser(){
return request('/auth/logout', {method: 'POST'});
}

export function getMe(){
return request('/auth/me');
}

export function getCustomerProfile(){
return request('/customer/profile');
}

export function createCustomerProfile(city){
return request('/customer/profile', {
    method: 'POST',
    body: JSON.stringify({city}),
});
}