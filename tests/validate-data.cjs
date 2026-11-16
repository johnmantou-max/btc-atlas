/* Run from the repository root: node tests/validate-data.cjs */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const file = path.join(__dirname, '..', 'docs', 'data', 'articles.js');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
const { categories, articles, roadmap, glossary } = context.window.BTC_ATLAS_DATA;

assert(categories.length > 0, '至少要有一個分類');
assert(articles.length > 0, '至少要有一篇文章');
assert(roadmap.length > 0, '至少要有一條學習路線');
const categoryIds = categories.map(category => category.id);
const articleIds = articles.map(article => article.id);
const unique = values => new Set(values).size === values.length;
assert(unique(categoryIds), '分類 ID 重複');
assert(unique(articleIds), '文章 ID 重複');
const tones = new Set(['orange', 'blue', 'green', 'purple', 'red', 'cyan', 'gray']);

for (const category of categories) {
  assert(/^[a-z]+(?:-[a-z]+)*$/.test(category.id), `分類 ID 不合法：${category.id}`);
  assert(category.label && category.icon && category.description, `分類缺少欄位：${category.id}`);
  assert(tones.has(category.tone), `分類色彩不合法：${category.id}`);
}

for (const article of articles) {
  assert(/^[a-z]+(?:-[a-z]+)*$/.test(article.id), `文章 ID 不合法：${article.id}`);
  assert(categoryIds.includes(article.category), `分類不存在：${article.id}`);
  for (const field of ['title','summary','concept','practice','pitfall']) {
    assert(typeof article[field] === 'string' && article[field].trim(), `${article.id} 缺少 ${field}`);
  }
  assert(['入門','進階'].includes(article.level), `${article.id} 的程度標記不合法`);
  assert(Number.isInteger(article.minutes) && article.minutes > 0, `${article.id} 閱讀時間不合法`);
  assert(Array.isArray(article.checklist) && article.checklist.length >= 2, `${article.id} 檢查清單不足`);
  assert(Array.isArray(article.sources), `${article.id} 缺少 sources 陣列`);
  for (const source of article.sources) {
    assert(source.label && /^https:\/\//.test(source.url), `${article.id} 外部參考來源不完整`);
  }
}

for (const stage of roadmap) {
  assert(stage.title && stage.description, '學習路線缺少標題或說明');
  assert(Array.isArray(stage.articleIds) && stage.articleIds.length, `學習路線缺少文章：${stage.title}`);
  assert(unique(stage.articleIds), `學習路線中出現重複文章：${stage.title}`);
  for (const id of stage.articleIds) assert(articleIds.includes(id), `學習路線引用不存在的文章：${id}`);
}

for (const item of glossary) {
  assert(item.term && item.name && item.meaning, `術語缺少欄位：${item.term}`);
  assert(articleIds.includes(item.article), `術語 ${item.term} 連到不存在的文章：${item.article}`);
}

console.log(`資料驗證通過：${categories.length} 個分類、${articles.length} 篇文章、${roadmap.length} 個學習階段、${glossary.length} 個術語。`);
