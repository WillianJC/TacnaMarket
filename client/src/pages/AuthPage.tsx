import AuthIllustration from '../components/auth/AuthIllustration'
import AuthForm from '../components/auth/AuthForm'

export default function AuthPage() {
  return (
    <main className="auth-page">
      <div className="auth-card">
        <AuthIllustration />
        <div className="auth-main">
          <AuthForm />
        </div>
      </div>
    </main>
  )
}
