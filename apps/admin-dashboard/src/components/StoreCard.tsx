import type { Store } from '../types';
import { StatusTag } from './StatusTag';
import { money } from '../utils';

export function StoreCard({ s, onClick }: { s: Store, onClick: () => void }) {
  return (
    <article className="store-card" onClick={onClick}>
      <div className="store-card-top">
        <div><h3>{s.name}</h3><div className="subtext mono">#{s.id} · {s.area} · {s.zone}</div></div>
        <StatusTag s={s.status} />
      </div>
      <div className="facts">
        <div className="fact"><small>Gross sales</small><b>{money(s.sales)}</b></div>
        <div className="fact"><small>Total jobs</small><b>{s.jobs.toLocaleString()} · {s.failed} failed</b></div>
        <div className="fact"><small>Online / turnaround</small><b>{s.online}% · {s.tat} min</b></div>
        <div className="fact"><small>Rating</small><b className="rating">★ {s.rating} ({s.reviews})</b></div>
      </div>
    </article>
  );
}
