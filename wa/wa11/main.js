const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const pictures = ['pic1.jpeg', `pic2.jpeg`, `pic3.jpeg`, `pic4.jpeg`, `pic5.jpeg`];

/* Declaring the alternative text for each image file */
const alttext = {
    'pic1.jpeg' : 'A sleeping white cat',
    'pic2.jpeg' : 'Sarah holding a giant crochet garlic head',
    'pic3.jpeg' : 'A silly black cat',
    'pic4.jpeg' : 'A goofy crested gecko',
    'pic5.jpeg' : 'A chonky ceramic toad'
};

/* Looping through images */

for (const picture of pictures) {
    const newPicture = document.createElement('img');
    newPicture.setAttribute('src', `images/${picture}`);
    newPicture.setAttribute('alt', alttext[picture]);
    thumbBar.appendChild(newPicture);
    newPicture.addEventListener('click', value => {
      displayedImage.src = value.target.src;
      displayedImage.alt = value.target.alt;
    });
};

/* Wiring up the Darken/Lighten button */

btn.addEventListener('click', () => {
    const buttonClass = btn.getAttribute('class');
    if (buttonClass === 'dark') {
        btn.setAttribute('class', 'light');
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    }
    else {
        btn.setAttribute('class', 'dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
})
