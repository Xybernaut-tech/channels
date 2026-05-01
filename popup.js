(function () {
  // ─── Inject CSS ───────────────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    #bw-popup-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      opacity: 0;
      transition: opacity 0.35s ease;
    }
    #bw-popup-overlay.bw-visible {
      opacity: 1;
    }
    #bw-popup-box {
      background: linear-gradient(145deg, #1a0a2e, #0d0d1a);
      border: 1px solid rgba(195, 91, 251, 0.25);
      border-radius: 20px;
      padding: 36px 28px 28px;
      width: min(90vw, 380px);
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(166, 0, 255, 0.15);
      transform: translateY(24px) scale(0.97);
      transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease;
      opacity: 0;
      font-family: 'Outfit', 'Segoe UI', sans-serif;
    }
    #bw-popup-overlay.bw-visible #bw-popup-box {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    #bw-popup-box h2 {
      margin: 0 0 12px;
      color: #fff;
      font-size: 1.75rem;
      font-weight: 800;
      text-shadow: 0 0 15px rgba(195, 91, 251, 0.45);
      line-height: 1.2;
    }
    #bw-popup-box p {
      margin: 0 0 22px;
      color: rgba(255, 255, 255, 0.78);
      font-size: 15px;
      line-height: 1.6;
    }
    #bw-popup-box .bw-join-btn,
    #bw-popup-box .bw-close-btn {
      display: block;
      width: 100%;
      padding: 14px;
      margin-top: 10px;
      border: none;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: 'Outfit', 'Segoe UI', sans-serif;
    }
    #bw-popup-box .bw-join-btn {
      background: linear-gradient(135deg, #a600ff, #c35bfb);
      color: #fff;
      box-shadow: 0 4px 15px rgba(166, 0, 255, 0.35);
    }
    #bw-popup-box .bw-join-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(166, 0, 255, 0.55);
    }
    #bw-popup-box .bw-close-btn {
      background: rgba(255, 255, 255, 0.05);
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.12);
    }
    #bw-popup-box .bw-close-btn:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  `;
  document.head.appendChild(style);

  // ─── Inject HTML ──────────────────────────────────────────────────────────
  const overlay = document.createElement('div');
  overlay.id = 'bw-popup-overlay';
  overlay.innerHTML = `
    <div id="bw-popup-box">
      <h2>Support Us!</h2>
      <p>Join our Telegram channel <strong>@axtream_bingewav</strong> for exclusive updates.</p>
      <button class="bw-join-btn" id="bw-join-btn">Join Telegram Now</button>
      <button class="bw-close-btn" id="bw-close-btn">I'm Already Joined</button>
    </div>
  `;
  document.body.appendChild(overlay);

  // ─── Show with animation ──────────────────────────────────────────────────
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.classList.add('bw-visible');
    });
  });

  // ─── Close logic ─────────────────────────────────────────────────────────
  function closeBWPopup() {
    overlay.classList.remove('bw-visible');
    setTimeout(() => overlay.remove(), 350);
  }

  document.getElementById('bw-join-btn').addEventListener('click', () => {
    window.open('https://t.me/axtream_bingewav', '_blank');
    closeBWPopup();
  });

  document.getElementById('bw-close-btn').addEventListener('click', closeBWPopup);

  // Optional: close on overlay backdrop click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeBWPopup();
  });
})();
