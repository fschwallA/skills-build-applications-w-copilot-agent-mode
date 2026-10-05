import { useEffect, useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'
import './App.css'

const sections = [
  { path: '/', label: 'Overview' },
  { path: '/activities', label: 'Activities' },
  { path: '/teams', label: 'Teams' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/workouts', label: 'Workouts' },
]

function ApiStatus() {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking')

  useEffect(() => {
    fetch('/api/health')
      .then((response) => {
        if (!response.ok) throw new Error('API request failed')
        return response.json()
      })
      .then(() => setStatus('online'))
      .catch(() => setStatus('offline'))
  }, [])

  const label = {
    checking: 'Checking API',
    online: 'API online',
    offline: 'API offline',
  }[status]

  return (
    <span className={`api-status api-status--${status}`}>
      <span className="api-status__dot" />
      {label}
    </span>
  )
}

function Dashboard() {
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">YOUR MOVEMENT, AT A GLANCE</p>
          <h1>Overview</h1>
        </div>
        <NavLink className="btn btn-dark" to="/activities">
          Log an activity <span aria-hidden="true">+</span>
        </NavLink>
      </div>

      <section className="row g-3 mb-4" aria-label="Weekly stats">
        <div className="col-12 col-md-4">
          <div className="stat-panel stat-panel--mint">
            <span className="stat-label">ACTIVITIES THIS WEEK</span>
            <strong>0</strong>
            <span className="stat-footnote">Your week starts here</span>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="stat-panel stat-panel--yellow">
            <span className="stat-label">TEAM POINTS</span>
            <strong>0</strong>
            <span className="stat-footnote">Ready to earn</span>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="stat-panel stat-panel--coral">
            <span className="stat-label">CURRENT STREAK</span>
            <strong>0 <small>days</small></strong>
            <span className="stat-footnote">One activity starts it</span>
          </div>
        </div>
      </section>

      <section className="dashboard-lower">
        <div className="content-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">KEEP YOUR MOMENTUM</p>
              <h2>Recent activities</h2>
            </div>
            <NavLink to="/activities" className="text-link">View all</NavLink>
          </div>
          <div className="empty-state">
            <span className="empty-state__mark" aria-hidden="true">+</span>
            <div>
              <h3>No activities yet</h3>
              <p>Your logged workouts will show up here.</p>
            </div>
          </div>
        </div>
        <aside className="goal-panel">
          <span className="goal-panel__spark" aria-hidden="true">✳</span>
          <p className="eyebrow">A GOOD PLACE TO START</p>
          <h2>Make today count.</h2>
          <p>Pick an activity, get moving, and build your streak one day at a time.</p>
          <NavLink to="/workouts" className="goal-link">
            Find a workout <span aria-hidden="true">→</span>
          </NavLink>
        </aside>
      </section>
    </>
  )
}

function SectionPage({ title }: { title: string }) {
  return (
    <section className="section-page">
      <p className="eyebrow">OCTOFIT TRACKER</p>
      <h1>{title}</h1>
      <p className="section-page__copy">Your {title.toLowerCase()} will appear here.</p>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/" aria-label="OctoFit Tracker overview">
          <img src={octofitLogo} alt="" />
          <span>OctoFit <strong>Tracker</strong></span>
        </NavLink>
        <ApiStatus />
      </header>

      <nav className="app-nav" aria-label="Main navigation">
        {sections.map((section) => (
          <NavLink
            key={section.path}
            to={section.path}
            end={section.path === '/'}
            className={({ isActive }) => `app-nav__link${isActive ? ' is-active' : ''}`}
          >
            {section.label}
          </NavLink>
        ))}
      </nav>

      <main className="container app-main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/activities" element={<SectionPage title="Activities" />} />
          <Route path="/teams" element={<SectionPage title="Teams" />} />
          <Route path="/leaderboard" element={<SectionPage title="Leaderboard" />} />
          <Route path="/workouts" element={<SectionPage title="Workouts" />} />
          <Route path="*" element={<SectionPage title="Page not found" />} />
        </Routes>
      </main>
      <footer className="app-footer">Move together. Get stronger.</footer>
    </div>
  )
}

export default App
