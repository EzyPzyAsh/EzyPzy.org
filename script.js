const btn = document.querySelector('.btn');

btn.addEventListener('mouseenter', () => {
  btn.style.transform = 'scale(1.2)';
});

btn.addEventListener('mouseleave', () => {
  btn.style.transform = 'scale(1)';
});

const container = document.querySelector('.flutter-container');

for (let i = 0; i < 20; i++) {
  const img = document.createElement("img");
  const randomIdx = Math.floor(Math.random() * 8) + 1;
  img.src = randomIdx + ".png";

  img.style.position = 'absolute';
  img.style.width = (30 + Math.random() * 30) + 'px';
  img.style.height = (30 + Math.random() * 30) + 'px';
  img.style.left = Math.random() * 100 + 'vw';
  img.style.top = '-50px';
  img.style.pointerEvents = 'none';

  const duration = Math.random() * 5 + 5;
  img.style.animation = `flutter ${duration}s linear infinite`;

  img.className = 'fluttering-img';
  container.appendChild(img);
}

