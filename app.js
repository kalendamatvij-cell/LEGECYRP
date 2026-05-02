// ═══════════════════════════════════════════
//   LEGACY RP — DARK CINEMATIC PORTAL v2.0
// ═══════════════════════════════════════════

// State
let currentPage = 'home';
let fractionsTab = 'fractions';
let isMenuOpen = false;
let isAuthModalOpen = false;
let authMode = 'login';
let expandedNewsId = null;
let searchTerm = '';

// Data
const fractionsDetails = [
  { name: 'СБЛ', icon: '🏴', description: 'Спеціальний Батальйон Ліквідації — елітний підрозділ для виконання спеціальних операцій', status: 'Активний', tab: 'sbl' },
  { name: 'НГЛ', icon: '⚔️', description: 'Національна Гвардія Легіону — основна військова сила для оборони та патрулювання', status: 'Активний', tab: 'ngl' },
  { name: 'НПЛ', icon: '🎖️', description: 'Народна Поліція Легіону — правоохоронний орган для підтримання порядку', status: 'Активний', tab: 'police' },
  { name: 'ВВБП', icon: '💂', description: 'Відділ внутрішньої безпеки — спеціальні війська для захисту важливих об\'єктів', status: 'Активний', tab: 'vvb' },
  { name: 'ДРУ', icon: '🔥', description: 'Державний реєстр угруповань — розвідувальний підрозділ для боротьби з кримінальними організаціями', status: 'Активний', tab: 'criminal' },
];

const newsFull = [
  { id: 7, title: 'Інцидент з мінуванням на заправці "Арес"', excerpt: 'Сьогодні приблизно 20.36 на заправці "Арес" стався інцидент з мінуванням. На місце оперативно прибули голова СБЛ та кілька поліцейських. Під час розмінування трапилась детонація. Є постраждалі: Голова СБЛ госпіталізований, один цивільний.', date: '25 квітня 2026', category: 'Екстрені новини', icon: '🚨', readTime: '2 хв', images: ['https://i.ibb.co/XfwpkLK4/photo-2026-04-24-20-02-56.jpg', 'https://i.ibb.co/RGgWP7zC/photo-2026-04-25-13-56-32.jpg'] },
];

// Navigation
function navigate(page) {
  currentPage = page;
  if (page !== 'fractions') fractionsTab = 'fractions';
  isMenuOpen = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  render();
}

function setFractionsTab(tab) { fractionsTab = tab; render(); }
function toggleMenu() { isMenuOpen = !isMenuOpen; render(); }
function toggleAuthModal(mode) {
  if (mode === undefined) { isAuthModalOpen = !isAuthModalOpen; }
  else { isAuthModalOpen = true; authMode = mode; }
  render();
}
function switchAuthMode(mode) { authMode = mode === 'login' ? 'register' : 'login'; render(); }
function toggleNewsExpanded(id) { expandedNewsId = expandedNewsId === id ? null : id; render(); }
function handleSearch(event) { searchTerm = event.target.value.toLowerCase(); render(); }

// ═══════════════════════════════════════════
// MAIN RENDER
// ═══════════════════════════════════════════
function render() {
  const app = document.getElementById('app');
  const filteredFractions = fractionsDetails.filter(f =>
    f.name.toLowerCase().includes(searchTerm) ||
    f.description.toLowerCase().includes(searchTerm)
  );

  app.innerHTML = `
    <div class="page-wrapper">
      ${renderHeader()}
      <main>
        ${currentPage === 'home'      ? renderHome() : ''}
        ${currentPage === 'fractions' ? renderFractions(filteredFractions) : ''}
        ${currentPage === 'news'      ? renderNews() : ''}
        ${currentPage === 'shop'      ? renderShop() : ''}
      </main>
      <footer>© 2026 LEGACY RP — ALL RIGHTS RESERVED</footer>
      ${isAuthModalOpen ? renderAuthModal() : ''}
    </div>
  `;
}

// ─── HEADER ─────────────────────────────────
function renderHeader() {
  return `
    <header>
      <div class="header-inner">
        <a class="logo" onclick="navigate('home'); return false;" href="#">
          <div class="logo-icon">
            <img src="https://i.ibb.co/PZ247wP2/photo-2026-04-24-18-50-02.jpg" alt="LEGACY RP" />
          </div>
          <div class="logo-text">
            <div class="name">LEGACY RP</div>
            <div class="sub">PREMIUM ROLEPLAY</div>
          </div>
        </a>

        <nav class="desktop">
          ${['home','fractions','news','shop'].map(p => {
            const labels = { home: 'Головна', fractions: 'Фракції', news: 'Новини', shop: 'Магазин' };
            return `<a class="nav-link ${currentPage === p ? 'active' : ''}" onclick="navigate('${p}'); return false;" href="#">${labels[p]}</a>`;
          }).join('')}
        </nav>

        <div class="header-actions">
          <button class="btn-primary" onclick="toggleAuthModal('login')">
            <span>&#9654;</span> Увійти
          </button>
          <button class="mobile-menu-btn" onclick="toggleMenu()">
            ${isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      ${isMenuOpen ? `
        <div class="mobile-nav">
          ${['home','fractions','news','shop'].map(p => {
            const labels = { home: 'Головна', fractions: 'Фракції', news: 'Новини', shop: 'Магазин' };
            return `<a class="nav-link ${currentPage === p ? 'active' : ''}" onclick="navigate('${p}'); return false;" href="#">${labels[p]}</a>`;
          }).join('')}
          <div style="margin-top:12px;">
            <button class="btn-primary" style="width:100%;justify-content:center;" onclick="toggleAuthModal('login')">Увійти</button>
          </div>
        </div>
      ` : ''}
    </header>
  `;
}

