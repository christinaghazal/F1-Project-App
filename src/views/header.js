

export function createHeader() {
  const header = document.createElement('header');
  header.innerHTML = `
    <div class="container">
      <h1>Formula One</h1>
    </div>
  `;

  // Create section element
  const heroSection = document.createElement('section');
  heroSection.id = 'hero';
  heroSection.innerHTML = `
    <div class="container">
      <h1>Formula One</h1>
      <p>The Best Of Formula One</p>
    </div>
  `;

  // Create button element
  const startButton = document.createElement('a');
  startButton.innerText = 'Start App';
  startButton.classList.add('start-button');
  startButton.href = '#formula-block';

  // Append the button to the hero section
  const heroContainer = heroSection.querySelector('.container');
  heroContainer.appendChild(startButton);

  document.body.prepend(header);
  document.body.prepend(heroSection);
}


  


