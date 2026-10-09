/* =====================================================================
   Site behaviour. You shouldn't need to edit this file: the words come
   from content.js. This file builds the cards from that content and
   runs the filters, search, case links and sticky booking button.
   ===================================================================== */
(function () {
  "use strict";

  var C = window.SITE_CONTENT;
  if (!C) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var state = { stage: "all", query: "" };

  /* ---------- Small helpers ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  // Escape, then turn *text* into italics.
  function fmt(s) { return esc(s).replace(/\*(.+?)\*/g, "<em>$1</em>"); }
  function plain(s) { return String(s).replace(/\*/g, ""); }

  function chips(list, extraClass) {
    return '<ul class="chips' + (extraClass ? " " + extraClass : "") + '">' +
      list.map(function (c) { return '<li class="chip">' + esc(c) + "</li>"; }).join("") +
      "</ul>";
  }

  var caseById = {};
  C.cases.forEach(function (c) { caseById[c.id] = c; });

  /* ---------- Your details: booking link, email, name ---------- */
  var p = C.person;
  $$("[data-book]").forEach(function (a) { a.href = p.bookingUrl; });
  $$("[data-email]").forEach(function (a) { a.href = "mailto:" + p.email; });
  $$("[data-email-text]").forEach(function (a) { a.textContent = p.email; });
  $$("[data-name]").forEach(function (el) { el.textContent = p.name; });
  $$("[data-title]").forEach(function (el) { el.textContent = p.title; });
  $$("[data-title-sentence]").forEach(function (el) { el.textContent = p.titleInSentence || p.title; });
  $$("[data-institution]").forEach(function (el) { el.textContent = p.institution; });
  $$("[data-expertise]").forEach(function (el) { el.textContent = p.expertise; });
  var year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  var avatar = $("[data-avatar]");
  if (avatar) {
    if (p.photo) {
      avatar.innerHTML = '<img src="' + esc(p.photo) + '" alt="" width="128" height="128" decoding="async">';
    } else {
      avatar.textContent = p.initials || "";
    }
  }

  /* ---------- Stats ---------- */
  $("#stats-list").innerHTML = C.stats.map(function (s) {
    var isText = s.value.length > 9; // long values like "Proposal → submission"
    return '<li class="stats__item"><span class="stats__value' + (isText ? " stats__value--text" : "") + '">' +
      esc(s.value) + '</span><span class="stats__label">' + esc(s.label) + "</span></li>";
  }).join("");

  /* ---------- Themes ---------- */
  $("#themes-list").innerHTML = C.themes.map(function (t, i) {
    var n = String(i + 1).padStart(2, "0");
    var links = t.cases.map(function (id) {
      var c = caseById[id];
      var label = c ? "Case " + id + ": " + plain(c.title) : "Case " + id;
      return '<a class="case-link" href="#case-' + esc(id) + '" data-case-link="' + esc(id) +
        '" aria-label="' + esc(label) + '">' + esc(id) + "</a>";
    }).join("");
    return '<li class="theme reveal">' +
      '<p class="theme__num" aria-hidden="true">' + n + "</p>" +
      '<h3 class="theme__title">' + esc(t.title) + "</h3>" +
      '<p class="theme__desc">' + fmt(t.description) + "</p>" +
      chips(t.chips) +
      '<div class="theme__cases"><span class="theme__cases-label">See it in Case</span>' + links + "</div>" +
      "</li>";
  }).join("");

  /* ---------- Stage filter buttons ---------- */
  var stageOptions = [{ value: "all", label: "All stages" }].concat(
    C.stages.map(function (s) { return { value: s, label: s }; })
  );
  $("#stage-filters").innerHTML = stageOptions.map(function (o) {
    return '<button type="button" class="filter-btn" data-stage="' + esc(o.value) + '" aria-pressed="' +
      (o.value === "all") + '">' + esc(o.label) + "</button>";
  }).join("");

  /* ---------- Case cards ---------- */
  var chevron = '<svg class="case__chev" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="m5 8 5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  $("#case-list").innerHTML = C.cases.map(function (c) {
    var detailId = "case-" + c.id + "-detail";
    return '<li class="case reveal' + (c.own ? ' case--own' : '') + '" id="case-' + esc(c.id) + '" data-id="' + esc(c.id) + '">' +
      '<div class="case__top"><p class="case__num">Case ' + esc(c.id) + (c.own ? ' <span class="case__badge">My own build</span>' : '') + '</p><p class="case__duration">' + esc(c.duration) + "</p></div>" +
      '<h3 class="case__title">' + esc(c.title) + "</h3>" +
      '<p class="case__profile">' + esc(c.role) + " · " + esc(c.field) + "</p>" +
      '<div class="case__stages"><span class="sr-only">Stages: </span>' + chips(c.stages).replace(/class="chip"/g, 'class="chip chip--stage"') + "</div>" +
      '<p class="case__takeaway"><span class="case__takeaway-label">Takeaway</span>' + fmt(c.takeaway) + "</p>" +
      '<button type="button" class="case__toggle" aria-expanded="false" aria-controls="' + detailId + '">' +
        '<span class="case__toggle-text">Read the full journey</span>' + chevron + "</button>" +
      '<div class="case__detail" id="' + detailId + '" hidden>' +
        '<div class="detail__block"><h4 class="detail__h">The challenge</h4><p class="detail__text">' + fmt(c.challenge) + "</p></div>" +
        '<div class="detail__block"><h4 class="detail__h">' + esc(c.didLabel || "What we did together") + '</h4><ul class="detail__list">' +
          c.did.map(function (d) { return "<li>" + fmt(d) + "</li>"; }).join("") + "</ul></div>" +
        '<div class="detail__block"><h4 class="detail__h">The outcome</h4><p class="detail__outcome">' + fmt(c.outcome) + "</p></div>" +
        (c.quote ? '<figure class="detail__block quote"><blockquote class="quote__text"><p>' + fmt(c.quote) +
          '</p></blockquote><figcaption class="quote__by">The researcher, in their own words</figcaption></figure>' : "") +
        (c.demo ? '<div class="detail__block demo"><p class="demo__text">' + fmt(c.demo) + '</p><a class="btn btn--primary btn--small" href="' + esc(C.person.bookingUrl) + '" target="_blank" rel="noopener">Book a demo<span class="sr-only"> (opens in a new tab)</span></a></div>' : "") +
        '<div class="detail__block"><h4 class="detail__h">Journey</h4><ol class="journey">' +
          c.journey.map(function (j) { return '<li class="journey__step">' + esc(j) + "</li>"; }).join("") + "</ol></div>" +
        '<div class="detail__block"><h4 class="detail__h">Tools and sources</h4>' + chips(c.tools, "detail__tools") + "</div>" +
        '<div class="detail__block"><p class="case__takeaway"><span class="case__takeaway-label">Takeaway</span>' + fmt(c.takeaway) + "</p></div>" +
        '<button type="button" class="btn btn--ghost btn--small detail__close">Close case ' + esc(c.id) + "</button>" +
      "</div>" +
      "</li>";
  }).join("");

  // Text used for search: everything on the card, in lower case.
  var haystack = {};
  C.cases.forEach(function (c) {
    haystack[c.id] = plain([
      "case " + c.id, c.title, c.role, c.field, c.duration, c.stages.join(" "), c.tools.join(" "),
      c.challenge, c.did.join(" "), c.outcome, c.quote || "", c.journey.join(" "), c.takeaway
    ].join(" ")).toLowerCase();
  });

  /* ---------- Steps and checklist ---------- */
  $("#steps-list").innerHTML = C.steps.map(function (s) {
    return '<li class="step reveal"><p class="step__title">' + fmt(s.title) + '</p><p class="step__text">' + fmt(s.text) + "</p></li>";
  }).join("");
  $("#checklist").innerHTML = C.checklist.map(function (item) { return "<li>" + fmt(item) + "</li>"; }).join("");

  /* ---------- Filtering ---------- */
  var cards = $$("#case-list .case");
  var countEl = $("#results-count");
  var emptyEl = $("#empty-state");
  var searchEl = $("#case-search");

  function applyFilters() {
    var words = state.query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    var shown = 0;
    cards.forEach(function (card) {
      var c = caseById[card.dataset.id];
      var stageOk = state.stage === "all" || c.stages.indexOf(state.stage) !== -1;
      var text = haystack[c.id];
      var queryOk = words.every(function (w) { return text.indexOf(w) !== -1; });
      var visible = stageOk && queryOk;
      card.hidden = !visible;
      if (visible) shown++;
    });
    var total = cards.length;
    countEl.textContent = shown === total
      ? "Showing all " + total + " cases"
      : "Showing " + shown + " of " + total + " cases";
    emptyEl.hidden = shown !== 0;
  }

  // Filtered cards appear straight away, without waiting for the scroll fade-in.
  function revealCards() { cards.forEach(function (card) { card.classList.add("is-in"); }); }

  function setStage(value) {
    state.stage = value;
    revealCards();
    $$(".filter-btn").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.stage === value));
    });
    applyFilters();
  }

  function resetFilters() {
    searchEl.value = "";
    state.query = "";
    setStage("all");
  }

  $("#stage-filters").addEventListener("click", function (e) {
    var btn = e.target.closest(".filter-btn");
    if (btn) setStage(btn.dataset.stage);
  });
  searchEl.addEventListener("input", function () {
    state.query = searchEl.value;
    revealCards();
    applyFilters();
  });
  $("#reset-filters").addEventListener("click", function () {
    resetFilters();
    searchEl.focus();
  });

  /* ---------- Expand / collapse a case ---------- */
  function setOpen(card, open) {
    var btn = $(".case__toggle", card);
    var detail = $(".case__detail", card);
    btn.setAttribute("aria-expanded", String(open));
    $(".case__toggle-text", btn).textContent = open ? "Hide the full journey" : "Read the full journey";
    detail.hidden = !open;
    card.classList.toggle("is-open", open);
    if (open && !reduceMotion) {
      detail.classList.remove("is-entering");
      void detail.offsetWidth;
      detail.classList.add("is-entering");
    }
  }

  $("#case-list").addEventListener("click", function (e) {
    var card = e.target.closest(".case");
    if (!card) return;
    if (e.target.closest(".case__toggle")) {
      setOpen(card, !card.classList.contains("is-open"));
    } else if (e.target.closest(".detail__close")) {
      setOpen(card, false);
      var toggle = $(".case__toggle", card);
      if (card.getBoundingClientRect().top < 0) {
        card.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      }
      toggle.focus({ preventScroll: true });
    }
  });

  /* ---------- Jump to a case (from theme cards or a #case-03 link) ---------- */
  function goToCase(id, open) {
    var card = document.getElementById("case-" + id);
    if (!card) return;
    if (card.hidden) resetFilters();
    if (open) setOpen(card, true);
    card.classList.add("is-in");
    card.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    card.classList.remove("is-highlighted");
    void card.offsetWidth;
    card.classList.add("is-highlighted");
    window.setTimeout(function () { card.classList.remove("is-highlighted"); }, 3000);
    $(".case__toggle", card).focus({ preventScroll: true });
    if (history.replaceState) history.replaceState(null, "", "#case-" + id);
  }

  $("#themes-list").addEventListener("click", function (e) {
    var link = e.target.closest("[data-case-link]");
    if (!link) return;
    e.preventDefault();
    goToCase(link.dataset.caseLink, true);
  });

  /* ---------- Gentle reveal on scroll ---------- */
  var reveals = $$(".reveal");
  if (!reduceMotion && "IntersectionObserver" in window) {
    document.documentElement.classList.add("reveal-on");
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          revealObs.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    reveals.forEach(function (el) { revealObs.observe(el); });
  }

  /* ---------- Sticky "Book" button on mobile ---------- */
  var sticky = $("#sticky-book");
  var hero = $(".hero");
  var cta = $("#book");
  if (sticky && hero && cta && "IntersectionObserver" in window) {
    var heroVisible = true;
    var ctaVisible = false;
    var update = function () {
      var show = !heroVisible && !ctaVisible;
      sticky.classList.toggle("is-visible", show);
    };
    new IntersectionObserver(function (entries) {
      heroVisible = entries[0].isIntersecting; update();
    }).observe(hero);
    new IntersectionObserver(function (entries) {
      ctaVisible = entries[0].isIntersecting; update();
    }).observe(cta);
  }

  /* ---------- Start ---------- */
  applyFilters();
  var m = /^#case-(\d+)$/.exec(location.hash);
  if (m && caseById[m[1]]) {
    window.setTimeout(function () { goToCase(m[1], true); }, 50);
  }
})();
