/** Scenario S1 / S2 playback. S3+ stay in the data file and are not offered here. */

const PLAYABLE = ["S1", "S2"];

export function sceneById(model, id) {
  return (model.graph.scenarios || []).find((s) => s.id === id) || null;
}

export function bindScenes(model, onChange) {
  const prev = document.getElementById("fedPrev");
  const play = document.getElementById("fedPlay");
  const next = document.getElementById("fedNext");
  const speedBtn = document.getElementById("fedSpeed");
  const caption = document.getElementById("fedCaption");
  const picker = document.getElementById("fedScenePick");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let sceneId = "S1";
  let index = -1;
  let timer = null;
  let speed = 1;

  function scene() {
    return sceneById(model, sceneId);
  }

  function step() {
    const s = scene();
    return index >= 0 ? s?.steps?.[index] || null : null;
  }

  function paintCaption() {
    const s = scene();
    const current = step();
    if (!caption) return;
    if (!current) {
      caption.textContent = s ? `${s.zh} · ${s.steps.length} 步 · 示意` : "";
      return;
    }
    const pages = (current.pdf_pages || []).join(", ");
    caption.textContent = `${current.order}/${s.steps.length} ${current.caption} · p.${pages} · 示意`;
  }

  function paintPicker() {
    if (!picker) return;
    picker.innerHTML = PLAYABLE.map((id) => {
      const s = sceneById(model, id);
      if (!s) return "";
      const on = id === sceneId;
      const short = id === "S1" ? "S1 加息传导" : "S2 利润上缴";
      return `<button type="button" class="fed-scene-btn${on ? " is-on" : ""}" data-scene="${id}" aria-pressed="${on}">${short}</button>`;
    }).join("");
  }

  function emit() {
    paintCaption();
    onChange(step());
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
    if (play) play.textContent = "播放";
  }

  function go(nextIndex) {
    const s = scene();
    if (!s?.steps?.length) return;
    const last = s.steps.length - 1;
    index = Math.max(-1, Math.min(last, nextIndex));
    emit();
  }

  function setScene(id) {
    if (!PLAYABLE.includes(id) || !sceneById(model, id)) return;
    stop();
    sceneId = id;
    index = -1;
    paintPicker();
    emit();
  }

  prev?.addEventListener("click", () => {
    stop();
    go(index - 1);
  });
  next?.addEventListener("click", () => {
    stop();
    go(index + 1);
  });
  speedBtn?.addEventListener("click", () => {
    speed = speed === 1 ? 2 : 1;
    speedBtn.setAttribute("aria-pressed", speed === 2 ? "true" : "false");
    if (timer) {
      stop();
      start();
    }
  });
  play?.addEventListener("click", () => {
    if (reduced) {
      go(index + 1);
      return;
    }
    if (timer) {
      stop();
      return;
    }
    start();
  });
  picker?.addEventListener("click", (e) => {
    const btn = e.target.closest?.("[data-scene]");
    if (btn) setScene(btn.dataset.scene);
  });

  function start() {
    const s = scene();
    if (reduced || !s) return;
    if (index >= s.steps.length - 1) go(-1);
    play.textContent = "暂停";
    timer = setInterval(() => {
      if (index >= s.steps.length - 1) {
        stop();
        return;
      }
      go(index + 1);
    }, 900 / speed);
  }

  function reset() {
    stop();
    index = -1;
    paintCaption();
  }

  paintPicker();
  emit();
  return { stop, reset, setScene, sceneId: () => sceneId };
}
