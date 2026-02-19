/* data.js
   - 値は税込を基本に（表示も税込なので混乱が減る）
   - “lte5/lte30/unlimited” はツール内の抽象段。キャリアごとに代表プランへマップする。
*/
(function(){
  const C = {};

  // ===== プラン（月額・税込）
  C.plans = {
    // docomo
    docomo: {
      map: { lte5: "mini_4", lte30: "mini_10", unlimited: "max" },
      items: {
        // ドコモ mini: 4GB 2750円 / 10GB 3850円（税込）
        mini_4:  { label:"ドコモ mini（4GB）",  price: 2750 },
        mini_10: { label:"ドコモ mini（10GB）", price: 3850 },
        // ドコモ MAX: 8448円（税込）
        max:     { label:"ドコモ MAX", price: 8448 }
      }
    },

    // ahamo
    ahamo: {
      map: { lte5:"30gb", lte30:"30gb", unlimited:"110gb" },
      items:{
        // 30GB 2970円 / 110GB 4950円（税込）
        "30gb":  { label:"ahamo（30GB）",  price: 2970, includes:{ callShort:true } },
        "110gb": { label:"ahamo（110GB）", price: 4950, includes:{ callShort:true } }
      }
    },

    // au（例：現行代表として auバリューリンクプランを unlimited に割当）
    au: {
      map: { lte5:null, lte30:null, unlimited:"value_link" },
      items:{
        // 9,328円（税込）
        value_link: { label:"auバリューリンクプラン", price: 8008 }
      }
    },

    // UQ mobile
    uq: {
      // トクトクプラン2は利用量で変動：lte5/30 に割当、unlimited はコミコミを割当（必要なら）
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

    // SoftBank
    softbank: {
      map: { lte5:null, lte30:null, unlimited:"merihari" },
      items:{
        // 7,425円（税込）
        merihari: { label:"メリハリ無制限＋", price: 7425 }
      }
    },

    // Y!mobile
    ymobile: {
      map: { lte5:"simple3_s", lte30:"simple3_m", unlimited:"simple3_l" },
      items:{
        // 税抜2,780(3,058) / 3,780(4,158) / 4,780(5,258)
        simple3_s: { label:"シンプル3 S（5GB）",  price: 3058 },
        simple3_m: { label:"シンプル3 M（30GB）", price: 4158 },
        simple3_l: { label:"シンプル3 L（35GB）", price: 5258, includes:{ callShort:true } } // 10分以内通話が内包（ページ注記）
      }
    }
  };

  // ===== 通話オプション（税込）
  // UIは「5分」「かけ放題」だが、キャリアで “5分/10分/内包” があり得るので label をキャリア別に持つ
  C.voiceOptions = {
    // docomo（一般のオプションは 5分880 / かけ放題1980 が確認できる）
    docomo: {
      short:    { label:"5分通話無料オプション", price: 880 },
      unlimited:{ label:"かけ放題オプション",     price: 1980 }
    },
    // ahamo（ここは運用上あなたの店の案内に合わせて設定。必要なら公式ソースで差し替え）
    ahamo: {
      unlimited:{ label:"かけ放題オプション", price: 1100 }
    },
    // au / UQ / SoftBank / Y!mobile も “880/1980” 系が多いので共通枠で持つ（必要なら各社名に合わせて変更）
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

  
    // ===== メール持ち運び（税込）
  C.mailCarry = {
    any: { label:"メール持ち運び", price: 330 }
  };


  // ===== 割引（税込）
  // ここは“あなたのUIが boolean”なので、店頭運用上「適用できる前提ならON」で扱うモデルにするのが現実的。
  C.discounts = {
    // docomo（みんなドコモ割/光セット割など、本当は段階があるので必要なら入力項目追加がおすすめ）
    docomo: {
      family: { label:"みんなドコモ割（最大想定）", amount: -1100 },
      hikari: { label:"ドコモ光セット割（想定）",  amount: -1100 }
    },

    // au
    au: {
      family: { label:"家族割プラス（最大想定）", amount: -1210 },
      hikari: { label: "auスマートバリュー", amount: -1100 },
      aupay:  { label:"auPAYカード割", amount: -220 }
    },

    // UQ（UQ側にも自宅セット/家族セット等があるが、あなたのツールの入力が増えるので一旦同名で扱う）
    uq: {
      family: { label:"家族セット割（想定）", amount: -550 },
      hikari: { label: "自宅セット割（想定）", amount: -1100 },
      aupay: { label: "auPAYカード割", amount: -220 },
      oyako: {
        label: "親子割",
        amount: -1650,
        year1: -1650,
        after_le5: -1100,
        after_other: 0 }
    },

    // SoftBank
    softbank: {
      family: { label:"新みんな家族割（最大想定）", amount: -1210 },
      hikari: { label:"おうち割 光セット",         amount: -1100 }
    },

    // Y!mobile（おうち割光セット(A) は税込1,650円割引、家族割は2回線目以降 税込1,100円）
    ymobile: {
      family: { label:"家族割引（2回線目以降）", amount: -1100 },
      hikari: { label:"おうち割 光セット（A）", amount: -1650 }
    },

    // ahamo は原則セット割の作りが違うので無効にしておく（必要なら拡張）
    ahamo: {
      family: null,
      hikari: null
    }
  };

  // ===== 互換レイヤ（ConsultingNavigator.html 側が期待するAPI） =====

  // キャリア情報（plans一覧を返す）
  C.getCarrier = function(carrier){
    const cc = C.plans[carrier];
    if (!cc) return null;
    return { plans: cc.items };
  };

    // 通話オプション取得
  C.getVoice = function(carrier, kind){
    const v = C.voiceOptions?.[carrier]?.[kind];
    return v || null;
  };

  // 割引取得
  C.getDiscount = function(carrier, kind){
    const d = C.discounts?.[carrier]?.[kind];
    return d || null;
  };

  // dataUsage(lte5/lte30/unlimited) に対応するデフォルトplanKey
  C.getDefaultPlanKey = function(carrier, dataUsage){
    const cc = C.plans[carrier];
    if (!cc) return "";
    return cc.map?.[dataUsage] || "";
  };

  // ★ getPlan を “planKey / dataUsageどっちでもOK” にする
  // - 2引数目が items に存在 → planKey扱い
  // - 存在しない → dataUsage扱いで map から引く
  C.getPlan = function(carrier, keyOrUsage){
    const cc = C.plans[carrier];
    if (!cc) return null;

    // planKey 直指定
    if (cc.items && cc.items[keyOrUsage]) return cc.items[keyOrUsage];

    // dataUsage 指定
    const key = cc.map?.[keyOrUsage];
    if (!key) return null;
    return cc.items[key] || null;
  };

  C.getMailCarry = function(carrier){
    return C.mailCarry.any;
  };

  // 割引が “そもそも存在するか/無効か” の判定
  // 今回は：ahamoは常にfalse、他は discounts定義があれば true
  C.isDiscountEligible = function(carrier, kind, planKey, ctx){
    if (carrier === "ahamo") return false;

    const d = C.discounts?.[carrier]?.[kind];
    if (!d) return false;

    if (carrier === "uq"){
    if (planKey === "komikomi_value"){
      return false;
    }
    if (kind === "oyako"){
      const isTokutoku = String(planKey || "").startsWith("tokutoku_");
      return isTokutoku;
      }
  }

    // ---- UQ: family & hikari cannot stack (prefer hikari) ----
    // ctx = { discFamily:boolean, discHikari:boolean } を受け取れる場合のみ制御する
    if (carrier === "uq" && ctx){
      const fam = !!ctx.discFamily;
      const hik = !!ctx.discHikari;

      // 光割がONなら家族割は適用不可
      if (kind === "family" && hik) return false;

      // 家族割がONでも光割は適用可（＝光割優先で残す）
      // kind === "hikari" のときは true のまま
    }

    return true;
  };
  window.PRICE_DB = C;
})();