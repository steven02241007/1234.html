// ===== 狀態 =====
let chaos = 0;
let currentMode = "home";

// 🔥 MEME 動畫控制
let memeInterval = null;

// 🔥 累積位移（關鍵修正）
let tx = 0;
let ty = 0;
let rot = 0;

// ===== 文字 =====
function setText(t) {
  document.getElementById("text").innerText = t;
}

// ===== NEXT =====
function next() {
  chaos++;
  setText("你還在點。");
}

// ===== 分頁 =====
function goPage(page) {
  chaos++;
  currentMode = page;

  if (page === "home") homeMode();
  if (page === "memes") memeMode();
  if (page === "void") voidMode();
  if (page === "unknown") unknownMode();
}

//////////////////////////////////////////////////
// 🏠 HOME
//////////////////////////////////////////////////
function homeMode() {
  reset();

  setText("一切正常。");

  setTimeout(() => setText("真的嗎？"), 2000);
  setTimeout(() => setText("你可以離開。"), 4000);
}

//////////////////////////////////////////////////
// 😂 MEMES（核心失控系統）
//////////////////////////////////////////////////
function memeMode() {

  reset();

  let count = 0;

  setText("MEME ZONE");

  memeInterval = setInterval(() => {

    setText(randomMeme());
    count++;

    // ===== 累積型失控（重點）=====
    tx += Math.random()*8 - 4;
    ty += Math.random()*8 - 4;
    rot += Math.random()*2 - 1;

    document.body.style.transform =
      `translate(${tx}px,${ty}px) rotate(${rot}deg)`;

    // 越來越不穩
    if (count > 6) document.body.style.filter = "contrast(120%)";
    if (count > 10) document.body.style.filter = "contrast(140%) brightness(90%)";

    // 結束
    if (count > 12) {
      clearInterval(memeInterval);
      memeInterval = null;

      reset();
      setText("太多了對吧？");
    }

  }, 150);
}

function randomMeme() {
  const arr = [
    "笑死 😂",
    "你還在看？",
    "👁 我在看你",
    "停不下來了",
    "這不正常",
    "你有感覺到嗎？"
  ];
  return arr[Math.floor(Math.random()*arr.length)];
}

//////////////////////////////////////////////////
// 🌑 VOID
//////////////////////////////////////////////////
function voidMode() {
  reset();

  document.body.style.background = "black";
  document.body.style.color = "white";

  setText("沒有東西");

  setTimeout(() => setText("沒有你"), 2500);
  setTimeout(() => setText("只有觀看"), 5000);

  document.querySelector(".container").style.opacity = 0.2;
}

//////////////////////////////////////////////////
// 💀 ???
//////////////////////////////////////////////////
function unknownMode() {

  reset();

  setText("你不該點這個");

  document.body.style.filter = "invert(1)";
  document.body.style.cursor = "none";

  setInterval(() => {
    document.getElementById("title").innerText =
      Math.random().toString(36).substring(2,8);
  }, 200);

  setTimeout(() => {
    document.body.innerHTML =
      "<h1>你沒有離開</h1>";
  }, 5000);
}

//////////////////////////////////////////////////
// 🔄 reset（超重要）
//////////////////////////////////////////////////
function reset() {

  if (memeInterval) {
    clearInterval(memeInterval);
    memeInterval = null;
  }

  tx = 0;
  ty = 0;
  rot = 0;

  document.body.style = "";
  document.querySelector(".container").style.opacity = 1;
}

//////////////////////////////////////////////////
// 👁 glitch
//////////////////////////////////////////////////
function glitch(text) {
  const g = document.getElementById("glitch");
  g.innerText = text;
  g.style.opacity = 1;

  setTimeout(() => g.style.opacity = 0, 200);
}

//////////////////////////////////////////////////
// 🚪 離開記憶
//////////////////////////////////////////////////
window.onbeforeunload = () => "你確定要離開嗎？";