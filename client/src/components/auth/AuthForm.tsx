import { useState, type ChangeEvent, type FormEvent } from 'react'
import {
  LockClosedIcon,
  UserIcon,
  MapPinIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline'
import { getProfile, login, register } from '../../services/authService'
import { useNavigate } from 'react-router-dom';

type InputProps = {
  id: string
  label: string
  type: string
  placeholder: string
  value: string
  Icon: typeof UserIcon
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

function AuthInput({ id, label, type, placeholder, value, Icon, onChange }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <div className="input-wrapper">
        <Icon className="input-icon" aria-hidden="true" />
        <input
          id={id}
          type={type}
          className="input"
          placeholder={placeholder}
          autoComplete="off"
          value={value}
          onChange={onChange}
          required
        />
      </div>
    </div>
  )
}

export default function AuthForm() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  
  // PASO 1: Nuevo estado para controlar si el mensaje es de error o éxito
  const [isError, setIsError] = useState(false);

  const handleResponse = async () => {
    const token = localStorage.getItem('tacna_access_token')
    if (!token) return

    try {
      const profile = await getProfile(token)
      const displayName = profile.name || profile.username || profile.email || 'Usuario';
      
      setIsError(false); // Es un éxito
      setStatusMessage(`Bienvenido ${displayName}, autenticación exitosa.`)

      setTimeout(() => {
        navigate('/dash/home');
      }, 1500); 

    } catch (error) {
      console.error(error)
      setIsError(true); // Es un error
      setStatusMessage('No se pudo obtener el perfil después del login.')
    }
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!agreeTerms) {
      setIsError(true); // <--- Cambio aquí
      setStatusMessage('Debes aceptar los términos y condiciones.')
      return
    }
    setIsLoading(true)
    setStatusMessage('')

    try {
      if (isLogin) {
        const data = await login({ username, password })
        localStorage.setItem('tacna_access_token', data.access_token)
        
        setIsError(false); // <--- Éxito
        setStatusMessage('Login exitoso')
        await handleResponse() 
      } else {
        const payload = { name, username, password, address }
        const data = await register(payload)
        localStorage.setItem('tacna_access_token', data.access_token)
        
        setIsError(false); // <--- Éxito
        setStatusMessage('Registro exitoso. Has iniciado sesión.')
        setTimeout(() => navigate('/dash/home'), 1500);
      }
    } catch (error: any) {
      setIsError(true); // <--- Error de red o credenciales
      setStatusMessage(error.message || 'Error de autenticación')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="auth-form-card">
      <div className="brand-header">
        <div className="brand-badge">
          <ShoppingBagIcon className="brand-icon" aria-hidden="true" />
        </div>
        <h1 className="brand-title">Tacna Market</h1>
        <p className="brand-subtitle">{isLogin ? 'Bienvenido de nuevo' : 'Crea tu cuenta ahora'}</p>
      </div>

      <form className="form-layout" onSubmit={submit}>
        {isLogin ? (
          <>
            <AuthInput
              id="username"
              label="Usuario"
              type="text"
              placeholder="usuario"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              Icon={UserIcon}
            />
            <AuthInput
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              Icon={LockClosedIcon}
            />
          </>
        ) : (
          <>
            <div className="grid-2cols">
              <AuthInput
                id="nombre"
                label="Nombre"
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(event) => setName(event.target.value)}
                Icon={UserIcon}
              />
              <AuthInput
                id="usuario"
                label="Usuario"
                type="text"
                placeholder="Ej: jperez"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                Icon={UserIcon}
              />
            </div>
            <div className="grid-2cols">
              <AuthInput
                id="new-password"
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                Icon={LockClosedIcon}
              />
              <AuthInput
                id="direccion"
                label="Dirección de Entrega"
                type="text"
                placeholder="Av. Principal 123"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                Icon={MapPinIcon}
              />
            </div>
          </>
        )}

        <label className="checkbox-label" htmlFor="terms">
          <input
            id="terms"
            type="checkbox"
            className="checkbox"
            checked={agreeTerms}
            onChange={(event) => setAgreeTerms(event.target.checked)}
          />
          <span>Acepto los términos y condiciones</span>
        </label>

        <button className="primary-button" type="submit" disabled={isLoading}>
          {isLoading ? 'Procesando...' : isLogin ? 'LOGIN' : 'REGISTRARSE'}
        </button>

        {/* PASO 2: Aquí aplicamos la clase dinámica success o error */}
        {statusMessage && (
          <p className={`status-message ${isError ? 'error' : 'success'}`}>
            {statusMessage}
          </p>
        )}

        <div className="switch-line">
          <span>{isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}</span>
          <button
            type="button"
            className="link-button"
            onClick={() => {
              setIsLogin(!isLogin)
              setStatusMessage('')
              setIsError(false) // Limpiamos el error al cambiar de modo
            }}
          >
            {isLogin ? 'REGISTRARSE' : 'LOGIN'}
          </button>
        </div>
      </form>
    </section>
  )
}