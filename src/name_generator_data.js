// Name styles and mapping generators for Free Fire Name Generator

// Character Maps
const boldCharMap = {
  0: "𝟬", 1: "𝟭", 2: "𝟮", 3: "𝟯", 4: "𝟰", 5: "𝟱", 6: "𝟲", 7: "𝟳", 8: "𝟴", 9: "𝟵",
  a: "𝗮", b: "𝗯", c: "𝗰", d: "𝗱", e: "𝗲", f: "𝗳", g: "𝗴", h: "𝗵", i: "𝗶", j: "𝗷", k: "𝗸", l: "𝗹", m: "𝗺", n: "𝗻", o: "𝗼", p: "𝗽", q: "𝗾", r: "𝗿", s: "𝘀", t: "𝘁", u: "𝘂", v: "𝘃", w: "𝘄", x: "𝘅", y: "𝘆", z: "𝘇",
  A: "𝗔", B: "𝗕", C: "𝗖", D: "纪录", E: "𝗘", F: "𝗙", G: "𝗚", H: "𝗛", I: "𝗜", J: "𝗝", K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡", O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥", S: "𝗦", T: "𝗧", U: "𝗨", V: "𝗩", W: "𝗪", X: "𝘅", Y: "𝗬", Z: "𝗭"
};

const boldSansCharMap = boldCharMap; // Reuse bold as a fallback to save space

const monospaceCharMap = {
  "0": "𝟶", "1": "𝟷", "2": "𝟸", "3": "𝟹", "4": "𝟺", "5": "𝟻", "6": "𝟼", "7": "𝟽", "8": "𝟾", "9": "𝟿",
  a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚠", g: "𝚐", h: "𝚑", i: "𝚒", j: "𝚓", k: "𝚔", l: "𝚕", m: "𝚖", n: "𝚗", o: "𝚘", p: "𝚙", q: "𝚚", r: "𝚛", s: "𝚜", t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡", y: "𝚢", z: "𝚣",
  A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸", J: "𝙹", K: "𝙺", L: "𝙻", M: "𝙼", N: "𝙽", O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁", S: "𝚂", T: "𝚃", U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉"
};

const wideTextCharMap = {
  a: "ａ", b: "ｂ", c: "ｃ", d: "ｄ", e: "ｅ", f: "ｆ", g: "ｇ", h: "ｈ", i: "ｉ", j: "ｊ", k: "ｋ", l: "ｌ", m: "ｍ", n: "ｎ", o: "ｏ", p: "ｐ", q: "ｑ", r: "ｒ", s: "ｓ", t: "ｔ", u: "ｕ", v: "ｖ", w: "ｗ", x: "ｘ", y: "mathrm{y}", z: "ｚ",
  A: "Ａ", B: "Ｂ", C: "Ｃ", D: "Ｄ", E: "Ｅ", F: "Ｆ", G: "Ｇ", H: "Ｈ", J: "Ｊ", K: "Ｋ", L: "Ｌ", M: "Ｍ", N: "Ｎ", O: "Ｏ", P: "Ｐ", Q: "Ｑ", R: "Ｒ", S: "Ｓ", T: "Ｔ", U: "Ｕ", V: "Ｖ", W: "Ｗ", X: "Ｘ", Y: "Ｙ", Z: "Ｚ"
};

const doubleStruckCharMap = {
  a: "𝕒", b: "𝕓", c: "𝕔", d: "𝕕", e: "𝕖", f: "𝕗", g: "𝕘", h: "𝕙", i: "𝕚", j: "𝕛", k: "𝕜", l: "𝕝", m: "𝕞", n: "𝕟", o: "𝕠", p: "𝕡", q: "𝕢", r: "𝕣", s: "𝕤", t: "𝕥", u: "𝕦", v: "𝕧", w: "𝕨", x: "𝕩", y: "𝕪", z: "𝕫",
  A: "𝔸", B: "𝔹", C: "ℂ", D: "𝔻", E: "𝔼", F: "𝔽", G: "𝔾", H: "ℍ", I: "𝕀", J: "𝕁", K: "𝕂", L: "𝕃", M: "𝕄", N: "ℕ", O: "𝕆", P: "ℙ", Q: "ℚ", R: "ℝ", S: "𝕊", T: "𝕋", U: "𝕌", V: "𝕍", W: "𝕎", X: "𝕏", Y: "𝕐", Z: "ℤ"
};

