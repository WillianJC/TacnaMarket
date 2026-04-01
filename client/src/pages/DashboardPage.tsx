import Sidenav from '../components/layout/Sidenav';
import './DashboardPage.css';

export default function DashboardPage() {
  return (
    <div className="dashboard">
      <Sidenav />
      <main className="dashboard__main">
        {/* Contenido principal — listo para agregar más contenido */}
      </main>
    </div>
  );
}
