'use client';

import { FormEvent, useEffect, useState } from 'react';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=2200&q=88',
    alt: 'Casal celebrando o casamento ao ar livre',
    position: 'center 42%',
  },
  {
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2200&q=88',
    alt: 'Celebração de casamento em meio à natureza',
    position: 'center 55%',
  },
  {
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2200&q=88',
    alt: 'Detalhes românticos de uma cerimônia de casamento',
    position: 'center 48%',
  },
];

const flexibleGiftTitle = 'Valor livre: o coração mandou, o Pix obedeceu';

const gifts = [
 
  {
    price: 'R$ 700',
    title: 'Poupança preventiva: "Fundo de emergência para a fatura do cartão pós-casamento',
    image: '/presentes/poupancareserva.png',
    tag: 'Salva os mano',
  },
  {
    price: 'R$ 150',
    title: 'Um mês de academia para os noivos',
    image: '/presentes/gordos.png',
    tag: 'Projeto verão 2027',
  },
  {
    price: 'R$ 120',
    title: 'Rolo de macarrão da noiva',
    image: '/presentes/rolomacarrao.png',
    tag: 'Para quando o noivo aprontar',
  },
  {
    price: 'R$ 150',
    title: 'Capacete contra rolo de macarrão',
    image: '/presentes/capacete.png',
    tag: 'Para o noivo se proteger da noiva',
  },
  {
    price: 'R$ 500',
    title: '14 meses de aluguel',
    image: '/presentes/barriga2.jpeg',
    tag: 'A casa própria vai ter que esperar!',
  },
  {
    price: 'R$ 120',
    title: '1 ano de corte de cabelo para o noivo',
    image: '/presentes/ronaldo.png',
    tag: 'Estilo jogador caro',
    //ronaldo fenomeno
  },
   {
    price: 'R$ 300',
    title: 'Maracujás para a Bia dormir tranquila por uma semana',
    image: '/presentes/maracuja.png',
    tag: 'Paz doméstica',
  },
  {
    price: 'R$ 180',
    title: 'Panos de chão novos',
    image: '/presentes/panodechao.png',
    tag: 'Tarefas domésticas',
  },
  {
    price: 'R$ 450',
    title: 'Cobertor extra para a noiva estar sempre coberta de razão',
    image: '/presentes/cobertor.png',
    tag: 'Saúde conjugal',
    // bia cheia de cobertor
  },
    {
    price: 'R$ 500',
    title: 'Cota para perguntar quando vem os filhos',
    image: '/presentes/crianca.jpg',
    tag: 'Ryco(a)',
    //meme criança incrédula
  },
  {
    price: 'R$ 50',
    title: 'Só para não dizer que não dei nada',
    image: '/presentes/paichris.png',
    tag: 'Mas se não comprar nada, o desconto é maior!',
    //pai do chris
  },
  {
    price: 'R$ 7000',
    title: 'Deus tocou seu coração',
    image: '/presentes/ryca.png',
    tag: 'Ryco(a)',
    //meme eu sou rica
  },

  {
    price: 'Você decide',
    title: flexibleGiftTitle,
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=82',
    tag: 'Carinho sem tabela',
  },
];

