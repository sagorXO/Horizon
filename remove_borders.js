const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dirs = [
  'src/components',
  'src/app'
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Remove border classes from className strings
      // We look for patterns like border, border-t, border-b, border-x, border-y, border-white/10, border-[#38BDF8]/20, etc.
      content = content.replace(/\bborder-(x|y|t|b|l|r|white|black|transparent|\[[^\]]+\])(-\w+)*(\/[0-9]+)?\b/g, '');
      content = content.replace(/\bborder\b(?!-)/g, ''); // match "border" exactly, but not "border-radius" (wait, className="border-radius"? No, but let's be careful)
      
      // Also apply background color shifts to delimiters
      // 'bg-[#050507]', 'bg-[#000000]'
      // Let's replace 'bg-[#000000]' with 'bg-[#050507]' on sections that need shifts?
      // "Use subtle background color shifts... to delimit sections cleanly"
      // If a section had border-b, maybe it needs a bg shift.
      
      // Clean up multiple spaces
      content = content.replace(/className="([^"]*)"/g, (match, p1) => {
          let cleaned = p1.replace(/\s+/g, ' ').trim();
          return `className="${cleaned}"`;
      });
      content = content.replace(/className='([^']*)'/g, (match, p1) => {
          let cleaned = p1.replace(/\s+/g, ' ').trim();
          return `className='${cleaned}'`;
      });
      content = content.replace(/className=\{`([^`]+)`\}/g, (match, p1) => {
          let cleaned = p1.replace(/\s+/g, ' ').trim();
          return `className={\`${cleaned}\`}`;
      });

      fs.writeFileSync(fullPath, content);
    } else if (fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/^\s*border:\s*[^;]+;/gm, '');
      fs.writeFileSync(fullPath, content);
    }
  }
}

for (const dir of dirs) {
  processDir(dir);
}
