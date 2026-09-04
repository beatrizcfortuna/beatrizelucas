'use client';

import { FormEvent, useState } from 'react';

type Rsvp = {
  id: string;
  names: string;
  phone: string | null;
  attendance: number;
  message: string | null;
  created_at: string;
};

function guestNames(names: string) {
  try {
    const parsed = JSON.parse(names);
    return Array.isArray(parsed) ? parsed.filter((name): name is string => typeof name === 'string') : [];
  } catch {
    return [];
  }
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(date));
}

export default function GuestList() {
  const [password, setPassword] = useState('');
  const [rsvps, setRsvps] = useState<Rsvp[] | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function loadList(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/rsvp/list', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json()) as { rsvps?: Rsvp[]; error?: string };

      if (!response.ok || !data.rsvps) throw new Error(data.error || 'Não foi possível abrir a lista.');
      setRsvps(data.rsvps);
      setStatus('idle');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Não foi possível abrir a lista.');
    }
  }

  const confirmedRsvps = rsvps?.filter((rsvp) => rsvp.attendance === 1) ?? [];
  const confirmedGuests = confirmedRsvps.reduce((total, rsvp) => total + guestNames(rsvp.names).length, 0);

  return (
    <main className="guest-list-page">
      <a className="guest-list-back" href="/">← Voltar ao site</a>
      <section className="guest-list-shell">
        <p className="section-kicker">Área privada</p>
        <h1>Lista de convidados</h1>
        <p className="guest-list-intro">Consulte as respostas recebidas sem deixar a lista visível no site.</p>

        {rsvps === null ? (
          <form className="guest-list-login" onSubmit={loadList}>
            <label>
              Senha da lista
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
            <button type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Abrindo...' : 'Ver confirmações'}
            </button>
            {status === 'error' && <p role="alert">{errorMessage}</p>}
          </form>
        ) : (
          <>
            <div className="guest-list-summary">
              <article><span>Respostas</span><strong>{rsvps.length}</strong></article>
              <article><span>Confirmaram</span><strong>{confirmedRsvps.length}</strong></article>
              <article><span>Pessoas confirmadas</span><strong>{confirmedGuests}</strong></article>
            </div>

            <div className="guest-list-actions">
              <button type="button" onClick={() => setRsvps(null)}>Fechar lista</button>
              <button type="button" onClick={() => window.print()}>Imprimir ou salvar em PDF</button>
            </div>

            {rsvps.length ? (
              <div className="guest-list-records">
                {rsvps.map((rsvp) => {
                  const names = guestNames(rsvp.names);
                  return (
                    <article className="guest-list-record" key={rsvp.id}>
                      <div>
                        <span className={rsvp.attendance === 1 ? 'guest-status yes' : 'guest-status no'}>
                          {rsvp.attendance === 1 ? 'Vai celebrar' : 'Não poderá ir'}
                        </span>
                        <time dateTime={rsvp.created_at}>{formatDate(rsvp.created_at)}</time>
                      </div>
                      <h2>{names.join(', ') || 'Nome não informado'}</h2>
                      {rsvp.phone && <p><b>WhatsApp:</b> {rsvp.phone}</p>}
                      {rsvp.message && <p><b>Recado:</b> {rsvp.message}</p>}
                    </article>
                  );
                })}
              </div>
            ) : (
              <p className="guest-list-empty">Ainda não chegou nenhuma resposta.</p>
            )}
          </>
        )}
      </section>
    </main>
  );
}
