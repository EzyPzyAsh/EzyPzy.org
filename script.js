const btn = document.querySelector('.btn');
btn.addEventListener('mouseenter', () => btn.style.transform = 'scale(1.2)');
btn.addEventListener('mouseleave', () => btn.style.transform = 'scale(1)');

const containerFront = document.querySelector('.flutter-container-front');
const containerBack = document.querySelector('.flutter-container-back');

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
    if (Math.random() < 0.5)
	  {
    img.className = 'fluttering-img-front';
    containerFront.appendChild(img);
	  }
    else
    {
	img.className = 'fluttering-img-back';
	containerBack.appendChild(img);
    };
};


// Create Finn link behind everything
const finLink = document.createElement('a');
finLink.href = 'fin.html';
finLink.className = 'fin-link';
finLink.style.position = 'absolute';
finLink.style.left = Math.random() * 100 + 'vw';
finLink.style.top = Math.random() * 80 + 'vh'; // random vertical position
finLink.style.zIndex = '-10'; // behind all other elements
finLink.style.pointerEvents = 'auto'; // clicks *might* work if nothing covers him

// Create Finn image
const finImg = document.createElement('img');
finImg.src = 'fallingFin.png';
finImg.className = 'fin-img';
finImg.style.height = '30px';
finImg.style.zIndex = '-10'; // keep image behind content
finImg.style.pointerEvents = 'none'; // so the link itself can still receive pointer events if uncovered

finLink.appendChild(finImg);
document.body.appendChild(finLink);
document.addEventListener('click', (e) => {
    const rect = finLink.getBoundingClientRect();
    if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
    ) {
        window.location.href = finLink.href;
    }
});

function createDraggableWindow(element, headerElement) {
  headerElement.addEventListener('pointerdown', (e) => {
    if (e.target.tagName === 'BUTTON') return;
    e.preventDefault();
    headerElement.setPointerCapture(e.pointerId);
    const rect = element.getBoundingClientRect();
    const origLeft = rect.left;
    const origTop = rect.top;
    const startX = e.clientX;
    const startY = e.clientY;
    element.style.transform = '';
    element.style.left = origLeft + 'px';
    element.style.top = origTop + 'px';
    function onPointerMove(e) {
      element.style.left = origLeft + (e.clientX - startX) + 'px';
      element.style.top = origTop + (e.clientY - startY) + 'px';
    }
    function onPointerUp(e) {
      headerElement.releasePointerCapture(e.pointerId);
      headerElement.removeEventListener('pointermove', onPointerMove);
      headerElement.removeEventListener('pointerup', onPointerUp);
      headerElement.style.cursor = 'grab';
    }
    headerElement.style.cursor = 'grabbing';
    headerElement.addEventListener('pointermove', onPointerMove);
    headerElement.addEventListener('pointerup', onPointerUp);
  });
}

const sweepericon = document.getElementById('minesweeper');
sweepericon.addEventListener('click', () => {
  const sweeperdiv = document.createElement('div');
  Object.assign(sweeperdiv.style, {
    width: '800px',
    height: '600px',
    border: '4px solid #245DDA',
    position: 'fixed',
    top: '50%',
    left: '50%',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    zIndex: '1000',
    overflow: 'visible'
  });

  const header = document.createElement('div');
  Object.assign(header.style, {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 3px',
    background: '#245DDA',
    cursor: 'grab',
    right: '0',
    height: '30px',
    position: 'absolute',
    top: '0',
    border: '3px solid #245DDA',
    left: '0'
  });

  const leftContainer = document.createElement('div');
  leftContainer.style.display = 'flex';
  leftContainer.style.alignItems = 'center';
  const headerImage = document.createElement('img');
  headerImage.src = 'sweeperBomb.png';
  headerImage.width = 50;
  headerImage.style.marginRight = '0px';
  leftContainer.appendChild(headerImage);
  const headerText = document.createElement('span');
  headerText.textContent = 'Minesweeper';
  headerText.style.color = '#fff';
  headerText.style.fontWeight = 'bold';
  leftContainer.appendChild(headerText);
  header.appendChild(leftContainer);

  const buttonContainer = document.createElement('div');
  buttonContainer.style.display = 'flex';
  buttonContainer.style.gap = '5px';
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '✖';
  Object.assign(closeBtn.style, { background: '#eb4034', color: '#fff', border: 'none', padding: '0 6px', cursor: 'pointer', marginRight: '8px' });
  closeBtn.addEventListener('click', () => sweeperdiv.remove());
  const maxBtn = document.createElement('button');
  maxBtn.textContent = '□';
  Object.assign(maxBtn.style, { background: '#245DDA', color: '#d6d6d6', border: 'none', padding: '0 6px', cursor: 'pointer' });
  maxBtn.addEventListener('click', () => { sweeperdiv.style.width = '1600px'; sweeperdiv.style.height = '1200px'; });
  const minBtn = document.createElement('button');
  minBtn.textContent = '▪';
  Object.assign(minBtn.style, { background: '#245DDA', color: '#d6d6d6', border: 'none', padding: '0 6px', cursor: 'pointer' });
  minBtn.addEventListener('click', () => { sweeperdiv.style.width = '800px'; sweeperdiv.style.height = '600px'; });
  buttonContainer.appendChild(minBtn);
  buttonContainer.appendChild(maxBtn);
  buttonContainer.appendChild(closeBtn);
  header.appendChild(buttonContainer);

  sweeperdiv.appendChild(header);

  const iframe = document.createElement('iframe');
  Object.assign(iframe.style, { width: '100%', height: '100%', border: 'none', position: 'absolute', top: '30px', left: '0' });
  iframe.src = 'minesweeper.html';
  sweeperdiv.appendChild(iframe);

  document.body.appendChild(sweeperdiv);
  createDraggableWindow(sweeperdiv, header);
});

