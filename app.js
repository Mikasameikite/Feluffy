// ============================================
// FELUFFY BOOKSTORE — Data, Search, Routing
// ============================================

// ===== BOOK DATA =====
// To add a new book:
//   1. Add cover image to assets/covers/
//   2. Add preview image to assets/previews/
//   3. Add an entry below
// Links: update amazon/kofi per book
const BOOKS = [
  {
    id: 'bee-adventures',
    title: 'Bee Adventures',
    subtitle: 'A Whimsical Coloring Journey',
    cover: 'assets/covers/bee-adventures.png',
    preview: 'assets/previews/bee-adventures.jpg',
    description: 'Join a cheerful little bee on a whimsical coloring journey through flower-filled gardens and buzzing adventures! This interactive coloring book features hidden Easter eggs on every page, fun detective mysteries, musical scenes, and airship expeditions. Color, giggle, and explore — perfect for kids and adults who love cute kawaii art and relaxing creative time.',
    tags: ['new', 'animals', 'cozy', 'interactive'],
    amazon: 'https://www.amazon.pl/Bee-Adventures-Whimsical-Coloring-Journey/dp/B0FXG7SK6X',
    kofi: 'https://ko-fi.com/s/74330e8f15'
  },
  {
    id: 'spooky-colouring-adventures',
    title: 'Spooky Colouring Adventures',
    subtitle: 'A Ghoulishly Fun Colouring Book',
    cover: 'assets/covers/spooky-colouring-adventures.jpg',
    preview: 'assets/previews/spooky-colouring-adventures.jpg',
    description: 'A ghoulishly fun colouring book packed with 36 adorable spooky illustrations! Cute ghosts having tea parties, friendly pumpkins, playful skeletons, cozy fireplace scenes, and charming Halloween adventures await your colours. Grab your crayons and bring these charmingly spooky characters to life — perfect for Halloween lovers of all ages.',
    tags: ['new', 'bestsellers', 'holidays', 'cozy'],
    amazon: 'https://www.amazon.pl/Spooky-Colouring-Adventures-Ghoulishly-Halloween/dp/B0FTXSNPDG',
    kofi: 'https://ko-fi.com/s/d1b9329bb3'
  },
  {
    id: 'funny-literal',
    title: 'Funny & Literal',
    subtitle: 'Cute and silly',
    cover: 'assets/covers/funny-literal.png',
    preview: 'assets/previews/funny-literal-inside.png',
    description: 'Funny & Literal Coloring Adventure brings 10+ playful animal puns - like Catfish, Dragonfly, and Hotdog to life. Plus 2 additional wheres Whiskers puzzle pages.',
    tags: ['new', 'animals', 'cozy', 'interactive'],
    kofi: 'https://ko-fi.com/s/33c2824753'
  },
  {
    id: 'Fantasy-Hunt',
    title: 'Fantasy Hunt',
    subtitle: 'Tiny Worlds, Big Stories',
    cover: 'assets/covers/Fantasy-Hunt.png',
    preview: 'assets/previews/Fantasy-Hunt.png',
    description: 'Step into a world of intricate details and endless creativity, where every page tells a story waiting to be brought to life. Tiny Worlds, Big Stories is a highly detailed and imaginative coloring book filled with miniature societies, mythical creatures, and surreal dreamscapes, all crafted for maximum coloring potential.',
    tags: ['animals'],
    amazon: 'https://www.amazon.pl/Fantasy-Hunt-Tiny-Worlds-Stories/dp/B0F7J4CHJW',
    kofi: 'https://ko-fi.com/s/662c95658e'
  },
  {
    id: 'Ginger',
    title: 'Ginger & Felixettes Christmas Adventure',
    subtitle: 'Festive Scenes for the Holidays',
    cover: 'assets/covers/Ginger.png',
    preview: 'assets/previews/Ginger.png',
    description: 'This festive coloring book follows a cheerful gingerbread man through snowy villages, warm kitchens, sparkling streets, and holiday moments full of joy. Across dozens of hand-crafted scenes, you’ll find playful Christmas settings designed to relax, inspire creativity, and bring the holiday spirit to life. A curious black cat appears in select illustrations, adding a touch of charm and surprise.',
    tags: ['new', 'animals', 'cozy', 'holidays', 'bestsellers'],
    amazon: 'https://www.amazon.pl/Ginger-Felixettes-Christmas-Adventure-Celebrate/dp/B0G6Z6Z37M',
  },
];

