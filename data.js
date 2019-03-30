(function (){
  const DATA_URL = "http://n9e5v4d8.ssl.hwcdn.net/repos/weeklyRivensPC.json";

  let data = null;

  // Add a function that will be called when the window is loaded.
  window.addEventListener("load", initialize);

  /**
   * Called when the window is loaded, initialize event listeners
   */
  function initialize() {
    fetchData();
    $("item-type-select").addEventListener("change", populateWeapon);
    $("compatibility-select").addEventListener("change", getWeaponData);
    $("rerolled").addEventListener("change", getWeaponData);
  }

  /**
   * Fetches dog image paths from Dog API
   */
  function fetchData() {
    let url = DATA_URL;

    fetch(url, {
        mode: "cors"
      })
      .then(checkStatus)
      .then(JSON.parse)
      .then(handleData)
      .catch(handleError);
  }

  /**
   * Show images on the page using the image paths Dog API returns
   * @param  {object} data - object containing path to dog images from Dog API
   */
  function handleData(response) {
    data = response;
  }

  /**
   * Show error message on the page
   * @param  {object} error - error from rejected Promise
   */
  function handleError(error) {
    alert(error);
  }

  function populateWeapon() {
    let type = this.value;
    $("compatibility-select").innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      if(data[i].itemType === type) {
        if(data[i].rerolled === false) {
          let option = document.createElement("option");
          option.value = data[i].compatibility;
          if(data[i].compatibility === null) {
            option.innerText = "未開";
          } else {
            option.innerText = data[i].compatibility + " - " + ZH_TW[data[i].compatibility];
          }
          $("compatibility-select").appendChild(option);
        }
      }
    }
    getWeaponData();
  }

  function getWeaponData() {
    let weapon = $("compatibility-select").value;
    if(weapon === "null") {
      for (let i = 0; i < data.length; i++) {
        if(data[i].compatibility === null && $("item-type-select").value === data[i].itemType) {
          $("avg").innerText = `${Math.round(data[i].avg)}`;
          $("min").innerText = data[i].min;
          $("max").innerText = data[i].max;
          $("stddev").innerText = `${Math.round(data[i].stddev * 100) / 100}`;
          $("pop").innerText = `${Math.round(data[i].pop * 100) / 100}`;
          break;
        }
      }
    } else {
      for (let i = 0; i < data.length; i++) {
        if(data[i].compatibility === weapon && data[i].rerolled === $("rerolled").checked) {
          $("avg").innerText = `${Math.round(data[i].avg)}`;
          $("min").innerText = data[i].min;
          $("max").innerText = data[i].max;
          $("stddev").innerText = `${Math.round(data[i].stddev * 100) / 100}`;
          $("pop").innerText = `${Math.round(data[i].pop * 100) / 100}`;
          break;
        }
      }
    }
  }

  /* ----------------------------------- Helper Functions  ---------------------------------- */

  /**
   * Returns the element in the document with the given id
   * @param {string} id - The id of the element
   * @returns {object} element with the given id
   */
  function $(id) {
    return document.getElementById(id);
  }

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text.
   * @param {object} response - response to check for success/error.
   * @returns {object} - valid result text if response was successful, otherwise rejected
   *                     Promise result.
   */
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300 || response.status == 0) {
      return response.text();
    } else {
      return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
  }

  const ZH_TW = {
  	"null": "未開",
  	"ACK & BRUNT": "認知&衝擊",
  	"ACRID": "阿克裡德",
  	"AFURIS": "盜賊雙槍",
  	"AKBOLTO": "螺釘雙槍",
  	"AKBRONCO": "野馬雙槍",
  	"AKJAGARA": "覺醒雙槍",
  	"AKLATO": "拉托雙槍",
  	"AKLEX": "雷克斯雙槍",
  	"AKMAGNUS": "麥格努斯雙槍",
  	"AKSOMATI": "輕靈月神雙槍",
  	"AKSTILETTO": "史提托雙槍",
  	"AKVASTO": "瓦斯托雙槍",
  	"AKZANI": "荒謬雙槍",
  	"AMPHIS": "雙頭蛇",
  	"AMPREX": "安培克斯",
  	"ANGSTRUM": "安格斯壯",
  	"ANKU": "奪魂死神",
  	"ANKYROS": "甲龍雙拳",
  	"ARCA PLASMOR": "弧電離子槍",
  	"ARCA SCISCO": "弧電探知者",
  	"ARCA TITRON": "弧電振子錘",
  	"ARGONAK": "氬格納克",
  	"ASTILLA": "碎裂者",
  	"ATOMOS": "原子礦融炮",
  	"ATTERAX": "阿特拉克斯",
  	"ATTICA": "阿提卡",
  	"AZIMA": "方位角",
  	"BALLA": "碎裂者",
  	"BALLISTICA": "布裡斯提卡",
  	"BATTACOR": "武使之力",
  	"BAZA": "蒼鷹",
  	"BO": "玻之武杖",
  	"BOAR": "野豬",
  	"BOLTACE": "螺釘拐刃",
  	"BOLTO": "螺釘手槍",
  	"BOLTOR": "螺釘步槍",
  	"BRAKK": "布拉克",
  	"BRATON": "布萊頓",
  	"BROKEN SCEPTER": "",
  	"BROKEN WAR": "破碎的戰爭之劍",
  	"BRONCO": "野馬",
  	"BURST LASER": "激光點發",
  	"BURSTON": "伯斯頓",
  	"BUZLOK": "巴茲火槍",
  	"CASSOWAR": "鶴鴕",
  	"CASTANAS": "雷爆信鏢",
  	"CATCHMOON": "捕月",
  	"CAUSTACYST": "灼蝕變體鐮",
  	"CERAMIC DAGGER": "陶瓷匕首",
  	"CERATA": "裸鰓刃",
  	"CERNOS": "西諾斯",
  	"CESTRA": "錫斯特",
  	"COBRA & CRANE": "眼鏡蛇&鶴",
  	"CONVECTRIX": "導熱聚焦槍",
  	"CORINTH": "科林斯",
  	"CRONUS": "克洛諾斯",
  	"CYATH": "西亞什",
  	"CYCRON": "循環離子槍",
  	"DAIKYU": "大久和弓",
  	"DAKRA PRIME": "達克拉PRIME",
  	"DARK DAGGER": "暗黑匕首",
  	"DARK SPLIT-SWORD": "暗黑分合劍",
  	"DARK SWORD": "暗黑長劍",
  	"DECONSTRUCTOR": "分離",
  	"DEHTAT": "德塔特",
  	"DERA": "德拉",
  	"DESPAIR": "絕望",
  	"DESTREZA": "技巧之劍",
  	"DETH MACHINE RIFLE": "死亡機槍",
  	"DETRON": "德特昂",
  	"DEX DAKRA": "DEX達克拉雙劍",
  	"DOKRAHM": "多克拉姆",
  	"DRAGON NIKANA": "龍之侍刃",
  	"DRAKGOON": "龍騎兵",
  	"DREAD": "恐懼",
  	"DUAL CESTRA": "錫斯特雙槍",
  	"DUAL CLEAVERS": "斬肉雙刀",
  	"DUAL ETHER": "蒼穹雙劍",
  	"DUAL HEAT SWORDS": "烈焰雙劍",
  	"DUAL ICHOR": "惡膿雙斧",
  	"DUAL KAMAS": "雙短柄戰鐮",
  	"DUAL KERES": "凱瑞斯雙刀",
  	"DUAL RAZA": "鋒月雙斧",
  	"DUAL SKANA": "空刃雙刀",
  	"DUAL TOXOCYST": "毒囊雙槍",
  	"DUAL ZOREN": "佐倫雙斧",
  	"EMBOLIST": "安柏勒斯",
  	"ENDURA": "三葉堅韌",
  	"ETHER DAGGERS": "蒼穹匕首",
  	"ETHER REAPER": "蒼穹死神",
  	"ETHER SWORD": "蒼穹之劍",
  	"EUPHONA PRIME": "悅音 PRIME",
  	"EXERGIS": "晶能放射器",
  	"FALCOR": "獵鷹輪",
  	"FANG": "狼牙",
  	"FERROX": "鐵晶磁軌炮",
  	"FLUX RIFLE": "通量射線步槍",
  	"FRAGOR": "重擊巨錘",
  	"FURAX": "弗拉克斯",
  	"FURIS": "盜賊",
  	"FUSILAI": "齊射玻刃",
  	"GALATINE": "迦倫提恩",
  	"GALVACORD": "電流刺索",
  	"GAMMACOR": "咖瑪腕甲槍",
  	"GAZAL MACHETE": "加扎勒反曲刀",
  	"GAZE": "凝目",
  	"GLAIVE": "戰刃",
  	"GLAXION": "冷凍光束步槍",
  	"GORGON": "蛇發女妖",
  	"GRAKATA": "葛拉卡達",
  	"GRAM": "格拉姆",
  	"GRINLOK": "葛恩火槍",
  	"GUANDAO": "關刀",
  	"GUNSEN": "軍扇",
  	"HALIKAR": "哈利卡",
  	"HARPAK": "哈帕克",
  	"HATE": "憎恨",
  	"HEAT DAGGER": "烈焰短劍",
  	"HEAT SWORD": "烈焰長劍",
  	"HEK": "海克",
  	"HELIOCOR": "赫利俄光錘",
  	"HEMA": "血肢",
  	"HIKOU": "飛揚",
  	"HIND": "雌鹿",
  	"HIRUDO": "螞蝗",
  	"HYSTRIX": "豪豬",
  	"IGNIS": "伊格尼斯",
  	"JAT KITTAG": "噴射戰錘",
  	"JAT KUSAR": "噴射鎖鐮",
  	"JAVLOK": "燃焰標槍",
  	"JAW SWORD": "蛇顎刀",
  	"KAMA": "短柄戰鐮",
  	"KARAK": "卡拉克",
  	"KARYST": "凱洛斯特",
  	"KESHEG": "怯薛",
  	"KESTREL": "紅隼",
  	"KNELL": "喪鐘",
  	"KOGAKE": "科加基",
  	"KOHM": "寇恩熱能槍",
  	"KOHMAK": "寇恩霰機槍",
  	"KRAKEN": "北海巨妖",
  	"KRESKA": "直鎬",
  	"KROHKUR": "克魯古爾",
  	"KRONEN": "皇家拐刃",
  	"KRONSH": "客隆什",
  	"KULSTAR": "殺星",
  	"KUNAI": "苦無",
  	"LACERA": "悲痛之刃",
  	"LANKA": "蘭卡",
  	"LASER RIFLE": "激光步槍",
  	"LATO": "拉托",
  	"LATRON": "拉特昂",
  	"LECTA": "勒克塔",
  	"LENZ": "冷次弓",
  	"LESION": "病變",
  	"LEX": "雷克斯",
  	"MACHETE": "馬謝特砍刀",
  	"MAGISTAR": "執法者",
  	"MAGNUS": "麥格努斯",
  	"MARELOK": "瑪瑞火槍",
  	"MEWAN": "密丸",
  	"MIOS": "牡獅神",
  	"MIRE": "米爾",
  	"MITER": "米特爾",
  	"MUTALIST CERNOS": "異融西諾斯",
  	"MUTALIST QUANTA": "異融量子槍",
  	"NAGANTAKA": "噬蛇弩",
  	"NAMI SKYLA": "海波斯庫拉對劍",
  	"NAMI SOLO": "海波單劍",
  	"NIKANA": "侍刃",
  	"NINKONDI": "降靈追獵者",
  	"NUKOR": "努寇微波槍",
  	"OBEX": "奧比克斯",
  	"OCUCOR": "視使之觸",
  	"OGRIS": "食人女魔",
  	"OHMA": "歐瑪",
  	"OKINA": "翁",
  	"OOLTHA": "烏爾薩",
  	"OPTICOR": "奧堤克光子槍",
  	"ORTHOS": "歐特魯斯",
  	"ORVIUS": "靈樞",
  	"PANDERO": "手鼓",
  	"PANGOLIN SWORD": "鯪鯉劍",
  	"PANTHERA": "獵豹",
  	"PARACESIS": "心智之歿",
  	"PARACYST": "附肢寄生者",
  	"PARIS": "帕裡斯",
  	"PENTA": "潘塔",
  	"PHAGE": "噬菌者",
  	"PHANTASMA": "幻離子",
  	"PLAGUE KEEWAR": "瘟疫奇沃",
  	"PLAGUE KRIPATH": "瘟疫克裡帕絲",
  	"PLASMA SWORD": "等離子長劍",
  	"PLINX": "漫射者",
  	"POX": "膿痘",
  	"PROVA": "普羅沃",
  	"PUPACYST": "毒囊骨繭",
  	"PYRANA": "食人魚",
  	"QUANTA": "量子切割器",
  	"QUARTAKK": "誇塔克",
  	"RABVEE": "拉比威",
  	"RATTLEGUTS": "響膽",
  	"REAPER PRIME": "收割者PRIME",
  	"REDEEMER": "救贖者",
  	"RIPKAS": "銳卡斯",
  	"RUBICO": "絕路",
  	"SARPA": "蛇刃",
  	"SCINDO": "分裂斬斧",
  	"SCOLIAC": "脊椎節鞭",
  	"SCOURGE": "禍根",
  	"SEER": "預言者",
  	"SEPFAHN": "瑟普梵",
  	"SERRO": "電能斬鋸",
  	"SHAKU": "雙節尺棍",
  	"SHEEV": "希芙",
  	"SIBEAR": "西伯利亞冰錘",
  	"SICARUS": "暗殺者",
  	"SIGMA & OCTANTIS": "西格瑪&南極座",
  	"SILVA & AEGIS": "席瓦&神盾",
  	"SIMULOR": "重力奇點擬成槍",
  	"SKANA": "空刃",
  	"SKIAJATI": "影生",
  	"SNIPETRON": "狙擊特昂",
  	"SOBEK": "鱷神",
  	"SOMA": "月神",
  	"SONICOR": "超音波衝擊槍",
  	"SPECTRA": "光譜切割器",
  	"SPIRA": "旋刃飛刀",
  	"STATICOR": "靜電能量導引槍",
  	"STINGER": "毒刺",
  	"STRADAVAR": "斯特拉迪瓦",
  	"STRUN": "斯特朗",
  	"STUBBA": "史度巴",
  	"STUG": "史特克",
  	"SUPRA": "蘇普拉",
  	"SWEEPER": "掃除者",
  	"SYBARIS": "席芭莉絲",
  	"SYDON": "惡龍",
  	"SYNAPSE": "突觸生化槍",
  	"TALONS": "鷹爪",
  	"TATSU": "龍辰",
  	"TEKKO": "鐵鉤手甲",
  	"TENORA": "雙簧管",
  	"TETRA": "特拉",
  	"TIBERON": "狂鯊",
  	"TIGRIS": "猛虎",
  	"TIPEDO": "提佩多",
  	"TOMBFINGER": "墓指",
  	"TONBO": "蜻蛉薙",
  	"TONKOR": "征服榴炮",
  	"TORID": "托裡德",
  	"TWIN BASOLK": "雙子巴薩克",
  	"TWIN GRAKATAS": "雙子葛拉卡達",
  	"TWIN GREMLINS": "雙子小精靈",
  	"TWIN KOHMAK": "雙子寇恩霰機槍",
  	"TWIN KROHKUR": "雙子克魯古爾",
  	"TWIN ROGGA": "雙子羅格",
  	"TWIN VIPERS": "雙子蝰蛇",
  	"TYSIS": "啐沫者",
  	"VASTO": "瓦斯托",
  	"VECTIS": "守望者",
  	"VELDT": "草原獵手",
  	"VENKA": "凱旋之爪",
  	"VIPER": "蝰蛇",
  	"VOLNUS": "創傷",
  	"VULKAR": "金工火神",
  	"VULKLOK": "金工火槍",
  	"WAR": "戰爭之劍",
  	"WOLF SLEDGE": "惡狼戰錘",
  	"ZAKTI": "毒芽",
  	"ZARR": "沙皇",
  	"ZENISTAR": "天頂之星",
  	"ZENITH": "天穹之頂",
  	"ZHUGE": "諸葛連弩",
  	"ZYLOK": "席爾火槍"
  }
})();
