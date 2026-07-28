const fs = require('fs');

const files = [
  'src/components/sections/VisionSection.tsx',
  'src/components/sections/AmenitiesSection.tsx',
  'src/components/sections/LocationSection.tsx',
  'src/components/sections/Footer.tsx',
  'src/components/Navigation.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/ -t /g, ' ');
  fs.writeFileSync(file, content);
}

// Update AmenitiesSection to bg-[#050507]
let amenities = fs.readFileSync('src/components/sections/AmenitiesSection.tsx', 'utf8');
amenities = amenities.replace(/bg-\[#000000\]/g, 'bg-[#050507]'); // Maybe only the outer section, let's just do it for all if not an issue. Wait, outer section is fine.
fs.writeFileSync('src/components/sections/AmenitiesSection.tsx', amenities);

// Update Footer to bg-[#050507]
let footer = fs.readFileSync('src/components/sections/Footer.tsx', 'utf8');
footer = footer.replace(/bg-\[#000000\]/, 'bg-[#050507]');
fs.writeFileSync('src/components/sections/Footer.tsx', footer);

