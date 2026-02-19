// <!-- ====================
//         data.js
// ========================= -->
(function(){
  const C = {};

// プラン
  C.plans = {
    docomo: {
      map: { lte5: "mini_4", lte30: "mini_10", unlimited: "max" },
      items: {
        mini_4:  { label:"ドコモ mini（4GB）",  price: 2750 },
        mini_10: { label:"ドコモ mini（10GB）", price: 3850 },
        max:     { label:"ドコモ MAX", price: 8448 }
      }
    },

    ahamo: {
      map: { lte5:"30gb", lte30:"30gb", unlimited:"110gb" },
      items:{
        "30gb":  { label:"ahamo（30GB）",  price: 2970, includes:{ callShort:true } },
        "110gb": { label:"ahamo（110GB）", price: 4950, includes:{ callShort:true } }
      }
    },

    au: {
      map: { lte5:null, lte30:null, unlimited:"value_link" },
      items:{
        value_link: { label:"auバリューリンクプラン", price: 8008 }
      }
    },

    uq: {
      map: { lte5:"tokutoku_le5", lte30:"tokutoku_gt5", unlimited:"komikomi_value" },
      items:{
        tokutoku_le5: { label:"トクトクプラン2（5GB）", price: 2948 },
        tokutoku_gt5: { label:"トクトクプラン2（30GB）", price: 4048 },
        komikomi_value: {
          label: "コミコミプランバリュー(35GB)",
          price: 3828,
          includes:{ callShort:true, callShortMinutes:10 }
        }
      }
    },

    softbank: {
      map: { lte5:null, lte30:null, unlimited:"merihari" },
      items:{
        merihari: { label:"メリハリ無制限＋", price: 7425 }
      }
    },

    ymobile: {
      map: { lte5:"simple3_s", lte30:"simple3_m", unlimited:"simple3_l" },
      items:{
        simple3_s: { label:"シンプル3 S（5GB）",  price: 3058 },
        simple3_m: { label:"シンプル3 M（30GB）", price: 4158 },
        simple3_l: { label:"シンプル3 L（35GB）", price: 5258, includes:{ callShort:true } }
      }
    }
  };

// 通話オプション
  C.voiceOptions = {
    docomo: {
      short:    { label:"5分通話無料オプション", price: 880 },
      unlimited:{ label:"かけ放題オプション",     price: 1980 }
    },
    ahamo: {
      unlimited:{ label:"かけ放題オプション", price: 1100 }
    },
    au: {
      short:    { label:"通話定額ライト（相当）", price: 880 },
      unlimited:{ label:"通話定額（相当）",      price: 1980 }
    },
    uq: {
      short:    { label:"10分かけ放題", price: 880 },
      unlimited:{ label:"24時間かけ放題", price: 1980 },
      min60:    { label:"1ヶ月60分まで", price: 660 },
      senior:   { label:"24時間かけ放題(60歳以上)", price: 880 }
    },
    softbank: {
      short:    { label:"準定額オプション＋", price: 880 },     // 公式FAQで 880/1980 が確認できる
      unlimited:{ label:"定額オプション＋",  price: 1980 }
    },
    ymobile: {
      short:    { label:"だれとでも定額＋",       price: 880 },
      unlimited:{ label:"スーパーだれとでも定額＋", price: 1980 }
    }
  };

  
// メール持ち運び
  C.mailCarry = {
    any: { label:"メール持ち運び", price: 330 }
  };

// 割引
  C.discounts = {
    docomo: {
      family: {
      label: "みんなドコモ割",
      tiers: {
        2: -550,
        3: -1210   // 3回線以上
      }
    },
      hikari: { label: "ドコモ光セット割", amount: -1210 },
      dcard_silver: { label:"dカード割（シルバー）", amount: -220 },
      dcard_gold:   { label:"dカード割（ゴールド）", amount: -550 },
      denki:        { label:"ドコモでんきセット割", amount: -110 }
    },

    au: {
      family: {
      label:"家族割プラス",
      tiers: {
        2: -660,
        3: -1210
      }
    },
      hikari: { label: "auスマートバリュー", amount: -1100 },
      aupay:  { label:"auPAYカード割", amount: -220 }
    },

    uq: {
      family: { label:"家族割", amount: -550 },
      hikari: { label: "光割", amount: -1100 },
      aupay: { label: "auPAYカード割", amount: -220 },
      oyako: {
        label: "親子割",
        amount: -1650,
        year1: -1650,
        after_le5: -1100,
        after_other: 0
      },
      support39: { label:"39割", amount: -550 }
    },

    softbank: {
      family: {
      label:"新みんな家族割",
      tiers: {
        2: -660,
        3: -1210
      }
    },
      hikari: { label:"おうち割 光セット",         amount: -1100 }
    },

    ymobile: {
      family: { label:"家族割引（2回線目以降）", amount: -1100 },
      hikari: { label:"おうち割 光セット（A）", amount: -1650 }
    },

    ahamo: {
      family: null,
      hikari: null
    }
  };

  // キャリア情報
  C.getCarrier = function(carrier){
    const cc = C.plans[carrier];
    if (!cc) return null;
    return { plans: cc.items };
  };

  // 通話オプション
  C.getVoice = function(carrier, kind){
    const v = C.voiceOptions?.[carrier]?.[kind];
    return v || null;
  };

  // 割引
C.getDiscount = function(carrier, kind, ctx){
  const d = C.discounts?.[carrier]?.[kind];
  if (!d) return null;

  if (kind === "family" && d.tiers){
    const n = Number(ctx?.discFamilyCount || 2) || 2; // 2 or 3
    const key = (n >= 3) ? 3 : 2;
    return { label: `${d.label}（${key === 2 ? "2回線" : "3回線以上"}）`, amount: d.tiers[key] };
  }

  return d;
};

  C.getDefaultPlanKey = function(carrier, dataUsage){
    const cc = C.plans[carrier];
    if (!cc) return "";
    return cc.map?.[dataUsage] || "";
  };

  C.getPlan = function(carrier, keyOrUsage){
    const cc = C.plans[carrier];
    if (!cc) return null;

    if (cc.items && cc.items[keyOrUsage]) return cc.items[keyOrUsage];

    const key = cc.map?.[keyOrUsage];
    if (!key) return null;
    return cc.items[key] || null;
  };

  C.getMailCarry = function(carrier){
    return C.mailCarry.any;
  };

C.isDiscountEligible = function(carrier, kind, planKey, ctx){
  if (carrier === "ahamo") return false;

  if (carrier === "docomo" && kind === "family"){
    if (planKey === "mini_4" || planKey === "mini_10") return false;
  }

  const d = C.discounts?.[carrier]?.[kind];
  if (!d) return false;

  if (carrier === "uq") {
    if (kind === "support39"){
    return planKey === "komikomi_value";
  }

  if (planKey === "komikomi_value"){
    return false;
  }

  if (kind === "oyako") {
    return planKey === "tokutoku_gt5";
  }

  if (ctx) {
    const hik = !!ctx.discHikari;
    if (kind === "family" && hik) return false;
  }
}

  return true;
};
  window.PRICE_DB = C;
})();