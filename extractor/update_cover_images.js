import fs from 'fs';

const originalImageMap = {
  'Disaster Vermin': ["image113.png","image114.png","image115.png","image116.png","image117.png"],
  'Esoteric Art': ["image129.jpg","image130.jpg","image131.png","image132.png"],
  'Love Rendezvous': ["image172.png","image173.png"],
  'Moon Dregs': ["image178.png","image179.png","image180.png"],
  'Rot': ["image212.png","image213.png","image214.png","image215.png","image216.png","image217.png"],
  'Schrift X': ["image218.png","image219.png"],
  'Star Dictator': ["image231.png","image232.png","image233.png","image234.png","image235.png"],
  'Tool Manipulation': ["image251.png","image252.png","image253.png"],
  'Centipede Shroud': ["image70.png","image71.png"]
};

// Target image 1-based index according to user requests
const targetImageIndices = {
  'Disaster Vermin': 4,   // -> image116.png
  'Esoteric Art': 2,      // -> image130.jpg
  'Love Rendezvous': 2,   // -> image173.png
  'Moon Dregs': 3,        // -> image180.png
  'Rot': 5,               // -> image216.png
  'Schrift X': 2,         // -> image219.png
  'Star Dictator': 2,     // -> image232.png
  'Tool Manipulation': 2, // -> image252.png
  'Centipede Shroud': 2   // -> image71.png
};

const filePaths = ['src/data/techniques.json', 'data/techniques.json'];

filePaths.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  const techs = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  Object.entries(targetImageIndices).forEach(([name, targetNum]) => {
    const t = techs.find(x => x.name.toLowerCase() === name.toLowerCase());
    if (t) {
      const origList = originalImageMap[name];
      const chosenImg = origList[targetNum - 1];
      
      // Keep all original images, but put chosenImg first
      t.images = [chosenImg, ...origList.filter(img => img !== chosenImg)];
      t.coverImage = chosenImg;
      console.log(`[${filePath}] ${name} -> Cover: ${chosenImg} (image #${targetNum}), Total images: ${t.images.length}`);
    } else {
      console.warn(`[${filePath}] Could not find ${name}`);
    }
  });

  fs.writeFileSync(filePath, JSON.stringify(techs, null, 2), 'utf-8');
});
