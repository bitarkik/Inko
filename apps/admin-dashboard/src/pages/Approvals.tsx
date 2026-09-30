import type { Application } from '../types';
import { StatusTag } from '../components/StatusTag';

export function Approvals({ applications, approveApp, declineApp }: { applications: Application[], approveApp: (id: string) => void, declineApp: (id: string) => void }) {
  return (
    <section className="page active" id="approvals">
      <div className="status-banner"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3 4 7v5c0 4.8 3.3 7.7 8 9 4.7-1.3 8-4.2 8-9V7l-8-4Z"/><path d="m9 12 2 2 4-4"/></svg>
        <div><b>{applications.length} applications need a decision.</b><span>Verify owner identity, trade licence, payout details and hardware before enabling auto-dispatch.</span></div>
      </div>
      <div className="approvals">
        {applications.map((a, i) => (
          <article key={i} className="panel approval-card">
            <div className="approval-top"><div><h3>{a.name}</h3><div className="owner">{a.owner} · {a.id}</div></div><StatusTag s="Pending" /></div>
            <div className="approval-meta">
              <div className="fact"><small>Area</small><b>{a.area}</b></div>
              <div className="fact"><small>Submitted</small><b>{a.submitted}</b></div>
              <div className="fact"><small>Hardware</small><b>{a.hardware}</b></div>
              <div className="fact"><small>Documents</small><b>{a.docs}</b></div>
            </div>
            <div className="approval-actions" style={{gap: '8px', display: 'flex'}}>
              <button className="secondary-btn" style={{color: 'var(--red)', border: '1px solid var(--red-soft)'}} onClick={() => declineApp(a.id)}>Decline</button>
              <div style={{flex: 1}}></div>
              <button className="primary-btn" onClick={() => approveApp(a.id)}>Approve store</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
