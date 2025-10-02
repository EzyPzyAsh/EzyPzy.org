// ----------------------------
// Button hover effect
// ----------------------------
const btn = document.querySelector('.btn');
btn.addEventListener('mouseenter', () => btn.style.transform = 'scale(1.2)');
btn.addEventListener('mouseleave', () => btn.style.transform = 'scale(1)');

// ----------------------------
// Fluttering images
// ----------------------------
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


const finLink = document.createElement('a');
finLink.href = 'fin.html';
finLink.width = '100px';
finLink.height = '100px';
finLink.style.left = Math.random() * 100 + 'vw';

finLink.className = 'fin-link';
finLink.style.pointerEvents = 'auto';

const finImg = document.createElement('img');
finImg.src = 'fallingFin.png';
finImg.className = 'fin-img';
finLink.appendChild(finImg);

document.body.appendChild(finLink);
// ----------------------------
// Minesweeper draggable popup
// ----------------------------
const sweepericon = document.getElementById('minesweeper');

sweepericon.addEventListener('click', () => {
	// Main window
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

	// Header (draggable)
	const header = document.createElement('div');

	Object.assign(header.style, {
	    display: 'flex',           // use flexbox
	    alignItems: 'center',      // vertical centering
	    justifyContent: 'space-between', // space between left (icon+text) and right (buttons)
	    padding: '0 3px',         // horizontal padding
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
	headerImage.width = 50;          // reasonable icon size
	headerImage.style.marginRight = '0px';
	leftContainer.appendChild(headerImage);

	const headerText = document.createElement('span');
	headerText.textContent = 'Minesweeper';
	headerText.style.color = '#fff';
	headerText.style.fontWeight = 'bold';
	leftContainer.appendChild(headerText);

	header.appendChild(leftContainer);


	// Buttons container
	const buttonContainer = document.createElement('div');
	buttonContainer.style.display = 'flex';
	buttonContainer.style.gap = '5px';


	// Close button
	const closeBtn = document.createElement('button');
	closeBtn.textContent = '✖';
	Object.assign(closeBtn.style, {
		background: '#eb4034',
		color: '#fff',
		border: 'none',
		padding: '0 6px',
		cursor: 'pointer',
		marginRight: "8px"
	});
	closeBtn.addEventListener('click', () => sweeperdiv.remove());

	// Maximize button
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

	// Minimize button
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

	// Iframe for Minesweeper
	const sweeperpage = document.createElement('iframe');
	Object.assign(sweeperpage.style, {
		width: '100%',
		height: '100%',
		border: 'none',
		position: 'absolute',
		top: '30px',
		left: '0'
	});
	sweeperpage.src = 'minesweeper.html';
	sweeperdiv.appendChild(sweeperpage);

	document.body.appendChild(sweeperdiv);

	// ----------------------------
	// Draggable logic
	// ----------------------------
	header.addEventListener('pointerdown', (e) => {
		e.preventDefault();
		header.setPointerCapture(e.pointerId);

		const rect = sweeperdiv.getBoundingClientRect();
		const origLeft = rect.left;
		const origTop = rect.top;
		const startX = e.clientX;
		const startY = e.clientY;

		// Remove initial translate
		sweeperdiv.style.transform = '';
		sweeperdiv.style.left = origLeft + 'px';
		sweeperdiv.style.top = origTop + 'px';

		function onPointerMove(e) {
			sweeperdiv.style.left = origLeft + (e.clientX - startX) + 'px';
			sweeperdiv.style.top = origTop + (e.clientY - startY) + 'px';
		}

		function onPointerUp(e) {
			header.releasePointerCapture(e.pointerId);
			header.removeEventListener('pointermove', onPointerMove);
			header.removeEventListener('pointerup', onPointerUp);
			header.style.cursor = 'grab';
		}

		header.style.cursor = 'grabbing';
		header.addEventListener('pointermove', onPointerMove);
		header.addEventListener('pointerup', onPointerUp);
	});
});

