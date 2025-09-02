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

  // 🔗 前往頁面（如果有）
  if (project.pages) {
    const baseURL = project.legacy
      ? 'https://mamegoodbean2k.github.io/'
      : 'https://stupidestjack.github.io/';
    const link = document.createElement('a');
    link.href = `${baseURL}${project.pages}`;
    link.textContent = '🔗 前往頁面';
    link.target = '_blank';
    card.appendChild(link);
  }

  // 🦝 GitHub repo（如果有）
  if (project.github) {
    const gitbaseURL = project.legacy
      ? 'https://github.com/mamegoodbean2k/'
      : 'https://github.com/stupidestjack/';
    const gitlink = document.createElement('a');
    gitlink.href = `${gitbaseURL}${project.github}`;
    gitlink.textContent = '🦝 前往 GitHub';
    gitlink.target = '_blank';
    
  }

  // 📦 下載連結（如果有）
  if (project.download) {
    const downloadLink = document.createElement('a');
    downloadLink.href = project.download;
    downloadLink.textContent = '📦 下載專案';
    downloadLink.target = '_blank';
    
  }

  
  

  card.appendChild(title);
  card.appendChild(desc);
  card.appendChild(lang);
  card.appendChild(date);
  card.appendChild(gitlink);
  card.appendChild(downloadLink);

  return card;
}