// ===== STATE =====
let currentFilter = 'all';
let searchQuery = '';

// ===== FILTERING =====
function getFilteredBooks() {
  let books = BOOKS;
  if (currentFilter !== 'all') {
    books = books.filter(b => b.tags.includes(currentFilter));
  }
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    books = books.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.subtitle.toLowerCase().includes(q) ||
      b.tags.some(t => t.toLowerCase().includes(q))
    );
  }
  return books;
}

// ===== RENDER: Book Grid =====
function renderBooksGrid() {
  const grid = document.getElementById('books-grid');
  const books = getFilteredBooks();
  if (books.length === 0) {
    grid.innerHTML = '<div class="no-results"><span class="no-results-icon">📚</span><p>No books match your search</p></div>';
    return;
  }
  grid.innerHTML = books.map(book => `
    <a href="#book/${book.id}" class="book-card" id="card-${book.id}">
      <div class="book-wrapper">
        <div class="book-cover-face">
          <img src="${book.cover}" alt="${book.title}" loading="lazy">
        </div>
        <div class="book-inside">
          <img src="${book.preview}" alt="${book.title} preview" loading="lazy">
        </div>
      </div>
      <div class="book-info">
        <div class="book-title">${book.title}</div>
      </div>
    </a>
  `).join('');
}

// ===== RENDER: New Drops =====
function renderDropsGrid() {
  const grid = document.getElementById('drops-grid');
  grid.innerHTML = BOOKS.map(book => {
    const displayTag = book.tags.find(t => !['new', 'bestsellers'].includes(t)) || book.tags[0];
    return `
    <a href="#book/${book.id}" class="drop-card" id="drop-${book.id}">
      <div class="drop-cover">
        <img src="${book.cover}" alt="${book.title}" loading="lazy">
      </div>
      <div class="drop-info">
        <div class="drop-title">${book.title}</div>
        <div class="drop-tag">${displayTag}</div>
      </div>
    </a>`;
  }).join('');
}

// ===== RENDER: Featured Book =====
function renderFeaturedBook() {
  const featured = BOOKS.find(b => b.tags.includes('bestsellers')) || BOOKS[0];
  const container = document.getElementById('spotlight-book-container');
  container.innerHTML = `
    <a href="#book/${featured.id}" class="spotlight-book-link">
      <div class="book-wrapper book-wrapper-featured">
        <div class="book-cover-face">
          <img src="${featured.cover}" alt="${featured.title}">
        </div>
        <div class="book-inside">
          <img src="${featured.preview}" alt="${featured.title} preview">
        </div>
      </div>
    </a>
  `;
  const hook = document.querySelector('.spotlight-hook p');
  if (hook) hook.textContent = `"${featured.subtitle}"`;
  const btnA = document.getElementById('btn-amazon');
  const btnK = document.getElementById('btn-kofi');
  if (btnA) btnA.href = featured.amazon;
  if (btnK) btnK.href = featured.kofi;
}

// ===== RENDER: Sample Books =====
function renderSampleBooks() {
  const container = document.getElementById('sample-books-container');
  if (!container) return;
  const rotations = [-6, 3, -2];
  container.innerHTML = BOOKS.slice(0, 3).map((book, i) => `
    <a href="#book/${book.id}" class="sample-book" style="transform: rotate(${rotations[i] || 0}deg);${i > 0 ? ' margin-left: -20px;' : ''}">
      <img src="${book.cover}" alt="${book.title}">
    </a>
  `).join('');
}

// ===== TABS =====
function setActiveTab(tagId) {
  currentFilter = tagId;
  document.querySelectorAll('.category-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tag === tagId);
  });
  renderBooksGrid();
}

// ===== SEARCH =====
function handleSearch(e) {
  searchQuery = e.target.value;
  renderBooksGrid();
}

// ===== ROUTING =====
function getRoute() {
  const hash = window.location.hash.slice(1);
  if (!hash || hash === '/') return { view: 'home' };
  if (hash.startsWith('book/')) return { view: 'book', id: hash.slice(5) };
  return { view: 'page', page: hash };
}

