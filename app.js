// Rok w stopce
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});

// Zapis/odczyt nicku w nagłówku (localStorage)
(function nickInit(){
  const input = document.getElementById('discordNick');
  const saveBtn = document.getElementById('saveNickBtn');
  const saved = localStorage.getItem('discordNick') || '';
  if (input) input.value = saved;

  // automatyczne podanie nicku do formularza kontaktowego
  const contactNick = document.getElementById('contactNick');
  if (contactNick && saved) contactNick.value = saved;

  if (saveBtn && input) {
    saveBtn.addEventListener('click', () => {
      localStorage.setItem('discordNick', input.value.trim());
      // jeżeli jesteśmy na kontakt – uzupełnij pole
      const c = document.getElementById('contactNick');
      if (c) c.value = input.value.trim();
      saveBtn.classList.add('saved');
      saveBtn.textContent = 'Zapisano';
      setTimeout(() => { saveBtn.textContent = 'Zapisz'; saveBtn.classList.remove('saved'); }, 1200);
    });
  }
})();

// Filtry i wyszukiwarka (plugins.html)
(function pluginsFilters(){
  const grid = document.getElementById('pluginGrid');
  const search = document.getElementById('search');
  const chips = document.querySelectorAll('.chip');

  if (!grid) return;

  function apply() {
    const q = (search?.value || '').toLowerCase();
    const activeCat = document.querySelector('.chip.active')?.dataset.cat || 'all';

    grid.querySelectorAll('.plugin-card').forEach(card => {
      const text = card.innerText.toLowerCase();
      const cat = card.dataset.cat;
      const matchText = text.includes(q);
      const matchCat = activeCat === 'all' || cat === activeCat;
      card.style.display = (matchText && matchCat) ? '' : 'none';
    });
  }

  if (search) search.addEventListener('input', apply);
  chips.forEach(ch => ch.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    ch.classList.add('active');
    apply();
  }));
})();

// Formularz kontaktowy (fake submit + link do Discorda)
(function contactForm(){
  const form = document.getElementById('contactForm');
  const btn = document.getElementById('discordBtn');
  const nickInput = document.getElementById('contactNick');

  if (btn) {
    const baseInvite = 'https://discord.com/invite/yourserver'; // <- podmień na swój link
    const nick = localStorage.getItem('discordNick') || '';
    btn.href = baseInvite + (nick ? `?ref=${encodeURIComponent(nick)}` : '');
  }

  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // możesz tu dodać integrację z backendem / webhookiem
    alert('Dziękujemy! Odezwiemy się najszybciej jak to możliwe.');
    if (nickInput?.value) localStorage.setItem('discordNick', nickInput.value);
  });
})();

// Generator QR (qrcode.html)
(function qrInit(){
  const input = document.getElementById('qrInput');
  const btn = document.getElementById('qrBtn');
  const box = document.getElementById('qr');
  const dl = document.getElementById('qrDownload');
  if (!input || !btn || !box) return;

  btn.addEventListener('click', () => {
    const url = input.value.trim();
    if (!url) return alert('Podaj adres URL do wygenerowania QR.');
    box.innerHTML = '';
    const qr = new QRCode(box, { text: url, width: 240, height: 240 });
    // mały timeout aż canvas się narysuje
    setTimeout(() => {
      const img = box.querySelector('img') || box.querySelector('canvas');
      if (!img) return;
      let data;
      if (img.tagName === 'IMG') data = img.src;
      else data = img.toDataURL('image/png');
      if (dl) {
        dl.href = data;
        dl.style.display = 'inline-flex';
      }
    }, 150);
  });
})();