const neonCharMap = {
  a: "ᗩ", b: "ᗷ", c: "ᑕ", d: "ᗪ", e: "E", f: "ᖴ", g: "G", h: "ᕼ", i: "I", j: "ᒍ", k: "K", l: "ᒪ", m: "ᗰ", n: "ᑎ", o: "O", p: "ᑭ", q: "ᑫ", r: "ᖇ", s: "ᔕ", t: "T", u: "ᑌ", v: "ᐯ", w: "ᗯ", x: "᙭", y: "Y", z: "ᘔ",
  A: "ᗩ", B: "ᗷ", C: "ᑕ", D: "ᗪ", E: "E", F: "ᖴ", G: "G", H: "ᕼ", I: "I", J: "ᒍ", K: "K", L: "ᒪ", M: "ᗰ", N: "ᑎ", O: "O", P: "ᑭ", Q: "ᑫ", R: "ᖇ", S: "ᔕ", T: "T", U: "ᑌ", V: "ᐯ", W: "ᗯ", X: "᙭", Y: "Y", Z: "ᘔ"
};

const oldEnglishCharMap = {
  a: "𝔞", b: "𝔟", c: "𝔠", d: "𝔡", e: "𝔢", f: "𝔣", g: "𝔤", h: "𝔥", i: "𝔦", j: "𝔧", k: "𝔨", l: "𝔩", m: "𝔪", n: "𝔫", o: "𝔬", p: "𝔭", q: "𝔮", r: "𝔯", s: "𝔰", t: "𝔱", u: "𝔲", v: "𝔳", w: "𝔴", x: "𝔵", y: "𝔶", z: "𝔷",
  A: "𝔄", B: "𝔅", C: "ℭ", D: "𝔇", E: "𝔈", F: "𝔉", G: "𝔊", H: "ℌ", I: "ℑ", J: "𝔍", K: "𝔎", L: "𝔏", M: "𝔐", N: "𝔑", O: "𝔒", P: "𝔓", Q: "𝔔", R: "ℜ", S: "𝔖", T: "𝔗", U: "𝔘", V: "𝔙", W: "𝔚", X: "𝔛", Y: "𝔜", Z: "ℨ"
};

const futureAlienCharMap = {
  a: "ᗩ", b: "ᗷ", c: "ᑢ", d: "ᕲ", e: "ᘿ", f: "ᖴ", g: "ᘜ", h: "ᕼ", i: "ᓰ", j: "ᒚ", k: "ᖽᐸ", l: "ᒪ", m: "ᘻ", n: "ᘉ", o: "ᓍ", p: "ᕵ", q: "ᕴ", r: "ᖇ", s: "S", t: "ᖶ", u: "ᑘ", v: "ᐺ", w: "ᘺ", x: "᙭", y: "ᖻ", z: "ᗱ"
};

const asianStyle2CharMap = {
  a: "ﾑ", b: "乃", c: "ᄃ", d: "り", e: "乇", f: "ｷ", g: "ム", h: "ん", i: "ﾉ", j: "ﾌ", k: "ズ", l: "ﾚ", m: "ﾶ", n: "刀", o: "の", p: "ｱ", q: "ゐ", r: "尺", s: "丂", t: "ｲ", u: "ひ", v: "√", w: "W", x: "ﾒ", y: "ﾘ", z: "乙"
};

