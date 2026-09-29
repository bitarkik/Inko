import type { Store } from '../types';

export function MapPage({ stores, mapContainer }: { stores: Store[], mapContainer: any }) {
  return (
    <section className="page active" id="mapPage">
      <div className="map-layout">
        <div className="panel">
          <div id="mapCanvas">
            <div id="map" ref={mapContainer} style={{height: '520px', borderRadius: 'var(--radius)', background: 'var(--panel-2)', overflow: 'hidden', zIndex: 1}}></div>
            <div className="map-fallback" style={{display: 'none'}}><b>Map tiles are unavailable.</b></div>
          </div>
        </div>
        <aside className="panel map-side">
          <div className="panel-head" style={{padding: '0 0 12px'}}><div><h3>Network by area</h3><span>Queue load across active partners</span></div></div>
          <div className="legend"><span><i style={{background:'var(--emerald)'}}></i>Ready</span><span><i style={{background:'var(--amber)'}}></i>Busy</span><span><i style={{background:'var(--red)'}}></i>Offline</span><span><i style={{background:'var(--blue)'}}></i>Demand hotspot</span></div>
          <div className="zone-list">
            {stores.map((s, i) => (
              <div key={i} className="zone">
                <i style={{background: s.status === 'Live' ? 'var(--emerald)' : s.status === 'Busy' ? 'var(--amber)' : 'var(--red)'}}></i>
                <div><b>{s.area}</b><small>{s.name}</small></div>
                <span className="load">{s.queue} queued</span>
              </div>
            ))}
          </div>
          <div className="map-note">Pins show approximate area-level positions. Demand circles summarize sample order concentration.</div>
        </aside>
      </div>
    </section>
  );
}
