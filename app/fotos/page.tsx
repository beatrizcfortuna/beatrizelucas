/**
 * COLE ESTE CONTEÚDO EM: app/fotos/page.tsx (no repositório Next.js do casamento).
 * Edite SOMENTE os links abaixo antes de publicar.
 * Não altere o Index.html que está no Google Apps Script.
 */

const LINK_GOOGLE_FOTOS = "https://photos.app.goo.gl/uj4mx3Egk4YvvYKG6"; // Confira se este é o álbum DEFINITIVO do casamento.
const LINK_SEM_LOGIN = "https://script.google.com/macros/s/AKfycbxOw9JPadyGmW68W9Kz-Egsg3jqTlVft2Ugk1s-mA5EB9rcDXiI8ZBIoGa9Qn9fmuJT/exec"; // COLE AQUI a URL COMPLETA da implantação Apps Script, terminada em /exec

export default function FotosPage() {
  return (
    <main id="fotos-casamento-lb">
      <div className="lb-flor lb-flor-top" aria-hidden="true">✿</div>
      <div className="lb-flor lb-flor-bottom" aria-hidden="true">✿</div>

      <div className="lb-container">
        <div className="lb-intro">
          <div className="lb-kicker">NOSSO GRANDE DIA</div>
          <h1>Lucas <span>&amp;</span> Beatriz</h1>
          <div className="lb-date">01 · 11 · 2026</div>
          <div className="lb-heartline" aria-hidden="true"><span>♥</span></div>
          <h2>Compartilhe suas fotos e vídeos!</h2>
          <p>Você tirou fotos ou gravou vídeos do nosso casamento? Envie para a gente!</p>
          <div className="lb-callout">
            <span className="lb-down" aria-hidden="true">↓</span>
            <strong>Escolha uma das duas opções logo abaixo</strong>
            <span className="lb-down" aria-hidden="true">↓</span>
          </div>
        </div>

        <section className="lb-choices" aria-label="Escolha como enviar suas fotos e vídeos">
          <div className="lb-card">
            <div className="lb-card-top">
              <span className="lb-step">OPÇÃO 1</span>
              <span className="lb-emoji" aria-hidden="true">📸</span>
            </div>
            <h3>Fotos e vídeos grandes</h3>
            <p>Para vídeos longos e fotos grandes, sem precisar diminuir o tamanho.</p>
            <p className="lb-highlight">Precisa entrar com uma conta Google.</p>
            <a className="lb-action" href={LINK_GOOGLE_FOTOS}>
              ABRIR GOOGLE FOTOS <span aria-hidden="true">›</span>
            </a>
          </div>

          <div className="lb-card lb-card-alt">
            <div className="lb-card-top">
              <span className="lb-step">OPÇÃO 2</span>
              <span className="lb-emoji" aria-hidden="true">📱</span>
            </div>
            <h3>Enviar sem fazer login</h3>
            <p>Escolha fotos e vídeos da galeria do celular ou tire uma foto na hora.</p>
            <p className="lb-highlight">Não precisa de conta nem de senha.</p>
            <p className="lb-limits">Até 20 MB por foto e 35 MB por vídeo.</p>
            {LINK_SEM_LOGIN ? (
              <a className="lb-action" href={LINK_SEM_LOGIN}>
                ENVIAR SEM LOGIN <span aria-hidden="true">›</span>
              </a>
            ) : (
              <div className="lb-action lb-disabled" aria-label="Aguardando configuração do link">
                INSERIR LINK DO ENVIO SEM LOGIN
              </div>
            )}
          </div>
        </section>

        <section className="lb-help" aria-label="Ajuda para escolher">
          <h2>Não sabe qual escolher?</h2>
          <p><strong>Tem uma conta Google?</strong> Escolha a opção 1.</p>
          <p><strong>Não quer entrar em nenhuma conta?</strong> Escolha a opção 2.</p>
          <p className="lb-help-small">Se o vídeo for muito grande para a opção 2, tente a opção 1.</p>
        </section>

        <div className="lb-goodbye">
          <p>Obrigado por fazer parte da nossa história!</p>
          <span aria-hidden="true">♥</span>
        </div>
      </div>

      <style>{`
        #fotos-casamento-lb, #fotos-casamento-lb * { box-sizing: border-box; }
        #fotos-casamento-lb {
          --lb-marsala: #682539;
          --lb-dark: #4f1a2b;
          --lb-ink: #382c2f;
          display: block;
          position: relative;
          isolation: isolate;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          min-height: 100vh;
          margin: 0;
          padding: 28px 18px 38px;
          overflow-x: clip;
          color: var(--lb-ink);
          background: radial-gradient(ellipse at top left, #f7e8eb, transparent 42%),
                      radial-gradient(ellipse at bottom right, #f7eae7, transparent 42%),
                      #fffaf8;
          font-family: Arial, Helvetica, sans-serif;
          text-align: left;
        }
        #fotos-casamento-lb .lb-container {
          position: relative;
          z-index: 1;
          display: block;
          width: 100%;
          max-width: 850px;
          min-width: 0;
          margin: 0 auto;
        }
        #fotos-casamento-lb .lb-flor {
          position: absolute;
          pointer-events: none;
          color: #dcb8bf;
          opacity: .25;
          font-size: 145px;
          line-height: 1;
          z-index: 0;
        }
        #fotos-casamento-lb .lb-flor-top { top: -47px; left: -36px; }
        #fotos-casamento-lb .lb-flor-bottom { bottom: -49px; right: -30px; }
        #fotos-casamento-lb .lb-intro {
          display: block;
          width: 100%;
          min-width: 0;
          padding: 18px 4px 8px;
          margin: 0 auto;
          text-align: center;
        }
        #fotos-casamento-lb .lb-kicker {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: .16em;
          color: var(--lb-marsala);
        }
        #fotos-casamento-lb .lb-intro h1 {
          display: block;
          max-width: 100%;
          margin: 14px 0 8px;
          padding: 0;
          color: var(--lb-dark);
          font: 400 clamp(34px, 7vw, 61px)/1.18 Georgia, 'Times New Roman', serif;
          overflow-wrap: normal;
          word-break: normal;
          white-space: normal;
          text-align: center;
        }
        #fotos-casamento-lb .lb-intro h1 span { color: #aa7a85; font-style: italic; }
        #fotos-casamento-lb .lb-date {
          display: block;
          white-space: nowrap;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: .12em;
          color: var(--lb-marsala);
          margin: 10px 0 12px;
        }
        #fotos-casamento-lb .lb-heartline {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 13px;
          color: #a86c7c;
          margin: 8px 0 16px;
        }
        #fotos-casamento-lb .lb-heartline:before,
        #fotos-casamento-lb .lb-heartline:after {
          content: '';
          width: min(18vw, 75px);
          height: 1px;
          background: #d6aeb9;
        }
        #fotos-casamento-lb .lb-intro h2 {
          display: block;
          width: 100%;
          margin: 0 0 10px;
          padding: 0;
          color: var(--lb-dark);
          font: 400 clamp(25px, 5vw, 34px)/1.24 Georgia, 'Times New Roman', serif;
          text-align: center;
          overflow-wrap: normal;
        }
        #fotos-casamento-lb .lb-intro p {
          margin: 0 auto 16px;
          max-width: 620px;
          color: var(--lb-ink);
          font: 18px/1.5 Arial, Helvetica, sans-serif;
          text-align: center;
        }
        #fotos-casamento-lb .lb-callout {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 9px;
          width: fit-content;
          max-width: 100%;
          margin: 14px auto 10px;
          padding: 12px 13px;
          color: var(--lb-dark);
          background: #f8e8ed;
          border: 2px solid #d9b5bf;
          border-radius: 14px;
          text-align: center;
          font: 700 17px/1.3 Arial, Helvetica, sans-serif;
        }
        #fotos-casamento-lb .lb-callout strong { font-weight: 800; }
        #fotos-casamento-lb .lb-down { color: var(--lb-marsala); font-size: 24px; line-height: 1; }
        #fotos-casamento-lb .lb-choices {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          width: 100%;
          min-width: 0;
          gap: 18px;
          margin: 18px auto 24px;
        }
        #fotos-casamento-lb .lb-card {
          display: flex;
          flex-direction: column;
          min-width: 0;
          padding: 23px;
          background: #fff;
          border: 2px solid #dec4cb;
          border-radius: 20px;
          box-shadow: 0 10px 24px #54203013;
          color: var(--lb-ink);
        }
        #fotos-casamento-lb .lb-card-alt { border-color: #c3919f; }
        #fotos-casamento-lb .lb-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }
        #fotos-casamento-lb .lb-step { color: var(--lb-marsala); font: 800 13px/1.4 Arial, Helvetica, sans-serif; letter-spacing: .1em; }
        #fotos-casamento-lb .lb-emoji { font-size: 36px; line-height: 1.2; }
        #fotos-casamento-lb .lb-card h3 {
          margin: 10px 0 13px;
          padding: 0;
          color: var(--lb-dark);
          font: 600 26px/1.2 Georgia, 'Times New Roman', serif;
          overflow-wrap: normal;
        }
        #fotos-casamento-lb .lb-card p {
          margin: 0 0 12px;
          padding: 0;
          color: var(--lb-ink);
          font: 17px/1.45 Arial, Helvetica, sans-serif;
        }
        #fotos-casamento-lb .lb-card .lb-highlight { font-weight: 700; }
        #fotos-casamento-lb .lb-card .lb-limits { color: #5f5356; font-size: 14px; }
        #fotos-casamento-lb .lb-action {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          min-height: 72px;
          margin-top: auto;
          padding: 17px 12px;
          background: var(--lb-marsala);
          border-radius: 14px;
          box-shadow: 0 5px 0 var(--lb-dark);
          color: #ffffff !important;
          font: 800 16px/1.35 Arial, Helvetica, sans-serif;
          text-decoration: none !important;
          text-align: center;
        }
        #fotos-casamento-lb .lb-action span { font-size: 26px; }
        #fotos-casamento-lb .lb-action:focus-visible { outline: 4px solid #bc9a4a; outline-offset: 4px; }
        #fotos-casamento-lb .lb-action:hover { background: #541b2e; }
        #fotos-casamento-lb .lb-disabled { background: #6b6466; box-shadow: none; font-size: 14px; }
        #fotos-casamento-lb .lb-help {
          display: block;
          width: 100%;
          padding: 23px 10px 10px;
          border-top: 1px solid #dcbfc6;
          color: var(--lb-ink);
          text-align: center;
        }
        #fotos-casamento-lb .lb-help h2 {
          margin: 0 0 14px;
          color: var(--lb-dark);
          font: 400 28px/1.2 Georgia, 'Times New Roman', serif;
        }
        #fotos-casamento-lb .lb-help p { margin: 9px 0; color: var(--lb-ink); font: 17px/1.5 Arial, Helvetica, sans-serif; }
        #fotos-casamento-lb .lb-help .lb-help-small { margin-top: 14px; color: #695e61; font-size: 15px; }
        #fotos-casamento-lb .lb-goodbye {
          display: block;
          width: 100%;
          margin: 23px auto 0;
          padding: 20px 18px 16px;
          background: #fff4f5 !important;
          border: 1px solid #e0bec6;
          border-radius: 18px;
          color: var(--lb-dark) !important;
          text-align: center;
        }
        #fotos-casamento-lb .lb-goodbye p {
          margin: 0 0 8px;
          color: var(--lb-dark) !important;
          font: 400 23px/1.35 Georgia, 'Times New Roman', serif;
        }
        #fotos-casamento-lb .lb-goodbye span { display: block; color: var(--lb-marsala) !important; font-size: 27px; line-height: 1; }
        @media (max-width: 680px) {
          #fotos-casamento-lb { padding: 14px 14px 28px; }
          #fotos-casamento-lb .lb-intro { padding: 17px 0 4px; }
          #fotos-casamento-lb .lb-intro h1 { font-size: clamp(32px, 9vw, 43px); }
          #fotos-casamento-lb .lb-intro h2 { font-size: 28px; }
          #fotos-casamento-lb .lb-intro p { font-size: 17px; }
          #fotos-casamento-lb .lb-choices { grid-template-columns: minmax(0, 1fr); gap: 16px; }
          #fotos-casamento-lb .lb-card { padding: 20px; }
          #fotos-casamento-lb .lb-card h3 { font-size: 25px; }
          #fotos-casamento-lb .lb-callout { font-size: 16px; }
          #fotos-casamento-lb .lb-help h2 { font-size: 26px; }
          #fotos-casamento-lb .lb-goodbye p { font-size: 22px; }
        }
        @media (max-width: 360px) {
          #fotos-casamento-lb { padding-left: 10px; padding-right: 10px; }
          #fotos-casamento-lb .lb-intro h1 { font-size: 31px; }
          #fotos-casamento-lb .lb-callout { padding: 11px 7px; gap: 6px; }
        }
      `}</style>
    </main>
  );
}


