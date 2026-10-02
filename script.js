const copyEmail = document.querySelector('[data-copy-email]');
const email = 'kokz.studio@gmail.com';

async function copyText(value) {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const helper = document.createElement('textarea');
  helper.value = value;
  helper.setAttribute('readonly', '');
  helper.style.position = 'fixed';
  helper.style.opacity = '0';
  document.body.appendChild(helper);
  helper.select();
  document.execCommand('copy');
  helper.remove();
}

copyEmail?.addEventListener('click', async () => {
  await copyText(email);

  const original = copyEmail.innerHTML;
  copyEmail.innerHTML = '<i data-lucide="check"></i> 복사됨';
  window.lucide?.createIcons();

  window.setTimeout(() => {
    copyEmail.innerHTML = original;
    window.lucide?.createIcons();
  }, 1400);
});

window.addEventListener('DOMContentLoaded', () => window.lucide?.createIcons());
