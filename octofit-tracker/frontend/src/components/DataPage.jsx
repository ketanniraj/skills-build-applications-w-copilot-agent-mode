import { useEffect, useState } from 'react';
import { fetchCollection, getApiUrl } from '../api.js';

function formatValue(value) {
  if (value === null || value === undefined || value === '') {
    return '—';
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
}

function DataPage({ title, resource, columns, emptyMessage }) {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadItems() {
      try {
        setStatus('loading');
        setItems(await fetchCollection(resource, { signal: controller.signal }));
        setStatus('ready');
      } catch (caughtError) {
        if (caughtError.name !== 'AbortError') {
          setError(caughtError.message);
          setStatus('error');
        }
      }
    }

    loadItems();

    return () => controller.abort();
  }, [resource]);

  return (
    <section className="data-page">
      <div className="d-flex flex-column flex-md-row justify-content-between gap-2 mb-3">
        <div>
          <h1 className="h3 mb-1">{title}</h1>
          <p className="text-muted mb-0">{getApiUrl(resource)}</p>
        </div>
      </div>

      {status === 'loading' && <div className="alert alert-info">Loading {title.toLowerCase()}...</div>}
      {status === 'error' && <div className="alert alert-danger">Unable to load {title.toLowerCase()}: {error}</div>}
      {status === 'ready' && items.length === 0 && <div className="alert alert-secondary">{emptyMessage}</div>}

      {status === 'ready' && items.length > 0 && (
        <div className="table-responsive bg-white border rounded shadow-sm">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                {columns.map((column) => (
                  <th key={column.key} scope="col">{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id ?? item._id ?? index}>
                  {columns.map((column) => (
                    <td key={column.key}>{formatValue(item[column.key])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default DataPage;