const infinitePayHandle = 'lucas-eduardo-wno';
const flexibleGiftTitle = 'Valor livre: o coração mandou, o Pix obedeceu';

const giftAmounts = {
  'Maracujás para a Bia dormir tranquila por uma semana': 30000,
  'Panos de chão novos': 18000,
  'Cobertor extra para a noiva estar sempre coberta de razão': 45000,
  'Poupança preventiva: "Fundo de emergência para a fatura do cartão pós-casamento': 70000,
  'Um mês de academia para os noivos': 15000,
  'Rolo de macarrão da noiva': 12000,
  'Capacete contra rolo de macarrão': 15000,
  'Ajuda com o aluguel': 50000,
  '1 ano de corte de cabelo para o noivo': 12000,
  'Só para não dizer que não dei nada': 5000,
  'Deus tocou seu coração': 700000,
  'Cota para perguntar quando vem os filhos': 50000,
} as const;

function json(data: unknown, status = 200) {
  return Response.json(data, { status });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { giftTitle?: unknown; amountInCents?: unknown };
    const giftTitle = typeof body.giftTitle === 'string' ? body.giftTitle : '';
    const customAmount = typeof body.amountInCents === 'number' ? body.amountInCents : 0;
    const amountInCents = giftTitle === flexibleGiftTitle
      ? Math.round(customAmount)
      : giftAmounts[giftTitle as keyof typeof giftAmounts];

    if (!amountInCents || amountInCents < 100 || amountInCents > 100000000) {
      return json({ error: 'Valor do presente inválido.' }, 400);
    }

    const orderNsu = `casamento-${crypto.randomUUID()}`;
    const redirectUrl = new URL('/?pagamento=concluido', request.url).toString();
    const response = await fetch('https://api.checkout.infinitepay.io/links', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        handle: infinitePayHandle,
        items: [{ quantity: 1, price: amountInCents, description: giftTitle }],
        order_nsu: orderNsu,
        redirect_url: redirectUrl,
      }),
    });

    const data = (await response.json()) as { url?: string; checkout_url?: string; payment_url?: string };
    const checkoutUrl = data.url ?? data.checkout_url ?? data.payment_url;
    if (!response.ok || !checkoutUrl) {
      console.error('InfinitePay checkout creation failed', response.status, data);
      return json({ error: 'Não foi possível criar o checkout.' }, 502);
    }

    return json({ checkoutUrl });
  } catch (error) {
    console.error('InfinitePay checkout request failed', error);
    return json({ error: 'Não foi possível criar o checkout.' }, 500);
  }
}
