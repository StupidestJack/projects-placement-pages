document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('projects');
  if (!container) {
    console.error('❌ 找不到 #projects 容器');
    return;
  }

  fetch('https://stupidestjack.github.io/projects-placement-pages/pjs.json')
    .then(res => res.json())
    .then(data => {
      if (!Array.isArray(data)) {
        console.error('❌ pjs.json 格式錯誤，應為陣列');
        return;
      }

      data.forEach(project => {
        const card = createProjectCard(project);
        container.appendChild(card);
      });
    })
    .catch(err => {
      container.innerHTML = `<p style="color:red;">🚨 無法載入專案資料，請稍後再試。</p>`;
      console.error('讀取 pjs.json 失敗：', err);
    });
});

function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card';

  const title = document.createElement('h3');
  title.textContent = project.title || '未命名專案';

  const desc = document.createElement('p');
  desc.textContent = project.description || '尚無描述';

  const lang = document.createElement('p');
  lang.innerHTML = `<strong>語言：</strong> ${project.language || '未提供'}`;

  const date = document.createElement('p');
  date.innerHTML = `<strong>日期：</strong> ${project.date || '未提供'}`;

  // 🔗 自動導向新舊帳號
  const link = document.createElement('a');
  const baseURL = project.legacy
    ? 'https://mamegoodbean2k.github.io/'
    : 'https://stupidestjack.github.io/';
  const pagePath = project.pages || '';
  link.href = `${baseURL}${pagePath}`;
  link.textContent = '🔗 前往頁面';
  link.target = '_blank';

  const gitlink = document.createElement('a');
  const gitbaseURL = project.legacy
    ? 'https://github.com/mamegoodbean2k/'
    : 'https://github.com/stupidestjack/';
  const gitpagePath = project.github || '';
  gitlink.href = `${gitbaseURL}${gitpagePath}`;
  gitlink.textContent = '🦝 前往GitHub';
  gitlink.target = '_blank';

  const legacy = document.createElement('span');
  legacy.className = 'tag';
  legacy.textContent = project.legacy ? '🕰️ 舊帳號作品' : '🆕 新帳號作品';

  card.appendChild(title);
  card.appendChild(desc);
  card.appendChild(lang);
  card.appendChild(date);
  card.appendChild(link);
  card.appendChild(gitlink);
  card.appendChild(legacy);

  return card;
}
