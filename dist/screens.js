/* Product-level layouts reuse the prototype's existing actions and local data. */
let learningFilter='all', readerSize=20;
const screenTitles={empresas:['Explorar','Encontre um bom negócio por perto.'],mural:['Comunidade','O que a sua rede pode fazer por você?'],conexoes:['Minhas conexões','Cada conversa pode abrir um caminho.'],cursos:['Aprender','Conhecimento que cabe no seu dia.'],biblia:['Palavra','Um tempo para renovar o que importa.'],impacto:['Meu impacto','O bem que as suas escolhas movimentam.'],nota:['Enviar nota','Sua compra pode fazer mais.'],comunidade:['Encontros','Boas conexões também acontecem ao vivo.'],notificacoes:['Seu dia na CRIS','Novidades da rede e um momento de fé.'],perfil:['Minha conta','Seu lugar nessa comunidade.']};
function insertAfterHeading(html){document.querySelector('.page-heading')?.insertAdjacentHTML('afterend',html)}
function enhanceScreen(){
 if(route==='inicio')return;
 const title=screenTitles[route];if(title){$('.page-heading h1').textContent=title[0];$('.page-heading p').textContent=title[1]}
 const main=$('#main');main.classList.add('product-screen');
 // Keep demonstration details available, without interrupting the primary task.
 main.querySelectorAll('.sample-banner').forEach(el=>{const d=document.createElement('details');d.className='demo-details';d.innerHTML='<summary>'+ic('eye')+' Sobre esta demonstração '+ic('chevron')+'</summary><p>'+el.textContent+'</p>';el.replaceWith(d)});
 if(route==='empresas'){
  if(!query&&filter==='Todos'&&!onlyFavorites) $('.category-filters').insertAdjacentHTML('afterend',`<button class="market-feature" data-business="pao"><img src="assets/comercio-cris.webp" alt=""><span class="feature-tint"></span><span class="feature-content"><small>UM BOM LUGAR PARA COMEÇAR</small><strong>Café quentinho.<br>Propósito de sobra.</strong><span>Pão & Prosa ${ic('arrow')}</span></span><span class="feature-stamp">5%<small>de impacto</small></span></button>`);
  $('.market-explainer').classList.add('compact-explainer');
 }
 if(route==='mural'){
  insertAfterHeading(`<div class="community-switch"><button class="selected" aria-current="page">Mural</button><button data-route="conexoes">Minhas conexões <span>${state.connections.length}</span></button><button data-route="comunidade">Encontros</button></div><button class="compose-card" data-action="new-post"><span class="avatar">${esc(state.profile.name[0])}</span><span>Compartilhe com a comunidade<small>Preciso de ajuda · Posso oferecer</small></span><i>${ic('plus')}</i></button>`);
  main.querySelectorAll('.post').forEach(post=>{const person=post.querySelector('.person');const badge=post.querySelector('.badge');const header=document.createElement('div');header.className='post-person-row';header.append(person,badge);post.prepend(header);post.querySelector('.post-footer').insertAdjacentHTML('afterbegin',`<span class="post-local">${ic('connect')} Uma oportunidade de conexão</span>`)});
 }
 if(route==='conexoes'){
  insertAfterHeading(`<div class="network-summary"><span>${ic('connect')}</span><div><small>SUA REDE EM MOVIMENTO</small><strong>${state.connections.length?state.connections.length+' conversas, novas possibilidades.':'Sua próxima parceria começa aqui.'}</strong><p>Da primeira indicação ao negócio realizado.</p></div></div>`);
  main.querySelectorAll('.connection').forEach((el,i)=>{const stages=['Interesse registrado','Indicação feita','Reunião marcada','Negócio gerado'];const index=stages.indexOf(state.connections[i].status);el.insertAdjacentHTML('beforeend',`<div class="connection-journey" aria-label="Etapa ${index+1} de 4">${stages.map((s,j)=>`<span class="${j<=index?'done':''}"><i>${j<index?ic('check'):j+1}</i><small>${['Interesse','Indicação','Reunião','Negócio'][j]}</small></span>`).join('')}</div>`)});
  $('.empty')?.insertAdjacentHTML('afterbegin','<div class="empty-orbit">'+ic('connect')+'</div>');
 }
 if(route==='cursos'){
  const current=courses.find(c=>c.lessons.some((_,j)=>!state.completed.includes(c.id+'-'+j)))||courses[0];const done=current.lessons.filter((_,j)=>state.completed.includes(current.id+'-'+j)).length;
  insertAfterHeading(`<button class="learning-feature" data-course="${current.id}"><span class="learning-feature-copy"><small>${done?'CONTINUE DE ONDE PAROU':'SEU PRÓXIMO PASSO'}</small><strong>${current.title}</strong><span>${done?'Leitura '+(done+1)+' de '+current.lessons.length:'Uma leitura. Uma ideia para aplicar.'}</span><b>${done?'Continuar':'Começar agora'} ${ic('arrow')}</b></span><span class="book-stack" aria-hidden="true"><i></i><i></i><span>${ic(current.icon)}<small>CRIS<br>APRENDA & APLIQUE</small></span></span></button><div class="learning-tabs" aria-label="Filtrar trilhas">${[['all','Todas as trilhas'],['started','Em andamento'],['done','Concluídas']].map(([key,label])=>`<button data-learning-filter="${key}" aria-pressed="${learningFilter===key}" class="${learningFilter===key?'selected':''}">${label}</button>`).join('')}</div>`);
  main.querySelectorAll('.course-card').forEach((el,i)=>{const c=courses[i];const n=c.lessons.filter((_,j)=>state.completed.includes(c.id+'-'+j)).length;el.dataset.learningStatus=n===c.lessons.length?'done':n?'started':'new';el.querySelector('.course-cover').insertAdjacentHTML('beforeend',`<b class="cover-topic">${['Organize.<br>Planeje.<br>Cresça.','Sua história<br>merece<br>ser contada.','Liderar é<br>cuidar de<br>pessoas.'][i]}</b>`)});filterLearning();
 }
 if(route==='biblia'){
  insertAfterHeading(`<div class="reading-intro"><span>${ic('book')}</span><div><small>DESACELERE POR UM INSTANTE</small><strong>Há cuidado em cada palavra.</strong></div>${ic('spark')}</div>`);
  $('.reader-tools').insertAdjacentHTML('afterend',`<div class="reader-preferences"><span>Conforto de leitura</span><div><button data-reader-size="-2" aria-label="Diminuir texto">A−</button><button data-reader-size="2" aria-label="Aumentar texto">A+</button></div><button data-reader-focus aria-pressed="false">${ic('book')} Foco</button></div>`);$('.bible-copy').style.fontSize=readerSize+'px';
 }
 if(route==='impacto'){
  $('.impact-overview').insertAdjacentHTML('afterend',`<div class="impact-actions"><button data-route="nota">${ic('scan')} Enviar nota</button><button data-project-jump>${ic('heart')} Escolher projeto</button></div>`);
  main.querySelectorAll('.project-choice').forEach((el,i)=>el.insertAdjacentHTML('afterbegin',`<span class="project-choice-icon">${ic(['leaf','food','course'][i])}</span>`));
 }
 if(route==='nota'){
  insertAfterHeading(`<div class="receipt-steps" aria-label="Como funciona"><span class="active"><i>1</i> Registrar</span><b></b><span><i>2</i> Validar</span><b></b><span><i>3</i> Contribuir</span></div>`);
  const input=$('input[type=file]');const label=input.closest('label');label.classList.add('upload-zone');label.insertAdjacentHTML('afterbegin',`<span class="upload-graphic">${ic('scan')}</span><strong>Adicione sua nota fiscal</strong><small>Foto ou PDF · Opcional nesta demonstração</small>`);
  label.childNodes.forEach(n=>{if(n.nodeType===3)n.textContent=''});
  $('#receipt-amount').closest('label').classList.add('amount-field');
 }
 if(route==='comunidade'){
  insertAfterHeading(`<div class="community-switch"><button data-route="mural">Mural</button><button data-route="conexoes">Minhas conexões</button><button class="selected" aria-current="page">Encontros</button></div><div class="community-cover"><img src="assets/hero-comunidade-v4.webp" alt="Pessoas reunidas em comunidade"><span><small>DA TELA PARA A VIDA</small><strong>Tem conversa que<br>vira um novo começo.</strong></span></div><div class="section-head"><h2>Vamos nos encontrar?</h2><span class="badge">Agenda conceitual</span></div>`);
  main.querySelectorAll('.post').forEach((el,i)=>{el.classList.add('event-card');el.insertAdjacentHTML('afterbegin',`<div class="event-symbol">${ic(i?'course':'food')}<span>${i?'ONLINE':'RECIFE'}<small>Data a definir</small></span></div>`)});
 }
 if(route==='notificacoes'){
  insertAfterHeading(`<div class="notification-summary"><span>${ic('bell')}</span><div><small>UM ENCONTRO COM O SEU DIA</small><strong>${state.notify?'Seu lembrete está preparado.':'Um bom hábito começa pequeno.'}</strong><p>${state.notify?'Preferência salva para '+esc(state.notifyTime)+'.':'Escolha um horário para a Palavra do dia.'}</p></div></div>`);
  $('#notification-form').insertAdjacentHTML('afterbegin','<span class="settings-icon">'+ic('calendar')+'</span>');
 }
 if(route==='perfil'){
  const filled=state.profile.business?3:2;
  insertAfterHeading(`<section class="account-card"><span class="avatar">${esc(state.profile.name[0])}</span><div><small>VOCÊ FAZ PARTE</small><strong>${esc(state.profile.name)}</strong><span>${ic('pin')} ${esc(state.profile.city)}</span></div><i>${ic('leaf')}</i></section><div class="profile-completion"><span>Seu perfil na comunidade <strong>${filled}/3</strong></span><div><i style="width:${filled/3*100}%"></i></div><small>${filled===3?'Tudo pronto para se apresentar à sua rede.':'Adicione seu negócio para completar seu perfil.'}</small></div>`);
  $('.profile-mark').remove();$('#profile-form').insertAdjacentHTML('afterbegin','<h2 class="form-title">Suas informações</h2>');
 }
}
function filterLearning(){const cards=[...document.querySelectorAll('.course-card')];cards.forEach(c=>c.hidden=learningFilter!=='all'&&c.dataset.learningStatus!==learningFilter);document.querySelector('.learning-empty')?.remove();if(cards.length&&!cards.some(c=>!c.hidden))$('.course-grid').insertAdjacentHTML('beforeend',`<div class="empty learning-empty">${ic('course')}<h2>${learningFilter==='done'?'Sua primeira conquista vem aí.':'Seu próximo aprendizado está aqui.'}</h2><p>${learningFilter==='done'?'As trilhas concluídas vão aparecer neste espaço.':'Escolha uma trilha e faça a primeira leitura.'}</p><button class="btn" data-learning-filter="all">Explorar trilhas ${ic('arrow')}</button></div>`)}
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.learningFilter){learningFilter=b.dataset.learningFilter;render();document.querySelector('[data-learning-filter='+learningFilter+']')?.focus({preventScroll:true})}if(b.dataset.readerSize){readerSize=Math.max(16,Math.min(28,readerSize+Number(b.dataset.readerSize)));$('.bible-copy').style.fontSize=readerSize+'px'}if(b.hasAttribute('data-reader-focus')){const active=$('.reader').classList.toggle('reading-focus');b.setAttribute('aria-pressed',String(active));b.innerHTML=ic('book')+(active?'Sair do foco':'Foco')}if(b.hasAttribute('data-project-jump')){$('.project-panel').scrollIntoView({behavior:'smooth',block:'start'});$('.project-choice input').focus({preventScroll:true})}});
document.addEventListener('change',e=>{if(e.target.matches('input[type=file]')){const label=e.target.closest('label');label.classList.toggle('has-file',!!e.target.files.length);label.querySelector('strong').textContent=e.target.files.length?'Nota selecionada':'Adicione sua nota fiscal'}});
enhanceScreen();

document.addEventListener('input',e=>{if(e.target.id==='market-search'){const feature=document.querySelector('.market-feature');if(feature)feature.hidden=!!e.target.value.trim()}});
