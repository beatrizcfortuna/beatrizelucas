import { env } from 'cloudflare:workers';

type RsvpRecord = {
  id: string;
  names: string;
  phone: string | null;
  attendance: number;
  message: string | null;
  created_at: string;
};

function json(data: unknown, status = 200) {
  return Response.json(data, { status });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { password?: unknown };
    const password = typeof body.password === 'string' ? body.password : '';
    const configuredPassword = (env as unknown as Record<string, unknown>).RSVP_DASHBOARD_PASSWORD;

    if (typeof configuredPassword !== 'string' || !configuredPassword) {
      return json({ error: 'A lista ainda não foi configurada.' }, 503);
    }

    if (!password || password !== configuredPassword) {
      return json({ error: 'Senha incorreta.' }, 401);
    }

    const result = await env.DB.prepare(
      `SELECT id, names, phone, attendance, message, created_at
       FROM rsvps
       ORDER BY created_at DESC
       LIMIT 250`,
    ).all<RsvpRecord>();

    return json({ rsvps: result.results ?? [] });
  } catch (error) {
    if (error instanceof Error && error.message.includes('no such table')) {
      return json({ rsvps: [] });
    }

    console.error('RSVP list request failed', error);
    return json({ error: 'Não foi possível carregar a lista.' }, 500);
  }
}
