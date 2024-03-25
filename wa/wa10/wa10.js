const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

const storyText = 'Bob wanted to make candy, specifically :insertx:. First, Bob heated up 300 pounds of sugar to 94 fahrenheit and added :inserty:. After letting it cool, the candy tasted like :insertz:, but at least Bob tried something new.'
const insertX = ['candy canes', 'lollipops', 'lemon drops']
const insertY = ['red food coloring', 'black sparkles', 'blueberry flavoring']
const insertZ = ['burnt popcorn', 'balsamic vinegar', 'rubber tires']

randomize.addEventListener('click', result);

function result() {
    let newStory = storyText;

    let xItem = randomValueFromArray(insertX);
    let yItem = randomValueFromArray(insertY);
    let zItem = randomValueFromArray(insertZ);

    newStory = newStory
        .replaceAll(':insertx:', xItem)
        .replaceAll(':inserty:', yItem)
        .replaceAll(':insertz:', zItem);

  if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replaceAll('Bob', name);

  }

  if(document.getElementById("uk").checked) {
    const weight = `${Math.round(300*0.0714286)} stone`;
    const temperature =  `${Math.round((94-32)*5/9)} centigrade`;
    newStory = newStory.replaceAll('300 pounds', weight);
    newStory = newStory.replaceAll('94 fahrenheit', temperature);

  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}