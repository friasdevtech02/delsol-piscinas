const fs = require('fs');
const path = require('path');

const postsDir = './_posts';
const outputDir = './blog';

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

const files = fs.readdirSync(postsDir, { encoding: 'utf8' }).filter(f => f.endsWith('.md'));

files.forEach(file => {
  let content = fs.readFileSync(path.join(postsDir, file), 'utf8');
  content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return;

  const frontmatter = match[1];
  const body = match[2].trim();

  const get = (key) => {
    const m = frontmatter.match(new RegExp(`^${key}:(.+)$`, 'm'));
    return m ? m[1].trim().replace(/^["']|["']$/g, '') : '';
  };

  const title = get('title');
  const date = get('date');
  const tag = get('tag');
  const excerpt = get('excerpt');
  const slug = file.replace('.md', '');

  let bodyHtml = body
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^\d+\. (.*)$/gm, '<li>$1</li>')
    .replace(/^- (.*)$/gm, '<li>$1</li>')
    .split('\n\n')
    .map(p => p.trim())
    .filter(p => p)
    .map(p => p.startsWith('<') ? p : `<p>${p}</p>`)
    .join('\n');

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} | Del Sol Piscinas Posadas</title>
<meta name="description" content="${excerpt}">
<meta name="keywords" content="${tag} piscinas Posadas, piscinas Misiones, Del Sol Piscinas">
<link rel="canonical" href="https://delsolpiscinas.com.ar/blog/${slug}.html">
<meta name="robots" content="index, follow">
<meta name="geo.region" content="AR-N">
<meta name="geo.placename" content="Posadas, Misiones, Argentina">
<meta property="og:type" content="article">
<meta property="og:url" content="https://delsolpiscinas.com.ar/blog/${slug}.html">
<meta property="og:title" content="${title} | Del Sol Piscinas">
<meta property="og:description" content="${excerpt}">
<meta property="og:image" content="https://delsolpiscinas.com.ar/img/delsol_logo_playa.jpeg">
<meta property="og:locale" content="es_AR">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "${title}",
  "description": "${excerpt}",
  "datePublished": "${date}",
  "author": {
    "@type": "Organization",
    "name": "Del Sol Piscinas y Accesorios"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Del Sol Piscinas y Accesorios",
    "url": "https://delsolpiscinas.com.ar"
  },
  "image": "https://delsolpiscinas.com.ar/img/delsol_logo_playa.jpeg"
}
<\/script>
<link rel="icon" type="image/jpeg" href="../img/delsol_logo_turquesa.jpeg">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../css/styles.css">
<link rel="stylesheet" href="../css/blog.css">
</head>
<body>

<nav>
  <a href="../index.html" class="nav-logo">
    <img src="../img/delsol_logo_turquesa.jpeg" alt="Del Sol Piscinas y Accesorios">
    <span class="nav-nombre">Del Sol</span>
  </a>
  <ul class="nav-links">
    <li><a href="../index.html#servicios">Servicios</a></li>
    <li><a href="../index.html#nosotros">Nosotros</a></li>
    <li><a href="../index.html#blog">Blog</a></li>
    <li><a href="../index.html#contacto" class="nav-cta">Contacto</a></li>
  </ul>
  <button class="hamburger" id="hamburger" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
</nav>

<div class="mobile-menu" id="mobileMenu">
  <a href="../index.html#servicios" class="menu-link">Servicios</a>
  <a href="../index.html#nosotros" class="menu-link">Nosotros</a>
  <a href="../index.html#blog" class="menu-link">Blog</a>
  <a href="../index.html#contacto" class="nav-cta menu-link">Contacto</a>
</div>

<main class="articulo-wrap">
  <div class="articulo-header">
    <div class="breadcrumb">
      <a href="../index.html">Inicio</a> <span>›</span>
      <a href="../index.html#blog">Blog</a> <span>›</span>
      <span>${title}</span>
    </div>
    <p class="blog-tag">${tag}</p>
    <h1>${title}</h1>
    <p class="articulo-intro">${excerpt}</p>
  </div>
  <div class="articulo-body">
    ${bodyHtml}
    <div class="articulo-cta">
      <p>¿Tenés alguna consulta sobre piscinas en Posadas?</p>
      <a href="https://wa.me/543765385003" target="_blank" class="btn-primary">Consultanos por WhatsApp</a>
    </div>
  </div>
</main>

<footer>
  <div class="footer-logo">
    <img src="../img/delsol_logo_turquesa.jpeg" alt="Del Sol Piscinas Posadas">
  </div>
  <p>&copy; 2026 <strong>Del Sol Piscinas y Accesorios</strong> &mdash; Posadas, Misiones</p>
</footer>

<a href="https://wa.me/543765385003" target="_blank" class="wa-float" title="WhatsApp">
  <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.859L.057 23.428a.75.75 0 0 0 .915.915l5.569-1.475A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.703-.528-5.238-1.448l-.374-.223-3.308.876.876-3.308-.223-.374A9.953 9.953 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
</a>
<script src="../js/main.js"></script>
</body>
</html>`;

  fs.writeFileSync(path.join(outputDir, `${slug}.html`), html);
  console.log(`✅ Generado: blog/${slug}.html`);
});

console.log(`\n✅ ${files.length} artículos procesados`);