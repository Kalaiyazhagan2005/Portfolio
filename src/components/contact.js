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

  // Interactive Contact Form Handling (Delivers directly to kalaiyazhagan34@gmail.com)
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span>Sending to Email...</span>`;
      submitBtn.disabled = true;

      const name = document.getElementById('contact-name')?.value || '';
      const email = document.getElementById('contact-email')?.value || '';
      const subject = document.getElementById('contact-subject')?.value || '';
      const message = document.getElementById('contact-message')?.value || '';

      try {
        const response = await fetch('https://formsubmit.co/ajax/kalaiyazhagan34@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            subject,
            message,
            _subject: `New Portfolio Inquiry from ${name} (${subject})`
          })
        });

        if (response.ok) {
          submitBtn.innerHTML = `<span>✓ Inquiry Sent to Email!</span>`;
          submitBtn.style.background = '#10b981';
          submitBtn.style.color = '#ffffff';
          showToast("Inquiry delivered directly to Kalaiyazhagan's inbox! I'll reply within 24 hours.");
          form.reset();
        } else {
          throw new Error('FormSubmit error');
        }
      } catch (err) {
        // Direct Email Fallback
        const mailtoUrl = `mailto:kalaiyazhagan34@gmail.com?subject=${encodeURIComponent(`[Portfolio Inquiry] ${subject}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nRequirements / Message:\n${message}`)}`;
        window.open(mailtoUrl, '_blank');
        submitBtn.innerHTML = `<span>✓ Opened in Email App</span>`;
        submitBtn.style.background = '#0284c7';
        submitBtn.style.color = '#ffffff';
        showToast("Opened your email app addressed to kalaiyazhagan34@gmail.com");
      }

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.style.color = '';
        submitBtn.disabled = false;
      }, 5000);
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