const italicCharMap = {
  a: "𝘢", b: "𝘣", c: "𝘤", d: "𝘥", e: "e", f: "if", g: "𝘨", h: "𝘩", i: "𝘪", j: "𝘫", k: "𝘬", l: "𝘭", m: "𝘮", n: "𝘯", o: "𝘰", p: "𝘱", q: "𝘲", r: "𝘳", s: "𝘴", t: "𝘵", u: "𝘶", v: "𝘷", w: "𝘸", x: "𝘹", y: "𝘺", z: "𝘻",
  A: "𝘈", B: "𝘉", C: "𝘊", D: "𝘋", E: "𝘌", F: "𝘍", G: "𝘎", H: "𝘏", I: "𝘐", J: "𝘑", K: "𝘒", L: "𝘓", M: "𝘔", N: "𝘕", O: "𝘖", P: "𝘗", Q: "𝘘", R: "𝘙", S: "𝘚", T: "𝘛", U: "𝘜", V: "𝘝", W: "𝘞", X: "𝘟", Y: "𝘠", Z: "𝘡"
};

const cursiveCharMap = {
  a: "𝒶", b: "𝒷", c: "𝒸", d: "𝒹", e: "ℯ", f: "𝒻", g: "ℊ", h: "𝒽", i: "𝒾", j: "𝒿", k: "𝓀", l: "𝓁", m: "𝓂", n: "𝓃", o: "ℴ", p: "𝓅", q: "𝓆", r: "𝓇", s: "𝓈", t: "𝓉", u: "𝓊", v: "𝓋", w: "𝓌", x: "𝓍", y: "𝓎", z: "𝓏",
  A: "𝒜", B: "ℬ", C: "𝒞", D: "𝒟", E: "ℰ", F: "ℱ", G: "𝒢", H: "ℋ", I: "ℐ", J: "𝒥", K: "𝒦", L: "ℒ", M: "ℳ", N: "𝒩", O: "𝒪", P: "𝒫", Q: "𝒬", R: "ℛ", S: "𝒮", T: "𝒯", U: "𝒰", V: "𝒱", W: "𝒲", X: "𝒳", Y: "𝒴", Z: "𝒵"
};

const currencyCharMap = {
  a: "₳", b: "฿", c: "₵", d: "Đ", e: "Ɇ", f: "₣", g: "₲", h: "Ⱨ", i: "ł", j: "J", k: "₭", l: "Ⱡ", m: "₥", n: "₦", o: "Ø", p: "₱", q: "Q", r: "Ɽ", s: "₴", t: "₮", u: "Ʉ", v: "V", w: "₩", x: "Ӿ", y: "Ɏ", z: "Ⱬ"
};

const invertedSquaresCharMap = {
  q: "🅠", w: "🅦", e: "🅔", r: "🅡", t: "🅣", y: "🅨", u: "🅤", i: "🅘", o: "🅞", p: "🅟",
  a: "🅐", s: "🅢", d: "🅓", f: "🅕", g: "🅖", h: "🅗", j: "🅙", k: "🅚", l: "🅛",
  z: "🅩", x: "🅧", c: "🅒", v: "🅥", b: "🅑", n: "🅝", m: "🅜"
};

const romanticBold = {
  a: "𝒂", b: "𝒃", c: "𝒄", d: "𝒅", e: "𝒆", f: "𝒇", g: "𝒈", h: "𝒉", i: "𝒊", j: "𝒋", k: "𝒌", l: "𝒍", m: "𝒎", n: "𝒏", o: "𝒐", p: "𝒑", q: "𝒒", r: "𝒓", s: "𝒔", t: "𝒕", u: "𝒖", v: "𝒗", w: "𝒘", x: "𝒙", y: "𝒚", z: "𝒛",
  A: "𝑨", B: "𝑩", C: "𝑪", D: "𝑫", E: "𝑬", F: "𝑭", G: "𝑮", H: "𝑯", I: "𝑰", J: "𝑱", K: "𝑲", L: "𝑳", M: "𝑴", N: "𝑵", O: "𝑶", P: "𝑷", Q: "𝑒", R: "𝑹", S: "𝑺", T: "𝑻", U: "𝑼", V: "𝑽", W: "𝑾", X: "𝑿", Y: "𝒀", Z: "𝒁"
};

