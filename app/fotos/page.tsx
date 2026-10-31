/**
 * COLE ESTE CONTEÚDO EM: app/fotos/page.tsx (no repositório Next.js do casamento).
 * Edite SOMENTE os links abaixo antes de publicar.
 * Não altere o Index.html que está no Google Apps Script.
 */

const LINK_GOOGLE_FOTOS = "https://photos.app.goo.gl/uj4mx3Egk4YvvYKG6"; // Confira se este é o álbum DEFINITIVO do casamento.
const LINK_SEM_LOGIN = "https://script.google.com/macros/s/AKfycbxOw9JPadyGmW68W9Kz-Egsg3jqTlVft2Ugk1s-mA5EB9rcDXiI8ZBIoGa9Qn9fmuJT/exec"; // COLE AQUI a URL COMPLETA da implantação Apps Script, terminada em /exec

export default function FotosPage() {
  return (
    <main className="wedding-page">
      <div className="decoration decoration-one" aria-hidden="true">✿</div>
      <div className="decoration decoration-two" aria-hidden="true">❀</div>
      <div className="content">
        <header className="hero">
          <div className="eyebrow">NOSSO GRANDE DIA</div>
          <h1>Lucas <span className="amp">&amp;</span> Beatriz</h1>
          <p className="date">01 · 11 · 2026</p>
          <div className="hairline" aria-hidden="true"><span>♥</span></div>
          <h2>Compartilhe suas fotos e vídeos!</h2>
          <p className="intro">
            Tirou uma foto bonita ou gravou um momento especial?
            Envie para a gente! Escolha abaixo a opção mais fácil para você.
          </p>
        </header>

        <section className="choices" aria-label="Como enviar fotos e vídeos">
          <article className="choice google">
            <div className="choice-icon" aria-hidden="true">☁️</div>
            <div className="choice-body">
              <div className="choice-label">OPÇÃO 1</div>
              <h3>Fotos e vídeos grandes</h3>
              <p>Ideal para vídeos longos e arquivos grandes.</p>
              <p className="requirement"><strong>Precisa entrar com uma conta Google</strong> (Gmail ou outra conta Google).</p>
            </div>
            <a className="action action-google" href={LINK_GOOGLE_FOTOS}>
              ABRIR GOOGLE FOTOS <span aria-hidden="true">›</span>
            </a>
          </article>

          <article className="choice simple">
            <div className="choice-icon" aria-hidden="true">📷</div>
            <div className="choice-body">
              <div className="choice-label">OPÇÃO 2</div>
              <h3>Fotos e vídeos pequenos</h3>
              <p>Escolha da galeria ou tire uma foto na hora.</p>
              <p className="requirement"><strong>Não precisa de login</strong> nem de cadastro.</p>
              <p className="limit">Limites atuais: 20 MB por foto e 35 MB por vídeo.</p>
            </div>
            {LINK_SEM_LOGIN ? (
              <a className="action action-simple" href={LINK_SEM_LOGIN}>
                ENVIAR SEM LOGIN <span aria-hidden="true">›</span>
              </a>
            ) : (
              <div className="action action-unavailable" aria-label="Opção sem login ainda não configurada">
                ENVIO SEM LOGIN EM PREPARAÇÃO
              </div>
            )}
          </article>
        </section>

        <section className="help" aria-label="Ajuda">
          <h2>Não sabe qual escolher?</h2>
          <p><strong>Tem uma conta Google?</strong> Use a opção 1.</p>
          <p><strong>Não quer fazer login?</strong> Use a opção 2.</p>
          <p className="help-note">Se o vídeo for grande demais na opção 2, tente a opção 1.</p>
        </section>
        <footer>Obrigado por fazer parte da nossa história! <span aria-hidden="true">♡</span></footer>
      </div>

      <style>{`
        :root { color-scheme: light; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        .wedding-page {
          --marsala: #692638;
          --marsala-dark: #4d1728;
          --cream: #fff9f5;
          --ink: #432d32;
          --muted: #715f61;
          min-height: 100vh;
          font-family: Arial, Helvetica, sans-serif;
          background: radial-gradient(ellipse at 0% 0%, #f5e7e8 0, transparent 38%),
                      radial-gradient(ellipse at 100% 100%, #f1e3dd 0, transparent 42%),
                      var(--cream);
          color: var(--ink);
          position: relative;
          overflow: hidden;
          padding: 28px 18px 45px;
        }
        .content { position: relative; z-index: 1; max-width: 850px; margin: 0 auto; }
        .decoration { position: absolute; color: #d4a3ab; opacity: .18; font-size: 160px; pointer-events: none; }
        .decoration-one { top: -78px; left: -35px; transform: rotate(15deg); }
        .decoration-two { bottom: -75px; right: -20px; transform: rotate(-25deg); }
        .hero { text-align: center; padding: 30px 0 17px; }
        .eyebrow { color: var(--marsala); font-weight: 700; letter-spacing: .2em; font-size: 12px; }
        .hero h1 { margin: 14px 0 5px; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(39px, 8vw, 66px); font-weight: 400; line-height: 1.12; color: var(--marsala-dark); }
        .amp { color: #a77b83; font-style: italic; }
        .date { margin: 9px 0 18px; color: var(--marsala); font-weight: 700; letter-spacing: .16em; font-size: 14px; }
        .hairline { display: flex; justify-content: center; align-items: center; gap: 12px; color: #b07882; margin: 16px auto 22px; }
        .hairline::before, .hairline::after { content: ''; height: 1px; width: 85px; background: #d9b7bc; }
        .hero h2 { font-family: Georgia, 'Times New Roman', serif; font-size: clamp(25px, 5vw, 34px); line-height: 1.25; font-weight: 400; margin: 0 0 12px; color: var(--marsala-dark); }
        .intro { font-size: 18px; max-width: 650px; line-height: 1.55; margin: 0 auto; }
        .choices { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 22px 0 25px; }
        .choice { display: flex; flex-direction: column; min-height: 368px; padding: 25px 23px 22px; background: #fff; border: 2px solid #e5cdd0; border-radius: 22px; box-shadow: 0 12px 28px #55213210; }
        .choice.simple { border-color: #bf8f9a; }
        .choice-icon { font-size: 42px; margin-bottom: 12px; }
        .choice-label { font-size: 12px; font-weight: 800; letter-spacing: .14em; color: #8d4e5d; }
        .choice h3 { font-family: Georgia, 'Times New Roman', serif; font-size: 27px; color: var(--marsala-dark); line-height: 1.15; margin: 9px 0 12px; font-weight: 600; }
        .choice p { font-size: 17px; line-height: 1.48; margin: 0 0 13px; }
        .choice .requirement { margin: 0 0 11px; }
        .choice .limit { font-size: 14px; color: var(--muted); }
        .choice-body { flex: 1; }
        .action { display: flex; align-items: center; justify-content: center; gap: 13px; min-height: 68px; border-radius: 15px; padding: 16px 13px; text-align: center; font-size: 16px; letter-spacing: .015em; line-height: 1.35; font-weight: 800; text-decoration: none; background: var(--marsala); color: white; box-shadow: 0 5px 0 var(--marsala-dark); transition: transform .14s ease, box-shadow .14s ease; }
        .action span { font-size: 28px; line-height: 0; }
        .action:focus-visible { outline: 4px solid #bd9e43; outline-offset: 4px; }
        .action:hover { background: #561c2d; }
        .action:active { transform: translateY(3px); box-shadow: 0 2px 0 var(--marsala-dark); }
        .action-unavailable { background: #80757a; box-shadow: none; color: white; font-size: 14px; }
        .help { text-align: center; border-top: 1px solid #dec2c6; padding: 20px 10px 4px; }
        .help h2 { font-family: Georgia, 'Times New Roman', serif; font-size: 25px; color: var(--marsala-dark); font-weight: 400; margin: 0 0 14px; }
        .help p { margin: 7px 0; font-size: 17px; line-height: 1.48; }
        .help-note { color: var(--muted); font-size: 15px !important; margin-top: 14px !important; }
        footer { text-align: center; margin: 30px 0 0; color: var(--marsala); font-family: Georgia, 'Times New Roman', serif; font-size: 18px; }
        footer span { font-size: 25px; }
        @media (max-width: 680px) { .wedding-page { padding: 15px 15px 35px; } .hero { padding-top: 20px; } .choices { grid-template-columns: 1fr; gap: 16px; } .choice { min-height: auto; padding: 22px 20px 20px; } .choice-icon { margin-bottom: 7px; } .action { min-height: 70px; } .intro { font-size: 17px; } }
        @media (prefers-reduced-motion: reduce) { .action { transition: none; } html { scroll-behavior: auto; } }
      `}</style>
    </main>
  );
}

