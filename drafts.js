const draftSamples = [
  {id:'01', category:'youtube', label:'YOUTUBE / LIFESTYLE', title:'일상의 장면을 이야기로', image:'photo-1497366811353-6870744d04b2', alt:'햇빛이 들어오는 밝은 공간', scope:'콘텐츠 기획 · 편집 · 썸네일', description:'공간과 일상을 소재로 하는 유튜브 콘텐츠의 샘플 구성입니다. 장면의 호흡과 채널의 분위기를 담는 작업 방향을 보여줍니다.'},
  {id:'02', category:'brand', label:'BRAND FILM / TRAVEL', title:'여행이 시작되는 순간', image:'photo-1518837695005-2083093ee35b', alt:'바다와 파도', scope:'콘셉트 기획 · 촬영 · 색보정', description:'여행과 라이프스타일 브랜드 필름의 샘플 구성입니다. 브랜드가 가진 감정을 풍경과 화면의 리듬으로 표현하는 방향입니다.'},
  {id:'03', category:'youtube', label:'YOUTUBE / INTERVIEW', title:'사람의 이야기에 집중하다', image:'photo-1598488035139-bdbb2231ce04', alt:'오디오 제작 스튜디오', scope:'인터뷰 구성 · 촬영 · 편집', description:'인터뷰와 대화형 유튜브 콘텐츠의 샘플 구성입니다. 중요한 메시지가 자연스럽게 전해지도록 흐름을 정리합니다.'},
  {id:'04', category:'short', label:'SHORT-FORM / BEHIND', title:'현장의 에너지를 짧고 선명하게', image:'photo-1516035069371-29a1b244cc32', alt:'촬영용 카메라', scope:'세로 영상 편집 · 자막 · 사운드', description:'촬영 현장과 제작 과정을 담는 숏폼 콘텐츠의 샘플 구성입니다. 짧은 시간 안에 하나의 장면과 메시지가 남도록 구성합니다.'},
  {id:'05', category:'brand', label:'BRAND FILM / SPACE', title:'공간이 가진 분위기를 담다', image:'photo-1497366754035-f200968a6e72', alt:'밝은 실내 공간', scope:'공간 촬영 · 편집 · 색보정', description:'공간과 라이프스타일 브랜드를 위한 영상의 샘플 구성입니다. 공간의 디테일과 실제 경험을 함께 전하는 방향입니다.'},
  {id:'06', category:'image', label:'IMAGE / KEY VISUAL', title:'이야기를 시작하는 한 장', image:'photo-1485846234645-a62644f84728', alt:'영화 촬영 장비', scope:'썸네일 기획 · 이미지 제작', description:'썸네일과 콘텐츠 키비주얼의 샘플 구성입니다. 영상의 메시지를 한눈에 전달하는 이미지 제작 방향을 보여줍니다.'}
];
const categories = {info:'정보전달', elearning:'e러닝', doc:'다큐멘터리', entertainment:'예능 · 인터뷰', promotion:'홍보 영상', product:'제품'};
const videoSamples = window.portfolioVideos ? window.portfolioVideos.filter(video => video.visibility === 'unlisted' && /^[\w-]{11}$/.test(video.videoId)).map((video,index) => {
  const prefix = video.title.split(')')[0];
  const category = video.category || (prefix.includes('제품') ? 'product' : prefix.includes('e러닝') ? 'elearning' : prefix.includes('다큐') ? 'doc' : prefix.includes('홍보') ? 'promotion' : prefix.includes('예능') ? 'entertainment' : 'info');
  return {...video, id:String(index+1).padStart(2,'0'), category, label:categories[category], alt:video.title, scope:video.duration};
}) : draftSamples;
const weddingSamples = (window.weddingVideos || []).filter(video => video.visibility === 'public' && /^[\w-]{11}$/.test(video.videoId));
const mukbangSamples = (window.mukbangVideos || []).filter(video => video.visibility === 'public' && /^[\w-]{11}$/.test(video.videoId));
const samples = [...videoSamples, ...mukbangSamples, ...weddingSamples, ...(window.portfolioLandings || [])];
const entertainmentRanks = new Map((window.entertainmentOrder || []).map((videoId,index) => [videoId,index]));
const references = {a:{name:'Ordinary Folk',url:'https://www.ordinaryfolk.co/'},b:{name:'BUCK',url:'https://buck.co/'},c:{name:'Cub Studio',url:'https://www.cubstudio.com/'}};
const projects = document.querySelector('#projects');
const dialog = document.querySelector('#project-dialog');
let activeFilter = 'all';
let visibleLimit = 12;
const imageUrl = (sample, width = 1200) => sample.asset || (sample.videoId ? `https://i.ytimg.com/vi/${sample.videoId}/hqdefault.jpg` : `https://images.unsplash.com/${sample.image}?auto=format&fit=crop&w=${width}&q=85`);
const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
function refreshIcons() { window.lucide?.createIcons(); }
function renderProjects() {
  const visible = samples.filter(sample => activeFilter === 'all' || sample.category === activeFilter);
  if (activeFilter === 'entertainment') {
    visible.sort((a,b) => (entertainmentRanks.get(a.videoId) ?? Infinity) - (entertainmentRanks.get(b.videoId) ?? Infinity));
  }
  const channel = document.querySelector('.wedding-channel');
  if (channel) channel.hidden = activeFilter !== 'wedding';
  const elearning = document.querySelector('.elearning-channel');
  if (elearning) elearning.hidden = activeFilter !== 'elearning';
  const mukbang = document.querySelector('.mukbang-channel');
  if (mukbang) mukbang.hidden = activeFilter !== 'mukbang';
  const instagram = document.querySelector('.instagram-list');
  const showingInstagram = !!instagram && activeFilter === 'instagram';
  if (instagram) instagram.hidden = !showingInstagram;
  const total = document.querySelector('[data-filter="all"] span');
  if (total) total.textContent = String(samples.length).padStart(2,'0');
  projects.replaceChildren();
  visible.slice(0, window.portfolioVideos ? visibleLimit : visible.length).forEach(sample => {
    const article = document.createElement('article');
    article.className = sample.asset ? 'project project-landing' : 'project';
    article.innerHTML = `<button class="project-trigger" type="button" aria-label="${escapeHtml(sample.title)} ${sample.videoId ? '영상 보기' : sample.asset ? '디자인 보기' : '샘플 상세 보기'}"><div class="project-image"><img src="${imageUrl(sample)}" alt="${escapeHtml(sample.alt)}" loading="lazy"><span class="project-open"><i data-lucide="${sample.videoId ? 'play' : sample.asset ? 'expand' : 'arrow-up-right'}"></i></span>${sample.videoId ? `<span class="video-duration">${sample.duration}</span>` : ''}</div><div class="project-caption"><div><p class="project-category">${sample.label}</p><h3>${escapeHtml(sample.title)}</h3><p class="project-note">${sample.videoId ? escapeHtml(sample.source || 'YOUTUBE') : sample.asset ? sample.scope : '샘플 이미지 · ' + sample.scope}</p></div><span class="project-index">${sample.id}</span></div></button>`;
    article.querySelector('button').addEventListener('click', () => openProject(sample));
    projects.append(article);
  });
  const instagramCount = instagram?.querySelectorAll('.instagram-account').length || 0;
  document.querySelector('.work-count').textContent = showingInstagram ? `${instagramCount} ${instagramCount === 1 ? 'channel' : 'channels'}` : `${visible.length} projects`;
  const more = document.querySelector('.load-more');
  if (more) more.hidden = visibleLimit >= visible.length;
  document.querySelector('.no-projects').hidden = showingInstagram || visible.length > 0;
  refreshIcons();
}
function openProject(sample) {
  const landing = document.querySelector('#dialog-landing');
  if (landing) {
    landing.hidden = !sample.asset;
    document.querySelector('#dialog-player').hidden = !!sample.asset;
    document.querySelector('#youtube-link').hidden = !!sample.asset;
    dialog.classList.toggle('is-landing', !!sample.asset);
    document.querySelector('#dialog-player').classList.toggle('is-short', sample.kind === 'short');
    dialog.classList.toggle('is-short', sample.kind === 'short');
  }
  if (sample.asset) {
    document.querySelector('#dialog-title').textContent = sample.title;
    document.querySelector('#dialog-category').textContent = sample.scope;
    document.querySelector('#landing-original').href = sample.asset;
    const image = document.querySelector('#landing-image');
    image.src = sample.asset;
    image.alt = sample.alt;
    image.width = sample.width;
    image.height = sample.height;
    dialog.showModal();
    dialog.scrollTop = 0;
    return;
  }
  if (sample.videoId) {
    document.querySelector('#dialog-title').textContent = sample.title;
    document.querySelector('#dialog-category').textContent = `${sample.label}${sample.kind === 'short' ? '' : ' / ' + sample.duration}${sample.source ? ' / ' + sample.source : ''}`;
    document.querySelector('#youtube-link').href = `https://www.youtube.com/watch?v=${sample.videoId}`;
    const iframe = document.createElement('iframe');
    iframe.title = sample.title;
    iframe.allow = 'accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    const embed = new URL(`https://www.youtube-nocookie.com/embed/${sample.videoId}`);
    embed.searchParams.set('rel', '0');
    // Identify the embedding site for players in browsers and app WebViews.
    if (location.protocol === 'https:' || location.protocol === 'http:') {
      embed.searchParams.set('origin', location.origin);
      embed.searchParams.set('widget_referrer', `${location.origin}${location.pathname}`);
    }
    iframe.src = embed.href;
    document.querySelector('#dialog-player').replaceChildren(iframe);
    dialog.showModal();
    return;
  }
  const image = document.querySelector('#dialog-image');
  image.src = imageUrl(sample);
  image.alt = `${sample.alt} · 시안용 샘플 이미지`;
  document.querySelector('#dialog-title').textContent = sample.title;
  document.querySelector('#dialog-category').textContent = sample.label;
  document.querySelector('#dialog-description').textContent = sample.description;
  document.querySelector('#dialog-scope').textContent = sample.scope;
  dialog.showModal();
}
function selectVersion(version, updateUrl = true) {
  if (!document.querySelector('.comparison')) {
    refreshIcons();
    return;
  }
  if (!references[version]) version = 'a';
  document.body.dataset.version = version;
  document.querySelectorAll('[data-hero]').forEach(hero => { hero.hidden = hero.dataset.hero !== version; });
  document.querySelectorAll('.versions button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.version === version)));
  const reference = document.querySelector('#reference');
  reference.href = references[version].url;
  reference.innerHTML = `참고: ${references[version].name} <i data-lucide="arrow-up-right"></i>`;
  document.title = `KOKZ Studio | ${document.querySelector(`.versions button[data-version="${version}"]`).textContent.trim()}`;
  if (updateUrl) {
    const url = new URL(location.href);
    url.searchParams.set('version', version);
    url.hash = '';
    history.pushState({version}, '', url);
    window.scrollTo({top:0, behavior:'instant'});
  }
  refreshIcons();
}
document.querySelectorAll('.versions button').forEach(button => button.addEventListener('click', () => selectVersion(button.dataset.version)));
document.querySelectorAll('.filters button').forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  visibleLimit = 12;
  document.querySelectorAll('.filters button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  renderProjects();
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.querySelector('a[href="#contact"]')?.addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => document.querySelector('#dialog-player')?.replaceChildren());
document.querySelector('.load-more')?.addEventListener('click', () => {
  const previousCount = projects.children.length;
  visibleLimit += 12;
  renderProjects();
  projects.children[previousCount]?.querySelector('button').focus({preventScroll:true});
});
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
document.querySelector('.copy-email').addEventListener('click', async () => {
  const status = document.querySelector('.copy-status');
  try {
    if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText('kokz.studio@gmail.com');
    else {
      const input = document.createElement('textarea');
      input.value = 'kokz.studio@gmail.com';
      input.style.cssText = 'position:fixed;opacity:0;';
      document.body.append(input);
      input.select();
      const copied = document.execCommand('copy');
      input.remove();
      if (!copied) throw new Error('Copy failed');
    }
    status.textContent = '이메일 주소를 복사했습니다.';
  } catch { status.textContent = '복사하지 못했습니다. 이메일 주소를 선택하거나 눌러주세요.'; }
});
window.addEventListener('popstate', () => selectVersion(new URL(location.href).searchParams.get('version'), false));
selectVersion(new URL(location.href).searchParams.get('version'), false);
renderProjects();