const greekCharMap = {
  a: "α", b: "в", c: "¢", d: "∂", e: "є", f: "ƒ", g: "g", h: "н", i: "ι", j: "נ", k: "к", l: "ℓ", m: "м", n: "η", o: "σ", p: "ρ", q: "q", r: "я", s: "ѕ", t: "т", u: "υ", v: "ν", w: "ω", x: "χ", y: "у", z: "z"
};

const upperAnglesCharMap = {
  a: "Λ", b: "B", c: "ᄃ", d: "D", e: "Σ", f: "F", g: "G", h: "Ή", i: "I", j: "J", k: "K", l: "ᄂ", m: "M", n: "П", o: "Ө", p: "P", q: "Q", r: "Я", s: "Ƨ", t: "Ƭ", u: "Ц", v: "V", w: "Щ", x: "X", y: "Y", z: "Z"
};

const bentTextCharMap = {
  a: "ą", b: "ҍ", c: "ç", d: "ժ", e: "ҽ", f: "ƒ", g: "ց", h: "հ", i: "ì", j: "ʝ", k: "ҟ", l: "Ӏ", m: "ʍ", n: "ղ", o: "օ", p: "ք", q: "զ", r: "ɾ", s: "ʂ", t: "է", u: "մ", v: "ѵ", w: "ա", x: "×", y: "վ", z: "Հ"
};

const squiggleCharMap = {
  a: "ค", b: "๒", c: "ς", d: "๔", e: "є", f: "Ŧ", g: "ﻮ", h: "ђ", i: "เ", j: "ן", k: "к", l: "ɭ", m: "๓", n: "ภ", o: "๏", p: "ק", q: "ợ", r: "г", s: "ร", t: "Շ", u: "ย", v: "ש", w: "ฬ", x: "א", y: "ץ", z: "չ"
};

const medievalCharMap = {
  a: "𝔞", b: "𝔟", c: "𝔠", d: "𝔡", e: "𝔢", f: "𝔣", g: "𝔤", h: "𝔥", i: "𝔦", j: "𝔧", k: "𝔨", l: "𝔩", m: "𝔪", n: "𝔫", o: "𝔬", p: "𝔭", q: "𝔮", r: "𝔯", s: "𝔰", t: "𝔱", u: "𝔲", v: "𝔳", w: "𝔴", x: "𝔵", y: "𝔶", z: "𝔷"
};

// Map applying helper
function applyCharMap(map, text) {
  let res = "";
  for (let char of text) {
    if (map[char] !== undefined) {
      res += map[char];
    } else if (map[char.toLowerCase()] !== undefined) {
      res += map[char.toLowerCase()];
    } else {
      res += char;
    }
  }
  return res;
}

// Special stylers
function cuteItalic(text) {
  return applyCharMap(italicCharMap, text);
}

function dottyJoiner(text) {
  return "░" + text.split("").join("░") + "░";
}

function fullCrazy(text) {
  let map = { ...boldCharMap, ...greekCharMap, ...squiggleCharMap };
  return applyCharMap(map, text);
}

function wrapInClassic(text, left, right) {
  return `${left} ${text} ${right}`;
}