// ─── HOME PAGE ───────────────────────────────
function renderHome() {
  return `
    <div>
      <!-- HERO -->
      <div class="hero">
        <div class="hero-bg"></div>
        <div class="hero-grid"></div>
        <div class="hero-content">
          <div class="hero-badge">▶ PREMIUM ROLEPLAY SERVER</div>
          <h1 class="hero-title">LEGACY<br><span class="gold">RP</span></h1>
          <p class="hero-subtitle">Твоя нова історія починається тут. Занурся у світ де кожне рішення має значення.</p>
          <div class="hero-actions">
            <a href="https://www.roblox.com/share?v=v2&code=5ihdm3h6vetvsb" target="_blank" class="btn-primary">▶ ГРАТИ</a>
            <button class="btn-secondary" onclick="navigate('fractions')">ФРАКЦІЇ</button>
            <button class="btn-ghost" onclick="toggleAuthModal('register')">РЕЄСТРАЦІЯ</button>
          </div>
        </div>
        <div class="hero-line"></div>
      </div>

      <!-- STATS -->
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-number">40+</div>
          <div class="stat-label">Активних гравців</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">24/7</div>
          <div class="stat-label">Підтримка</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">100%</div>
          <div class="stat-label">Унікальний контент</div>
        </div>
      </div>

      <div class="divider"></div>

      <!-- FEATURES -->
      <div class="section-header">
        <div class="section-eyebrow">// ЧОМУ LEGACY RP</div>
        <h2 class="section-title">Легкий старт<br>для новачків</h2>
      </div>
      <div class="feature-grid">
        <div class="feature-card animate-in">
          <div class="feature-icon">🎮</div>
          <div class="feature-title">Цікаві системи та роботи</div>
          <p class="feature-desc">Різноманітні системи та роботи для захоплюючого геймплею на кожен смак</p>
        </div>
        <div class="feature-card animate-in delay-1">
          <div class="feature-icon">👥</div>
          <div class="feature-title">Дружня спільнота</div>
          <p class="feature-desc">Досвідчені адміністратори та допоміжний персонал завжди готові допомогти</p>
        </div>
        <div class="feature-card animate-in delay-2">
          <div class="feature-icon">🚀</div>
          <div class="feature-title">Регулярні оновлення</div>
          <p class="feature-desc">Регулярні оновлення, нові івенти та контент для максимального задоволення</p>
        </div>
      </div>

      <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 40px; margin-top: 16px; text-align: center; position: relative; overflow: hidden;">
        <div style="position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,215,0,0.4), transparent);"></div>
        <div style="font-family: var(--font-display); font-size: 36px; letter-spacing: 2px; color: var(--text-primary); margin-bottom: 8px;">Якісний RP процес</div>
        <p style="color: var(--text-secondary); font-size: 16px;">Legacy RP — твоя нова історія починається тут.</p>
      </div>

      <div class="divider"></div>

      <!-- ADMIN RECRUITMENT -->
      <div class="recruitment-block animate-in">
        <div class="recruitment-header">
          <span style="font-size: 28px;">🛠</span>
          <div>
            <div class="recruitment-title">НАБІР В АДМІНІСТРАЦІЮ</div>
            <div style="font-size: 14px; color: var(--text-muted); margin-top: 4px;">Набір в адміністрацію сервера</div>
          </div>
        </div>
        <div class="recruitment-body">
          <div style="font-family: var(--font-mono); font-size: 11px; letter-spacing: 3px; color: var(--text-muted); text-transform: uppercase; margin-bottom: 16px;">// Вимоги</div>
          <ul class="req-list">
            <li>Глибоке розуміння RP</li>
            <li>Вміння відрізняти RP від Non-RP</li>
            <li>Спокійна реакція в конфліктних ситуаціях</li>
            <li>Відсутність Abuse та упередженості</li>
          </ul>
          <ul class="warning-list">
            <li>❗ Адмін не вище за гравця, а відповідальніший</li>
            <li>❗ Адмін-панель заборонено використовувати у власних інтересах</li>
            <li>Буде відбір і перевірка.</li>
          </ul>
          <div class="tg-link-block">
            <span style="font-size: 24px;">📝</span>
            <div>
              <div style="font-size: 13px; color: var(--text-muted); font-family: var(--font-mono); margin-bottom: 4px;">ПОДАТИ ЗАЯВКУ</div>
              <a href="https://t.me/Applyadmin_bot" target="_blank">@Applyadmin_bot</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ─── FRACTIONS PAGE ──────────────────────────
function renderFractions(filteredFractions) {
  return `
    <div>
      <div class="page-hero">
        <div class="section-eyebrow">// СТРУКТУРА</div>
        <h1 class="section-title">ФРАКЦІЇ</h1>
        <p class="section-desc">Офіційні організації та підрозділи LEGACY RP</p>
      </div>

      <div class="tab-bar">
        ${[
          { id: 'fractions', label: '📋 Всі фракції' },
          { id: 'admin',     label: '👑 Адміністрація' },
          { id: 'vvb',       label: '🛡️ ВВБП' },
          { id: 'police',    label: '👮 Поліція' },
          { id: 'ngl',       label: '⚔️ НГЛ' },
          { id: 'sbl',       label: '🏴 СБЛ' },
          { id: 'criminal',  label: '🔥 Кримінал' },
        ].map(t => `
          <button class="tab-btn ${fractionsTab === t.id ? 'active' : ''}" onclick="setFractionsTab('${t.id}')">${t.label}</button>
        `).join('')}
      </div>

      ${fractionsTab === 'fractions' ? `
        <div class="search-wrap">
          <span class="search-icon">🔍</span>
          <input type="text" class="search-input" placeholder="Пошук фракцій..." value="${searchTerm}" oninput="handleSearch(event)" />
        </div>
        <div class="fractions-grid">
          ${filteredFractions.map((f, i) => `
            <div class="fraction-card animate-in" style="animation-delay: ${i * 0.07}s">
              <div class="fraction-header">
                <div class="fraction-icon-wrap">${f.icon}</div>
                <div>
                  <div class="fraction-name">${f.name}</div>
                  <div class="fraction-status">АКТИВНИЙ</div>
                </div>
              </div>
              <div class="fraction-body">
                <p class="fraction-desc">${f.description}</p>
                <button class="btn-ghost" style="width:100%;justify-content:center;" onclick="setFractionsTab('${f.tab}')">
                  ДЕТАЛЬНІШЕ →
                </button>
              </div>
            </div>
          `).join('')}
        </div>
        ${filteredFractions.length === 0 ? `
          <div class="empty-state">
            <div class="icon">🔍</div>
            <p>Фракцій не знайдено</p>
          </div>
        ` : ''}
      ` : ''}

      ${fractionsTab === 'admin'   ? renderAdminContent() : ''}
      ${fractionsTab === 'vvb'     ? renderVVBContent() : ''}
      ${fractionsTab === 'police'  ? renderPoliceContent() : ''}
      ${fractionsTab === 'ngl'     ? renderNGLContent() : ''}
      ${fractionsTab === 'sbl'     ? renderSBLContent() : ''}
      ${fractionsTab === 'criminal'? renderCriminalContent() : ''}
      ${fractionsTab === 'court'   ? renderCourtContent() : ''}
    </div>
  `;
}

// ─── NEWS PAGE ───────────────────────────────
function renderNews() {
  return `
    <div>
      <div class="page-hero">
        <div class="section-eyebrow">// ХРОНІКА</div>
        <h1 class="section-title">НОВИНИ</h1>
      </div>
      <div style="max-width: 760px;">
        ${newsFull.map((item, i) => `
          <div class="news-card animate-in" style="animation-delay: ${i * 0.1}s">
            <div class="news-header">
              <div class="news-meta">
                <span class="news-category">${item.icon} ${item.category}</span>
                <span class="news-date">${item.date}</span>
              </div>
              <h2 class="news-title">${item.title}</h2>
            </div>
            <div class="news-body">
              <p class="news-excerpt">${item.excerpt}</p>
              ${expandedNewsId === item.id && item.images ? `
                <div class="news-images">
                  ${item.images.map(img => `<img src="${img}" alt="Фото новини" />`).join('')}
                </div>
              ` : ''}
              <button class="expand-btn" onclick="toggleNewsExpanded(${item.id})">
                ${expandedNewsId === item.id ? '↑ Згорнути' : '↓ Читати більше'}
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ─── SHOP PAGE ───────────────────────────────
function renderShop() {
  return `
    <div>
      <div class="shop-hero animate-in">
        <div class="section-eyebrow">// НЕРУХОМІСТЬ</div>
        <h1 class="section-title">МАГАЗИН</h1>
        <p class="section-desc" style="margin-top: 12px;">Доступна нерухомість для гравців. Купуй будинки, розвивай бізнес та будуй свою історію.</p>
      </div>

      <div class="section-header" style="margin-top:40px;">
        <div class="section-eyebrow">// ДОСТУПНІ БУДИНКИ</div>
        <h2 class="section-title" style="font-size: 36px;">Оберіть житло</h2>
      </div>

      <!-- House 1 -->
      <div class="house-card animate-in">
        <div class="house-horizontal">
          <img class="house-img" src="https://i.ibb.co/JFxqSZrN/photo-2026-04-25-21-56-19.jpg" alt="Будинок №1" />
          <div class="house-info">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
              <h3 class="house-name">Будинок №1</h3>
              <span class="badge badge-green">ВІЛЬНИЙ</span>
            </div>
            <div class="house-class">Середній клас</div>
            <div class="house-details">
              <div class="house-detail-row">
                <span class="house-detail-label">Ціна</span>
                <span class="house-price">20 000є</span>
              </div>
              <div class="house-detail-row">
                <span class="house-detail-label">Район</span>
                <span class="house-detail-val">За містом</span>
              </div>
              <div class="house-detail-row">
                <span class="house-detail-label">Гараж</span>
                <span class="house-detail-val" style="color: var(--green);">✓ Є</span>
              </div>
            </div>
            <a href="https://t.me/dariysmertnk" target="_blank" class="btn-primary" style="width:100%;justify-content:center;">КУПИТИ</a>
          </div>
        </div>
      </div>

      <!-- House 2 -->
      <div class="house-card animate-in delay-1">
        <div class="house-info" style="padding: 28px;">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
            <h3 class="house-name">Будинок №2</h3>
            <span class="badge badge-gold">ПРЕМІУМ 💎</span>
          </div>
          <div class="house-class">Преміум-клас</div>
          <div class="house-details">
            <div class="house-detail-row">
              <span class="house-detail-label">Ціна</span>
              <span class="house-price">35 000є</span>
            </div>
            <div class="house-detail-row">
              <span class="house-detail-label">Район</span>
              <span class="house-detail-val">За місто</span>
            </div>
            <div class="house-detail-row">
              <span class="house-detail-label">Гараж</span>
              <span class="house-detail-val" style="color: var(--green);">✓ Є</span>
            </div>
            <div class="house-detail-row">
              <span class="house-detail-label">Додатково</span>
              <span class="house-detail-val">Басейн</span>
            </div>
          </div>
          <div class="news-images" style="margin: 20px 0;">
            <img src="https://i.ibb.co/7d54VSK5/photo-2026-04-25-21-57-15.jpg" alt="Будинок №2" />
            <img src="https://i.ibb.co/1JTv7wpv/photo-2026-04-25-21-57-12.jpg" alt="Будинок №2" />
          </div>
          <a href="https://t.me/dariysmertnk" target="_blank" class="btn-primary" style="width:100%;justify-content:center;">КУПИТИ</a>
        </div>
      </div>

      <!-- House 3 -->
      <div class="house-card animate-in delay-2">
        <div class="house-info" style="padding: 28px;">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
            <h3 class="house-name">Будинок №3</h3>
            <span class="badge badge-purple">ЕЛІТНИЙ 🪎</span>
          </div>
          <div class="house-class">Елітний клас</div>
          <div class="house-details">
            <div class="house-detail-row">
              <span class="house-detail-label">Ціна</span>
              <span class="house-price">45 000є</span>
            </div>
            <div class="house-detail-row">
              <span class="house-detail-label">Додатково</span>
              <span class="house-detail-val">Велика територія та дорогий ремонт</span>
            </div>
          </div>
          <div class="news-images" style="margin: 20px 0;">
            <img src="https://i.ibb.co/vC98Kn16/photo-2026-04-25-21-57-55.jpg" alt="Будинок №3" />
            <img src="https://i.ibb.co/5hNfybSG/photo-2026-04-25-21-57-54.jpg" alt="Будинок №3" />
          </div>
          <a href="https://t.me/dariysmertnk" target="_blank" class="btn-primary" style="width:100%;justify-content:center;">КУПИТИ</a>
        </div>
      </div>
    </div>
  `;
}

// ─── AUTH MODAL ──────────────────────────────
function renderAuthModal() {
  return `
    <div class="modal-overlay" onclick="toggleAuthModal()">
      <div class="modal" onclick="event.stopPropagation()">
        <button class="modal-close" onclick="toggleAuthModal()">✕</button>
        <div class="modal-title">${authMode === 'login' ? 'ВХІД' : 'РЕЄСТР'}</div>
        <div class="modal-subtitle">${authMode === 'login' ? 'Увійдіть до свого акаунту' : 'Створіть новий акаунт'}</div>

        ${authMode === 'register' ? `
          <div class="form-group">
            <label class="form-label">Ім'я</label>
            <input type="text" class="form-input" placeholder="Введіть ваше ім'я" />
          </div>
        ` : ''}
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-input" placeholder="example@email.com" />
        </div>
        <div class="form-group">
          <label class="form-label">Пароль</label>
          <input type="password" class="form-input" placeholder="••••••••" />
        </div>
        <button class="btn-primary" style="width:100%;justify-content:center;padding:14px;">
          ${authMode === 'login' ? 'УВІЙТИ' : 'ЗАРЕЄСТРУВАТИСЯ'}
        </button>
        <div class="modal-switch">
          ${authMode === 'login'
            ? `Немає акаунту? <button onclick="switchAuthMode()">Зареєструватися</button>`
            : `Вже є акаунт? <button onclick="switchAuthMode()">Увійти</button>`
          }
        </div>
      </div>
    </div>
  `;
}

// ─── COURT CONTENT ───────────────────────────
function renderCourtContent() {
  return `
    <div class="detail-page animate-in">
      <div class="detail-hero blue-tint">
        <div class="detail-hero-title">⚖️ ПРАВИЛА СУДУ</div>
        <p class="detail-hero-desc">Загальні правила та процедури судової системи LEGACY RP</p>
      </div>

      <div class="content-block">
        <div class="content-block-title">📜 Загальні правила сервера</div>
        <ul class="rule-list">
          <li><span class="rule-num">01</span> <span><strong>Повага:</strong> Заборонено образи, дискримінація, токсична поведінка.</span></li>
          <li><span class="rule-num">02</span> <span><strong>RP-поведінка:</strong> Всі дії повинні відповідати RolePlay концепції. NonRP дії заборонені.</span></li>
          <li><span class="rule-num">03</span> <span><strong>Метагеймінг (MG):</strong> Заборонено використовувати інформацію з OOC в RP.</span></li>
          <li><span class="rule-num">04</span> <span><strong>Повергеймінг (PG):</strong> Заборонено нереалістичні дії, що дають несправедливу перевагу.</span></li>
          <li><span class="rule-num">05</span> <span><strong>DM/RDM:</strong> Заборонено вбивства без RP причини.</span></li>
          <li><span class="rule-num">06</span> <span><strong>Чітинг:</strong> Використання будь-яких чітів, скриптів, експлойтів суворо заборонено.</span></li>
          <li><span class="rule-num">07</span> <span><strong>Адміністрація:</strong> Рішення адміністрації є остаточними.</span></li>
        </ul>
      </div>

      <div class="content-block">
        <div class="content-block-title">📖 RP Терміни</div>
        <div class="term-block">
          <div class="term-title">PowerGaming (PG)</div>
          <p class="term-body">Нереалістичні дії, які дають гравцю несправедливу перевагу та не залишають шансів іншій стороні.</p>
          <div class="info-box red" style="margin-top:10px;">👉 Заборонено на RP-сервері</div>
        </div>
        <div class="term-block">
          <div class="term-title">OOC (Out Of Character)</div>
          <p class="term-body">Все, що не відноситься до ролі персонажа: спілкування поза роллю, адміністративні питання, технічні проблеми.</p>
          <div class="info-box gold" style="margin-top:10px;">👉 OOC дозволений тільки в спеціальних чатах або з відповідною поміткою.</div>
        </div>
        <div class="term-block">
          <div class="term-title">MetaGaming (MG)</div>
          <p class="term-body">Використання OOC-інформації в RP. Дізнався щось у Discord / Telegram і використав у грі — це MG.</p>
          <div class="info-box red" style="margin-top:10px;">👉 Серйозне порушення RP</div>
        </div>
      </div>

      <div class="content-block" style="border-color: rgba(168,85,247,0.15);">
        <div class="content-block-title">⚖️ Суд RP сервера</div>
        <p style="color:var(--text-secondary); font-size:15px; margin-bottom:16px;">Суд — незалежний орган, що здійснює розгляд справ, скарг та порушень. Не підпорядковується поліції і діє виключно в межах закону.</p>
        <div class="info-box gold" style="margin-bottom:20px;">
          <strong>👥 НАБІР ДО СУДУ</strong><br>
          Вік 14+, грамотність, адекватність, знання законів RP.<br>
          <em style="font-size:13px;">Суддя — це відповідальна та нейтральна роль.</em>
        </div>
        <div class="tg-link-block">
          <span style="font-size:22px;">📝</span>
          <div>
            <div style="font-size:12px;color:var(--text-muted);font-family:var(--font-mono);margin-bottom:4px;">ПИСАТИ В ЛС</div>
            <a href="https://t.me/smbiser" target="_blank" style="color:var(--gold);font-family:var(--font-mono);font-size:13px;">@smbiser</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ─── ADMIN CONTENT ───────────────────────────
function renderAdminContent() {
  return `
    <div class="detail-page animate-in">
      <div class="content-block">
        <div class="content-block-title">👑 Команда адміністрації</div>
        <div class="team-grid">
          <div class="team-member">
            <div class="team-avatar avatar-gold">Г</div>
            <div class="team-info">
              <div class="team-role">Головний Адмін</div>
              <div class="team-desc">Керівник проекту</div>
            </div>
            <span class="badge badge-gold">OWNER</span>
          </div>
          <div class="team-member">
            <div class="team-avatar avatar-blue">А</div>
            <div class="team-info">
              <div class="team-role">Адміністратор</div>
              <div class="team-desc">Модерація сервера</div>
            </div>
            <span class="badge" style="background:rgba(30,111,217,0.1);color:#60A5FA;border:1px solid rgba(30,111,217,0.2);">ADMIN</span>
          </div>
          <div class="team-member">
            <div class="team-avatar avatar-green">М</div>
            <div class="team-info">
              <div class="team-role">Модератор</div>
              <div class="team-desc">Допомога гравцям</div>
            </div>
            <span class="badge badge-green">MOD</span>
          </div>
          <div class="team-member">
            <div class="team-avatar avatar-purple">Х</div>
            <div class="team-info">
              <div class="team-role">Хелпер</div>
              <div class="team-desc">Підтримка новачків</div>
            </div>
            <span class="badge badge-purple">HELPER</span>
          </div>
        </div>
      </div>

      <div class="recruitment-block">
        <div class="recruitment-header">
          <span style="font-size:28px;">🛠</span>
          <div>
            <div class="recruitment-title">НАБІР В АДМІНІСТРАЦІЮ</div>
          </div>
        </div>
        <div class="recruitment-body">
          <ul class="req-list">
            <li>Глибоке розуміння RP</li>
            <li>Вміння відрізняти RP від Non-RP</li>
            <li>Спокійна реакція в конфліктних ситуаціях</li>
            <li>Відсутність Abuse та упередженості</li>
          </ul>
          <ul class="warning-list">
            <li>❗ Адмін не вище за гравця, а відповідальніший</li>
            <li>❗ Адмін-панель заборонено використовувати у власних інтересах</li>
            <li>Буде відбір і перевірка.</li>
          </ul>
          <div class="tg-link-block">
            <span style="font-size:22px;">📝</span>
            <div>
              <div style="font-size:12px;color:var(--text-muted);font-family:var(--font-mono);margin-bottom:4px;">ПОДАТИ ЗАЯВКУ</div>
              <a href="https://t.me/Applyadmin_bot" target="_blank">@Applyadmin_bot</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ─── VVB CONTENT ────────────────────────────
function renderVVBContent() {
  return `
    <div class="detail-page animate-in">
      <div class="detail-hero red-tint">
        <div class="detail-hero-title">🛡️ ВВБП</div>
        <p class="detail-hero-desc">Відділ внутрішньої безпеки поліції — підрозділ, що здійснює контроль за діяльністю співробітників поліції, розглядає скарги та виконує функції прокуратури.</p>
      </div>

      <div class="content-block">
        <div class="content-block-title">📋 Обов'язки підрозділу</div>
        <ul class="check-list">
          <li class="ok">Контроль за дотриманням правил поліцейськими</li>
          <li class="ok">Розгляд скарг на дії поліції</li>
          <li class="ok">Притягнення до відповідальності порушників</li>
          <li class="ok">Виконання функцій прокуратури</li>
        </ul>
      </div>

      ${renderPoliceRules()}

      <div class="recruitment-block">
        <div class="recruitment-header">
          <span style="font-size:28px;">🚓</span>
          <div><div class="recruitment-title">НАБІР У ПОЛІЦІЮ</div></div>
        </div>
        <div class="recruitment-body">
          <ul class="req-list">
            <li>Знання RP-термінів та правил</li>
            <li>Дотримання процедур</li>
            <li>Адекватна комунікація з гравцями</li>
            <li>Заборона PowerGaming та Non-RP</li>
          </ul>
          <ul class="warning-list">
            <li>❗ Non-RP копи на сервері не затримуються</li>
            <li>❗ За порушення — швидке звільнення</li>
          </ul>
          <div class="tg-link-block">
            <span style="font-size:22px;">📝</span>
            <div>
              <div style="font-size:12px;color:var(--text-muted);font-family:var(--font-mono);margin-bottom:4px;">ПОДАТИ ЗАЯВКУ</div>
              <a href="https://t.me/Ua_rp_police_bot" target="_blank">@Ua_rp_police_bot</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderPoliceRules() {
  const sections = [
    { title: '1. Загальні принципи', items: ['Поліцейський — представник закону та приклад RP-поведінки.', 'Незнання законів сервера не звільняє від відповідальності.', 'Порушення правил поліції караються суворіше, ніж для цивільних.'] },
    { title: '2. Поведінка та RP', items: ['Заборонено DM / RDM / NonRP / MetaGaming / PowerGaming.', 'Поліцейський зобов\'язаний відігравати роль у будь-якій ситуації.', 'Заборонено використовувати службове становище для фарму XP або вигоди.'] },
    { title: '3. Застосування сили', items: ['Застосування зброї дозволено лише при загрозі життю.', 'Заборонено відкривати вогонь без попередження (якщо ситуація дозволяє).', 'Заборонено добивати затриманих або беззбройних осіб.'] },
    { title: '4. Затримання та арешт', items: ['Арешт проводиться з RP-відіграшем.', 'Кожен арешт повинен мати чітку причину.', 'Заборонено безпідставно відправляти гравців у тюрму.'] },
    { title: '5. Службова дисципліна', items: ['Заборонено ігнорувати накази старших по званню.', 'Заборонено зловживати спецзасобами.', 'Заборонено співпрацювати з бандитами (корупція).'] },
  ];
  return sections.map(s => `
    <div class="content-block">
      <div class="content-block-title">${s.title}</div>
      <ul class="rule-list">
        ${s.items.map((item, i) => `<li><span class="rule-num">${s.title.split('.')[0]}.${i+1}</span><span>${item}</span></li>`).join('')}
      </ul>
    </div>
  `).join('');
}

// ─── POLICE CONTENT ──────────────────────────
function renderPoliceContent() {
  return `
    <div class="detail-page animate-in">
      <div class="detail-hero blue-tint">
        <div class="detail-hero-title">👮 НПЛ — Народна Поліція</div>
        <p class="detail-hero-desc">Правоохоронний орган для підтримання порядку в місті Legacy RP.</p>
      </div>
      ${renderPoliceRules()}
      <div class="recruitment-block">
        <div class="recruitment-header">
          <span style="font-size:28px;">🚓</span>
          <div><div class="recruitment-title">НАБІР У ПОЛІЦІЮ</div></div>
        </div>
        <div class="recruitment-body">
          <ul class="req-list">
            <li>Знання RP-термінів та правил</li>
            <li>Дотримання процедур</li>
            <li>Адекватна комунікація з гравцями</li>
          </ul>
          <div class="tg-link-block">
            <span style="font-size:22px;">📝</span>
            <div>
              <div style="font-size:12px;color:var(--text-muted);font-family:var(--font-mono);margin-bottom:4px;">ПОДАТИ ЗАЯВКУ</div>
              <a href="https://t.me/Ua_rp_police_bot" target="_blank">@Ua_rp_police_bot</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ─── NGL CONTENT ─────────────────────────────
function renderNGLContent() {
  return `
    <div class="detail-page animate-in">
      <div class="detail-hero green-tint">
        <div class="detail-hero-title">⚔️ НГЛ</div>
        <p class="detail-hero-desc">Національна Гвардія Легіону — військове формування, яке допомагає поліції у боротьбі зі злочинністю.</p>
      </div>

      <div class="content-block">
        <div class="content-block-title">📋 Обов'язки</div>
        <ul class="check-list">
          <li class="ok">Виїзд на пограбування</li>
          <li class="ok">Підтримка поліції</li>
          <li class="ok">Участь у спецопераціях</li>
          <li class="ok">Охорона важливих об'єктів</li>
        </ul>
      </div>

      <div class="content-block">
        <div class="content-block-title">📜 Повноваження</div>
        <ul class="check-list">
          <li class="no">Працювати як звичайна поліція</li>
          <li class="no">Ловити за ПДР / виписувати штрафи</li>
        </ul>
        <div class="info-box gold" style="margin-top:16px;">Нацгвардія не виписує штрафи по ПДР.</div>
      </div>

      <div class="recruitment-block">
        <div class="recruitment-header">
          <span style="font-size:28px;">🚀</span>
          <div><div class="recruitment-title">ВИМОГИ ДЛЯ ВСТУПУ</div></div>
        </div>
        <div class="recruitment-body">
          <ul class="req-list">
            <li>Геймпас спецназу (sek)</li>
            <li>XP від 1000хр</li>
            <li>Вік від 11 років</li>
          </ul>
          <div class="tg-link-block">
            <span style="font-size:22px;">📝</span>
            <div>
              <div style="font-size:12px;color:var(--text-muted);font-family:var(--font-mono);margin-bottom:4px;">ПОДАТИ ЗАЯВКУ</div>
              <a href="https://t.me/National_guard_legacy_bot" target="_blank">@National_guard_legacy_bot</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ─── SBL CONTENT ─────────────────────────────
function renderSBLContent() {
  return `
    <div class="detail-page animate-in">
      <div class="detail-hero red-tint">
        <div class="detail-hero-title">🏴 СБЛ</div>
        <p class="detail-hero-desc">Спеціальний Батальйон Ліквідації — елітний підрозділ для виконання складних та небезпечних завдань. Обмежений склад, досвідчені гравці.</p>
      </div>

      <div class="content-block">
        <div class="content-block-title">🛡 Завдання СБЛ</div>
        <ul class="check-list">
          <li class="ok">Антитерористичні операції</li>
          <li class="ok">Штурм укріплених об'єктів</li>
          <li class="ok">Розмінування будівель та територій</li>
          <li class="ok">Звільнення заручників</li>
          <li class="ok">Протидія корупції та корупціонерам</li>
          <li class="ok">Нейтралізація особливо небезпечних осіб</li>
        </ul>
      </div>

      <div class="content-block">
        <div class="content-block-title">👥 Вступ до СБЛ</div>
        <ul class="check-list">
          <li class="warn">Набір обмежений</li>
          <li class="warn">Приймаються лише гравці з хорошим знанням RP</li>
          <li class="warn">Рішення про прийом ухвалює керівництво підрозділу</li>
        </ul>
        <div class="info-box red" style="margin-top:16px;">⚠️ Самопроголошення співробітником СБЛ — NonRP. Гравець вважається співробітником лише після внесення до офіційного реєстру.</div>
      </div>

      <div class="recruitment-block">
        <div class="recruitment-header">
          <span style="font-size:28px;">🛡</span>
          <div>
            <div class="recruitment-title">НАБІР У СБЛ</div>
            <div style="font-size:14px;color:var(--text-muted);margin-top:4px;">Служба безпеки Legacy</div>
          </div>
        </div>
        <div class="recruitment-body">
          <ul class="req-list">
            <li>Впевнений RP-рівень</li>
            <li>Дисципліна та адекватність</li>
            <li>Вміння діяти за наказом</li>
            <li>Відсутність Non-RP / Abuse історії</li>
            <li>Хороший аїм</li>
            <li>Мінімум 120к хр за поліцію</li>
            <li>Від 14 років</li>
          </ul>
          <ul class="warning-list">
            <li>❗ Набір обмежений</li>
            <li>❗ Буде перевірка знань і поведінки</li>
            <li>СБЛ не для новачків і не для "просто постріляти"</li>
          </ul>
          <div class="tg-link-block">
            <span style="font-size:22px;">📝</span>
            <div>
              <div style="font-size:12px;color:var(--text-muted);font-family:var(--font-mono);margin-bottom:4px;">ПОДАТИ ЗАЯВКУ</div>
              <a href="https://t.me/CBL_LEGACY_BOT" target="_blank">@CBL_LEGACY_BOT</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ─── CRIMINAL CONTENT ────────────────────────
function renderCriminalContent() {
  return `
    <div class="detail-page animate-in">
      <div class="detail-hero red-tint">
        <div class="detail-hero-title">🔥 Кримінальні організації</div>
        <p class="detail-hero-desc">Різниця між мафією, картелем, іншою підпільною організацією та простими грабіжниками.</p>
      </div>

      <div class="criminal-type">
        <div class="criminal-type-header">
          <div class="criminal-type-title" style="color: var(--green);">🟢 Прості грабіжники</div>
          <div style="font-size:13px;color:var(--text-muted);margin-top:4px;">1–3 людини · Без реєстрації · Без бази</div>
        </div>
        <div class="criminal-type-body">
          <ul class="check-list">
            <li class="warn">1–3 людини</li>
            <li class="warn">Без офіційної реєстрації</li>
            <li class="warn">Роблять спонтанні пограбування</li>
            <li class="warn">Не мають території</li>
          </ul>
          <div class="two-col">
            <div class="mini-box can">
              <div class="mini-box-title">Можуть</div>
              <ul>
                <li>• Робити дрібні злочини</li>
                <li>• Брати участь у маленьких івентах</li>
              </ul>
            </div>
            <div class="mini-box cannot">
              <div class="mini-box-title">Не можуть</div>
              <ul>
                <li>• Вимагати "данину"</li>
                <li>• Оголошувати війни</li>
                <li>• Контролювати район</li>
              </ul>
            </div>
          </div>
          <p style="font-size:13px;color:var(--text-muted);margin-top:16px;font-style:italic;">Це по суті хаотичний кримінал.</p>
        </div>
      </div>

      <div class="criminal-type" style="border-color: rgba(232,32,58,0.15);">
        <div class="criminal-type-header" style="border-color: rgba(232,32,58,0.1);">
          <div class="criminal-type-title" style="color: var(--red);">🔴 Банда / Картель / Мафія</div>
          <div style="font-size:13px;color:var(--text-muted);margin-top:4px;">Мінімум 4–5 людей · Є лідер · Є база · Є територія</div>
        </div>
        <div class="criminal-type-body">
          <div class="two-col">
            <div class="mini-box can">
              <div class="mini-box-title">Можуть</div>
              <ul>
                <li>• Контролювати район</li>
                <li>• Воювати з іншими бандами</li>
                <li>• Брати участь у штурмах</li>
              </ul>
            </div>
            <div class="mini-box cannot">
              <div class="mini-box-title">Обмеження</div>
              <ul>
                <li>• Немає великого впливу на місто</li>
                <li>• Не впливають на глобальні події</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="recruitment-block" style="border-color: rgba(232,32,58,0.2);">
        <div class="recruitment-header" style="border-color: rgba(232,32,58,0.15); background: rgba(232,32,58,0.06);">
          <span style="font-size:28px;">❗</span>
          <div><div class="recruitment-title">РЕЄСТРАЦІЯ ОРГАНІЗАЦІЙ</div></div>
        </div>
        <div class="recruitment-body">
          <div class="info-box red" style="margin-bottom:20px;">
            Створення мафії / банди / картелю без реєстрації через офіційного бота <strong>заборонено</strong>.
            Незареєстровані угруповання не мають права брати участь у глобальних івентах та війнах за території.
          </div>
          <div style="font-family:var(--font-mono);font-size:11px;letter-spacing:3px;color:var(--text-muted);text-transform:uppercase;margin-bottom:16px;">// Покарання</div>
          <ul class="req-list">
            <li>Попередження лідеру, один день часу на перереєстрацію</li>
            <li>2 порушення: Штраф лідеру 16000</li>
            <li>Депорт всіх учасників організації до п'яти діб</li>
          </ul>
          <div style="font-family:var(--font-mono);font-size:11px;letter-spacing:3px;color:var(--text-muted);text-transform:uppercase;margin:20px 0 16px;">// Для реєстрації</div>
          <ul class="req-list" style="margin-bottom:20px;">
            <li>Заповнити форму в боті</li>
            <li>Перекинути 8к є. на юз: dariysmertnk</li>
          </ul>
          <div class="tg-link-block">
            <span style="font-size:22px;">🤖</span>
            <div>
              <div style="font-size:12px;color:var(--text-muted);font-family:var(--font-mono);margin-bottom:4px;">БОТ РЕЄСТРАЦІЇ</div>
              <a href="https://t.me/Registration_criminal_bot" target="_blank">@Registration_criminal_bot</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Initialize
render();