const paymentMethods = [
  {
    id: 'pix',
    label: 'Pix',
    title: 'Pagar por Pix',
    description: 'Abra o checkout seguro e escolha Pix para pagar na hora.',
  },
  {
    id: 'card',
    label: 'Cartão de crédito',
    title: 'Pagar com cartão',
    description: 'Abra o checkout seguro e escolha cartão, inclusive parcelado.',
  },
] as const;

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [selectedGift, setSelectedGift] = useState<(typeof gifts)[number] | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'opening' | 'success' | 'error'>('idle');
  const [flexibleGiftAmount, setFlexibleGiftAmount] = useState('');

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    const timer = window.setInterval(
      () => setActiveSlide((current) => (current + 1) % slides.length),
      5600,
    );
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('pagamento') === 'concluido') {
      setPaymentStatus('success');
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus('sending');
    const form = event.currentTarget;
    const data = new FormData(form);
    const mainName = String(data.get('name') || '').trim();
    const companions = String(data.get('companions') || '')
      .split(/[\n,]+/)
      .map((name) => name.trim())
      .filter(Boolean);

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          names: [mainName, ...companions],
          phone: String(data.get('phone') || '').trim(),
          attendance: data.get('attendance') === 'yes',
          message: String(data.get('message') || '').trim(),
        }),
      });

      if (!response.ok) throw new Error('Não foi possível enviar');
      form.reset();
      setFormStatus('success');
    } catch {
      setFormStatus('error');
    }
  }

  function handleGiftSelect(gift: (typeof gifts)[number]) {
    setSelectedGift(gift);
    setPaymentStatus('idle');
    document.getElementById('formas-de-pagamento')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  async function handlePayment() {
    if (!selectedGift) return;

    const isFlexibleGift = selectedGift.title === flexibleGiftTitle;
    const amount = Number(flexibleGiftAmount);
    if (isFlexibleGift && (!Number.isFinite(amount) || amount <= 0)) return;

    try {
      setPaymentStatus('opening');
      const response = await fetch('/api/infinitepay', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          giftTitle: selectedGift.title,
          amountInCents: isFlexibleGift ? Math.round(amount * 100) : undefined,
        }),
      });
      const data = (await response.json()) as { checkoutUrl?: string };

      if (!response.ok || !data.checkoutUrl) throw new Error('Não foi possível criar o checkout.');
      window.location.assign(data.checkoutUrl);
    } catch {
      setPaymentStatus('error');
    }
  }

  const isFlexibleGiftSelected = selectedGift?.title === flexibleGiftTitle;
  const flexibleAmount = Number(flexibleGiftAmount);
  const hasValidFlexibleAmount = Number.isFinite(flexibleAmount) && flexibleAmount > 0;
  const selectedGiftPrice = isFlexibleGiftSelected
    ? hasValidFlexibleAmount
      ? flexibleAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      : 'Defina o valor abaixo para continuar.'
    : selectedGift?.price;

  return (
    <main>
      <section className="hero" id="inicio" aria-label="Beatriz e Lucas">
        <div className="hero-gallery" aria-live="polite">
          {slides.map((slide, index) => (
            <div
              className={`hero-photo ${index === activeSlide ? 'is-active' : ''}`}
              key={slide.image}
              role="img"
              aria-label={slide.alt}
              style={{ backgroundImage: `url("${slide.image}")`, backgroundPosition: slide.position }}
            />
          ))}
        </div>
        <div className="hero-shade" aria-hidden="true" />

        <header className="site-header">
          <a className="mini-mark" href="#inicio" aria-label="Beatriz e Lucas — início">
            B <span>&amp;</span> L
          </a>
          <nav aria-label="Navegação principal">
            <a href="#nossa-historia">Nossa história</a>
            <a href="#presenca">Presença</a>
            <a href="#presentes">Presentes</a>
          </nav>
        </header>

        <div className="hero-content">
          <p className="eyebrow">Vamos celebrar o amor</p>
          <h1 className="couple-mark">
            <span>Beatriz</span>
            <b>&amp;</b>
            <span>Lucas</span>
          </h1>
          <p className="hero-message">
            Nosso grande dia está chegando. Queremos viver cada abraço,
            sorriso e brinde ao lado de quem faz parte da nossa história.
          </p>
          <a className="primary-button" href="#presenca">
            Confirmar presença
          </a>
        </div>

        <div className="slider-controls" aria-label="Escolher foto">
          <button
            type="button"
            aria-label="Foto anterior"
            onClick={() => setActiveSlide((activeSlide - 1 + slides.length) % slides.length)}
          >
            ‹
          </button>
          <div className="slider-dots">
            {slides.map((slide, index) => (
              <button
                type="button"
                key={slide.image}
                className={index === activeSlide ? 'is-active' : ''}
                aria-label={`Mostrar foto ${index + 1}`}
                aria-current={index === activeSlide}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Próxima foto"
            onClick={() => setActiveSlide((activeSlide + 1) % slides.length)}
          >
            ›
          </button>
        </div>
      </section>

      <section className="story section-shell" id="nossa-historia">
        <div className="story-copy">
          <p className="section-kicker">Nós dois</p>
          <h2>Um novo capítulo começa aqui.</h2>
          <p>
              Escolhemos dizer “sim” a uma vida lado a lado. Esta página é um pedacinho da nossa alegria — e um convite para você fazer parte dela!
          </p>
          <div className="signature">Beatriz &amp; Lucas</div>
        </div>
        <div className="story-photos" aria-label="Momentos do casal">
          <div className="story-photo story-photo-main" />
          <div className="story-photo story-photo-small" />
          <span className="photo-note">as melhores histórias<br />são vividas juntos</span>
        </div>
      </section>

      <section className="rsvp" id="presenca">
        <div className="rsvp-intro">
          <p className="section-kicker">RSVP</p>
          <h2>Você vem celebrar com a gente?</h2>
          <p>
            Preencha os nomes de quem vai com você. Sua resposta será guardada
            com carinho na nossa lista de convidados.
          </p>
          <div className="rsvp-detail">
            <span>♡</span>
            <p>Uma confirmação por família já é suficiente.</p>
          </div>
        </div>

        <form className="rsvp-form" onSubmit={handleSubmit}>
          <label>
            Seu nome completo
            <input name="name" autoComplete="name" required placeholder="Como está no convite" />
          </label>
          <label>
            Acompanhantes
            <textarea
              name="companions"
              rows={3}
              placeholder="Um nome por linha (se houver)"
            />
          </label>
          <div className="form-row">
            <label>
              WhatsApp
              <input name="phone" inputMode="tel" autoComplete="tel" placeholder="(00) 00000-0000" />
            </label>
            <label>
              Você poderá ir?
              <select name="attendance" defaultValue="yes" required>
                <option value="yes">Sim, estarei lá!</option>
                <option value="no">Infelizmente não</option>
              </select>
            </label>
          </div>
          <label>
            Deixe um recadinho
            <textarea name="message" rows={3} placeholder="Opcional, mas a gente vai amar ler" />
          </label>
          <button className="submit-button" disabled={formStatus === 'sending'} type="submit">
            {formStatus === 'sending' ? 'Enviando…' : 'Enviar confirmação'}
          </button>
          <p className={`form-status ${formStatus}`} role="status" aria-live="polite">
            {formStatus === 'success' && 'Presença confirmada! Obrigado por fazer parte desse momento. ♡'}
            {formStatus === 'error' && 'Não conseguimos salvar agora. Tente novamente em instantes.'}
          </p>
        </form>
      </section>

      <section className="gifts section-shell" id="presentes">
        <div className="section-heading">
          <p className="section-kicker">Lista de presentes</p>
          <h2>Presentes que rendem boas histórias</h2>
          <p>
              Uma seleção de itens básicos para ajudar a construir uma vida a dois.
          </p>
        </div>

        <div className="payment-callout" id="formas-de-pagamento">
          <div className="payment-copy">
            <p className="section-kicker">Como presentear</p>
            <h3>Escolha o presente e pague por Pix ou cartão de crédito</h3>
            <p>
              Depois de selecionar um presente, você será levado ao checkout seguro da
              InfinitePay para concluir o pagamento por Pix ou cartão de crédito.
            </p>
          </div>

          <div className="payment-selection">
            <span>Presente escolhido</span>
            <strong>
              {selectedGift
                ? `${selectedGift.title} · ${selectedGiftPrice}`
                : 'Escolha um presente abaixo para liberar as opções de pagamento.'}
            </strong>
            <p>
              {selectedGift
                ? 'Escolha uma opção para abrir o checkout seguro.'
                : 'Assim que você escolher um presente, as duas opções de pagamento serão liberadas.'}
            </p>
          </div>

          <div className="payment-grid">
            {paymentMethods.map((method) => (
              <button
                type="button"
                key={method.id}
                className="payment-card"
                aria-label={`Abrir checkout para pagar por ${method.label}`}
                disabled={!selectedGift || (isFlexibleGiftSelected && !hasValidFlexibleAmount) || paymentStatus === 'opening'}
                onClick={handlePayment}
              >
                <span>{method.label}</span>
                <strong>{method.title}</strong>
                <p>{method.description}</p>
                <small>
                  {paymentStatus === 'opening'
                    ? 'Abrindo checkout...'
                    : selectedGift
                      ? 'Ir para pagamento seguro'
                      : 'Escolha um presente primeiro'}
                </small>
              </button>
            ))}
          </div>

          <p className={`payment-feedback ${paymentStatus}`} role="status" aria-live="polite">
            {paymentStatus === 'success' &&
              'Pagamento concluído! Muito obrigado por fazer parte desse momento. ♡'}
            {paymentStatus === 'error' &&
              'Não foi possível abrir o checkout agora. Tente novamente em instantes.'}
          </p>
        </div>

        <div className="gift-grid">
          {gifts.map((gift) => (
            <article
              className={`gift-card ${selectedGift?.title === gift.title ? 'is-selected' : ''}`}
              key={gift.title}
            >
              <div className="gift-image" style={{ backgroundImage: `url("${gift.image}")` }}>
                <span>{gift.tag}</span>
              </div>
              <div className="gift-card-copy">
                <h3>{gift.title}</h3>
                <div className="gift-price">{gift.price}</div>
                {gift.title === flexibleGiftTitle && (
                  <label className="flexible-gift-input">
                    Quanto você quer presentear?
                    <span>R$</span>
                    <input
                      type="number"
                      min="1"
                      step="0.01"
                      inputMode="decimal"
                      placeholder="Ex.: 250"
                      value={flexibleGiftAmount}
                      onChange={(event) => {
                        setFlexibleGiftAmount(event.target.value);
                        setSelectedGift(gift);
                        setPaymentStatus('idle');
                      }}
                    />
                  </label>
                )}
                <button
                  type="button"
                  className={selectedGift?.title === gift.title ? 'is-selected' : ''}
                  aria-pressed={selectedGift?.title === gift.title}
                  onClick={() => handleGiftSelect(gift)}
                >
                  {selectedGift?.title === gift.title ? 'Presente selecionado' : 'Escolher este presente'}
                </button>
              </div>
            </article>
          ))}
        </div>

        <p className="gift-note">
          Os presentes são simbólicos, mas a alegria (e o maracujá) é de verdade.
        </p>
      </section>

      <footer>
        <div className="footer-mark">Beatriz <span>&amp;</span> Lucas</div>
        <p>Feito com amor para o nosso grande dia.</p>
        <a href="#inicio">Voltar ao início ↑</a>
      </footer>
    </main>
  );
}
