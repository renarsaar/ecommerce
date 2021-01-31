export default function RippleButton(e) {
  const rect = e.target.getBoundingClientRect();
  const x = e.clientX - (rect.left + 15);
  const y = e.clientY - rect.top;

  let rippleElement = document.createElement('span');
  rippleElement.style.left = x + 'px';
  rippleElement.style.top = y + 'px';

  e.target.appendChild(rippleElement);

  setTimeout(() => {
    rippleElement.remove();
  }, 1000);
}