function navigate() {
  const route = getRoute();
  document.getElementById('home-view').style.display = route.view === 'home' ? '' : 'none';
  document.getElementById('book-view').style.display = route.view === 'book' ? '' : 'none';
  document.getElementById('page-view').style.display = route.view === 'page' ? '' : 'none';

  if (route.view === 'book') renderBookDetail(route.id);
  if (route.view === 'page') renderSupportPage(route.page);
  window.scrollTo(0, 0);
}

// ===== RENDER: Book Detail =====
function renderBookDetail(bookId) {
  const book = BOOKS.find(b => b.id === bookId);
  const el = document.getElementById('book-view');
  if (!book) {
    el.innerHTML = '<div class="section-container" style="padding:60px 20px"><h1>Book not found</h1><a href="#" class="back-btn">← Back to Store</a></div>';
    return;
  }
  const displayTags = book.tags.filter(t => !['new', 'bestsellers'].includes(t));
  el.innerHTML = `
    <div class="book-detail">
      <div class="section-container">
        <a href="#" class="back-btn">← Back to Store</a>
        <div class="book-detail-hero">
          <div class="book-detail-cover">
            <div class="book-wrapper book-wrapper-detail">
              <div class="book-cover-face">
                <img src="${book.cover}" alt="${book.title}">
              </div>
              <div class="book-inside">
                <img src="${book.preview}" alt="Inside preview">
              </div>
            </div>
          </div>
          <div class="book-detail-info">
            <h1>${book.title}</h1>
            <p class="book-detail-subtitle">${book.subtitle}</p>
            <p class="book-detail-desc">${book.description}</p>
            <div class="book-detail-tags">
              ${displayTags.map(t => `<span class="tag-pill">${t}</span>`).join('')}
            </div>
            <div class="book-detail-buttons">
              <a href="${book.amazon}" class="btn-buy btn-buy-amazon" target="_blank" rel="noopener">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.045 18.02c.07-.116.36-.172.53-.127.19.05.37.116.55.2.52.25 1.01.49 1.55.68a14.6 14.6 0 004.65 1.13c3.15.28 6.15-.46 8.95-2.08.12-.07.25-.15.38-.2.17-.07.3.02.33.2.03.15-.02.3-.13.42-.7.75-1.55 1.35-2.47 1.84a14.4 14.4 0 01-8.3 1.65c-1.7-.2-3.33-.67-4.85-1.42-.38-.18-.73-.4-1.08-.62-.1-.06-.17-.13-.14-.23z"/><path d="M6.09 16.5c.13-.2.34-.18.52-.1.64.3 1.3.53 2 .7 2.18.53 4.3.4 6.35-.47.22-.1.42-.22.64-.3.2-.07.34.04.3.26-.03.12-.1.24-.2.33a8.86 8.86 0 01-4.43 2.14c-1.46.2-2.87.05-4.22-.53-.3-.13-.58-.3-.85-.48-.07-.05-.14-.12-.1-.23l-.01.68z"/></svg>
                Buy Physical Copy
              </a>
              <a href="${book.kofi}" class="btn-buy btn-buy-kofi" target="_blank" rel="noopener">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.88 8.4c-.04-.62-.2-1.2-.46-1.74-.56-1.18-1.5-1.88-2.72-2.22-.6-.18-1.22-.2-1.84-.16-.22.02-.43.04-.65.08h-.48c-.07-.02-.2-.04-.3-.07H6.16c-.14 0-.28.02-.42.05-1.08.14-1.9.7-2.46 1.62-.38.63-.56 1.33-.6 2.07-.03.57.03 1.14.1 1.7.2 1.48.68 2.86 1.42 4.14.58 1 1.32 1.86 2.22 2.58.56.45 1.17.8 1.84 1.06.3.12.6.2.92.25l.18.03h5.1c.2-.03.4-.05.58-.1 1.16-.27 2.04-.94 2.68-1.96.23-.37.42-.76.57-1.17l.03-.07c.24.02.46.05.7.05.56 0 1.1-.12 1.62-.36 1.06-.5 1.72-1.32 2-2.46.16-.65.2-1.3.12-1.97z"/></svg>
                Buy Digital Version
              </a>
            </div>
          </div>
        </div>
        <div class="book-detail-preview">
          <h2>📖 Inside Preview</h2>
          <div class="preview-image-container">
            <img src="${book.preview}" alt="${book.title} inside preview">
          </div>
        </div>
      </div>
    </div>
  `;
}

