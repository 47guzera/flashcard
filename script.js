 // Dados iniciais
      const initialCards = [
        {
          question: "Gargarejar água morna cura a COVID-19?",
          answer: "Não — não há evidências científicas de que gargarejar água morna previna ou cure COVID-19.",
          type: "Mito",
          img: ""
        },
        {
          question: "Vacinas aprovadas passam por testes de segurança?",
          answer: "Sim — vacinas aprovadas passam por várias fases de testes clínicos e monitoramento contínuo.",
          type: "Verdade",
          img: ""
        },
        {
          question: "Imagens antigas podem ser reutilizadas como 'prova' de evento atual?",
          answer: "Sim — muitas imagens antigas ou de outros contextos são reutilizadas e enganam; faça busca reversa.",
          type: "Verdade",
          img: ""
        },
        {
          question: "Pinguins conseguem voar como pássaros?",
          answer: "Não — pinguins não voam; eles são excelentes nadadores adaptados ao ambiente aquático.",
          type: "Mito",
          img: "https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/mm1012723121410486.jpg?w=1900&h=2849"
        }
      ];

      let cards = [...initialCards]; // manter cópia mutável
      let currentOrder = cards.map((_, i) => i);

      const grid = document.getElementById('cardsGrid');

      function createCardElement(c, index){
        const art = document.createElement('article');
        art.className = 'card';
        art.setAttribute('tabindex','0');
        art.setAttribute('role','article');
        art.setAttribute('aria-label', `${c.type} — ${c.question}`);
        art.dataset.index = index;

        const inner = document.createElement('div');
        inner.className = 'card-inner';

        // Front face
        const front = document.createElement('div');
        front.className = 'face front';
        const topF = document.createElement('div'); topF.className='top';
        if(c.img){
          const img = document.createElement('img');
          img.className = 'cartao-imagem';
          img.src = c.img;
          img.alt = c.alt || c.question + " — imagem ilustrativa";
          topF.appendChild(img);
        }
        const qwrap = document.createElement('div');
        const q = document.createElement('p'); q.className='question'; q.textContent = c.question;
        qwrap.appendChild(q);
        topF.appendChild(qwrap);
        front.appendChild(topF);
        const metaF = document.createElement('div'); metaF.className='meta ' + (c.type==='Mito' ? 'mito' : 'verdade'); metaF.textContent = c.type;
        front.appendChild(metaF);

        // Back face
        const back = document.createElement('div');
        back.className = 'face back';
        const topB = document.createElement('div'); topB.className='top';
        if(c.img){
          const img2 = document.createElement('img');
          img2.className='cartao-imagem';
          img2.src = c.img;
          img2.alt = c.alt || c.question + " — imagem ilustrativa";
          topB.appendChild(img2);
        }
        const awrap = document.createElement('div');
        const a = document.createElement('p'); a.className='answer'; a.textContent = c.answer;
        awrap.appendChild(a);
        topB.appendChild(awrap);
        back.appendChild(topB);
        const metaB = document.createElement('div'); metaB.className='meta ' + (c.type==='Mito' ? 'mito' : 'verdade'); metaB.textContent = c.type;
        back.appendChild(metaB);

        inner.appendChild(front);
        inner.appendChild(back);
        art.appendChild(inner);

        // Interaction: click/touch toggles flip (useful on mobile)
        art.addEventListener('click', (e) => {
          // avoid toggling when clicking on form inputs elsewhere
          inner.classList.toggle('flipped');
        });

        // Keyboard: Enter or Space to flip
        art.addEventListener('keydown', (e) => {
          if(e.key === 'Enter' || e.key === ' '){
            e.preventDefault();
            inner.classList.toggle('flipped');
          }
        });

        return art;
      }

      function render(){
        grid.innerHTML = '';
        // Show cards in currentOrder
        currentOrder.forEach((i) => {
          const el = createCardElement(cards[i], i);
          grid.appendChild(el);
        });
      }

      // Shuffle and reset
      function shuffleArray(){
        currentOrder = cards.map((_, i)=>i);
        for(let i=currentOrder.length-1;i>0;i--){
          const j = Math.floor(Math.random()*(i+1));
          [currentOrder[i], currentOrder[j]] = [currentOrder[j], currentOrder[i]];
        }
        render();
      }
      function resetOrder(){
        currentOrder = cards.map((_, i)=>i);
        render();
      }

      // Add form behavior
      document.getElementById('addBtn').addEventListener('click', (e) => {
        e.preventDefault();
        const q = document.getElementById('qInput').value.trim();
        const a = document.getElementById('aInput').value.trim();
        const img = document.getElementById('imgInput').value.trim();
        const t = document.getElementById('typeInput').value;
        if(!q || !a) return;
        cards.push({question:q, answer:a, type:t, img: img});
        resetOrder();
        // clear
        document.getElementById('qInput').value='';
        document.getElementById('aInput').value='';
        document.getElementById('imgInput').value='';
        // focus on new card (last)
        setTimeout(()=> {
          const lastArticle = grid.querySelector('article.card:last-child');
          if(lastArticle) lastArticle.scrollIntoView({behavior:'smooth', block:'center'});
        }, 120);
      });

      // Controls
      document.getElementById('shuffleBtn').addEventListener('click', shuffleArray);
      document.getElementById('resetBtn').addEventListener('click', resetOrder);

      // Keyboard shortcut for shuffle (E)
      window.addEventListener('keydown', (e) => {
        if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
        if(e.key.toLowerCase() === 'e') shuffleArray();
      });

      // Inicializa
      resetOrder();