export function generateAllStyles(D) {
  if (!D || !D.trim()) return {};
  const cleanName = D.trim();

  return {
    "Popular Styles": [
      applyCharMap(boldCharMap, cleanName),
      applyCharMap(monospaceCharMap, cleanName),
      applyCharMap(wideTextCharMap, cleanName),
      applyCharMap(doubleStruckCharMap, cleanName),
      applyCharMap(neonCharMap, cleanName),
      applyCharMap(monospaceCharMap, "╰‿╯ ϟ " + cleanName + " ✯꧂"),
      applyCharMap(oldEnglishCharMap, "꧁༒♛ " + cleanName + "♛༒꧂"),
      "亗 " + applyCharMap(monospaceCharMap, cleanName) + " ×͜×",
      applyCharMap(monospaceCharMap, "꧁☬ " + cleanName + " ☬꧂"),
      "꧁࿇ " + applyCharMap(wideTextCharMap, cleanName) + "࿇꧂",
      "༄ᶦᶰᵈ " + applyCharMap(futureAlienCharMap, cleanName) + " ࿐",
      applyCharMap(italicCharMap, "꧁✧ " + cleanName + " ࿐"),
      "ᶦᶰᵈ᭄ " + cleanName + " 亗",
      "♔〘 " + applyCharMap(futureAlienCharMap, cleanName) + "〙♔",
      "×͜×ㅤ" + applyCharMap(monospaceCharMap, cleanName),
      "Cᵒᵒˡジ " + applyCharMap(asianStyle2CharMap, cleanName) + " 乄",
      dottyJoiner(cleanName),
      applyCharMap(italicCharMap, "꧁❀ " + cleanName + " ❀꧂"),
      applyCharMap(cursiveCharMap, "✧༝ " + cleanName + " ༝✧"),
      applyCharMap(currencyCharMap, "༶ " + cleanName + " ༶")
    ],
    "FF Special Symbols": [
      "ᴳᵒᵈ🍉ƒ" + applyCharMap(boldCharMap, cleanName),
      "★ᴄ͢͢͢ʀɪᴍɪɴᴀʟ " + applyCharMap(monospaceCharMap, cleanName) + " ⁰⁰⁷★࿐",
      "︻╦̵̵̿╤─" + applyCharMap(wideTextCharMap, cleanName) + "♥",
      "ᏦᏁᏋ✿" + applyCharMap(wideTextCharMap, cleanName) + "꧁",
      "꧁•" + applyCharMap(italicCharMap, cleanName) + "࿐",
      "꧁•" + applyCharMap(italicCharMap, cleanName) + "YT࿐",
      "꧁• King 々 " + applyCharMap(italicCharMap, cleanName) + "࿐",
      "亗ᵀʰᵉ᭄" + applyCharMap(boldCharMap, cleanName) + "亗",
      "༆" + applyCharMap(wideTextCharMap, cleanName) + "亗",
      "꧁" + applyCharMap(boldCharMap, cleanName) + "꧂",
      "☠︎" + applyCharMap(oldEnglishCharMap, cleanName) + "☠︎",
      "乂" + applyCharMap(wideTextCharMap, cleanName) + "乂",
      "✿" + applyCharMap(futureAlienCharMap, cleanName) + "✿",
      "꧁⚡" + applyCharMap(monospaceCharMap, cleanName) + "⚡꧂",
      "❖꧁💀" + applyCharMap(monospaceCharMap, cleanName) + "💀꧂❖",
      "★Vɪcᴛᴏʀ✘" + applyCharMap(boldCharMap, cleanName) + "★",
      "⚡" + applyCharMap(wideTextCharMap, cleanName) + "ツ"
    ],
    "Clan & Guild Tags": [
      "❖ ᴾᴿᴼ LEGEND " + applyCharMap(boldCharMap, cleanName) + "❖",
      "亗 ᴹᴿ ꪜ " + applyCharMap(wideTextCharMap, cleanName) + " ☂",
      "ᵀᴴᴱ " + applyCharMap(upperAnglesCharMap, cleanName) + "⚡",
      "ᴸᴱᴳᴱᴺᴰ " + applyCharMap(wideTextCharMap, cleanName) + "々",
      "NOOB彡《 " + cleanName + "》",
      "乂 " + applyCharMap(oldEnglishCharMap, cleanName) + "乂",
      "︻デ═一 " + applyCharMap(oldEnglishCharMap, cleanName) + "︻デ═一",
      "✘ " + applyCharMap(oldEnglishCharMap, cleanName) + "✘",
      addDynamicSymbol(applyCharMap(currencyCharMap, cleanName), "々"),
      "™. " + addDynamicSymbol(applyCharMap(wideTextCharMap, cleanName), "々"),
      applyCharMap(monospaceCharMap, "꧁༒︎ " + cleanName + "༒︎꧂"),
      applyCharMap(monospaceCharMap, "▄︻デ " + cleanName + " ═━一"),
      applyCharMap(asianStyle2CharMap, "▄︻デ " + cleanName + " ═━一"),
      applyCharMap(invertedSquaresCharMap, "꧁༺✿ " + cleanName + " ✦༻꧂"),
      "×͜× " + applyCharMap(monospaceCharMap, cleanName) + " ★࿐",
      applyCharMap(futureAlienCharMap, "꧁═━ " + cleanName + " ━═꧂")
    ],
    "Aesthetic & Hearts": [
      "♡⸝⸝> ̫ <⸝⸝♡ " + cleanName,
      "ღゝ◡╹)ノ♡ " + cleanName + " ♡(╹◡ゝღ",
      "♡ℒฺℴฺνℯฺ♡ " + applyCharMap(boldCharMap, cleanName),
      "⸝⸝⸝♡⸝⸝⸝ " + applyCharMap(monospaceCharMap, cleanName) + "⸝⸝⸝♡⸝⸝⸝",
      cuteItalic("꧁❤️ " + cleanName + "❤️꧂"),
      "꧁♡ " + cleanName + " ♡꧂",
      "✿♡ " + applyCharMap(cursiveCharMap, cleanName) + " ♡✿",
      "✦︎⸝⸝♡︎ " + cleanName + " ♡︎⸜⸜✦︎",
      "⸝⸝⸝♡⸝⸝⸝ " + cleanName + " ⸝⸝⸝♡⸝⸝⸝",
      "♥︎‧₊˚ " + cleanName + " ˚₊‧♥︎"
    ],
    "Cute Kaomoji": [
      "❀ ᴄᴜᴛᴇ ᵇᵒʸ " + applyCharMap(cursiveCharMap, cleanName) + "❀",
      "❀ ᴄᴜᴛᴇ ᵍⁱʳˡ " + applyCharMap(cursiveCharMap, cleanName) + "❀",
      "≽^•⩊•^≼ " + applyCharMap(cursiveCharMap, cleanName),
      applyCharMap(romanticBold, cleanName) + "ଘ(❁•̀ 3 •́)━☆*✲⋆ ",
      "ฅ^>⩊<^ฅ " + applyCharMap(boldCharMap, cleanName),
      "≽^• ˕ • ྀི≼ " + applyCharMap(boldCharMap, cleanName),
      "•ᴗ• " + applyCharMap(boldCharMap, cleanName),
      "(*ゝω・)   " + cleanName,
      "₍ᐢ. .ᐢ₎ ₊˚⊹♡ " + applyCharMap(upperAnglesCharMap, cleanName)
    ],
    "Crowns & Stars": [
      applyCharMap(cursiveCharMap, "常规⭐ " + cleanName + "⭐꧂"),
      applyCharMap(currencyCharMap, "✨ " + cleanName + "✨"),
      cuteItalic("💫 " + cleanName + " 💫"),
      applyCharMap(currencyCharMap, "⭐🌟 " + cleanName + " 🌟⭐"),
      applyCharMap(cursiveCharMap, "👑☆ " + cleanName + "☆👑"),
      applyCharMap(romanticBold, "★ " + cleanName + "★"),
      "★⋆ " + cleanName + " ⋆★",
      "✦･ﾟ✧ " + cleanName + " ✧ﾟ･✦",
      "☆彡 " + cleanName + " 彡☆",
      "☄✧ " + cleanName + " ✧☄"
    ],
    "Weird & Glitchy": [
      fullCrazy(cleanName),
      "|!¤'*`_`*'\n!| " + applyCharMap(wideTextCharMap, cleanName),
      "(╯︵╰,) " + applyCharMap(medievalCharMap, cleanName),
      "༼☁༽ " + cleanName + " ༼☁༽",
      "(｡•́︿•̀｡) " + applyCharMap(futureAlienCharMap, cleanName),
      "ヽ(ﾟДﾟ)ﾉ " + cleanName + " ヽ(ಠ‿ಠ)ﾉ",
      "┻━┻ ︵ヽ(`Д´)ﾉ " + cleanName,
      "🤪  " + cleanName + "  🤪"
    ]
  };
}

function addDynamicSymbol(text, symbol) {
  return text.trim().split(/\s+/).join(symbol);
}