// ===== RENDER: Support Pages =====
function renderSupportPage(page) {
  const pages = {
    about: {
      title: 'About Feluffy',
      content: `<p>Feluffy creates <strong>playful books you don't just read — you interact with.</strong></p><p>We believe books should be more than something you flip through. Our coloring books, arcade books, and interactive adventures are designed to spark creativity, encourage curiosity, and bring a smile to your face.</p><p>Every illustration is hand-crafted with love, filled with hidden details, Easter eggs, and charming characters that make each page a new discovery.</p><p>Whether you're looking for a relaxing coloring session, a spooky Halloween adventure, or a whimsical journey with adorable bees — Feluffy has something magical waiting for you.</p>`
    },
    contact: {
      title: 'Contact Us',
      content: `<p>Have a question, idea, or just want to say hi? We'd love to hear from you!</p><div class="contact-grid"><div class="contact-card"><span class="contact-icon">📧</span><strong>Email</strong><p>hello@feluffy.com</p></div><div class="contact-card"><span class="contact-icon">🐦</span><strong>Social</strong><p>Follow on <a href="https://x.com" target="_blank">X</a> and <a href="https://pinterest.com" target="_blank">Pinterest</a></p></div><div class="contact-card"><span class="contact-icon">☕</span><strong>Support Us</strong><p><a href="https://ko-fi.com" target="_blank">Buy us a coffee on Ko-fi</a></p></div></div>`
    },
    faq: {
      title: 'Frequently Asked Questions',
      content: `<div class="faq-list"><div class="faq-item"><h3>What kind of books does Feluffy make?</h3><p>We create interactive, playful books including coloring books, arcade-style choose-your-own-adventure books, and activity books — all featuring adorable kawaii-style illustrations!</p></div><div class="faq-item"><h3>Where can I buy Feluffy books?</h3><p>Physical books are available on <a href="https://amazon.com" target="_blank">Amazon</a>. Digital versions can be purchased through <a href="https://ko-fi.com" target="_blank">Ko-fi</a>.</p></div><div class="faq-item"><h3>Are your books suitable for children?</h3><p>Yes! Our books are designed for all ages. The cute kawaii art style appeals to both kids and adults who enjoy creative activities.</p></div><div class="faq-item"><h3>Do you ship internationally?</h3><p>Amazon handles all shipping. Physical copies are available in most countries through your local Amazon marketplace.</p></div><div class="faq-item"><h3>Can I get a refund?</h3><p>For physical books, Amazon's return policy applies. For digital purchases through Ko-fi, please contact us at hello@feluffy.com.</p></div></div>`
    },
    privacy: {
      title: 'Privacy Policy',
      content: `<p><em>Last updated: April 2026</em></p><h3>Information We Collect</h3><p>We collect minimal personal information. When you subscribe to our newsletter, we store your email address. We do not sell or share your data with third parties.</p><h3>Cookies</h3><p>Our website uses no tracking cookies. Any cookies set are essential for site functionality.</p><h3>Third-Party Services</h3><p>Purchases are processed through Amazon and Ko-fi, which have their own privacy policies. We recommend reviewing their terms.</p><h3>Contact</h3><p>For privacy questions, email us at hello@feluffy.com</p>`
    }
  };
  const data = pages[page];
  const el = document.getElementById('page-view');
  if (!data) {
    el.innerHTML = '<div class="section-container" style="padding:60px 20px"><h1>Page not found</h1><a href="#" class="back-btn">← Back to Store</a></div>';
    return;
  }
  el.innerHTML = `
    <div class="support-page">
      <div class="section-container">
        <a href="#" class="back-btn">← Back to Store</a>
        <h1>${data.title}</h1>
        <div class="support-content">${data.content}</div>
      </div>
    </div>
  `;
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderBooksGrid();
  renderDropsGrid();
  renderFeaturedBook();
  renderSampleBooks();

  document.getElementById('search-input').addEventListener('input', handleSearch);

  document.querySelectorAll('.category-tab').forEach(tab => {
    tab.addEventListener('click', () => setActiveTab(tab.dataset.tag));
  });

  window.addEventListener('hashchange', navigate);
  navigate();
});
