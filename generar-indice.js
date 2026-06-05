const fs = require('fs');
const path = require('path');

const postsDir = './_posts';
const outputFile = './_posts/index.json';

const files = fs.readdirSync(postsDir, { encoding: 'utf8' }).filter(f => f.endsWith('.md'));

console.log('Archivos encontrados:', files);

const posts = files.map(file => {
  let content = fs.readFileSync(path.join(postsDir, file), 'utf8');
  
  // Normalizar saltos de línea de Windows
  content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    console.log('Sin frontmatter:', file);
    console.log('Primeros 100 chars:', JSON.stringify(content.substring(0, 100)));
    return null;
  }

  const frontmatter = match[1];
  const get = (key) => {
    const m = frontmatter.match(new RegExp(`^${key}:(.+)$`, 'm'));
    return m ? m[1].trim().replace(/^["']|["']$/g, '') : '';
  };

  return {
    slug: file.replace('.md', ''),
    title: get('title'),
    date: get('date'),
    tag: get('tag'),
    excerpt: get('excerpt'),
    image: get('image'),
    emoji: get('emoji'),
  };
}).filter(Boolean).sort((a, b) => new Date(b.date) - new Date(a.date));

fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
console.log(`✅ index.json generado con ${posts.length} artículos`);