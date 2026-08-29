(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const state = JSON.parse(localStorage.getItem('topDesignState') || '{}');
  state.page ||= 'home'; state.theme ||= 'pink'; state.brightness ||= 100; state.xp ||= 100; state.completed ||= [];
  state.assignments ||= []; state.works ||= [];

  const nav = [
    ['home','⌂','Главная'],['learn','▤','Учёба'],['homework','☑','Домашние задания'],['tools','▦','Инструменты'],
    ['practice','✎','Практика'],['ai','✦','AI-помощник'],['glossary','Aᴢ','Словарь дизайнера'],['works','▱','Мои работы'],
    ['portfolio','▣','Портфолио'],['progress','▥','Прогресс'],['settings','⚙','Настройки']
  ];
  const bottom = [['home','⌂','Главная'],['learn','▤','Учёба'],['homework','☑','Задания'],['tools','▦','Инструменты'],['works','▱','Мои работы'],['profile','♙','Профиль']];
  const courses = [
    ['Основы графического дизайна','Что делает дизайнер, растр и вектор, форматы файлов',8,'◫'],
    ['Композиция','Баланс, сетки, ритм, визуальная иерархия',10,'▦'],
    ['Цвет и психология','RGB/CMYK, цветовой круг, гармонии и контраст',9,'◉'],
    ['Типографика','Шрифты, кегль, интерлиньяж, кернинг',10,'A'],
    ['Adobe Photoshop','Слои, маски, ретушь, композиции',12,'Ps'],
    ['Adobe Illustrator','Вектор, кривые Безье, логотипы и иконки',11,'Ai'],
    ['Брендинг и айдентика','Логотип, фирменный стиль, брендбук',8,'✦'],
    ['Полиграфия и макеты','Постеры, визитки, подготовка к печати',8,'▤'],
    ['AI для дизайнера','Промпты, референсы, варианты и этика',7,'✧'],
    ['Портфолио','Отбор работ, оформление кейсов, презентация',6,'▣']
  ];

  const courseContent = [
    {intro:'Графический дизайн — это визуальная коммуникация: дизайнер не просто «делает красиво», а помогает человеку быстро понять сообщение и совершить нужное действие.',
     theory:['Главные строительные блоки дизайна: текст, изображение, форма, цвет и свободное пространство. Хороший макет отвечает на три вопроса: что здесь главное, что нужно понять вторым и что сделать дальше.','Растр состоит из пикселей и подходит для фотографий и сложных текстур. При сильном увеличении он теряет чёткость. Вектор строится из линий и форм и масштабируется без потери резкости.','Для экрана обычно используют RGB, для печати — CMYK. JPG удобен для фотографий, PNG — когда нужна прозрачность, SVG — для вектора, PDF — для передачи готовых макетов.'],
     example:'Представь афишу концерта. Название события должно читаться первым, дата и место — вторыми, мелкие детали — последними. Если всё одинакового размера и цвета, зрителю непонятно, куда смотреть.',
     practice:'Возьми любой постер. Выпиши: 1) что увидела первым; 2) что вторым; 3) что можно убрать без потери смысла. Затем сохрани одну фотографию в JPG и PNG и сравни размер и качество.',
     qa:[['Дизайнер обязан хорошо рисовать?','Нет. Рисование полезно, но графический дизайн прежде всего про коммуникацию, композицию, типографику и работу с инструментами.'],['Что выбрать: JPG или PNG?','JPG — чаще для фото и небольшого веса. PNG — когда важна прозрачность, резкие края или нужно избежать лишних JPEG-артефактов.'],['Почему логотип лучше хранить в SVG?','Потому что вектор можно увеличить от визитки до вывески без потери чёткости.']]},
    {intro:'Композиция — это организация элементов в единое целое. Она управляет вниманием зрителя и делает информацию понятной.',
     theory:['Баланс распределяет визуальный вес. Он может быть симметричным или асимметричным. Тёмный крупный объект «весит» больше светлого маленького.','Выравнивание создаёт порядок. Если края текста, карточек и изображений случайно «гуляют», макет выглядит неряшливо даже при красивых цветах.','Сетка помогает держать одинаковые поля, интервалы и колонки. Белое пространство — не пустота, а инструмент, который отделяет смысловые группы и даёт макету «дышать».','Иерархия строится размером, контрастом, цветом, расположением и расстояниями: главное должно отличаться от второстепенного.'],
     example:'В меню кафе название блюда крупное, описание меньше, цена выделена отдельно. Если цена, название и описание одинаковы, глаз не понимает структуру.',
     practice:'Сделай простой постер из одного заголовка, одной фотографии, даты и кнопки/призыва. Сначала выровняй всё по одной линии, потом сделай асимметричный вариант. Сравни, где взгляд движется естественнее.',
     qa:[['Что такое визуальный вес?','Это ощущение «тяжести» элемента. Размер, тёмный цвет, насыщенность, контраст и необычная форма увеличивают визуальный вес.'],['Нужно ли всегда использовать сетку?','Нет, но новичку сетка сильно помогает. Сначала научись строить порядок, потом уже осознанно нарушай его.'],['Почему белого пространства иногда нужно больше?','Оно разделяет смысловые блоки, облегчает чтение и усиливает акцент на главном.']]},
    {intro:'Цвет помогает передавать настроение, создавать контраст и объединять элементы. Но цвет должен помогать содержанию, а не спорить с ним.',
     theory:['Цветовой круг показывает отношения цветов. Близкие оттенки дают спокойные сочетания, противоположные — сильный контраст.','Начинай с небольшой палитры: основной цвет, светлый фон, тёмный текст и один акцент. Так проще сохранить целостность.','Контраст важнее «красивости»: текст должен читаться.','RGB — экранная модель света, CMYK — печатная модель красок. Один и тот же цвет на экране и бумаге может выглядеть по-разному.'],
     example:'Кнопка действия на сайте должна отличаться от фона. Если кнопка и фон одного тона, пользователь может её просто не заметить.',
     practice:'Собери три палитры по 4 цвета: спокойную, энергичную и строгую. Для каждой сделай мини-карточку с заголовком, текстом и кнопкой.',
     qa:[['Сколько цветов брать новичку?','Обычно проще начать с 3–4: фон, текст, основной и акцентный.'],['Почему CMYK иногда выглядит тусклее RGB?','Экран излучает свет, а печать отражает его от краски и бумаги, поэтому диапазон цветов отличается.'],['Можно ли выбирать цвет только «по настроению»?','Можно для идеи, но финально нужно проверять контраст, читаемость и соответствие задаче.']]},
    {intro:'Типографика — это не выбор «красивого шрифта», а управление чтением, характером и иерархией текста.',
     theory:['Гарнитура — семейство шрифтов. Начертание — конкретный вариант: Regular, Medium, Bold, Italic.','Кегль — размер текста. Интерлиньяж — расстояние между строками. Кернинг — расстояние между отдельными парами букв. Трекинг — общий интервал между буквами.','Для начала достаточно одной семьи с разными начертаниями или пары: выразительный заголовок + спокойный текст.','Длина строки и контраст влияют на чтение.'],
     example:'Если заголовок 40 px Bold, подзаголовок 22 px Medium, а основной текст 16 px Regular — иерархия считывается ещё до чтения слов.',
     practice:'Набери один и тот же абзац тремя способами: слишком тесно, слишком широко и удобно. Подбери один шрифт для заголовка и один для текста.',
     qa:[['Что такое кернинг?','Точная настройка расстояния между двумя конкретными буквами, например АV или То.'],['Сколько шрифтов нормально в одном макете?','Часто достаточно 1–2 гарнитур.'],['Что важнее: необычный шрифт или читаемость?','Читаемость. Характер шрифта должен помогать сообщению.']]},
    {intro:'Photoshop нужен прежде всего для растровых изображений: фото, коллажей, ретуши, текстур и сложной обработки.',
     theory:['Работай неразрушающе: слои, маски, корректирующие слои и смарт-объекты позволяют менять решение без потери исходника.','Маска лучше ластика, потому что скрывает пиксели, а не удаляет их окончательно.','Для экрана важны пиксели, для печати — физический размер и достаточная плотность изображения.','Перед экспортом проверь размер, цветовой режим, формат и качество.'],
     example:'Чтобы заменить фон на портрете, лучше выделить человека и использовать маску. Тогда край можно поправить позже.',
     practice:'Открой фотографию, сделай копию слоя, добавь корректирующий слой, выдели объект и создай маску. Экспортируй в JPG и PNG.',
     qa:[['Чем маска отличается от ластика?','Маска обратима: можно вернуть скрытые области.'],['Когда использовать PSD?','Когда нужно сохранить слои, маски и редактируемую структуру проекта.'],['Photoshop подходит для логотипов?','Для эскиза — да, но финальный логотип удобнее делать в векторе.']]},
    {intro:'Illustrator предназначен для векторной графики: логотипов, иконок, схем, иллюстраций и элементов айдентики.',
     theory:['Вектор состоит из контуров, опорных точек и кривых. Его можно масштабировать без потери качества.','Инструмент Pen строит кривые Безье. Новичку важнее сначала научиться делать простые формы.','Pathfinder и Shape Builder помогают складывать, вычитать и объединять формы.','Чистый контур с меньшим количеством лишних точек проще редактировать.'],
     example:'Иконку камеры можно собрать из прямоугольников и кругов — часто это быстрее и чище, чем рисовать одной сложной кривой.',
     practice:'Собери три простые иконки только из круга, прямоугольника и линии. Экспортируй одну в SVG и одну в PNG и сравни.',
     qa:[['Что такое кривая Безье?','Кривая, форма которой управляется опорными точками и направляющими.'],['Почему меньше точек часто лучше?','Контур получается плавнее и проще редактируется.'],['Что экспортировать для сайта: SVG или PNG?','Для простых векторных иконок и логотипов часто удобен SVG.']]},
    {intro:'Брендинг — это система впечатлений о бренде, а айдентика — её визуальная часть: логотип, цвет, шрифты, графика и стиль изображений.',
     theory:['Логотип — не весь бренд.','Айдентика должна быть узнаваемой в разных носителях.','Сначала формулируют характер и аудиторию, затем выбирают визуальные средства.','Брендбук фиксирует версии логотипа, цвета, шрифты, сетки и примеры применения.'],
     example:'Кофейня может выглядеть «спокойной и ремесленной» через тёплые цвета, простую типографику и натуральные текстуры.',
     practice:'Придумай вымышленный бренд. Запиши 3 качества бренда, 3 качества аудитории, собери палитру, пару шрифтов и простой знак.',
     qa:[['Чем бренд отличается от логотипа?','Бренд — восприятие и система, логотип — только один визуальный элемент.'],['Что такое охранное поле логотипа?','Минимальное свободное пространство вокруг знака.'],['Нужен ли брендбук студенту?','Даже короткий мини-гайд учит мыслить системой.']]},
    {intro:'Полиграфия требует учитывать не только внешний вид, но и технологию печати: формат, поля, вылеты, цвет и качество изображений.',
     theory:['Макет для печати должен иметь правильный физический размер и вылеты под обрез.','Важные элементы не ставят слишком близко к линии реза.','CMYK часто используют для печати, но требования конкретной типографии важнее общих правил.','PDF — распространённый формат передачи готового макета.'],
     example:'Визитка с фоном до края может требовать дополнительный вылет по несколько миллиметров — точное значение сообщает типография.',
     practice:'Сделай визитку или маленький флаер. Добавь безопасные поля, проверь размеры и подготовь отдельный PDF для печати.',
     qa:[['Что такое вылет?','Дополнительная область изображения за линией обреза.'],['Почему нельзя ставить текст у самого края?','При резке возможны небольшие отклонения.'],['Всегда ли печать — это CMYK?','Часто да, но профиль и требования нужно получать у типографии.']]},
    {intro:'AI может ускорять поиск идей и рутинные операции, но дизайнер остаётся ответственным за смысл, качество и финальное решение.',
     theory:['Хороший промпт описывает задачу, объект, стиль, композицию, формат и ограничения.','Используй AI для референсов, черновиков, удаления фона и вариантов, а не как замену основам дизайна.','Всегда проверяй детали, текст и соответствие заданию.','Сравнивай варианты и объясняй, почему выбираешь один из них.'],
     example:'Вместо «сделай красивый постер» лучше описать стиль, формат, композицию и один-два ключевых акцента.',
     practice:'Напиши три промпта для одной задачи: короткий, подробный и с ограничениями. Сравни результаты.',
     qa:[['Можно ли сдавать AI-работу как полностью свою?','Нужно учитывать правила преподавателя и уметь объяснить собственный вклад.'],['Почему AI иногда делает странные детали?','Он генерирует вероятный результат и может ошибаться в структуре деталей.'],['Что важнее: хороший AI или знание дизайна?','Знание дизайна — оно позволяет оценить и исправить результат.']]},
    {intro:'Портфолио показывает не количество работ, а качество мышления: задачу, процесс, решения и результат.',
     theory:['Лучше несколько сильных работ, чем много случайных.','Кейс строится логично: задача → аудитория → идея → процесс → решения → финал.','Мокап помогает показать работу в контексте, но не должен скрывать сам дизайн.','Фиксируй промежуточные версии — они показывают развитие идеи.'],
     example:'Для айдентики покажи не только логотип, но и палитру, типографику, применение на носителях и короткое объяснение концепции.',
     practice:'Выбери одну учебную работу. Напиши 5 коротких блоков: задача, аудитория, идея, что было сложно, что получилось.',
     qa:[['Что положить в первое портфолио?','Лучшие учебные проекты, где виден процесс и разные навыки.'],['Нужны ли только идеальные работы?','Нужны сильные и понятные. Лучше доработать старую работу, чем добавлять слабую.'],['Как объяснять работу на защите?','Коротко: задача, аудитория, решение и почему ты выбрала именно его.']]}
  ];

  const tools = [
    {n:'Adobe Express',cat:'Графика',logo:'A',desc:'Постеры, баннеры, коллажи, видео, шаблоны и AI-функции.',google:true,url:'https://www.adobe.com/express/'},
    {n:'UX Pilot',cat:'UI/UX',logo:'UX',desc:'AI-помощник для макетов, прототипов и пользовательских сценариев.',google:true,url:'https://uxpilot.ai/'},
    {n:'Genspark',cat:'AI',logo:'✦',desc:'AI-поиск, генерация идей, исследование и структурирование информации.',google:true,url:'https://www.genspark.ai/'},
    {n:'Presentations.AI',cat:'Презентации',logo:'P',desc:'Создание презентаций и визуалов на основе темы.',google:true,url:'https://www.presentations.ai/'},
    {n:'Meshy',cat:'3D',logo:'3D',desc:'AI-генерация 3D-моделей из текста и изображений.',google:true,url:'https://www.meshy.ai/'},
    {n:'Jimdo',cat:'Сайты',logo:'J',desc:'Конструктор сайтов для первых веб-проектов.',google:true,url:'https://www.jimdo.com/'},
    {n:'Superdesign',cat:'Графика',logo:'S',desc:'AI-графика, креативы и визуальные идеи.',google:false,url:'https://superdesign.dev/'},
    {n:'Open Design',cat:'Графика',logo:'O',desc:'Инструменты для визуального дизайна и AI-процессов.',google:false,url:'https://open-design.ai/'},
    {n:'Color Designer',cat:'Цвет',logo:'◉',desc:'Палитры, градиенты и гармоничные цветовые сочетания.',google:false,url:'https://colordesigner.io/'},
    {n:'AI Color Picker',cat:'Цвет',logo:'⌁',desc:'Определение цвета по изображению, HEX/RGB/CMYK и палитры.',google:false,url:'https://imagecolorpicker.com/'},
    {n:'Canva',cat:'Графика',logo:'C',desc:'Шаблоны, макеты, соцсети, презентации и AI-инструменты.',google:true,url:'https://www.canva.com/'},
    {n:'Figma',cat:'UI/UX',logo:'F',desc:'Интерфейсы, прототипы, компоненты и совместная работа.',google:true,url:'https://www.figma.com/'}
  ];
  const glossary = {
    'Растр':'Изображение из пикселей. Хорошо для фото и сложных текстур. Примеры: JPG, PNG.',
    'Вектор':'Изображение из математических контуров. Масштабируется без потери качества. Пример: SVG.',
    'RGB':'Цветовая модель для экранов: красный, зелёный, синий.',
    'CMYK':'Цветовая модель для печати: голубой, пурпурный, жёлтый и чёрный.',
    'Композиция':'Организация элементов так, чтобы взгляд зрителя двигался по макету понятно и выразительно.',
    'Сетка':'Невидимая система направляющих, которая помогает выравнивать элементы.',
    'Кернинг':'Ручная настройка расстояния между отдельными парами букв.',
    'Интерлиньяж':'Расстояние между строками текста.',
    'Иерархия':'Порядок визуальной важности: что зритель заметит первым, вторым и далее.',
    'Мокап':'Реалистичная демонстрация дизайна на объекте: упаковке, экране, вывеске и т.п.',
    'Брендбук':'Документ с правилами использования логотипа, цветов, шрифтов и фирменного стиля.',
    'Референс':'Пример или источник вдохновения для поиска визуального направления.'
  };

  function save(){localStorage.setItem('topDesignState', JSON.stringify(state));}
  function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1900)}
  function setTheme(){document.documentElement.dataset.theme = state.theme === 'pink' ? '' : state.theme;document.documentElement.style.setProperty('--brightness',state.brightness/100);save();}
  function setPage(page){if(page==='settings'){openSettings();return;} if(page==='profile')page='progress';state.page=page;save();render();closeSidebar();window.scrollTo({top:0,behavior:'smooth'});}
  function closeSidebar(){$('#sidebar').classList.remove('open');$('#backdrop').hidden=true}
  function renderNav(){
    $('#sideNav').innerHTML=nav.map(([id,ic,label])=>`<button class="nav-item ${state.page===id?'active':''}" data-page="${id}"><span class="nav-icon">${ic}</span>${label}</button>`).join('');
    $('#bottomNav').innerHTML=bottom.map(([id,ic,label])=>`<button class="bottom-link ${state.page===id || (id==='profile'&&state.page==='progress')?'active':''}" data-page="${id}"><span>${ic}</span>${label}</button>`).join('');
    $$('[data-page]').forEach(b=>b.onclick=()=>setPage(b.dataset.page));
  }
  function updateMeta(){
    $$('[data-version]').forEach(x=>x.textContent=window.APP_VERSION||'1.0.0');
    const xp=state.xp||0; $('#sideXp').textContent=xp; $('#sideProgressBar').style.width=Math.min(100,xp/10)+'%';
  }
  function card(title,body,extra=''){return `<div class="card ${extra}"><h3>${title}</h3>${body}</div>`}

  function home(){
    return `<div class="hero">
      <div class="card hero-main"><div class="hero-photo-wrap"><div><h2>Привет, Anastasia! 👋</h2><p class="muted">Сегодня хороший день, чтобы узнать о дизайне что-то новое.</p></div><img class="hero-photo" src="assets/anastasia-profile.webp?v=${window.BUILD_ID||''}" alt="Anastasia"></div>
      <div class="stat-row"><div class="stat"><b>${Math.floor(state.xp/100)}</b><small>уроков</small></div><div class="stat"><b>${state.assignments.length}</b><small>заданий</small></div><div class="stat"><b>${state.works.length}</b><small>работ</small></div><div class="stat"><b>${state.xp}</b><small>XP</small></div></div></div>
      <div class="card"><h3>Начни с основ</h3><p class="muted">Первый маршрут: что такое дизайн → композиция → цвет → типографика.</p><div class="progress"><span style="width:${Math.min(100,state.completed.length/4*100)}%"></span></div><button class="primary-btn" data-go="learn">Продолжить обучение</button></div>
    </div>
    <div class="section-head"><h2>Быстрый доступ</h2></div><div class="quick-grid">
      ${[['learn','▤','Учёба'],['homework','☑','Домашнее задание'],['tools','▦','Инструменты'],['ai','✦','AI-помощник'],['practice','✎','Практика'],['glossary','Aᴢ','Словарь'],['works','▱','Мои работы'],['portfolio','▣','Портфолио']].map(x=>`<button class="quick-btn" data-go="${x[0]}"><span>${x[1]}</span>${x[2]}</button>`).join('')}
    </div>
    <div class="section-head"><h2>Сегодня</h2></div>${card('Мини-урок: растр и вектор',`<p>Растр состоит из пикселей, а вектор — из контуров. Попробуй открыть SVG и JPG и увеличить оба изображения.</p><button class="secondary-btn" data-go="learn">Открыть урок</button>`)}>`;
  }

  function learn(){
    return `<div class="section-head"><div><h2>Учёба с нуля</h2><p class="muted">Короткая теория → пример → упражнение → тест → практика</p></div></div><div class="grid two">${courses.map((c,i)=>{
      const done=state.completed.includes(i); const pct=done?100:Math.max(0,Math.min(90,(state.xp-i*40)/5));
      return `<div class="card course-item"><div class="course-icon">${c[3]}</div><div><strong>${i+1}. ${c[0]}</strong><div class="muted" style="font-size:12px">${c[1]} · ${c[2]} уроков</div></div><button class="icon-btn course-open" data-course="${i}">›</button><div class="progress"><span style="width:${pct}%"></span></div></div>`}).join('')}</div>`;
  }
  function courseView(i){
    const c=courses[i], d=courseContent[i]||courseContent[0];
    $('#pageTitle').textContent=c[0]; $('#pageSubtitle').textContent='Учебный модуль · теория, практика и ответы';
    const qa=(d.qa||[]).map(([q,a])=>`<details class="qa-item"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('');
    const theory=(d.theory||[]).map((p,k)=>`<div class="theory-point"><span>${k+1}</span><p>${esc(p)}</p></div>`).join('');
    $('#content').innerHTML=`<button class="secondary-btn" id="backLearn">← К курсам</button>
      <div class="module-hero"><div class="course-icon big">${c[3]}</div><div><h2>${esc(c[0])}</h2><p>${esc(d.intro)}</p></div></div>
      <section class="module-section"><h3>📖 Что нужно понять</h3>${theory}</section>
      <section class="module-section"><h3>👀 Пример из жизни</h3><p>${esc(d.example)}</p></section>
      <section class="module-section"><h3>✍️ Практика</h3><p>${esc(d.practice)}</p><button class="secondary-btn" id="savePractice">Сохранить как выполненное упражнение</button></section>
      <section class="module-section"><h3>❓ Частые вопросы</h3><div class="qa-list">${qa}</div></section>
      <section class="module-section"><h3>✅ Самопроверка</h3><p>Попробуй своими словами объяснить тему человеку, который о ней ничего не знает. Если получается без сложных терминов — принцип уже понят.</p></section>
      <div class="section-head"><button class="primary-btn" id="completeCourse">Отметить модуль пройденным +100 XP</button></div>`;
    $('#backLearn').onclick=()=>renderPage('learn');
    $('#savePractice').onclick=()=>toast('Упражнение отмечено. Добавь результат в «Мои работы»');
    $('#completeCourse').onclick=()=>{if(!state.completed.includes(i)){state.completed.push(i);state.xp+=100;save();toast('Модуль пройден! +100 XP')}render();};
  }

  function homework(){
    return `<div class="section-head"><div><h2>Домашние задания</h2><p class="muted">Загрузи задание с телефона, планшета, облака или внешнего накопителя.</p></div></div>
      <div class="assignment-drop"><div style="font-size:40px">⇧</div><h3>Загрузить задание</h3><p class="muted">PDF, DOCX, PPTX, JPG, PNG, SVG, PSD/AI как исходный файл.</p><input id="assignmentInput" type="file" hidden><button class="primary-btn" id="chooseAssignment">Выбрать файл</button></div>
      <div class="section-head"><h2>Мои задания</h2></div><div id="assignmentList" class="grid two">${state.assignments.length?state.assignments.map((a,i)=>assignmentCard(a,i)).join(''):`<div class="card"><p class="muted">Пока нет загруженных заданий.</p></div>`}</div>`;
  }
  function assignmentCard(a,i){return `<div class="card"><h3>${esc(a.name)}</h3><p class="muted">${esc(a.type||'Файл')} · ${formatBytes(a.size)}</p><div class="pill-row"><span class="tag">${a.status||'Новое'}</span></div><p>${esc(a.notes||'Задание загружено. Открой рабочее место, чтобы разобрать его по шагам.')}</p><button class="primary-btn open-assignment" data-index="${i}">Работать над заданием</button></div>`}
  function formatBytes(n){if(!n)return '—';if(n<1024)return n+' Б';if(n<1048576)return (n/1024).toFixed(1)+' КБ';return (n/1048576).toFixed(1)+' МБ'}

  async function openAssignment(i, file=null){
    const a=state.assignments[i]; $('#fileDialogTitle').textContent='Работа над заданием';
    $('#fileDialogBody').innerHTML=`<div class="workspace"><div><div id="assignmentPreview" class="preview"><div><div style="font-size:50px;text-align:center">📄</div><strong>${esc(a.name)}</strong><p class="muted">${esc(a.type)}</p></div></div><div class="file-meta"><span>📎</span><div><strong>${esc(a.name)}</strong><div class="small">Оригинал остаётся нетронутым</div></div></div></div><div><h3>План выполнения</h3><div class="steps">${['Прочитай требования и выдели результат','Определи формат и размеры','Собери референсы и композицию','Выполни дизайн в подходящем инструменте','Проверь и экспортируй итог'].map((x,k)=>`<div class="step"><span class="step-index">${k+1}</span><span>${x}</span></div>`).join('')}</div><div class="hint-box"><strong>💡 Подсказка</strong><p id="hintText">Начни с того, чтобы своими словами сформулировать: что именно должно получиться в конце.</p><button class="secondary-btn" id="nextHint">Другая подсказка</button></div></div></div>
      <div class="section-head"><h3>Рабочие заметки</h3></div><textarea id="assignmentNotes" placeholder="Напиши требования преподавателя, размеры, идеи, что уже сделано…">${esc(a.notes||'')}</textarea>
      <div class="section-head"><div class="pill-row"><button class="primary-btn" id="saveAssignment">Сохранить черновик</button><button class="secondary-btn" id="openToolsForTask">Открыть инструменты</button><button class="secondary-btn" id="exportAssignment">Экспортировать готовое</button></div></div>`;
    $('#fileDialog').showModal();
    if(file && file.type.startsWith('image/')){const url=URL.createObjectURL(file);$('#assignmentPreview').innerHTML=`<img src="${url}" alt="Предпросмотр задания">`;}
    else if(file && file.type==='application/pdf'){const url=URL.createObjectURL(file);$('#assignmentPreview').innerHTML=`<iframe src="${url}" title="PDF"></iframe>`;}
    const hints=['Сначала выпиши все обязательные требования преподавателя — это твой чек-лист.','Не начинай с украшений. Сначала композиция и иерархия, потом цвет и детали.','Ограничься 2 шрифтами и 2–4 основными цветами, если задание не требует другого.','Перед экспортом проверь формат, размеры, поля, цветовую модель и имя файла.'];let hi=0;
    $('#nextHint').onclick=()=>{$('#hintText').textContent=hints[hi++%hints.length]};
    $('#saveAssignment').onclick=()=>{a.notes=$('#assignmentNotes').value;a.status='В работе';save();toast('Черновик сохранён')};
    $('#openToolsForTask').onclick=()=>{$('#fileDialog').close();setPage('tools')};
    $('#exportAssignment').onclick=()=>exportWork(i);
  }
  async function exportWork(i){
    const a=state.assignments[i]; const notes=$('#assignmentNotes')?.value||a.notes||'';
    const content=`TOP Design Academy by Anastasia\n\nДомашнее задание: ${a.name}\nСтатус: готово к экспорту\n\nРабочие заметки:\n${notes}\n\nПеред сдачей проверь: формат, размер, шрифты, цвет, композицию и имя итогового файла.`;
    const blob=new Blob([content],{type:'text/plain;charset=utf-8'}); const file=new File([blob],`ГОТОВО_${a.name.replace(/\.[^.]+$/,'')}_notes.txt`,{type:blob.type});
    try{if(navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({title:'Готовая работа',files:[file]});toast('Открылось системное сохранение/поделиться');return}}catch(e){}
    const url=URL.createObjectURL(blob);const x=document.createElement('a');x.href=url;x.download=file.name;x.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Файл подготовлен к сохранению');
  }

  function toolsPage(){
    const cats=['Все','Графика','UI/UX','Презентации','3D','Сайты','Цвет','AI'];
    return `<div class="section-head"><div><h2>Инструменты</h2><p class="muted">Отдельная страница сервисов и AI-инструментов для дизайнера</p></div></div><div id="toolCats" class="pill-row">${cats.map((c,i)=>`<button class="pill ${i===0?'active':''}" data-cat="${c}">${c}</button>`).join('')}</div><div id="toolGrid" class="grid two" style="margin-top:16px">${toolCards(tools)}</div>`;
  }
  function toolCards(arr){return arr.map(t=>`<div class="card tool-card"><div class="tool-logo">${t.logo}</div><div><h3>${t.n}</h3><div class="muted">${t.cat}</div></div><span>☆</span><p class="desc">${t.desc}</p><div class="tool-meta"><span class="tag ai">AI</span>${t.google?'<span class="tag">G Google-вход</span>':''}</div><button class="open-btn" data-url="${t.url}">Открыть</button></div>`).join('')}

  function practice(){return `<div class="section-head"><div><h2>Практика</h2><p class="muted">Небольшие упражнения, чтобы знания сразу превращались в навык.</p></div></div><div class="grid two">${[
    ['Композиция за 15 минут','Сделай афишу только из круга, прямоугольника и текста.'],['Палитра из фотографии','Выбери 5 цветов из одного фото и собери гармоничную палитру.'],['Две шрифтовые пары','Собери строгую и дружелюбную пару шрифтов.'],['Редизайн предмета','Возьми упаковку дома и предложи новый визуальный стиль.']
  ].map((x,i)=>card(x[0],`<p>${x[1]}</p><button class="primary-btn practice-done" data-i="${i}">Выполнила +25 XP</button>`)).join('')}</div>`}

  function aiPage(){return `<div class="section-head"><div><h2>AI-помощник</h2><p class="muted">Он не делает учёбу вместо тебя — он объясняет, даёт подсказку и помогает проверить идею.</p></div></div><div class="grid two"><div class="card"><h3>Спроси простыми словами</h3><textarea id="aiQuestion" placeholder="Например: я не понимаю разницу RGB и CMYK"></textarea><div class="pill-row" style="margin-top:10px"><button class="primary-btn" id="aiExplain">Объясни</button><button class="secondary-btn" id="aiSimpler">Объясни ещё проще</button><button class="secondary-btn" id="aiExercise">Дай упражнение</button></div></div><div class="card"><h3>Ответ</h3><div id="aiAnswer" class="hint-box">Напиши вопрос — я помогу разобраться с темой.</div></div></div>`}
  function offlineCoach(q,mode){
    q=(q||'').toLowerCase();
    const bank=[
      [['rgb','cmyk'],'RGB — для экранов и света, CMYK — для печати и красок. Для соцсетей и интерфейсов начинай в RGB; перед печатью уточняй требования типографии.'],
      [['растр','вектор'],'Растр состоит из пикселей и хорош для фото. Вектор состоит из контуров и масштабируется без потери резкости.'],
      [['композ','сетка','баланс','иерарх'],'Композиция организует взгляд. Начни с главного элемента, выровняй связанные объекты, используй сетку и оставляй свободное пространство.'],
      [['кернинг','интерлиньяж','трекинг'],'Кернинг — расстояние между двумя буквами, трекинг — общий интервал между буквами, интерлиньяж — расстояние между строками.'],
      [['шрифт','типограф'],'Для начала используй 1–2 гарнитуры. Читаемость важнее декоративности.'],
      [['цвет','палитр','контраст'],'Начни с 3–4 цветов: фон, текст, основной и акцент. Проверяй читаемость.'],
      [['photoshop','маск','слои'],'В Photoshop работай слоями и масками. Маска безопаснее ластика.'],
      [['illustrator','безье'],'В Illustrator сначала учись собирать простые формы и работать с опорными точками.'],
      [['бренд','логотип','айдентик'],'Логотип — только часть айдентики. Бренд-система включает цвет, типографику, графику и правила применения.'],
      [['печат','вылет','полиграф'],'Для печати проверь размер, безопасные поля, вылеты и требования типографии.'],
      [['портфол','кейс'],'Хороший кейс показывает задачу, аудиторию, идею, процесс и результат.'],
      [['ai','ии','промпт'],'AI полезен для идей и черновиков, но финальный выбор делает дизайнер.']
    ];
    let base='Попробуй сформулировать вопрос конкретнее: например «что такое визуальная иерархия?» или «чем RGB отличается от CMYK?».';
    for(const [keys,ans] of bank){if(keys.some(k=>q.includes(k))){base=ans;break}}
    if(mode==='simple')base='Совсем просто: '+base;
    if(mode==='exercise')base='Упражнение: сделай два варианта одной работы. В первом специально нарушь правило темы, во втором исправь. Потом запиши 3 различия.';
    return base;
  }

  function openLocalSearch(){
    $('#fileDialogTitle').textContent='Поиск по Академии';
    $('#fileDialogBody').innerHTML=`<div class="search-box"><input id="academySearch" type="search" placeholder="Например: кернинг, RGB, сетка, логотип" autofocus><div id="academyResults" class="search-results"><p class="muted">Ищу по урокам, вопросам, словарю и инструментам.</p></div></div>`;
    $('#fileDialog').showModal();
    const input=$('#academySearch'), out=$('#academyResults');
    const run=()=>{
      const q=(input.value||'').trim().toLowerCase();
      if(q.length<2){out.innerHTML='<p class="muted">Введите хотя бы 2 буквы.</p>';return}
      const rows=[];
      courses.forEach((course,i)=>{
        const d=courseContent[i]||{};
        const blob=[course[0],course[1],d.intro,...(d.theory||[]),d.example,d.practice,...(d.qa||[]).flat()].join(' ').toLowerCase();
        if(blob.includes(q)) rows.push(`<button class="search-hit" data-course-hit="${i}"><strong>📚 ${esc(course[0])}</strong><span>${esc(course[1])}</span></button>`);
      });
      Object.entries(glossary).forEach(([k,v])=>{if((k+' '+v).toLowerCase().includes(q))rows.push(`<div class="search-hit static"><strong>📖 ${esc(k)}</strong><span>${esc(v)}</span></div>`)});
      tools.forEach(t=>{if((t.n+' '+t.cat+' '+t.desc).toLowerCase().includes(q))rows.push(`<a class="search-hit" href="${t.url}" target="_blank" rel="noopener"><strong>🧰 ${esc(t.n)}</strong><span>${esc(t.desc)}</span></a>`)});
      out.innerHTML=rows.length?rows.join(''):'<p class="muted">Ничего не нашлось. Попробуй другое слово.</p>';
      $$('[data-course-hit]').forEach(b=>b.onclick=()=>{$('#fileDialog').close();courseView(Number(b.dataset.courseHit))});
    };
    input.addEventListener('input',run);
  }


  function glossaryPage(){return `<div class="section-head"><div><h2>Словарь дизайнера</h2><p class="muted">Термины без сложных определений.</p></div></div><div class="glossary">${Object.entries(glossary).map(([k,v])=>`<div class="term"><strong>${k}</strong><p class="muted">${v}</p></div>`).join('')}</div>`}
  function works(){return `<div class="section-head"><div><h2>Мои работы</h2><p class="muted">Черновики, упражнения и выполненные задания.</p></div><button class="primary-btn" id="addWork">+ Добавить работу</button></div><input id="workInput" type="file" accept="image/*,.pdf" hidden><div class="portfolio-grid">${state.works.length?state.works.map((w,i)=>`<div class="card"><div class="work-thumb">${w.kind==='image'?'🖼':'📄'}</div><h4>${esc(w.name)}</h4><p class="small">${esc(w.date)}</p><button class="secondary-btn addToPortfolio" data-i="${i}">${w.portfolio?'В портфолио ✓':'В портфолио'}</button></div>`).join(''):'<div class="card"><p class="muted">Пока нет работ. Добавь первую учебную работу.</p></div>'}</div>`}
  function portfolio(){const arr=state.works.filter(w=>w.portfolio);return `<div class="section-head"><div><h2>Портфолио</h2><p class="muted">Лучшие работы, которые можно потом собрать в первый студенческий кейс.</p></div></div><div class="portfolio-grid">${arr.length?arr.map(w=>`<div class="card"><div class="work-thumb">★</div><h4>${esc(w.name)}</h4><p class="muted">${esc(w.date)}</p></div>`).join(''):'<div class="card"><p class="muted">Пока пусто. В «Моих работах» отметь то, что хочешь сохранить в портфолио.</p></div>'}</div>`}
  function progressPage(){const pct=Math.min(100,state.xp/10);return `<div class="hero"><div class="card hero-main"><div class="hero-photo-wrap"><img class="hero-photo" src="assets/anastasia-profile.webp?v=${window.BUILD_ID||''}" alt="Anastasia"><div><h2>Anastasia</h2><p class="muted">Студент · графический дизайн</p><span class="badge">Уровень ${Math.max(1,Math.floor(state.xp/300)+1)}</span></div></div></div><div class="card"><h3>Общий прогресс</h3><div style="font-size:42px;font-weight:800;color:var(--accent)">${pct}%</div><div class="progress"><span style="width:${pct}%"></span></div><p class="muted">${state.xp} / 1000 XP</p></div></div><div class="section-head"><h2>Достижения</h2></div><div class="grid three">${[['Первые шаги','Первый модуль'],['Композиция','100 XP'],['Практика','Первая работа']].map(x=>card(x[0],`<div style="font-size:38px">🏅</div><p class="muted">${x[1]}</p>`)).join('')}</div>`}

  function renderPage(p){state.page=p;save();render()}
  function render(){setTheme();renderNav();updateMeta();const p=state.page;const meta={home:['Главная','Учись · твори · создавай'],learn:['Учёба','От полного нуля до первых работ'],homework:['Домашние задания','Загрузить · выполнить с подсказками · выгрузить'],tools:['Инструменты','AI-сервисы и программы для дизайна'],practice:['Практика','Закрепляем знания руками'],ai:['AI-помощник','Объяснит, подскажет, даст упражнение'],glossary:['Словарь дизайнера','Понятные объяснения терминов'],works:['Мои работы','Черновики и выполненные проекты'],portfolio:['Портфолио','Лучшие работы'],progress:['Профиль и прогресс','Anastasia · студент']}[p]||['TOP Design',''];$('#pageTitle').textContent=meta[0];$('#pageSubtitle').textContent=meta[1];
    const html={home:home,learn,homework,tools:toolsPage,practice,ai:aiPage,glossary:glossaryPage,works,portfolio,progress:progressPage}[p]?.()||home();$('#content').innerHTML=html;wirePage(p);
  }
  function wirePage(p){
    $$('[data-go]').forEach(b=>b.onclick=()=>setPage(b.dataset.go));
    if(p==='learn')$$('.course-open').forEach(b=>b.onclick=()=>courseView(+b.dataset.course));
    if(p==='homework'){
      const inp=$('#assignmentInput');$('#chooseAssignment').onclick=()=>inp.click();inp.onchange=()=>{const f=inp.files[0];if(!f)return;const a={name:f.name,type:f.type||'Файл',size:f.size,status:'Новое',notes:''};state.assignments.unshift(a);save();render();setTimeout(()=>openAssignment(0,f),50)};$$('.open-assignment').forEach(b=>b.onclick=()=>openAssignment(+b.dataset.index));
    }
    if(p==='tools'){$$('[data-cat]').forEach(b=>b.onclick=()=>{$$('[data-cat]').forEach(x=>x.classList.remove('active'));b.classList.add('active');const c=b.dataset.cat;$('#toolGrid').innerHTML=toolCards(c==='Все'?tools:tools.filter(t=>t.cat===c));wireToolLinks();});wireToolLinks()}
    if(p==='practice')$$('.practice-done').forEach(b=>b.onclick=()=>{state.xp+=25;save();toast('+25 XP');updateMeta()});
    if(p==='ai'){const q=()=>$('#aiQuestion').value;$('#aiExplain').onclick=()=>$('#aiAnswer').textContent=offlineCoach(q(),'normal');$('#aiSimpler').onclick=()=>$('#aiAnswer').textContent=offlineCoach(q(),'simple');$('#aiExercise').onclick=()=>$('#aiAnswer').textContent=offlineCoach(q(),'exercise')}
    if(p==='works'){const inp=$('#workInput');$('#addWork').onclick=()=>inp.click();inp.onchange=()=>{const f=inp.files[0];if(!f)return;state.works.unshift({name:f.name,date:new Date().toLocaleDateString('ru-RU'),kind:f.type.startsWith('image/')?'image':'file',portfolio:false});save();toast('Работа добавлена');render()};$$('.addToPortfolio').forEach(b=>b.onclick=()=>{state.works[+b.dataset.i].portfolio=!state.works[+b.dataset.i].portfolio;save();render()})}
  }
  function wireToolLinks(){$$('[data-url]').forEach(b=>b.onclick=()=>window.open(b.dataset.url,'_blank','noopener,noreferrer'))}

  function openSettings(){
    const themes=[['pink','Розовая','#fff3f7','#ef6f9e'],['dark','Тёмная','#1e1b1f','#ff7cab'],['lavender','Лавандовая','#f3edff','#9b79d0'],['blue','Голубая','#eaf5ff','#62a5d8'],['beige','Бежевая','#f7eddf','#c68e6d']];
    $('#brightnessRange').value=state.brightness;$('#themeChoices').innerHTML=themes.map(t=>`<button class="theme-btn ${state.theme===t[0]?'active':''}" data-theme-choice="${t[0]}"><div class="swatch" style="--sw1:${t[2]};--sw2:${t[3]}"></div>${t[1]}</button>`).join('');$$('[data-version]').forEach(x=>x.textContent=window.APP_VERSION||'1.0.0');$('#settingsDialog').showModal();$('#brightnessRange').oninput=e=>{state.brightness=+e.target.value;setTheme()};$$('[data-theme-choice]').forEach(b=>b.onclick=e=>{e.preventDefault();state.theme=b.dataset.themeChoice;setTheme();$$('[data-theme-choice]').forEach(x=>x.classList.toggle('active',x===b))})
  }

  $('#menuBtn').onclick=()=>{$('#sidebar').classList.add('open');$('#backdrop').hidden=false};$('#backdrop').onclick=closeSidebar;$('#searchBtn').onclick=openLocalSearch;$('#notifyBtn').onclick=()=>toast('Новых уведомлений нет');

  // Установка PWA на Android: показываем свой экран только в браузере и только пока приложение не установлено.
  let deferredInstallPrompt = null;
  const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  const installDialog = $('#installDialog');
  const installBtn = $('#installAppBtn');
  const continueBtn = $('#continueBrowserBtn');
  const installHelp = $('#installHelp');
  const installDismissedKey = 'topDesignInstallDismissed';

  function showInstallOffer(){
    if(!installDialog || isStandalone() || localStorage.getItem(installDismissedKey)==='1') return;
    if(!installDialog.open) installDialog.showModal();
  }
  function hideInstallOffer(){ if(installDialog?.open) installDialog.close(); }

  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredInstallPrompt = event;
    localStorage.removeItem(installDismissedKey);
    showInstallOffer();
  });

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    localStorage.removeItem(installDismissedKey);
    hideInstallOffer();
    toast('TOP Design Academy установлено ✓');
  });

  if(installBtn) installBtn.onclick = async () => {
    if(deferredInstallPrompt){
      deferredInstallPrompt.prompt();
      const choice = await deferredInstallPrompt.userChoice.catch(()=>({outcome:'dismissed'}));
      if(choice.outcome==='accepted') hideInstallOffer();
      deferredInstallPrompt = null;
      return;
    }
    installHelp.hidden = false;
    installBtn.textContent = 'Открыть инструкцию установки';
  };
  if(continueBtn) continueBtn.onclick = () => {
    localStorage.setItem(installDismissedKey,'1');
    hideInstallOffer();
  };

  render();
  // Если браузер пока не отдал beforeinstallprompt, всё равно показываем понятный экран установки.
  window.addEventListener('load',()=>setTimeout(showInstallOffer,450));

  // Автообновление PWA: без ручной кнопки. Новая сборка активирует новый SW и перезагружает приложение.
  if('serviceWorker' in navigator){window.addEventListener('load',async()=>{try{const reg=await navigator.serviceWorker.register(`sw.js?v=${window.BUILD_ID||Date.now()}`);await reg.update();let refreshing=false;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(refreshing)return;refreshing=true;location.reload()});if(reg.waiting)reg.waiting.postMessage({type:'SKIP_WAITING'});reg.addEventListener('updatefound',()=>{const nw=reg.installing;if(!nw)return;nw.addEventListener('statechange',()=>{if(nw.state==='installed'&&navigator.serviceWorker.controller)nw.postMessage({type:'SKIP_WAITING'})})})}catch(e){console.warn('SW:',e)}})}
})();
