"""Reproduce newly added arithmetic; retain model4.1 for device/HBM cohorts."""
from pathlib import Path
import json,csv
P=Path(__file__).resolve().parent
old=json.loads((P.parent/'v4/model/reference/v4_integrated_model.json').read_text())
g=old['interactive_grid']
def row(q):return next(x for x in g if x['facility_growth']==.25 and x['procurement_lookahead_quarters']==q and x['power_index']==1)
rows=[
['q4_revenue_increase',130-115.8,'USD_bn','Q4 midpoint minus Q3','50'],
['q4_revenue_qoq_pct',(130/115.8-1)*100,'percent','Q4 includes an extra week','50'],
['china_adjusted_q3_base',115.8-2.4,'USD_bn','Q3 total less China Hopper','50;52'],
['q4_vs_adjusted_base_pct',(130/(115.8-2.4)-1)*100,'percent','Scale comparison; Q4 extra week','50;52'],
['supply_commitments_increase',390-279,'USD_bn','Oct25 vs prior quarter-end','52'],
['supply_commitments_increase_pct',(390/279-1)*100,'percent','Multiyear dollar commitments','52'],
['crwv_cash_coverage_pct',5.638/23.558*100,'percent','9M operating cash/cash PP&E','3'],
['delayed_advance_amount',9*.2,'USD_bn','Explicit20% illustrative delay','5;assumption'],
['unreplaced_payment_amount',max(0,9*.2-1),'USD_bn','Illustrative 1bn substitute capital','assumption'],
['incremental_annual_interest',1*.01,'USD_bn','Illustrative1bn and100bp','assumption'],
['corz_crwv_contracted_share_pct',590/1120*100,'percent','Approx1120MW contracted denominator','6;7;49'],
['corz_crwv_billable_share_pct',485/590*100,'percent','Only590MW CoreWeave contract','6;7'],
['procurement_annual_gap_EB',row(4)['embedded_HBM_EB']-row(1)['embedded_HBM_EB'],'EB','2028 growth25%, midpower, common opening inventory','model4.1'],
['procurement_annual_gap_pct',(row(4)['embedded_HBM_EB']/row(1)['embedded_HBM_EB']-1)*100,'percent','1q to4q external procurement policy','model4.1'],
['pluggable_ports_growth_pct',(1.5*.7/.9-1)*100,'percent','Comparable delivered-port set; illustrative','assumption'],
['CPO_ports_growth_pct',(1.5*.3/.1-1)*100,'percent','Comparable delivered-port set; illustrative','assumption']]
with (P/'update_calculations.csv').open('w',newline='',encoding='utf-8-sig') as f:
 w=csv.writer(f);w.writerow(['metric','value','unit','definition','source']);w.writerows(rows)
assert round(rows[1][1],1)==12.3 and round(rows[3][1],1)==14.6
assert round(rows[-2][1],1)==16.7 and round(rows[-1][1],1)==350
assert round(rows[12][1],3)==2.354
print('PASS: 16 update calculations; frozen device/HBM model unchanged.')
