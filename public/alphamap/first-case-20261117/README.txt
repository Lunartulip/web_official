LunarTulip Research 01 — 1.3.0 / model 4.1
NVIDIA换帅之后，AI产业链哪些增长预期需要重估？
研究截止：2026-11-17。研究对象：RO-ALPHAMAP-CASE-001。

一、可直接使用的表征
LunarTulip_Research_01_AI_Infrastructure.zh.pdf / .en.pdf：独立流通的中英文研究作品，首页直接交代问题、投资判断、AlphaMap关系证据与研究范围。
AlphaMap_First_Case_20261117.html：双语完整研究、8组主图、27个计算组合与模型/证据附录。
AlphaMap_First_Case_20261117.zh.html / .en.html：官网单语言canonical。
AlphaMap_First_Case_WeChat_20261117.html / .txt：公众号正文与PNG位置，原始来源同一账本。
AlphaMap_First_Case_LinkedIn_20261117.html：英文完整文章及feed导语。
AlphaMap_First_Case_LinkedIn_Article_20261117.txt / _Post_20261117.txt：可复制文本。
AlphaMap_First_Case_Editorial_Review_20261117.html：研究状态与冷审修订记录。

二、独立结果及范围
本次1.3.0恢复完整投资命题，扩展跨公司关系，新增CORZ公司敞口计算与独立双语研究PDF。模型4.1全部输入、参数与计算结果冻结不变；2.4EB仅保留为外生采购窗口条件差额，未识别为换帅或融资收缩的因果效应。
CORZ：当前托管收入100%来自CoreWeave；590/1,120约53%为未来签约容量份额，485/590约82%为CoreWeave组内已计费比例。377MW为AMD直租，152MW为另一客户租约且附AMD指定条件信用支持，1,925MW预约权排除。
2028 Top3初始有效HBM能力7.8348EB（工程情景5.8861—10.2845EB）。
同25%设施增长、中值功率、相同开仓、一季物理延迟下，1/2/4季采购前瞻对应设备内嵌HBM4.9575/5.2124/7.3111EB。
4季减1季的年度采购流量差2.3536EB；期末未安装HBM库存差4.4331EB，两者不能互换。
同一批需求设备的已识别配置变化约−2.8%；这不是全市场降幅或对外部30%的直接反驳。
供给能力、覆盖设备内嵌量、HBM原厂出货和收入分别处理；没有借用SemiAnalysis预测水平或降幅作输入。

三、复算
安装 assets/v4/model/requirements.txt 后运行：
python assets/v4/model/run.py
使用冻结公开输入，重算33个案例的165行年度结果，并核对设备、内存、面积、功率、库存与电量；无需数据库或API密钥。
图表：安装 assets/v4/requirements-charts.txt 后运行 assets/v4/build_v4_quant_charts.py。需要可用的Noto CJK字体，或通过 --font-dir 指定字体目录。
CSV：annual_results.csv、device_BOM_panel.csv、HBM_supply_supplier_generation.csv、interactive_grid.csv、corz_exposure_analysis.csv。
CORZ图：python assets/v4/build_corz_exposure.py；关系图：安装requirements-research-figures.txt及Graphviz后运行assets/v4/build_relationship_map.py。两者只读取公开输入。
assets/foundation 保存仍有效的现金/抵扣/债务模块；assets/project_reference 明确为之前项目样本与旧外部图表算术，不是新全球预测。

四、研究验收状态
条件投资研究：pass_after_atomic_edits；物理守恒及计算：通过。
完整全球最可能供需路径及对11月17日SemiAnalysis三项下修的裁决：research_incomplete。
全球采购行为、部分未来BOM和供应环节仍缺充分约束；外部新报告原稿/基数/功率范围未核实。
CFA/CQF为独立AI分析视角，不是外部持证人士审计。未验证做空alpha，未给出股票目标价。

五、发布状态
保留同一个官网草稿PR：https://github.com/Lunartulip/web_official/pull/2
拟中文canonical：https://lunartuliplab.com/alphamap/ai-infrastructure-cash-flow-first-case-2026-11
拟英文canonical：https://lunartuliplab.com/en/alphamap/ai-infrastructure-cash-flow-first-case-2026-11
下载链接指向拟官网路径，随官网发布生效。请解压整个包并保留assets目录：包内HTML共享同一份无损SVG/PNG，避免重复嵌入；单独交付的网页HTML仍为自包含版本。本包可离线阅读与复算；公众号与LinkedIn未自动发帖。

六、公开范围
本包只含研究正文、原创图表、公开来源衍生输入、明确假设与复算代码。
不含私有AlphaMap数据库导出、内部节点ID、连接凭证、企业邮箱、原始付费报告全文或skill安装归档。
workflow与skill通过Notion Skill Factory维护：https://app.notion.com/p/41bdc5187cf38165ae4dc1bd8135e40e
