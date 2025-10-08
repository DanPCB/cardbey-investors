// in src/App.jsx or server/index.js
export default function App() {
  const maintenanceMode = true;
  if (maintenanceMode) {
    return (
      <div style={{
        background: '#0d1117',
        color: '#f0f0f0',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center'
      }}>
        <h1>🌱 This website is being built</h1>
        <p>Please check back soon.</p>
      </div>
    );
  }
  // ...rest of your normal app
}
