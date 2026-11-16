# BTC Atlas — BTC 交易知識庫

把零散的比特幣交易觀念整理成一個能查詢、閱讀、收藏，且能由 AI 持續維護的繁體中文網站。

> 本專案為課程練習及個人學習用途，非交易訊號、投資建議或即時行情服務。

## 專案簡介

BTC Atlas 提供七類交易知識：交易基礎、市場結構、技術指標、流動性與 SMC、永續合約、風控與紀律、總經與 BTC。

網站具備：

- 文章搜尋、分類篩選、收藏文章與未讀篩選。
- 文章閱讀視窗：定義、實際觀察方式、常見誤解、自我檢查。
- 八階段學習路線與進度顯示。
- 英文縮寫／中文說明的交易術語字典。
- 進度保存在瀏覽器 localStorage，無須註冊。
- 響應式深色版面，支援桌機與手機。

## 專案檔案

```text
AGENTS.md                AI 維護規則（本次作業的重點）
README.md                專案介紹與部署教學
docs/index.html          網站頁面
docs/styles.css          網站樣式
docs/app.js              搜尋、切換頁面、收藏、進度功能
docs/data/articles.js    文章與學習路線等資料
tests/validate-data.cjs  資料完整性測試
```

**最重要的檔案是 [`AGENTS.md`](./AGENTS.md)**：說明網站目的、風格、命名與資料格式、修改規則，以及 AI 怎麼確認任務完成。

## 如何在電腦開啟網站？

直接雙擊 `docs/index.html`，就可以瀏覽。全部主要功能使用瀏覽器原生能力，不需要安裝套件。

## 如何部署到 GitHub Pages？

1. 在 GitHub 建立新的 **Public repository**，建議名稱：`btc-atlas`。
2. 將這個專案的**所有檔案及資料夾**上傳到儲存庫根目錄。務必保留 `AGENTS.md` 和 `docs/` 結構。
3. 進入儲存庫 **Settings → Pages**。
4. 在 **Build and deployment** 的 **Source** 選擇 `Deploy from a branch`。
5. **Branch** 選 `main`，資料夾選 **`/docs`**，按下 **Save**。
6. 等待 GitHub Pages 顯示網站網址，通常為：

   `https://你的GitHub帳號.github.io/btc-atlas/`

7. 點開網址，確認首頁、文章閱讀與搜尋都正常。

> 注意：GitHub Pages 第一次發布通常需要一點時間。**請不要把示範網址當成已成功部署的網址；需以你的 GitHub 實際顯示結果為準。**

## 未來要如何讓 AI 繼續擴充網站？

把 GitHub 專案交給能編輯檔案的 AI，並提出：

> 請先完整閱讀 `AGENTS.md` 和 `README.md`，了解 BTC Atlas 的目的、風格及驗收標準。我要新增「布林通道」的知識文章，請按照現有文章格式加入適當分類、術語字典和學習路線；保留所有既有功能，完成後執行資料驗證並說明修改哪些檔案。

AI 便能按照規則優先修改 `docs/data/articles.js`，讓新文章自動出現在分類與搜尋結果中，不需整個網站重做。

## 如何自行檢查？

本專案不需安裝任何 npm 套件；如果電腦有 Node.js，在專案根目錄執行：

```bash
node tests/validate-data.cjs
node --check docs/app.js
node --check docs/data/articles.js
```

再手動測試：搜尋「RSI」、收藏文章、標記已閱讀、切換學習路線、刷新後確認進度，以及用手機檢查版面。

## 可直接用於課堂繳交的內容

**繳交標題範例**：`[學校] [學號] [系級] [姓名] BTC 交易知識庫`

1. **專案簡介**：BTC Atlas 是一個繁體中文 BTC 交易知識庫，整理 K 線、市場結構、技術指標、永續合約、風險管理與總經觀念，提供文章搜尋、收藏、學習路線及術語查詢。
2. **GitHub Repository 連結**：`https://github.com/[你的帳號]/btc-atlas`
3. **網頁連結**：`https://[你的帳號].github.io/btc-atlas/`
4. **AGENTS.md**：附上專案根目錄的 `AGENTS.md`（或貼 GitHub 上的檔案連結）。
5. **如何讓 AI 持續擴充**：AI 先讀 AGENTS.md，按照固定欄位在 `docs/data/articles.js` 新增文章；分類、搜尋與學習路線會讀取相同資料來源，完成後用測試確認資料與功能未破壞。

## 內容提醒

- 網站 K 線是**教學示意**，不連接即時報價。
- 所有投資市場概念、交易所規則都可能存在限制或變化，請以官方最新資料為準。
- 本專案不儲存任何交易所密鑰，也不會替使用者下單。
- 資料目前儲存在瀏覽器 localStorage，換裝置不會自動同步。
