/*
 * BTC Atlas 的唯一內容來源。
 * 新增文章前請先閱讀專案根目錄的 AGENTS.md。
 * 此檔使用標準 JavaScript，不需要框架、套件或 API 金鑰。
 */
window.BTC_ATLAS_DATA = {
  categories: [
    { id: 'basics', label: '交易基礎', icon: '◫', tone: 'orange', description: 'K 線、量能、時間週期' },
    { id: 'structure', label: '市場結構', icon: '⌁', tone: 'blue', description: '趨勢、突破、支撐壓力' },
    { id: 'indicators', label: '技術指標', icon: '▥', tone: 'green', description: 'EMA、RSI、MACD、VRVP' },
    { id: 'smc', label: '流動性與 SMC', icon: '◇', tone: 'purple', description: 'FVG、OB、掃流動性' },
    { id: 'derivatives', label: '永續合約', icon: '⇄', tone: 'cyan', description: '資金費率、槓桿、強平' },
    { id: 'risk', label: '風控與紀律', icon: '⛨', tone: 'red', description: '風險報酬、部位、交易紀錄' },
    { id: 'macro', label: '總經與 BTC', icon: '◎', tone: 'gray', description: 'CPI、美元、美債與風險情緒' }
  ],
  articles: [
    {
      id:'candlestick',category:'basics',title:'K 線的四個價格',summary:'從開高低收看懂多空如何留下價格軌跡。',level:'入門',minutes:5,
      concept:'一根 K 線由開盤價、最高價、最低價、收盤價（OHLC）構成。實體表示開盤到收盤的區間，影線表示期間曾到達但未維持在收盤的價格。',
      practice:'先確認每根 K 線對應的時間，例如 5 分鐘或 4 小時，再比較收盤位置、影線比例及附近結構。影線長不等於一定反轉。',
      pitfall:'把單根「長上影線」直接等同主力出貨，忽略成交量、時間週期與前後 K 線。',
      checklist:['能指出開、高、低、收四價','知道不同時間週期會改變 K 線外觀','不靠單根 K 線判定完整趨勢'],sources:[]
    },
    {
      id:'timeframes',category:'basics',title:'多時間週期分析',summary:'1m、5m、1h、4h 各自負責什麼？',level:'入門',minutes:5,
      concept:'短週期能看細節，但更容易受短暫波動干擾；長週期用於理解較大結構。多週期分析是從大圖定位，再到小圖尋找細節。',
      practice:'範例：先看 4H 區間，再用 1H 確定近期結構，最後在 5m 觀察是否出現具體且可驗證的條件。',
      pitfall:'在 1 分鐘圖看到突破，就忽略上方 4 小時阻力，或同時追蹤太多週期造成互相矛盾。',
      checklist:['知道大、小週期的角色','進場理由與失效條件使用一致週期','不因低週期噪音不斷改變計畫'],sources:[]
    },
    {
      id:'volume',category:'basics',title:'成交量與價格的關係',summary:'價格上漲與交易活躍，不一定代表同一件事。',level:'入門',minutes:6,
      concept:'成交量表示特定期間內成交的數量；價格變動幅度與成交量彼此相關，但成交量本身不能直接告訴你「誰在吸籌」。',
      practice:'比較突破 K 線的成交量是否明顯偏離近期平均，並留意突破後是否能維持在關鍵區域外。',
      pitfall:'把「放量」一律解讀成多方勝利，忽略大量交易可能同時包含賣壓與買盤承接。',
      checklist:['比較相同交易所與相同商品的成交量','區分成交量與持倉量 OI','搭配價格位置而非獨立解讀'],sources:[]
    },
    {
      id:'spot-vs-perp',category:'basics',title:'現貨與永續合約',summary:'買入 BTC 與交易 BTCUSDT 永續，到底差在哪？',level:'入門',minutes:7,
      concept:'現貨交易涉及資產買賣；永續合約是追蹤標的價格的衍生品，通常使用保證金，並有槓桿、資金費率與強制平倉風險。',
      practice:'閱讀交易所的合約規格，確認保證金資產、標記價格、費率與結算規則。USDT 本位合約的損益通常以 USDT 計。',
      pitfall:'把「本金只放 100 USDT」誤認為部位價值只有 100 USDT，忽略槓桿放大的名目曝險。',
      checklist:['分清資產持有與合約曝險','知道名目部位不等於保證金','閱讀所用交易所的實際規則'],sources:[{label:'MEXC｜USDT 本位合約介紹',url:'https://www.mexc.com/crypto-glossary/article/usdt-margined-futures-169883'}]
    },
    {
      id:'trend-structure',category:'structure',title:'HH、HL、LH、LL 趨勢結構',summary:'不用猜高低點，先學會描述市場目前在做什麼。',level:'入門',minutes:7,
      concept:'HH（更高高點）和 HL（更高低點）常用來描述上升結構；LH（更低高點）和 LL（更低低點）常用來描述下降結構。',
      practice:'標記同一時間週期中具代表性的擺動高低點，觀察最近一次回撤是否維持原先結構。',
      pitfall:'任何微小波峰都拿來判斷結構翻轉，造成圖表過度複雜。',
      checklist:['能分辨 HH、HL、LH、LL','標註高低點時保持一致標準','知道結構只是描述，不保證未來方向'],sources:[]
    },
    {
      id:'support-resistance',category:'structure',title:'支撐與壓力區',summary:'為什麼重要的通常是區域，不是一條精準的線？',level:'入門',minutes:6,
      concept:'支撐／壓力是價格過去曾明顯反應的區域，通常由多次高低點、盤整邊界或大量成交區形成觀察線索。',
      practice:'畫出可解釋的區域寬度，記錄碰觸次數與反應，並在突破後重新評估其角色。',
      pitfall:'將每個反彈點都畫成水平線，或預設價格一定會精準碰線後反彈。',
      checklist:['優先使用區域而非絕對單價','辨識區域所屬時間週期','保留價格直接穿越的可能'],sources:[]
    },
    {
      id:'breakout-retest',category:'structure',title:'突破與回測',summary:'突破不是「碰到價位」，重點是離開後能否站穩。',level:'進階',minutes:7,
      concept:'突破描述價格穿越原本的盤整或結構邊界；回測是突破後重新接近該區。突破後沒有回測也很常見。',
      practice:'先定義「突破成立」條件，例如收盤價越過區域；再記錄回測時價格、量能及結構如何變化。',
      pitfall:'突破尚未收 K 就認定成功，或認為任何回測都必定提供進場機會。',
      checklist:['突破定義可觀察、可重複','區分突破、刺穿與假突破','接受市場可能不回測'],sources:[]
    },
    {
      id:'range',category:'structure',title:'盤整區間與震盪市場',summary:'不是每一段走勢都有趨勢，區間內的邏輯不同。',level:'入門',minutes:5,
      concept:'當價格反覆在相對穩定的高低邊界之間往返，可視為區間盤整。區間上緣、下緣與中間位置，代表不同的交易情境。',
      practice:'將區間上緣、下緣和中線畫出來，觀察價格是否出現假突破、快速收回或真正脫離盤整。',
      pitfall:'在區間中央使用追趨勢的思維，或因價格接近邊界就預設一定反轉。',
      checklist:['能辨識上緣與下緣','知道盤整與趨勢策略不同','注意區間最終可能突破'],sources:[]
    },
    {
      id:'false-breakout',category:'structure',title:'假突破與失效',summary:'被掃停損後反向走？先理解突破為何沒有延續。',level:'進階',minutes:8,
      concept:'假突破指價格短暫越過重要邊界，但未能持續並重新回到原區間。它是事後根據走勢定義的現象，不是能事前保證辨識的訊號。',
      practice:'觀察價格越界後是否快速收回、是否有明確的失效收盤，以及是否與高週期區間邊界重疊。',
      pitfall:'一看到刺穿就立即反向操作；有些突破只是在回測前暫時回落，還不能稱為假突破。',
      checklist:['先定義區間與邊界','等待可驗證的失效跡象','保留再度突破的情境'],sources:[]
    },
    {
      id:'ema',category:'indicators',title:'EMA 指數移動平均線',summary:'常見的 20、50、200 EMA，反映不同速度的平均價格。',level:'入門',minutes:6,
      concept:'EMA 是對較新價格賦予較高權重的移動平均線，因此通常比相同週期的 SMA 更快回應價格變動，但仍是落後型指標。',
      practice:'比較價格位於 EMA 的相對位置、均線方向及不同 EMA 的排列，再與市場結構一起閱讀。',
      pitfall:'看到均線黃金交叉就當成保證上漲的訊號；盤整時均線可能頻繁交錯。',
      checklist:['知道 EMA 來自歷史價格','理解週期短的 EMA 通常更靈敏','在盤整盤提防反覆交叉'],sources:[{label:'TradingView｜Exponential Moving Average',url:'https://www.tradingview.com/support/solutions/43000592270-exponential-moving-average/'}]
    },
    {
      id:'rsi',category:'indicators',title:'RSI 相對強弱指標',summary:'70 與 30 不是自動做空、做多的按鈕。',level:'入門',minutes:6,
      concept:'RSI 透過近期漲跌幅的相對強度衡量動能，常見設定是 14 期。數值介於 0 至 100；70/30 常被當成觀察區而非買賣保證。',
      practice:'留意 RSI 高低點、是否與價格走勢形成背離，以及整體趨勢是強勢還是盤整。',
      pitfall:'在強勁上升趨勢中，只因 RSI 大於 70 就認為價格必然立即下跌。',
      checklist:['知道 RSI 是動能指標','不將超買／超賣等同反轉','背離需要搭配結構確認'],sources:[{label:'TradingView｜Relative Strength Index',url:'https://www.tradingview.com/support/solutions/43000502338-relative-strength-index-rsi/'}]
    },
    {
      id:'macd',category:'indicators',title:'MACD 動能與趨勢',summary:'兩條線與一組柱狀圖，傳達的是什麼？',level:'進階',minutes:7,
      concept:'常見 MACD 線為 EMA(12) 減 EMA(26)，訊號線是 MACD 的 EMA(9)，柱狀圖呈現 MACD 線與訊號線的差距。',
      practice:'區分零軸上下的方向與柱體擴大、縮小所反映的動能變化，並留意走勢中的時間延遲。',
      pitfall:'把柱體縮短直接解讀為價格一定反轉，忘記這只代表兩條線的差距縮小。',
      checklist:['能區分 MACD、訊號線與柱體','了解零軸與交叉的意義','知道指標可能延後反映走勢'],sources:[{label:'TradingView｜MACD 官方說明',url:'https://www.tradingview.com/support/solutions/43000502344-moving-average-convergence-divergence-macd-indicator/'}]
    },
    {
      id:'vrvp',category:'indicators',title:'VRVP／POC 成交量分布',summary:'把成交量從「時間軸」換到「價格軸」閱讀。',level:'進階',minutes:8,
      concept:'Volume Profile 顯示指定範圍內不同價位的成交量分布。POC 是該範圍成交量最高的價位；VAH/VAL 是價值區上、下界。',
      practice:'先確定統計範圍，再觀察高成交量區與低成交量區在哪裡。改變可視範圍可能改變 VRVP 的計算結果。',
      pitfall:'把 POC 當作一定會吸引價格返回的磁鐵，或忽略不同交易所的成交量資料可能不同。',
      checklist:['知道 POC 是最大成交量價位','明白 VAH/VAL 與設定的範圍有關','使用前確認資料來源'],sources:[{label:'TradingView｜Volume Profile 基本概念',url:'https://www.tradingview.com/support/solutions/43000502040-volume-profile-indicators-basic-concepts/'}]
    },
    {
      id:'fvg',category:'smc',title:'FVG 公平價值缺口',summary:'三根 K 線留下的價格失衡區，該怎麼客觀標記？',level:'進階',minutes:8,
      concept:'在常見的三根 K 線定義中，多方 FVG 為第一根的高點低於第三根的低點；空方則相反。這種標記描述快速推進留下的價位區間。',
      practice:'先固定使用的 FVG 定義、最小缺口大小與時間週期，再觀察價格是否回到區域，以及回訪後的實際反應。',
      pitfall:'認為每個 FVG 都一定會回補，或把「價格觸及 FVG」當成不需其他條件的交易訊號。',
      checklist:['能正確找到三根 K 線的相對位置','定義回補是觸及還是完全填滿','不假設回補必然發生'],sources:[]
    },
    {
      id:'order-block',category:'smc',title:'Order Block（OB）訂單區塊',summary:'理解常見的 OB 畫法，也理解它的主觀性。',level:'進階',minutes:8,
      concept:'SMC 社群常把強勢推進前的最後一根反向 K 線或其價格範圍標為 OB。不同交易者與工具的定義不完全一致。',
      practice:'寫下自己的標記規則，例如必須出現結構突破、使用實體還是影線、失效界線在哪裡，再回看歷史走勢。',
      pitfall:'把 OB 說成可直接觀測到機構真實掛單的證據；一般 K 線圖不足以證明參與者身分。',
      checklist:['有固定且可重現的 OB 定義','清楚記錄失效條件','知道 OB 是分析框架而非機構持倉證據'],sources:[]
    },
    {
      id:'liquidity-sweep',category:'smc',title:'流動性掃蕩（Sweep）',summary:'區間高低點被短暫突破，可能代表什麼？',level:'進階',minutes:7,
      concept:'交易者常關注明顯高低點附近可能聚集的止損及觸發單。Sweep 是對價格短暫越過這類價位後的描述，並非直接看見所有訂單。',
      practice:'標記等高／等低點，觀察越過價位後的收盤與後續結構；同時保留「真正延續突破」的另一種可能。',
      pitfall:'把每次突破都說成「主力故意掃單」，忽略止損分布通常無法由 K 線直接驗證。',
      checklist:['先找到明顯高低點','越界之後再看回收與延續','不用單一 K 線推測主力動機'],sources:[]
    },
    {
      id:'bos-choch',category:'smc',title:'BOS 與 CHoCH 結構訊號',summary:'延續與可能轉換，差異在破壞了哪個結構。',level:'進階',minutes:9,
      concept:'BOS 常指順著現有方向打破重要擺動點；CHoCH 常用來描述首次出現與原有趨勢相反的結構變化。不同體系對名詞定義略有差異。',
      practice:'先框定趨勢所屬週期與「重要高低點」的標準，再觀察是延續原方向，還是破壞了原本關鍵回撤點。',
      pitfall:'不先定義 swing 的級別，就讓任何小波動都變成 CHoCH，進而頻繁改變對趨勢的判斷。',
      checklist:['明確區分不同級別的結構','使用一致的突破確認方式','記得結構訊號不等於必然轉向'],sources:[]
    },
    {
      id:'perpetual-contracts',category:'derivatives',title:'USDT 本位永續合約',summary:'理解名目價值、標記價格與合約計價。',level:'入門',minutes:7,
      concept:'USDT 本位永續合約通常以 USDT 作保證金並結算損益；沒有固定到期日。合約的標記價格、成交價格與指數價格可能不同。',
      practice:'下單前核對合約規格、交易費率、保證金模式與強平基準，不以現貨價格單獨推測合約風險。',
      pitfall:'只看 TradingView 上的 K 線，就以為圖上價格、成交價和用來計算強平的標記價格完全相同。',
      checklist:['確認合約是否為 USDT 本位','識別標記價格與最新成交價','理解持倉有持續成本'],sources:[{label:'MEXC｜USDT 本位合約介紹',url:'https://www.mexc.com/crypto-glossary/article/usdt-margined-futures-169883'}]
    },
    {
      id:'funding-rate',category:'derivatives',title:'資金費率（Funding Rate）',summary:'持有永續合約，為什麼可能定期收／付費用？',level:'進階',minutes:7,
      concept:'永續合約藉由多空之間的定期資金費支付，使合約價格更接近現貨指數。一般情況下正費率由多方支付空方，負費率則相反。',
      practice:'查看 MEXC 當前合約的費率、下次結算時間、預計成本與平台的最新計算方式；實際結算間隔依商品和平台規則。',
      pitfall:'把費率正負當成價格一定漲跌的預測，或忘記手續費之外還有資金費成本。',
      checklist:['知道正負費率的支付方向','確認合約實際費率與結算時間','估算成本時使用名目部位價值'],sources:[{label:'MEXC｜資金費率規則',url:'https://www.mexc.com/announcements/article/funding-rate-mechanism-13322295212313'}]
    },
    {
      id:'margin-leverage',category:'derivatives',title:'槓桿、逐倉與全倉',summary:'理解曝險如何被放大，以及保證金模式的差別。',level:'進階',minutes:8,
      concept:'槓桿使較少的初始保證金對應較大的名目部位。逐倉通常隔離該部位的保證金；全倉通常與帳戶可用保證金共享風險，詳細規則因平台而異。',
      practice:'先計算「名目部位 × 價格變動比例」的粗略損益，再加上手續費、滑價與資金費，避免只看保證金回報率。',
      pitfall:'高槓桿讓百分比獲利看起來很大，也讓損失與強平風險更快接近。',
      checklist:['能區分保證金與名目部位','知道逐倉／全倉的風險界線','不將高槓桿視作提高勝率'],sources:[]
    },
    {
      id:'liquidation',category:'derivatives',title:'強平、標記價格與滑價',summary:'損失可能不只來自方向判錯。',level:'進階',minutes:8,
      concept:'當保證金不足以維持合約部位時，交易所可能啟動強制平倉。觸發條件常與標記價格、維持保證金及交易所風險規則有關。',
      practice:'事前辨識風險，不要把估計強平價當成永遠不變的安全線；預留手續費和價格跳動造成的誤差。',
      pitfall:'假設設定停損就保證能精確在該價格成交；快速行情可能出現滑價。',
      checklist:['理解標記價格的角色','知道停損與強平是不同機制','考慮滑價與交易成本'],sources:[]
    },
    {
      id:'risk-reward',category:'risk',title:'風險報酬比與期望值',summary:'勝率不是全部，平均賺賠幅度同樣重要。',level:'入門',minutes:8,
      concept:'風險報酬比 R:R 比較預計虧損與潛在獲利。簡化期望值＝勝率 × 平均獲利 − 敗率 × 平均虧損；實際結果還受成本和執行偏差影響。',
      practice:'以假想數字計算：40% 勝率、平均獲利 2R、平均損失 1R，未扣成本的期望值為 0.2R／筆。',
      pitfall:'把圖上「看似 1:3」當成真實可實現的獲利，忽略滑價、費用與策略樣本數。',
      checklist:['能計算每筆最大計畫風險','區分理論 R:R 與實際成交結果','評估交易成本與樣本偏差'],sources:[]
    },
    {
      id:'position-sizing',category:'risk',title:'部位大小與每筆風險',summary:'先決定能承受多少損失，再理解部位曝險。',level:'進階',minutes:9,
      concept:'風險控制關注的是若失效情境發生時的潛在虧損，而不只是槓桿倍數。簡化模型中，名目部位約等於計畫可承受虧損 ÷ 停損距離比例。',
      practice:'練習純假設計算：若可承受虧損 10 USDT、停損距離 1%，忽略費用時名目部位約 1,000 USDT。這只是數學示例，不是建議倉位。',
      pitfall:'將理論停損距離當成保證成交價格；此簡化公式未納入滑價、費用、跳空或不同合約規格。',
      checklist:['先區分最大計畫虧損與保證金','知道示例公式的假設','不把模型當成保本機制'],sources:[]
    },
    {
      id:'trading-journal',category:'risk',title:'交易日誌與策略復盤',summary:'真正的進步，來自把「我覺得」變成可檢查紀錄。',level:'入門',minutes:8,
      concept:'交易日誌記錄交易前的假設、進出場理由、風險、執行結果與情緒，讓每次交易都有可回顧的脈絡。',
      practice:'每筆至少記：日期、交易標的、時間週期、情境、進場條件、失效條件、預期 R:R、實際損益、截圖、復盤。',
      pitfall:'只保存賺錢的紀錄、用結果好壞評價原先決策，或事後改寫原本的進場理由。',
      checklist:['交易前後紀錄分開','保留失敗案例與截圖','定期檢查自己的重複錯誤'],sources:[]
    },
    {
      id:'cpi-fed',category:'macro',title:'CPI、Fed 與利率預期',summary:'總經數據為什麼會牽動 BTC 的風險情緒？',level:'進階',minutes:8,
      concept:'通膨數據與聯準會政策訊號可能改變市場對利率與流動性的預期，進而影響風險資產。影響方向不是固定公式，仍取決於數據相對市場預期的差異。',
      practice:'關注公布日期、預期值與實際值，並觀察公布後美債殖利率、美元與風險資產的反應。',
      pitfall:'看到 CPI 下降就直接推論 BTC 必漲，忽略市場可能早已預期或同時出現其他變數。',
      checklist:['比較實際值與預期值','理解價格反應是多變數結果','重大事件前留意波動風險'],sources:[{label:'美國勞工統計局｜CPI',url:'https://www.bls.gov/cpi/'},{label:'Fed｜FOMC',url:'https://www.federalreserve.gov/monetarypolicy/fomc.htm'}]
    },
    {
      id:'dxy-yields',category:'macro',title:'DXY、美債殖利率與 BTC',summary:'學會觀察跨市場關係，但不要把相關當成因果。',level:'進階',minutes:8,
      concept:'美元指數 DXY 反映美元相對一籃子貨幣的強弱；美債殖利率反映債券市場價格與利率預期等因素。這些變化有時與 BTC 風險偏好同向或反向，但關聯並不恆定。',
      practice:'對照同一時間區間的 DXY、2 年與 10 年期殖利率、美股以及 BTC，記錄哪些時段關係成立、哪些時段失效。',
      pitfall:'只看到「DXY 上漲、BTC 下跌」的幾個案例，就認定未來一定存在固定反比。',
      checklist:['知道相關不代表因果','比較相同時間範圍','允許市場關聯隨時改變'],sources:[]
    },
    {
      id:'risk-chain',category:'macro',title:'BTC 的風險偏好觀察鏈',summary:'將 Fed、美元、美股與加密貨幣放在同一張地圖。',level:'進階',minutes:9,
      concept:'一種觀察框架是「利率預期 → 美債殖利率／美元 → 美股風險情緒 → BTC → 其他加密資產」，但這只是待驗證的關聯路徑，不是固定的價格傳導定律。',
      practice:'遇到重大事件時，記錄第一個反應的市場、其他市場有無跟隨、時間差與後續是否逆轉。',
      pitfall:'拿這條鏈當成永遠準確的買賣公式，或在出現不符合預期的走勢時，忽略 BTC 自身市場因素。',
      checklist:['分辨事實、相關與假設','觀察事件後的實際市場反應','將框架當作學習工具而非交易訊號'],sources:[]
    }
  ],
  roadmap: [
    {title:'01 · 認識價格語言',description:'先知道一根 K 線代表什麼，並區分現貨與永續合約。',articleIds:['candlestick','timeframes','spot-vs-perp']},
    {title:'02 · 讀懂價格結構',description:'觀察趨勢、高低點及市場如何形成支撐壓力。',articleIds:['trend-structure','support-resistance','range']},
    {title:'03 · 判斷突破是否有效',description:'將突破、回測與假突破整理成可描述的現象。',articleIds:['breakout-retest','false-breakout','volume']},
    {title:'04 · 建立技術指標觀念',description:'理解 EMA、RSI、MACD 與成交量分布的限制。',articleIds:['ema','rsi','macd','vrvp']},
    {title:'05 · 研究流動性框架',description:'認識 FVG、OB、流動性掃蕩與 BOS／CHoCH。',articleIds:['fvg','order-block','liquidity-sweep','bos-choch']},
    {title:'06 · 掌握合約風險',description:'了解資金費率、槓桿、保證金與強平。',articleIds:['perpetual-contracts','funding-rate','margin-leverage','liquidation']},
    {title:'07 · 設計可檢查的風控',description:'透過數學與紀錄，檢查自己每一筆交易的假設。',articleIds:['risk-reward','position-sizing','trading-journal']},
    {title:'08 · 補上總經脈絡',description:'用事件與跨市場觀察框架理解 BTC 的外部環境。',articleIds:['cpi-fed','dxy-yields','risk-chain']}
  ],
  glossary: [
    {term:'BTC',name:'比特幣',meaning:'Bitcoin 的代號。可指資產本身，也常出現在 BTCUSDT 等交易對中。',article:'spot-vs-perp'},
    {term:'OHLC',name:'開高低收',meaning:'Open、High、Low、Close；一根 K 線的四個基礎價格。',article:'candlestick'},
    {term:'HH / HL',name:'更高高點／更高低點',meaning:'常用來描述上升結構中的擺動高低點。',article:'trend-structure'},
    {term:'LH / LL',name:'更低高點／更低低點',meaning:'常用來描述下降結構中的擺動高低點。',article:'trend-structure'},
    {term:'S/R',name:'支撐／壓力',meaning:'Support / Resistance，歷史價格較常出現反應的區域。',article:'support-resistance'},
    {term:'EMA',name:'指數移動平均線',meaning:'對較近期價格給予較高權重的移動平均線。',article:'ema'},
    {term:'RSI',name:'相對強弱指標',meaning:'觀察近期漲跌動能強弱的 0 至 100 指標。',article:'rsi'},
    {term:'MACD',name:'指數平滑異同移動平均線',meaning:'比較兩條 EMA 差距的趨勢動能指標。',article:'macd'},
    {term:'VRVP',name:'可視範圍成交量分布',meaning:'按圖表目前可視價格範圍呈現不同價位的成交量。',article:'vrvp'},
    {term:'POC',name:'最大成交量價位',meaning:'Point of Control，所選成交量分布範圍中成交量最高的價格。',article:'vrvp'},
    {term:'VAH / VAL',name:'價值區上下緣',meaning:'Value Area High / Low，成交量分布價值區的邊界。',article:'vrvp'},
    {term:'FVG',name:'公平價值缺口',meaning:'Fair Value Gap，常依三根 K 線之間的價位缺口定義。',article:'fvg'},
    {term:'OB',name:'訂單區塊',meaning:'Order Block，部分 SMC 流派標註重要推進前價格區域的方式。',article:'order-block'},
    {term:'SMC',name:'智慧資金概念',meaning:'Smart Money Concepts，一系列以結構及流動性解讀價格的方法。',article:'order-block'},
    {term:'BOS',name:'結構突破',meaning:'Break of Structure，常指順著主要方向突破關鍵結構點。',article:'bos-choch'},
    {term:'CHoCH',name:'結構性格轉變',meaning:'Change of Character，部分框架用來描述可能的方向轉換。',article:'bos-choch'},
    {term:'Sweep',name:'流動性掃蕩',meaning:'價格短暫越過明顯高低點的現象。',article:'liquidity-sweep'},
    {term:'OI',name:'未平倉量',meaning:'Open Interest，尚未結清的合約持倉總量。',article:'volume'},
    {term:'Funding',name:'資金費率',meaning:'永續合約多空之間可能定期收取或支付的費用。',article:'funding-rate'},
    {term:'Mark Price',name:'標記價格',meaning:'交易所用於風險與某些強平計算的參考價格。',article:'liquidation'},
    {term:'Isolated / Cross',name:'逐倉／全倉',meaning:'兩種不同的保證金管理方式，具體規則依交易所而異。',article:'margin-leverage'},
    {term:'R:R',name:'風險報酬比',meaning:'預計虧損與潛在獲利的相對比率。',article:'risk-reward'},
    {term:'CPI',name:'消費者物價指數',meaning:'衡量消費者所支付價格變動的指標之一。',article:'cpi-fed'},
    {term:'Fed / FOMC',name:'聯準會／聯邦公開市場委員會',meaning:'美國中央銀行與其貨幣政策決策機制的常見簡稱。',article:'cpi-fed'},
    {term:'DXY',name:'美元指數',meaning:'衡量美元相對一籃子主要貨幣的指數。',article:'dxy-yields'}
  ]
};
