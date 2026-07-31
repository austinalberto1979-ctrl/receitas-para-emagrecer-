(function(){
  // Prazo absoluto da promoção: 1 de Agosto de 2026, 23:59:59, fuso de Moçambique (UTC+2).
  const deadline = new Date('2026-08-01T23:59:59+02:00').getTime();
  const pad = n => String(Math.max(0, n)).padStart(2, '0');

  function setUnit(unit, value){
    document.querySelectorAll('[data-unit="' + unit + '"]').forEach(el => el.textContent = pad(value));
  }

  function endPromotion(){
    document.querySelectorAll('.countdown').forEach(el => {
      el.innerHTML = '<div class="expired-message">A promoção terminou. Consulte o preço actual no botão abaixo.</div>';
    });
    document.querySelectorAll('[data-promo-price]').forEach(el => el.textContent = 'US$ 20');
    document.querySelectorAll('[data-old-price]').forEach(el => el.style.display = 'none');
    document.querySelectorAll('[data-discount]').forEach(el => el.textContent = 'Promoção encerrada');
    document.querySelectorAll('[data-expiry-copy]').forEach(el => el.textContent = 'O prazo promocional terminou em 1 de Agosto de 2026 às 23:59.');
    document.querySelectorAll('.promo-live').forEach(el => {
      if (el.classList.contains('promo-top')) el.innerHTML = 'A promoção de lançamento terminou. Consulte o valor actual no checkout.';
      else el.style.display = 'none';
    });
    document.querySelectorAll('[data-cta]').forEach(el => {
      el.textContent = 'Ver preço actual no checkout';
      el.classList.remove('pulse');
    });
    const headline = document.querySelector('[data-cta-headline]');
    if (headline) headline.textContent = 'A promoção terminou, mas ainda pode começar hoje.';
    const urgency = document.querySelector('[data-urgency-copy]');
    if (urgency) urgency.textContent = 'Clique abaixo para consultar o preço actual e receber o e-book pela Hotmart.';
  }

  function updateCountdown(){
    const remaining = deadline - Date.now();
    if (remaining <= 0){
      endPromotion();
      return false;
    }
    const days = Math.floor(remaining / 86400000);
    const hours = Math.floor((remaining % 86400000) / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    setUnit('days', days);
    setUnit('hours', hours);
    setUnit('minutes', minutes);
    setUnit('seconds', seconds);
    return true;
  }

  if (updateCountdown()){
    const timer = setInterval(() => {
      if (!updateCountdown()) clearInterval(timer);
    }, 1000);
  }
})();
