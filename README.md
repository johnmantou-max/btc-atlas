# BTC Atlas — BTC 交易知識庫

把零散的比特幣交易觀念整理成一個能查詢、閱讀、收藏，且能由 AI 持續維護的繁體中文網站。

BTC Atlas 專注於交易知識的結構化整理，提供清晰的學習路徑與可長期擴充的內容架構。

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
AGENTS.md                AI 專案規範與維護流程
README.md                專案介紹與使用說明
docs/index.html          網站頁面
docs/styles.css          網站樣式
docs/app.js              搜尋、切換頁面、收藏、進度功能
docs/data/articles.js    文章與學習路線等資料
tests/validate-data.cjs  資料完整性測試
```

[`AGENTS.md`](./AGENTS.md) 定義了網站目的、視覺風格、命名與資料格式、修改規則及驗收方式，方便持續維護。

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

## 未來要如何讓 AI 繼續擴充網站？

把 GitHub 專案交給能編輯檔案的 AI，並提出：

> 請先完整閱讀 `AGENTS.md` 和 `README.md`，了解 BTC Atlas 的目的、風格及驗收標準。我要新增「布林通道」的知識文章，請按照現有文章格式加入適當分類、術語字典和學習路線；保留所有既有功能，完成後執行資料驗證並說明修改哪些檔案。

AI 便能按照規則優先修改 `docs/data/articles.js`，讓新文章自動出現在分類與搜尋結果中，不需整個網站重做。
