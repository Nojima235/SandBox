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
        mini_10: { label: "ドコモ mini（10GB）", price: 3850 },
        max: {
          selectLabel: "ドコモ MAX",
          defaultStage: "max_unlimited",
          variableStages: {
            max_28: { stageLabel: "【U22】~28GB", ref: "max_28" },
            max_30: { stageLabel: "【U22】28~30GB", ref: "max_30" },
            max_unlimited: { stageLabel: "無制限", ref: "max_unlimited" }
          }
        },
        max_28: { label: "【U22】ドコモ MAX（28GB）", price: 5698, hidden: true },
        max_30: { label:"【U22】ドコモ MAX（30GB）", price: 6798, hidden: true },
        max_unlimited: { label:"ドコモ MAX（無制限）", price: 8448, hidden: true },
        poikatsu_max:      { label:"ドコモ ポイ活 MAX（無制限）", price: 11748 }
      }
    },

    ahamo: {
      map: { lte5:"30gb", lte30:"30gb", unlimited:"30gb" },
      items:{
        "30gb":  { label:"ahamo（30GB）",  price: 2970, includes:{ callShort:true } },
        "110gb": { label:"ahamo大盛り（110GB）", price: 4950, includes:{ callShort:true } },
        ahamo_poikatsu: { label:"ahamoポイ活（110GB）", price: 7150, includes:{ callShort:true } }
      }
    },

    au: {
      map: { lte5:"value_link", lte30:"value_link", unlimited:"value_link" },
      items:{
        value_link: { label:"auバリューリンクプラン（無制限）", price: 8008 },
        u18_value: {
          selectLabel: "U18バリュープラン",
          defaultStage: "u18_over10",
          variableStages: {
            u18_under10: { stageLabel: "~10GB", label:"U18バリュープラン（~10GB）", price: 2398 },
            u18_over10: { stageLabel: "10GB~20GB", label:"U18バリュープラン（10GB~20GB）", price: 4048 }
          }
        }
      }
    },

    uq: {
      map: { lte5:"tokutoku_le5", lte30:"tokutoku_gt5", unlimited:"tokutoku_gt5" },
      items:{
        tokutoku_le5: { label:"トクトクプラン2（5GB）", price: 2948 },
        tokutoku_gt5: { label:"トクトクプラン2（30GB）", price: 4048 },
        komikomi_value: {
          label: "コミコミプランバリュー（35GB）",
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
      map: { lte5:"simple3_s", lte30:"simple3_m", unlimited:"simple3_m" },
      items:{
        simple3_s: { label:"シンプル3 S（5GB）",  price: 3058 },
        simple3_m: { label:"シンプル3 M（30GB）", price: 4158 },
        simple3_l: { label:"シンプル3 L（35GB）", price: 5258, includes:{ callShort:true, callShortMinutes:10 } }
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
      unlimited:{ label:"24時間かけ放題", price: 1980, planPrices: { komikomi_value: 1100 } },
      min60:    { label:"1ヶ月60分まで", price: 660 },
      senior:   { label:"24時間かけ放題(60歳以上)", price: 880 }
    },
    softbank: {
      short:    { label:"準定額オプション＋", price: 880 },
      unlimited:{ label:"定額オプション＋",  price: 1980 }
    },
    ymobile: {
      short:    { label:"だれとでも定額＋",       price: 880 },
      unlimited: { label: "スーパーだれとでも定額＋", price: 1980, planPrices: { simple3_l: 1100 } },
      senior:   { label:"24時間かけ放題(60歳以上)", price: 880 }
    }
  };

  
// メール持ち運び
  C.mailCarry = {
    any: { label:"メール持ち運び", price: 330 }
  };

  C.dataBoost = {
    uq: { label:"増量オプション", price: 550 },
    ymobile: { label:"増量オプション", price: 550 }
  };

// 割引
  C.discounts = {
    docomo: {
      u22: { label:"ドコモU22割（最大7か月）" },
      family: {
      label: "みんなドコモ割",
      tiers: {
        2: -550,
        3: -1210   // 3回線以上
      }
    },
      hikari: { label: "ドコモ光セット割", amount: -1210 },
      longterm: { label:"長期利用割" },
      longterm_10: { label:"長期利用割（10年以上）", amount: -110 },
      longterm_20: { label:"長期利用割（20年以上）", amount: -220 },
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
      hikari: { label: "おうち割 光セット", amount: -1100 },
      paypay_normal: { label:"paypayカード割（通常）", amount: -187 },
      paypay_gold:   { label:"paypayカード割（ゴールド）", amount: -187 }
    },

    ymobile: {
      family: { label:"家族割引（2回線目以降）", amount: -1100 },
      hikari: { label: "おうち割 光セット（A）", amount: -1650 },
      paypay_normal: { label:"paypayカード割（通常）", amount: -330 },
      paypay_gold: { label: "paypayカード割（ゴールド）", amount: -550 },
      oyako: { label:"ワイモバ親子割（13か月）", amount: -1100 }
    },

    ahamo: {
      family: null,
      hikari: null
    }
  };

  // キャリア情報
  function resolvePlanItem(cc, key, stageKey){
    if (!cc?.items?.[key]) return null;

    const raw = cc.items[key];
    if (!raw?.variableStages){
      return { ...raw, resolvedPlanKey: key };
    }

    const effectiveStage = raw.variableStages[stageKey] ? stageKey : (raw.defaultStage || Object.keys(raw.variableStages)[0]);
    const tier = raw.variableStages[effectiveStage] || {};
    const base = tier.ref ? cc.items[tier.ref] || null : null;

    return {
      ...(base || {}),
      ...raw,
      ...tier,
      label: raw.selectLabel || tier.label || base?.label || raw.label || "",
      selectedStageKey: effectiveStage,
      resolvedPlanKey: tier.ref || key
    };
  }

  C.getCarrier = function(carrier){
    const cc = C.plans[carrier];
    if (!cc) return null;

    const plans = {};
    Object.keys(cc.items).forEach((key) => {
      const item = cc.items[key];
      if (item?.hidden) return;
      const resolved = resolvePlanItem(cc, key);
      if (resolved) plans[key] = resolved;
    });

    return { plans };
  };

  C.getPlanStageOptions = function(carrier, planKey){
    const cc = C.plans[carrier];
    const raw = cc?.items?.[planKey];
    if (!raw?.variableStages) return [];

    return Object.keys(raw.variableStages).map((key) => ({
      key,
      label: raw.variableStages[key].stageLabel || raw.variableStages[key].label || key
    }));
  };

  C.getDefaultPlanStage = function(carrier, planKey){
    const cc = C.plans[carrier];
    const raw = cc?.items?.[planKey];
    if (!raw?.variableStages) return "";
    return raw.defaultStage || Object.keys(raw.variableStages)[0] || "";
  };

  // 通話オプション
  C.getVoice = function(carrier, kind, planKey){
    const v = C.voiceOptions?.[carrier]?.[kind];
    if (!v) return null;
    if (planKey && v.planPrices?.[planKey] !== undefined) {
      return Object.assign({}, v, { price: v.planPrices[planKey] });
    }
    return v;
  };

  // 割引
C.getDiscount = function(carrier, kind, ctx){
  const d = C.discounts?.[carrier]?.[kind];
  if (!d) return null;
  const planKey = String(ctx?.planKey || "");

  if (kind === "family" && d.tiers){
    if (carrier === "au" && planKey === "u18_value"){
      const n = Number(ctx?.discFamilyCount || 2) || 2;
      const key = (n >= 3) ? 3 : 2;
      const amount = (key >= 3) ? -550 : -220;
      return { label: `${d.label}（${key === 2 ? "2回線" : "3回線以上"}）`, amount };
    }

    const n = Number(ctx?.discFamilyCount || 2) || 2; // 2 or 3
    const key = (n >= 3) ? 3 : 2;
    return { label: `${d.label}（${key === 2 ? "2回線" : "3回線以上"}）`, amount: d.tiers[key] };
  }

  if (carrier === "au" && planKey === "u18_value"){
    if (kind === "hikari") return { ...d, amount: -550 };
    if (kind === "aupay") return { ...d, amount: -220 };
  }

  if (carrier === "docomo" && kind === "u22"){
  const pk = planKey;
  const amount =
    (pk === "max_unlimited") ? -550 :
    (pk === "max_30")        ? -3828 :
    (pk === "max_28")        ? -2728 :
    0;
  return { label: d.label, amount };
}

  return d;
};

  C.getDefaultPlanKey = function(carrier, dataUsage){
    const cc = C.plans[carrier];
    if (!cc) return "";
    return cc.map?.[dataUsage] || "";
  };

  C.getPlan = function(carrier, keyOrUsage, stageKey){
    const cc = C.plans[carrier];
    if (!cc) return null;

    if (cc.items && cc.items[keyOrUsage]) return resolvePlanItem(cc, keyOrUsage, stageKey);

    const key = cc.map?.[keyOrUsage];
    if (!key) return null;
    return resolvePlanItem(cc, key) || null;
  };

  C.getMailCarry = function(carrier){
    return C.mailCarry.any;
  };

  C.getDataBoost = function(carrier){
    return C.dataBoost?.[carrier] || null;
  };

C.isDiscountEligible = function(carrier, kind, planKey, ctx){
  //【ahamo】
  // 割引なし
  if (carrier === "ahamo") return false;
  const d = C.discounts?.[carrier]?.[kind];
  if (!d) return false;

  //【docomo】
  // miniは家族割なし
  if (carrier === "docomo" && kind === "family"){
    if (planKey === "mini_4" || planKey === "mini_10") return false;
  }

  // U22割はMAXのみ
  if (carrier === "docomo" && kind === "u22"){
    return (planKey === "max_28" || planKey === "max_30" || planKey === "max_unlimited");
  }

  if (carrier === "docomo" && kind === "longterm"){
    return (
      planKey === "max_28" ||
      planKey === "max_30" ||
      planKey === "max_unlimited" ||
      planKey === "poikatsu_max"
    );
  }

  //【UQ】
  if (carrier === "uq") {
    // コミコミは割引なし
    if (planKey === "komikomi_value") return false;

    // 親子割はトクトク2のみ
    if (kind === "oyako"){
      return planKey === "tokutoku_gt5";
    }
  }

  //【Y!mobile】
  if (carrier === "ymobile") {
  // 親子割は シンプル3 M/L のみ
    if (kind === "oyako"){
      return (planKey === "simple3_m" || planKey === "simple3_l");
    }
  }

  return true;
};
  window.PRICE_DB = C;
})();
