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

  const handleResponse = async () => {
    const token = localStorage.getItem('tacna_access_token')
    if (!token) return

    try {
      const profile = await getProfile(token)
      setStatusMessage(`Bienvenido ${profile.name}, autenticación exitosa.`)

      // PASO 3: Redirigir al home del dashboard
      setTimeout(() => {
        navigate('/dash/home');
      }, 1500); // Esperamos 1.5 segundos para que el usuario vea el mensaje de éxito

    } catch (error) {
      console.error(error)
      setStatusMessage('No se pudo obtener el perfil después del login.')
    }
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!agreeTerms) {
      setStatusMessage('Debes aceptar los términos y condiciones.')
      return
    }
    setIsLoading(true)
    setStatusMessage('')

    try {
      if (isLogin) {
        const data = await login({ username, password })
        localStorage.setItem('tacna_access_token', data.access_token)
        setStatusMessage('Login exitoso')
        await handleResponse() // Esto llamará a handleResponse y luego a navigate
      } else {
        const payload = { name, username, password, address }
        const data = await register(payload)
        localStorage.setItem('tacna_access_token', data.access_token)
        setStatusMessage('Registro exitoso. Has iniciado sesión.')
        // Redirige al home tras registrarse
        setTimeout(() => navigate('/dash/home'), 1500);
      }
    } catch (error: any) {
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

        {statusMessage && <p className="status-message">{statusMessage}</p>}

        <div className="switch-line">
          <span>{isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}</span>
          <button
            type="button"
            className="link-button"
            onClick={() => {
              setIsLogin(!isLogin)
              setStatusMessage('')
            }}
          >
            {isLogin ? 'REGISTRARSE' : 'LOGIN'}
          </button>
        </div>
      </form>
    </section>
  )
}