window.addEventListener('DOMContentLoaded', () => {
  const messageDiv = document.createElement('div');
  Object.assign(messageDiv.style, {
    width: '500px',
    height: '300px',
    border: '4px solid #245DDA',
    position: 'fixed',
    top: '15%',
    left: '50%',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    transform: 'translateX(-50%)',
    background: 'white',
    zIndex: '1000',
    overflow: 'visible'
  });

  const header = document.createElement('div');
  Object.assign(header.style, {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 3px',
    background: '#245DDA',
    cursor: 'grab',
    right: '0',
    height: '30px',
    position: 'absolute',
    top: '0',
    border: '3px solid #245DDA',
    left: '0'
  });

  const headerText = document.createElement('span');
  headerText.textContent = 'Message';
  headerText.style.color = '#fff';
  headerText.style.fontWeight = 'bold';
  header.appendChild(headerText);

  const buttonContainer = document.createElement('div');
  buttonContainer.style.display = 'flex';
  buttonContainer.style.gap = '5px';
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '✖';
  Object.assign(closeBtn.style, { background: '#eb4034', color: '#fff', border: 'none', padding: '0 6px', cursor: 'pointer' });
  closeBtn.addEventListener('click', () => messageDiv.remove());
  const maxBtn = document.createElement('button');
  maxBtn.textContent = '□';
  Object.assign(maxBtn.style, { background: '#245DDA', color: '#d6d6d6', border: 'none', padding: '0 6px', cursor: 'pointer' });
  maxBtn.addEventListener('click', () => { messageDiv.style.width = '1000px'; messageDiv.style.height = '600px'; });
  const minBtn = document.createElement('button');
  minBtn.textContent = '▪';
  Object.assign(minBtn.style, { background: '#245DDA', color: '#d6d6d6', border: 'none', padding: '0 6px', cursor: 'pointer' });
  minBtn.addEventListener('click', () => { messageDiv.style.width = '500px'; messageDiv.style.height = '300px'; });
  buttonContainer.appendChild(minBtn);
  buttonContainer.appendChild(maxBtn);
  buttonContainer.appendChild(closeBtn);
  header.appendChild(buttonContainer);

  messageDiv.appendChild(header);

  const content = document.createElement('div');
  content.textContent = `Hello! If any content seems to be missing, please force reload the page!\n
This can be done simply by pressing Ctrl or Cmd (if on Mac) + Shift + R on most browsers.

If that doesn't work for you, google it and I apologise for the inconvenience :P

P.S. I'm draggable and my button works *hint* *hint*`;
  Object.assign(content.style, { padding: '15px', paddingTop: '10%', fontSize: '16px', whiteSpace: 'pre-wrap', wordBreak: 'break-word' });
  messageDiv.appendChild(content);

  document.body.appendChild(messageDiv);
  createDraggableWindow(messageDiv, header);
});

