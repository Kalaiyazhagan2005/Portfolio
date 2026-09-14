import { portfolioData } from '../config/portfolioData.js';

/**
 * Contact & Footer Component
 * Live timezone clock, clipboard email copy with toast, and interactive form.
 */
export function initContact() {
  const emailVal = portfolioData.personal.email;
  const copyBtn = document.querySelector('.copy-email-btn');
  const toast = document.querySelector('.toast-notification');
  const toastText = document.querySelector('.toast-text');
  const form = document.querySelector('.contact-form');
  const submitBtn = document.querySelector('.submit-btn');
  const clockElement = document.getElementById('live-clock-time');

  // Copy Email to Clipboard
  if (copyBtn && toast) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailVal);
        showToast(`Copied ${emailVal} to clipboard`);
      } catch (err) {
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = emailVal;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast(`Copied ${emailVal} to clipboard`);
      }
    });
  }

  function showToast(msg) {
    if (!toast || !toastText) return;
    toastText.textContent = msg;
    toast.classList.add('is-visible');
    setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 3200);
  }

  // Interactive Contact Form Handling
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span>Transmitting...</span>`;
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = `<span>✓ Message Dispatched</span>`;
        submitBtn.style.background = '#78dcff';
        showToast("Inquiry received. I'll get back to you within 24 hours.");
        form.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 4000);
      }, 1000);
    });
  }

  // Live Timezone Clock (Asia/Kolkata IST)
  function updateLiveClock() {
    if (!clockElement) return;
    const now = new Date();
    const options = {
      timeZone: 'Asia/Kolkata',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
    clockElement.textContent = `${timeString} IST (GMT+5:30)`;
  }

  updateLiveClock();
  setInterval(updateLiveClock, 1000);
}
