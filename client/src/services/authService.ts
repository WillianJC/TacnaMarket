const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export type AuthCredentials = {
  username: string;
  password: string;
};

export type RegisterPayload = AuthCredentials & {
  name: string;
  address: string;
};

export type AuthResponse = {
  user: {
    id: string;
    username: string;
    name: string;
    role: string;
  };
  access_token: string;
};

export async function login(payload: AuthCredentials): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || 'Error al iniciar sesión');
  }

  return res.json();
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || 'Error al registrar usuario');
  }

  return res.json();
}

export async function getProfile(token: string): Promise<any> {
  const res = await fetch(`${API_URL}/auth/profile`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || 'Error al obtener perfil');
  }

  return res.json();
}
