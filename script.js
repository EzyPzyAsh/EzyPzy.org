// ----------------------------
// Reusable Draggable Window
// ----------------------------
function createDraggableWindow(element, headerElement) {
  // Add draggable logic to a pre-created window
  headerElement.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    headerElement.setPointerCapture(e.pointerId);

    const rect = element.getBoundingClientRect();
    const origLeft = rect.left;
    const origTop = rect.top;
    const startX = e.clientX;
    const startY = e.clientY;

    // Remove initial translate
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

//minesweeper easter egg
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

  // Left side: icon + text
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

  // Buttons
  const buttonContainer = document.createElement('div');
  buttonContainer.style.display = 'flex';
  buttonContainer.style.gap = '5px';

  const closeBtn = document.createElement('button');
  closeBtn.textContent = '✖';
  Object.assign(closeBtn.style, {
    background: '#eb4034',
    color: '#fff',
    border: 'none',
    padding: '0 6px',
    cursor: 'pointer',
    marginRight: '8px'
  });
  closeBtn.addEventListener('click', () => sweeperdiv.remove());

  const maxBtn = document.createElement('button');
  maxBtn.textContent = '□';
  Object.assign(maxBtn.style, {
    background: '#245DDA',
    color: '#d6d6d6',
    border: 'none',
    padding: '0 6px',
    cursor: 'pointer'
  });
  maxBtn.addEventListener('click', () => {
    sweeperdiv.style.width = '1600px';
    sweeperdiv.style.height = '1200px';
  });

  const minBtn = document.createElement('button');
  minBtn.textContent = '▪';
  Object.assign(minBtn.style, {
    background: '#245DDA',
    color: '#d6d6d6',
    border: 'none',
    padding: '0 6px',
    cursor: 'pointer'
  });
  minBtn.addEventListener('click', () => {
    sweeperdiv.style.width = '800px';
    sweeperdiv.style.height = '600px';
  });

  buttonContainer.appendChild(minBtn);
  buttonContainer.appendChild(maxBtn);
  buttonContainer.appendChild(closeBtn);
  header.appendChild(buttonContainer);

  sweeperdiv.appendChild(header);

  // Iframe content
  const iframe = document.createElement('iframe');
  Object.assign(iframe.style, {
    width: '100%',
    height: '100%',
    border: 'none',
    position: 'absolute',
    top: '30px',
    left: '0'
  });
  iframe.src = 'minesweeper.html';
  sweeperdiv.appendChild(iframe);

  document.body.appendChild(sweeperdiv);

  // Make draggable
  createDraggableWindow(sweeperdiv, header);
});


// Floating Window
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

  const closeBtn = document.createElement('button');
  closeBtn.textContent = '✖';
  Object.assign(closeBtn.style, {background:'#eb4034', color:'#fff', border:'none', padding:'0 6px', cursor:'pointer'});
  closeBtn.addEventListener('click', () => messageDiv.remove());
  header.appendChild(closeBtn);

  messageDiv.appendChild(header);

  const content = document.createElement('div');
  content.textContent = `Hello! If any content seems to be missing, please force reload the page!\n
This can be done simply by pressing Ctrl or Cmd (if on Mac) + Shift + R on most browsers.

If that doesn't work for you, google it and I apologise for the inconvenience :P

P.S. I'm draggable and my button works *hint* *hint*`;
  Object.assign(content.style, {padding: '15px', paddingTop: "10%", fontSize: '16px',
	  			whiteSpace: 'pre-wrap', wordBreak: 'break-word',});
  messageDiv.appendChild(content);

  document.body.appendChild(messageDiv);

  createDraggableWindow(messageDiv, header);
});

