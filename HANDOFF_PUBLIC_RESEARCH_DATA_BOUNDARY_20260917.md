# Handoff — Public Research Citation Layer / Licensed Data Boundary

**From**: Lunartulip Lab 官网（web_official）  
**To**: Fable（Research 主控）；Revenue 主控（Research Desk / Research API / Alternative Dataset）  
**Date**: 2026-09-17  
**状态**: 官网侧实现完成，待测试、发布  

## 1. 本次决定

官网继续承担 canonical research source 与 citation object。公开机器读入口只交付发现、引用和版本识别所需的元数据，不再直接交付完整 Research Object。

完整 Claim/Evidence Ledger、PIT 历史、版本差异、估值情景、证伪条件、状态流和可回测字段归入 Research API / Alternative Dataset 的许可范围。Research Desk 继续承接人读的持续研究。

公开文章仍可被搜索引擎和 AI Search 检索、摘要并带链接引用。批量提取、镜像、模型训练、数据库重建、转售和竞品 API 使用，需要书面许可。

## 2. 官网侧变更

### 公开入口

- `GET /research.json`
  - 定位：公开 DataCatalog 与 citation-metadata manifest。
  - 保留：对象 ID、slug、ticker、kind、版本、首次发布日期、as-of、更新时间、中英文标题/研究问题/摘要、canonical URL、许可与引用信息。
  - 移除：完整 claims、evidence、financialBridge、valuationScenarios、falsifiers、renderings、dataGaps 和版本差异正文。

- `GET /research/{slug}`
  - 定位：单对象的公开 Dataset 引用元数据。
  - 响应头：`X-Lunartulip-Access-Tier: public-citation-metadata`。
  - 不再返回内部完整 `researchObject`。

- `GET /llms-full.txt`
  - 定位：详细引用目录。
  - 只保留对象身份、日期、版本、研究问题、摘要和 canonical URL。
  - 不再逐条输出 claims、evidence 与 falsifiers。

- `GET /authority-ledger/data.json`
  - 继续公开聚合 KPI 与方法口径，定位为 `public-aggregate-proof`。
  - 不包含客户组合、逐客户数据或收费 Alternative Dataset。

- `GET /research-usage`
  - 公布搜索索引、有限摘要与带归因引用的允许范围。
  - 说明需要另行许可的批量和商业使用。

### Google Dataset 修复

所有公开 Dataset/DataCatalog 补齐 `name`、`description`、`creator`、`license`、`isAccessibleForFree` 与 `distribution`。许可指向稳定的 `/research-usage`，用于处理 Search Console 报告的必填及建议字段问题。

## 3. Research / Fable 后续动作

1. `content/research-objects/catalog.json` 继续作为官网构建期的权威研究源，不直接作为静态文件对外发布。
2. 每个对象至少维护中英文 title、question、standfirst；它们构成公开 citation metadata。
3. claims、evidence、估值情景、falsifiers 与 PIT 版本历史可以继续写入 catalog，官网公开映射不会自动泄露这些字段。
4. 新研究上线前检查 source URL，不得把 Desk 私有链接、workspace 路径或内部 handoff 信息写入公开渲染字段。
5. 如果未来希望公开单条 claim，应增加显式的 `publicClaims` 选择层，不能恢复 `...item` 或整对象序列化。

## 4. Revenue 主控后续动作

收费产品需要单独的数据面和权限面。建议先确认 entitlement matrix，再写 API。

### 产品分层

- Research Desk：人读界面、持续跟踪、研究更新和验证节点。
- Research API：按 coverage、字段、更新频率和内部用途授权机器读访问。
- Alternative Dataset：PIT 历史、事件/状态、因子候选、证据归属及约定的可回测字段。

### 首版必须具备

1. API key 或用户令牌认证；服务端校验产品、coverage、字段和有效期。
2. 按客户和 key 设置配额、并发限制、速率限制与最大导出量。
3. 记录 key、客户、时间、路径、字段、响应量和结果状态，日志不得写入原始密钥。
4. Dataset 下载使用短期签名 URL；永久对象地址不得公开。
5. 支持密钥轮换、立即吊销和泄漏处置。
6. 对批量导出加入客户/合同标识；条件允许时增加可追踪指纹。
7. WAF/Bot Management 处理路径枚举、异常数据中心流量和高频遍历。
8. 认证失败统一返回 401/403；限流返回 429；不要通过错误信息暴露 coverage 或字段存在性。
9. 许可、用途、留存、模型训练、再分发与衍生数据权利写入订单或合同。
10. Billing 只决定付费状态，数据服务仍需独立 entitlement 校验，不能以支付回调结果直接替代授权。

### 建议路由

- `/api/v1/research-objects`
- `/api/v1/research-objects/{id}`
- `/api/v1/research-events`
- `/api/v1/datasets/{dataset}/exports`

这些路由不得进入 sitemap、`llms.txt` 或公开 JSON-LD。认证隔离是安全边界；`robots.txt` 和 `noindex` 只能减少合规爬虫发现，不能承担访问控制。

## 5. 字段边界

### Public citation metadata

`id`, `slug`, `kind`, `tickers`, `publishedAt`, `asOf`, `modifiedAt`, `version`, bilingual title/question/abstract, canonical URLs, creator, license, citation format。

### Licensed Research API

完整 claims、evidence、source provenance、version diffs、financial bridge、valuation scenarios、falsifiers、data gaps、状态变化与更新流。

### Licensed Alternative Dataset

双方约定的 PIT 历史、事件表、状态表、因子候选、标签/结局、可回测口径、字段字典和数据质量记录。样本、历史范围和权利边界按合同定义。

## 6. 安全判断

公开 HTML 无法同时满足“任何人可读”和“绝对不可抓取”。官网侧通过减少机器读暴露，降低一键复制完整数据模型的风险。收费层仍需认证、授权、限流、审计和签名下载。

当前仓库没有公开的收费 API，也没有把完整 Alternative Dataset 放在 `public/`。上线后若出现新的机器读路由，必须先经过字段暴露检查。

## 7. 发布与验收

- `npm run validate:research`
- `npm run validate:authority`
- `npm run validate:notes`
- `npm test`
- 抽检 `/research.json` 与任一 `/research/{slug}`，确认没有 `claims`、`evidence`、`financialBridge`、`valuationScenarios`、`falsifiers` 或 `dataGaps`
- 抽检 `/llms-full.txt`，确认不再逐条输出 claim/evidence
- 验证 `/research-usage` 可访问且 canonical 正确
- 使用 Google Rich Results Test / Schema Markup Validator 检查 Dataset
- 部署后在 Google Search Console 点击“验证修复”

## 8. 变更影响

旧版公开 JSON 曾返回完整对象。本次收缩属于有意的 breaking change；若内部流程依赖旧公开端点，请迁移到受控的内部源或未来的 licensed API，不要要求官网恢复全量输出。

本文件记录产品与技术边界，不替代正式法律意见。对外许可和商业合同定稿前，Revenue 侧应完成法务复核。
