type Action = {
  id: number;
  label: string;
  description: string;
};

const actions: Action[] = [
  {
    id: 1,
    label: "Initialize",
    description: "Creates the counter account once backend wiring is ready.",
  },
  {
    id: 2,
    label: "Increment",
    description: "Sends an increment instruction through the backend.",
  },
  {
    id: 3,
    label: "Decrement",
    description: "Sends a decrement instruction through the backend.",
  },
];

export default function App() {
  return (
    <main className="app-shell">
      <section className="hero-panel" aria-labelledby="app-title">
        <div className="eyebrow">Anchor Counter</div>
        <div className="hero-grid">
          <div className="copy-block">
            <h1 id="app-title">Counter Anchor</h1>
            <p>
              A clean frontend shell for the Anchor counter program. Live
              values and instructions are paused until the backend connection is
              added.
            </p>
          </div>

          <div className="counter-card" aria-live="polite">
            <span className="card-label">Current Count</span>
            <strong>--</strong>
            <p>No backend data connected</p>
          </div>
        </div>
      </section>

      <section className="control-grid" aria-label="Counter controls">
        <div className="action-panel">
          <h2>Instructions</h2>
          <p className="panel-copy">
            These actions are disabled so the UI cannot pretend to update data
            before the backend is connected.
          </p>
          <div className="instruction-list">
            {actions.map((action) => (
              <article className="instruction-item" key={action.id}>
                <div>
                  <span>{String(action.id).padStart(2, "0")}</span>
                  <h3>{action.label}</h3>
                  <p>{action.description}</p>
                </div>
                <button className="primary-button" type="button" disabled>
                  Pending
                </button>
              </article>
            ))}
          </div>
        </div>

        <aside className="status-panel">
          <span className="card-label">Backend Status</span>
          <p>Disconnected</p>
          <small>
            Connect the backend or wallet transaction layer before showing count
            data here.
          </small>
          <code>Program: Counter_Anchor_contract</code>
        </aside>
      </section>
    </main>
  );
}
