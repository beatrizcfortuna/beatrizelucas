import { env } from 'cloudflare:workers';

type TurnstileVerification = {
  success?: boolean;
  hostname?: string;
};

const createTableSql = `CREATE TABLE IF NOT EXISTS rsvps (
  id TEXT PRIMARY KEY NOT NULL,
  names TEXT NOT NULL,
  phone TEXT,
  attendance INTEGER NOT NULL,
  message TEXT,
  created_at TEXT NOT NULL
)`;

const createIndexSql = `CREATE INDEX IF NOT EXISTS rsvps_created_at_idx
  ON rsvps (created_at)`;

function json(data: unknown, status = 200) {
  return Response.json(data, { status });
}

async function validateTurnstile(request: Request, token: string) {
  const bindings = env as unknown as Record<string, string | undefined>;
  const secret = bindings.TURNSTILE_SECRET;

  if (!secret) {
    console.error('TURNSTILE_SECRET não está configurada.');
    return false;
  }

  const formData = new FormData();
  formData.append('secret', secret);
  formData.append('response', token);

  const visitorIp = request.headers.get('CF-Connecting-IP');
  if (visitorIp) formData.append('remoteip', visitorIp);

  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    { method: 'POST', body: formData },
  );

  const verification = (await response.json()) as TurnstileVerification;
  if (!verification.success) return false;

  const allowedHostnames = (bindings.TURNSTILE_ALLOWED_HOSTNAMES || '')
    .split(',')
    .map((hostname) => hostname.trim())
    .filter(Boolean);

  return !allowedHostnames.length || allowedHostnames.includes(verification.hostname || '');
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      names?: unknown;
      phone?: unknown;
      attendance?: unknown;
      message?: unknown;
      turnstileToken?: unknown;
    };

    const turnstileToken =
      typeof body.turnstileToken === 'string' ? body.turnstileToken.trim() : '';

    if (!turnstileToken || !(await validateTurnstile(request, turnstileToken))) {
      return json({ error: 'Não foi possível validar a confirmação.' }, 400);
    }

    const names = Array.isArray(body.names)
      ? body.names
          .filter((name): name is string => typeof name === 'string')
          .map((name) => name.trim())
          .filter(Boolean)
          .slice(0, 12)
      : [];

    if (!names.length || names.some((name) => name.length > 120)) {
      return json({ error: 'Informe pelo menos um nome válido.' }, 400);
    }

    if (typeof body.attendance !== 'boolean') {
      return json({ error: 'Informe se poderá comparecer.' }, 400);
    }

    await env.DB.batch([
      env.DB.prepare(createTableSql),
      env.DB.prepare(createIndexSql),
    ]);

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const phone = typeof body.phone === 'string' ? body.phone.trim().slice(0, 40) : '';
    const message = typeof body.message === 'string' ? body.message.trim().slice(0, 1000) : '';

    await env.DB.prepare(
      `INSERT INTO rsvps (id, names, phone, attendance, message, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
    )
      .bind(id, JSON.stringify(names), phone, body.attendance ? 1 : 0, message, createdAt)
      .run();

    return json({ ok: true });
  } catch (error) {
    console.error('RSVP submission failed', error);
    return json({ error: 'Não foi possível salvar a confirmação.' }, 500);
  }
}

