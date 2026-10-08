/* MuslimPhonics – moteur de langue (English · Français · العربية).
   Les textes viennent de translations.js ; ce fichier ne contient aucune traduction. */
(function () {
  var KEY = "mp-lang";
  var DEFAULT = "fr";
  var HARAKAT = /[ً-ْٰ]/g;
  /* une langue marquée hidden (ex. arabe en attente de relecture) n'est ni proposée ni acceptée */
  var LANGS = (window.MP_LANGS || [{ code: "en", label: "English" }, { code: "fr", label: "Français" }])
    .filter(function (L) { return !L.hidden; });

  function isLang(c) {
    for (var i = 0; i < LANGS.length; i++) if (LANGS[i].code === c) return true;
    return false;
  }

  /* Langue : ?lang= dans l'adresse d'abord (le ZIP hors ligne ne partage pas
     toujours la mémoire du navigateur entre les pages), puis la mémoire, puis le français. */
  function readLang() {
    try {
      var m = /[?&]lang=([a-z]+)/.exec(location.search);
      if (m && isLang(m[1])) { saveLang(m[1]); return m[1]; }
    } catch (e) {}
    try { var v = localStorage.getItem(KEY); if (isLang(v)) return v; } catch (e) {}
    return DEFAULT;
  }

  /* Ajoute ?lang= aux liens vers les autres pages du livre. */
  function withLang(href, lang) {
    if (!href || /^(https?:|mailto:|tel:|#)/.test(href) || !/\.html(\?|#|$)/.test(href)) return href;
    var hash = "", i = href.indexOf("#");
    if (i > -1) { hash = href.slice(i); href = href.slice(0, i); }
    href = href.replace(/([?&])lang=[a-z]+&?/, "$1").replace(/[?&]$/, "");
    return href + (href.indexOf("?") > -1 ? "&" : "?") + "lang=" + lang + hash;
  }
  function linkLang() {
    var a = document.querySelectorAll("a[href]");
    for (var i = 0; i < a.length; i++) {
      var h = a[i].getAttribute("href");
      if (h.indexOf("index.html") === 0) continue;  /* la page du livre sert à choisir */
      a[i].setAttribute("href", withLang(h, MP.lang));
    }
  }

  function saveLang(c) {
    try { localStorage.setItem(KEY, c); } catch (e) {}
  }

  function esc(t) {
    return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* Tashkeel en rouge : couche complète rouge dessous, couche sans voyelles bleue dessus. */
  function arHTML(t) {
    return '<span class="mp-ar" lang="ar" dir="rtl">' +
      '<span class="mp-ar-full">' + esc(t) + '</span>' +
      '<span class="mp-ar-top" aria-hidden="true">' + esc(t.replace(HARAKAT, "")) + '</span>' +
      '</span>';
  }

  var css =
    '[hidden]{display:none !important;}' +
    '.mp-ar{position:relative;display:inline-block;direction:rtl;unicode-bidi:isolate;font-style:normal;font-size:clamp(34px,1.8em,52px);font-weight:bold;line-height:1.9;color:#e02424;}' +
    '.mp-ar-top{position:absolute;inset:0;color:#173f7a;}' +
    '.mp-globe-wrap{position:relative;}' +
    '.mp-globe{background:#fffdf8;border:none;padding:14px 18px;border-radius:20px;font-size:28px;cursor:pointer;box-shadow:0 6px 18px rgba(0,0,0,0.12);}' +
    '.mp-lang-menu{position:absolute;right:0;top:calc(100% + 8px);background:#fffdf8;border-radius:20px;padding:10px;box-shadow:0 10px 25px rgba(0,0,0,0.18);display:flex;flex-direction:column;gap:8px;z-index:50;min-width:170px;}' +
    '.mp-lang-btn{border:none;background:#eef4ff;color:#173f7a;font-family:Arial,sans-serif;font-size:22px;font-weight:bold;padding:12px 18px;border-radius:16px;cursor:pointer;}' +
    '.mp-lang-btn.mp-on{background:#173f7a;color:white;}' +
    '.mp-lang-choice{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:18px;}' +
    '.mp-help-pic{display:block;width:min(320px,75vw);aspect-ratio:16/9;overflow:hidden;background:white;border-radius:14px;}' +
    '.mp-help-pic img,.mp-pic img{display:block;width:100%;height:100%;object-fit:contain;transform:scale(1.6);}' +
    '[data-mp-listen]{grid-template-columns:1fr;}' +
    '.mp-listen-card .mp-pics{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:18px;}' +
    '.mp-pic{border:4px solid #dfefff;background:white;border-radius:18px;padding:0;aspect-ratio:16/9;overflow:hidden;cursor:pointer;transition:0.2s;}' +
    '.mp-pic:hover{transform:scale(1.04);}' +
    '.mp-change-lang{display:flex;direction:ltr;justify-content:center;align-items:center;gap:12px;margin-top:16px;padding:14px;border-radius:22px;background:#173f7a;color:white;text-decoration:none;font-size:22px;font-weight:bold;box-shadow:0 6px 18px rgba(0,0,0,0.15);}' +
    '.mp-change-lang:hover{transform:scale(1.03);background:#21539c;}' +
    '.mp-lang-start{display:flex;flex-direction:column;gap:14px;}' +
    '.mp-lang-start .mp-lang-btn{font-size:30px;padding:20px;border-radius:24px;background:#173f7a;color:white;box-shadow:0 8px 20px rgba(0,0,0,0.15);transition:0.2s;}' +
    '.mp-lang-start .mp-lang-btn:hover{transform:scale(1.03);background:#21539c;}' +
    '.mp-lang-start .mp-lang-btn.mp-on{outline:5px solid #ffd54f;}' +
    '.mp-slow{background:#fffdf8;color:#173f7a;border:3px solid #ffd54f;padding:13px 20px;border-radius:24px;font-size:24px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;box-shadow:0 6px 18px rgba(0,0,0,0.12);}' +
    '.mp-slow[aria-pressed="true"]{background:#ffd54f;}' +
    '.mp-slow .mp-ar{font-size:1.15em;line-height:1;}' +
    '@media(max-width:700px){.mp-slow{font-size:16px;padding:8px 12px;}.top-bar:has(.mp-slow){flex-wrap:wrap;gap:8px;}.top-bar:has(.mp-slow) .story-title{flex:1 1 calc(100% - 80px);}.mp-slow .mp-ar{font-size:1em;}}' +
    '.word.mp-hl{background:#ffd54f;}' +
    '.word.mp-pair{background:#e8f7df;}' +
    '.mp-instr-bulb{vertical-align:middle;margin-left:10px;}' +
    '.mp-instr-text{display:none;font-size:20px;font-weight:600;font-style:italic;color:#5c6f8f;text-transform:none;letter-spacing:0;margin-top:10px;line-height:1.5;}' +
    '.mp-word-bubble{position:absolute;z-index:60;max-width:min(340px,90vw);background:#fffdf8;border:3px solid #173f7a;border-radius:20px;padding:14px 18px;box-shadow:0 10px 25px rgba(0,0,0,0.18);color:#173f7a;font-family:Arial,sans-serif;line-height:1.4;}' +
    '.mp-word-title{font-size:30px;font-weight:bold;margin-bottom:6px;}' +
    '.mp-word-text{font-size:22px;font-weight:bold;margin-top:6px;}' +
    '.mp-word-bubble .mp-help-pic{width:min(260px,75vw);}' +
    '.mp-pic.correct{border-color:#38b94a;background:white !important;}' +
    '.mp-pic.wrong{border-color:#ff4d4d;background:white !important;}' +
    '@media(max-width:700px){.mp-globe{font-size:22px;padding:10px 12px;}.mp-lang-btn{font-size:18px;}' +
    '.think-option:has(.mp-ar){flex-wrap:wrap;}.think-option-fr:has(.mp-ar){flex-basis:100%;}}';

  function addStyle() {
    var s = document.createElement("style");
    s.textContent = css;
    document.head.appendChild(s);
  }

  var MP = { lang: readLang() };
  window.MP = MP;

  function story() { return document.body.getAttribute("data-mp-story"); }

  function data(lang) {
    var st = window.MP_TR && window.MP_TR[story()];
    return (st && st[lang]) || {};
  }

  /* Texte d'aide pour une clé, dans la langue choisie (repli : français). */
  function helpHTML(key) {
    if (MP.lang !== "fr") {
      var t = data(MP.lang)[key];
      if (t) return MP.lang === "ar" ? arHTML(t) : esc(t);
    }
    var f = data("fr")[key];
    return f == null ? "" : f;
  }

  /* ---------- voix (lecture des aides en anglais) ---------- */
  var voice = null;
  function loadVoice() {
    if (!window.speechSynthesis) return;
    var v = speechSynthesis.getVoices();
    voice = v.find(function (x) { return x.lang.indexOf("en-GB") > -1; }) ||
            v.find(function (x) { return x.lang.indexOf("en-US") > -1; }) ||
            v.find(function (x) { return x.lang.indexOf("en") === 0; }) || null;
  }
  MP.say = function (text) {
    if (!window.speechSynthesis) return;
    if (typeof window.stopFullStory === "function") window.stopFullStory();
    speechSynthesis.cancel();
    if (!voice) loadVoice();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "en-GB";
    u.rate = 0.7;
    if (voice) u.voice = voice;
    speechSynthesis.speak(u);
  };
  if (window.speechSynthesis) speechSynthesis.addEventListener("voiceschanged", loadVoice);

  /* Passage de full.mp3 (voix Beth) ; repli sur la voix du navigateur s'il manque. */
  var clipAudio = null, clipTimer = null;
  MP.stopClip = function () {
    clearInterval(clipTimer);
    if (clipAudio) clipAudio.pause();
  };
  MP.playClip = function (key, fallbackText) {
    var st = window.MP_TR && window.MP_TR[story()];
    var c = st && st.clips && st.clips[key];
    if (!c) { if (fallbackText) MP.say(fallbackText); return; }
    if (typeof window.stopFullStory === "function") window.stopFullStory();
    if (window.speechSynthesis) speechSynthesis.cancel();
    MP.stopClip();
    if (!clipAudio) {
      clipAudio = new Audio(story() + "/full.mp3");
      clipAudio.addEventListener("playing", function () { startHL(); });
      clipAudio.addEventListener("seeked", function () { startHL(); });
    }
    var start = Math.max(0, c[0] - 0.1), end = c[1] + 0.2;
    var a = clipAudio;
    applyRate(a);
    /* play() reste dans le geste (sinon iPhone/iPad bloque le son) ;
       muet le temps d'aller au début de la phrase */
    function seek() {
      a.currentTime = start;
      a.muted = false;
      clipTimer = setInterval(function () { if (a.currentTime >= end) MP.stopClip(); }, 30);
    }
    if (a.readyState >= 1) {
      a.currentTime = start;
      a.play().catch(function () {});
      clipTimer = setInterval(function () { if (a.currentTime >= end) MP.stopClip(); }, 30);
    } else {
      a.muted = true;
      a.addEventListener("loadedmetadata", seek, { once: true });
      a.play().catch(function () {});
    }
  };

  /* Lecture lente (bouton Slow) : même voix, 75 % de la vitesse, choix mémorisé. */
  var SLOW_KEY = "mp-slow";
  MP.slow = false;
  try { MP.slow = localStorage.getItem(SLOW_KEY) === "1"; } catch (e) {}
  function rate() { return MP.slow ? 0.75 : 1; }
  function applyRate(a) { if (a) { a.preservesPitch = true; a.playbackRate = rate(); } }
  function addSlow() {
    var listen = document.querySelector(".top-bar .listen-icon");
    if (!listen) return;
    var b = document.createElement("button");
    b.className = "mp-slow";
    b.setAttribute("aria-pressed", MP.slow ? "true" : "false");
    b.onclick = function () {
      MP.slow = !MP.slow;
      try { localStorage.setItem(SLOW_KEY, MP.slow ? "1" : "0"); } catch (e) {}
      b.setAttribute("aria-pressed", MP.slow ? "true" : "false");
      applyRate(clipAudio);
      try { applyRate(storyAudio); } catch (e) {}
    };
    listen.insertAdjacentElement("afterend", b);
  }

  /* Surlignage du mot lu, synchronisé avec l'histoire entière ou avec 👂. */
  var hlWord = null, hlLoop = null;
  function currentAudio() {
    if (clipAudio && !clipAudio.paused) return clipAudio;
    try { if (typeof storyAudio !== "undefined" && storyAudio && !storyAudio.paused) return storyAudio; } catch (e) {}
    return null;
  }
  function setHL(el) {
    if (hlWord === el) return;
    if (hlWord) hlWord.classList.remove("mp-hl");
    hlWord = el;
    if (el) el.classList.add("mp-hl");
  }
  function hlTick() {
    var a = currentAudio();
    if (!a) { setHL(null); hlLoop = null; return; }
    var st = window.MP_TR && window.MP_TR[story()];
    var clips = (st && st.clips) || {}, times = (st && st.wordTimes) || {};
    var t = a.currentTime, found = null;
    for (var key in times) {
      var c = clips[key], wt = times[key];
      if (!c || t < wt[0] - 0.05 || t > c[1] + 0.15) continue;
      var help = document.querySelector('.sentence .help-text[data-tr="' + key + '"]');
      var words = help ? help.parentElement.querySelectorAll(".word") : [];
      var i = wt.length - 1;
      while (i > 0 && t < wt[i] - 0.05) i--;
      found = words[i] || null;
      break;
    }
    setHL(found);
    hlLoop = requestAnimationFrame(hlTick);
  }
  function startHL() { if (!hlLoop) hlLoop = requestAnimationFrame(hlTick); }

  /* 👂 à côté de chaque 💡 : lit la phrase (voix Beth), sans rien afficher. */
  function addEars() {
    var st = window.MP_TR && window.MP_TR[story()];
    var clips = (st && st.clips) || {};
    var helps = document.querySelectorAll(".sentence .help-text[data-tr]");
    for (var i = 0; i < helps.length; i++) (function (help) {
      var key = help.getAttribute("data-tr");
      var bulb = help.parentElement.querySelector(".help-icon");
      if (!clips[key] || !bulb) return;
      var ear = document.createElement("button");
      ear.className = "help-icon mp-ear";
      ear.textContent = "👂";
      ear.setAttribute("aria-label", "Listen to this sentence");
      ear.onclick = function () { MP.playClip(key); };
      bulb.insertAdjacentElement("afterend", ear);
    })(helps[i]);
  }

  /* Bulle du sens d'un mot : image + sens dans la langue choisie (MP_WORDS). */
  var bubble = null, pairEls = [];
  function closeWord() {
    if (bubble) { bubble.remove(); bubble = null; }
    pairEls.forEach(function (x) { x.classList.remove("mp-pair"); });
    pairEls = [];
  }
  function wordKey(el) { return el ? el.textContent.toLowerCase().replace(/[^a-z']/g, "") : ""; }
  function wordSib(el, dir) {
    var s = el;
    do { s = dir > 0 ? s.nextElementSibling : s.previousElementSibling; } while (s && !s.classList.contains("word"));
    return s;
  }
  /* En arabe, « a » / « the » + nom forment un seul bloc :
     a cap = قُبَّعَةٌ (tanwīn, champ ar) ; the cap = الْقُبَّعَةُ (alif lām, champ arAl). */
  function arPair(el) {
    var k = wordKey(el), art, noun;
    if (k === "a" || k === "the") { art = el; noun = wordSib(el, 1); }
    else { noun = el; art = wordSib(el, -1); }
    if (!art || !noun) return null;
    var ak = wordKey(art), w = (window.MP_WORDS || {})[wordKey(noun)];
    if (!w || (ak !== "a" && ak !== "the")) return null;
    var text = ak === "a" ? w.ar : w.arAl;
    return text ? { els: [art, noun], w: w, text: text } : null;
  }
  MP.showWord = function (word, el) {
    closeWord();
    var key = String(word).toLowerCase().replace(/[^a-z']/g, "");
    var w = (window.MP_WORDS || {})[key];
    var pair = MP.lang === "ar" && el ? arPair(el) : null;
    if (pair) { w = pair.w; pairEls = pair.els; el = pairEls[0]; pairEls.forEach(function (x) { x.classList.add("mp-pair"); }); }
    if (!w || !el) return;
    var text = pair ? pair.text : MP.lang === "en" ? w.en : (w[MP.lang] || w.fr);
    var title = pair ? pairEls.map(function (x) { return x.textContent; }).join(" ") : el.textContent;
    var html = '<div class="mp-word-title">' + esc(title.replace(/[.,!?]/g, "").trim()) + '</div>';
    if (w.img) html += '<span class="mp-help-pic"><img src="Assets/images/' + w.img + '.png" alt=""></span>';
    if (text) html += '<div class="mp-word-text">' + (MP.lang === "ar" ? arHTML(text) : text) + '</div>';
    bubble = document.createElement("div");
    bubble.className = "mp-word-bubble";
    bubble.innerHTML = html;
    document.body.appendChild(bubble);
    var r = el.getBoundingClientRect();
    var left = Math.min(r.left + window.scrollX, window.scrollX + document.documentElement.clientWidth - bubble.offsetWidth - 10);
    bubble.style.left = Math.max(10, left) + "px";
    bubble.style.top = (r.bottom + window.scrollY + 8) + "px";
  };
  document.addEventListener("click", function (e) {
    if (bubble && !bubble.contains(e.target) && !(e.target.closest && e.target.closest(".word"))) closeWord();
  });

  /* Message de Think Together : anglais + « / » + aide dans la langue choisie. */
  MP.feedback = function (id, en) {
    var el = document.getElementById(id);
    if (el) el.setAttribute("data-mp-en", en);
    if (MP.lang === "en") return en;
    var h = helpHTML(id);
    return h ? en + " / " + h : en;
  };

  /* ---------- activité « Listen and choose the picture » ---------- */
  function buildListen(box) {
    if (box.getAttribute("data-mp-built")) return;
    box.setAttribute("data-mp-built", "1");
    var items = data("en").listen || [];
    items.forEach(function (it) {
      var card = document.createElement("div");
      card.className = "card mp-listen-card";
      var b = document.createElement("button");
      b.className = "choice-button";
      b.textContent = "🔊 Listen";
      b.onclick = function () { MP.playClip(it.clip, it.say); };
      card.appendChild(b);
      var pics = document.createElement("div");
      pics.className = "mp-pics";
      it.images.forEach(function (name, i) {
        var pic = document.createElement("button");
        pic.className = "mp-pic";
        pic.innerHTML = '<img src="Assets/images/' + name + '.png" alt="">';
        pic.onclick = function () {
          pic.classList.remove("correct", "wrong");
          if (i === it.correct) { pic.classList.add("correct"); if (window.playGood) playGood(); }
          else { pic.classList.add("wrong"); if (window.playBad) playBad(); }
        };
        pics.appendChild(pic);
      });
      card.appendChild(pics);
      box.appendChild(card);
    });
  }

  /* ---------- 💡 des consignes (MP_INSTR) ---------- */
  function instrKey(el) {
    var t = "";
    for (var n = el.firstChild; n; n = n.nextSibling) {
      if (n.nodeType === 1 && /mp-instr-/.test(n.className)) continue;
      t += n.nodeType === 1 && n.tagName === "BR" ? " " : n.textContent;
    }
    return t.replace(/^.*?Activity\s*\d+\s*[—–-]\s*/i, "")
      .replace(/[^A-Za-z]+$/, "").replace(/^[^A-Za-z]+/, "")
      .replace(/\s+/g, " ").toLowerCase();
  }
  function addInstr(lang) {
    var els = document.querySelectorAll(".activity-title,[data-mp-instr]");
    for (var i = 0; i < els.length; i++) (function (el) {
      var old = el.querySelectorAll(".mp-instr-bulb,.mp-instr-text");
      for (var j = 0; j < old.length; j++) old[j].remove();
      if (lang === "en") return;
      var tr = (window.MP_INSTR || {})[instrKey(el)];
      var txt = tr && (tr[lang] || tr.fr);
      if (!txt) return;
      var b = document.createElement("button");
      b.className = "hint-bulb mp-instr-bulb";
      b.textContent = "💡";
      b.setAttribute("aria-label", "Translation");
      var box = document.createElement("div");
      box.className = "mp-instr-text";
      box.innerHTML = lang === "ar" ? arHTML(txt) : esc(txt);
      b.onclick = function () { box.style.display = box.style.display === "block" ? "none" : "block"; };
      el.appendChild(b);
      el.appendChild(box);
    })(els[i]);
  }

  /* ---------- application de la langue à la page ---------- */
  function apply() {
    var lang = MP.lang;
    var i, els;

    els = document.querySelectorAll("[data-tr]");
    for (i = 0; i < els.length; i++) {
      var el = els[i], key = el.getAttribute("data-tr");
      if (lang === "en" && el.classList.contains("help-text")) {
        var img = (data("en").helpImg || {})[key];
        el.innerHTML = img ? '<span class="mp-help-pic"><img src="Assets/images/' + img + '.png" alt=""></span>' : "";
      } else {
        el.innerHTML = helpHTML(key);
      }
    }

    els = document.querySelectorAll("[data-mp-hide]");
    for (i = 0; i < els.length; i++) els[i].hidden = els[i].getAttribute("data-mp-hide") === lang;
    els = document.querySelectorAll("[data-mp-only]");
    for (i = 0; i < els.length; i++) els[i].hidden = els[i].getAttribute("data-mp-only") !== lang;

    /* en English, les 💡 de Think Together n'ont rien à traduire : ils disparaissent */
    els = document.querySelectorAll(".hint-bulb");
    for (i = 0; i < els.length; i++) els[i].hidden = lang === "en";

    els = document.querySelectorAll("[data-mp-title-en]");
    for (i = 0; i < els.length; i++) {
      var t = els[i];
      if (!t.hasAttribute("data-mp-title")) t.setAttribute("data-mp-title", t.innerHTML);
      t.innerHTML = lang === "en" ? t.getAttribute("data-mp-title-en") : t.getAttribute("data-mp-title");
    }

    if (lang === "en") {
      els = document.querySelectorAll("[data-mp-listen]");
      for (i = 0; i < els.length; i++) buildListen(els[i]);
      /* les traductions déjà ouvertes en Think Together se referment */
      els = document.querySelectorAll(".think-question-fr,.think-option-fr");
      for (i = 0; i < els.length; i++) els[i].style.display = "none";
    }

    els = document.querySelectorAll("[data-mp-en]");
    for (i = 0; i < els.length; i++) els[i].innerHTML = MP.feedback(els[i].id, els[i].getAttribute("data-mp-en"));

    /* libellés des boutons (MP_UI) */
    var ui = window.MP_UI || {};
    els = document.querySelectorAll(".mp-slow");
    for (i = 0; i < els.length; i++) {
      var lbl = (ui.slow && (ui.slow[lang] || ui.slow.en)) || "Slow";
      els[i].innerHTML = lang === "ar" ? arHTML(lbl) : esc(lbl);
    }

    addInstr(lang);
    linkLang();

    els = document.querySelectorAll(".mp-lang-btn");
    for (i = 0; i < els.length; i++) els[i].classList.toggle("mp-on", els[i].getAttribute("data-lang") === lang);
  }

  MP.set = function (code) {
    if (!isLang(code)) return;
    MP.lang = code;
    saveLang(code);
    apply();
  };

  function langButtons(box, onPick) {
    LANGS.forEach(function (L) {
      var b = document.createElement("button");
      b.className = "mp-lang-btn";
      b.setAttribute("data-lang", L.code);
      if (L.rtl) { b.setAttribute("lang", L.code); b.setAttribute("dir", "rtl"); }
      b.textContent = L.label;
      b.onclick = function () { MP.set(L.code); if (onPick) onPick(); };
      box.appendChild(b);
    });
  }

  /* Bouton 🌐 ajouté dans la barre du haut de chaque page */
  function addGlobe() {
    var bar = document.querySelector(".top-bar");
    if (!bar) return;
    var wrap = document.createElement("div");
    wrap.className = "mp-globe-wrap";
    if (!bar.querySelector(".listen-icon")) wrap.style.marginLeft = "auto";
    var g = document.createElement("button");
    g.className = "mp-globe";
    g.textContent = "🌐";
    g.setAttribute("aria-label", "Language");
    var menu = document.createElement("div");
    menu.className = "mp-lang-menu";
    menu.hidden = true;
    langButtons(menu, function () { menu.hidden = true; });
    g.onclick = function (e) { e.stopPropagation(); menu.hidden = !menu.hidden; };
    document.addEventListener("click", function (e) { if (!wrap.contains(e.target)) menu.hidden = true; });
    wrap.appendChild(g);
    wrap.appendChild(menu);
    bar.appendChild(wrap);
  }

  function init() {
    addStyle();
    /* l'histoire complète et un passage ne jouent jamais en même temps */
    if (typeof window.playFullStory === "function") {
      var full = window.playFullStory;
      window.playFullStory = function () {
        MP.stopClip();
        var r = full.apply(this, arguments);
        try { if (storyAudio) { applyRate(storyAudio); storyAudio.addEventListener("playing", startHL); } } catch (e) {}
        startHL();
        return r;
      };
    }
    addEars();
    addSlow();
    var els = document.querySelectorAll("[data-mp-ar]");
    for (var i = 0; i < els.length; i++) els[i].innerHTML = arHTML(els[i].getAttribute("data-mp-ar"));
    var start = document.getElementById("mp-lang-start");
    var change = document.getElementById("mp-change-lang");
    if (start) langButtons(start, function () { location.href = withLang(start.getAttribute("data-next"), MP.lang); });
    else if (change) {
      for (var j = 0; j < LANGS.length; j++) if (LANGS[j].code === MP.lang) change.innerHTML = '<span>🌐</span><span>' + esc(LANGS[j].label) + '</span>';
    }
    else addGlobe();
    apply();
  }

  MP.arHTML = arHTML;
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
