"""Reproduce the public calculations in AlphaMap Case 01 (2026-11-17).

Run with Python 3: python3 reproduce_calculations.py
No third-party packages or network access are required. Source observations,
periods, units, and URLs are in first_case_public_model.json beside this script.
The conditional debt schedule is not a company FCF or solvency forecast.
"""
from decimal import Decimal
from pathlib import Path
import json

base = Path(__file__).resolve().parent
source = json.loads((base / "first_case_public_model.json").read_text())
observations = {row["metric"]: Decimal(str(row["value"])) for row in source["data"]}
cfo = observations["CRWV_CFO"]
cash_ppe = observations["CRWV_cash_ppe"]
original = observations["CORZ_original_secured_notes_principal"] * 1000
rate = observations["CORZ_initial_annual_amortization_pct"] / 100
coupon_rate = observations["CORZ_annual_coupon_before_amortization"] / original
semiannual_principal = original * rate / 2
principal = original
rows = []

for year in range(2027, 2032):
    beginning = principal
    interest = Decimal(0)
    principal_paid = Decimal(0)
    for month in (5, 11):
        if year == 2031 and month == 11:
            continue
        interest += principal * coupon_rate / 2
        installment = Decimal(0)
        if (year, month) >= (2029, 11):
            installment = min(principal, semiannual_principal)
        if (year, month) == (2031, 5):
            installment = principal
        principal -= installment
        principal_paid += installment
    rows.append({
        "year": year,
        "beginning_principal_usdm": beginning,
        "cash_coupon_usdm": interest,
        "scheduled_principal_usdm": principal_paid,
        "cash_debt_service_usdm": interest + principal_paid,
        "ending_principal_usdm": principal,
    })

result = {
    "as_of": source["as_of"],
    "crwv_cash_investment_coverage_percent": cfo / cash_ppe * 100,
    "crwv_historical_investment_less_cfo_usdbn": cash_ppe - cfo,
    "crwv_change_in_cash_including_restricted_usdbn": (
        cfo + observations["CRWV_net_investing"] + observations["CRWV_net_financing"]
    ),
    "corz_crwv_contract_book_billing_percent_approximate": (
        observations["CORZ_CRWV_billing"] / observations["CORZ_CRWV_leased"] * 100
    ),
    "corz_crwv_not_yet_billing_mw_approximate": (
        observations["CORZ_CRWV_leased"] - observations["CORZ_CRWV_billing"]
    ),
    "initial_annual_principal_usdm": original * rate,
    "conditional_debt_schedule": rows,
    "conditional_schedule_assumptions": source["debt_cash_schedule"]["assumptions"],
    "credit_example": {
        "eligible_monthly_fee_usd": 100,
        "cash_receipt_at_full_50_percent_credit_usd": 50,
        "cash_receipt_after_credit_exhaustion_usd": 100,
        "basis": "Unchanged eligible fee; sufficient credit balance during credits; excludes power pass-through, costs, and debt service.",
    },
    "interpretation": [
        "The CRWV historical difference is not a current unfunded financing gap.",
        "Operating cash flow includes working-capital and customer-prepayment effects.",
        "CORZ billing covers only its CoreWeave contract book; it does not establish end-customer billing.",
        "November 2029 is a contingent assumed start; actual principal amortization depends on all relevant leases, exhausted credits, and contractual payment timing.",
        "The debt schedule assumes no refinancing, prepayment, additional notes, or amendment; 2031 includes maturity principal.",
    ],
}
print(json.dumps(result, ensure_ascii=False, indent=2, default=lambda x: float(x)))
