---
title: "P&L Is Not Experience: The Missing Decision-Attribution Layer After the Self-Driving Portfolio"
summary: "Once an autonomous portfolio can trade on its own, the binding constraint is credit assignment: the four layers that turn realised P&L into reusable investment experience."
publishedAt: 2026-08-19
category: Buy-Side Decision Systems
slug: decision-attribution-after-self-driving-portfolio
notionId: 3bedc518-7cf3-813e-8c66-ee21612bac8a
sourceChannel: Lunartulip Lab website
sourceTitle: "P&L Is Not Experience: The Missing Decision-Attribution Layer After the Self-Driving Portfolio"
locale: en
---

> **The core claim.** Once a self-driving portfolio can reach its own conclusions and transact against the market, what decides whether it improves is neither more backtesting nor unstructured "self-reflection." It is a rigorous layer of **credit assignment and learning governance** — the machinery that turns each round of realised P&L into reusable investment experience instead of overfitted noise.

The previous note in this series, on the autonomous portfolio as the real endpoint of AI-driven research, left one question open. Once a move has played out and the account has been marked, the system usually cannot say what it got right and what it got wrong.

Suppose an agent buys a basket of technology growth names and the book is up 25% a month later. If the only feedback reaching the system is a terminal `+25%`, what has it actually learned?

Usually: **almost nothing.**

Real markets do not behave like a supervised-learning dataset that hands over an answer key at the close. Nothing in that number tells the system how much came from the sector call, how much from the earnings-revision spread, how much was surrendered by entering two weeks early, whether the position was sized too lightly, or whether the whole result was sector beta and a momentum tailwind arriving together.

The market returns one cold number. **P&L is an outcome, not an explanation.**

This is the binding constraint as buy-side research systems move toward autonomy. Once a system can analyse, transact and even close a feedback loop, the next real moat is narrower and harder: **whose account should this P&L be charged to?**

## 1. Economic attribution: separating style exposure from genuine alpha

The first question in investing is always where the money came from.

In conventional multi-factor and quantitative risk frameworks, performance attribution — Barra-style decomposition and its descendants — is long-settled practice. In LLM and agentic research systems, that step has not become obsolete. It has become the first line of defence against a system that learns the wrong lesson.

Recent benchmark work makes the failure mode explicit. Under strict test conditions that isolate memorised history, most of the excess return produced by end-to-end trading agents can be explained by the broad market move and a handful of style exposures, and the evidence for genuine stock-selection alpha is extremely thin.

That exposes the most fundamental mislabelling risk in AI-driven investment learning.

1. **Mistaking beta for skill.** If an agent makes 20% because small-cap growth happened to dominate, and the system logs that as positive evidence that "the stock-selection logic works," what it amplifies in the next round is an unrecognised style exposure, not selection ability.
2. **Mistaking volatility for failure.** Run it the other way: a sound fundamental thesis holds up entirely, but a macro shock, a liquidity squeeze or a timing error produces a mark-to-market drawdown. If the system rules the logic invalid, it deletes an investment insight that was correct.

The first layer of attribution therefore has to be **economic attribution**: a strict decomposition of portfolio return into benchmark beta, sector momentum, style exposure, idiosyncratic alpha, timing gain or loss, position management and trading frictions.

## 2. Decision attribution: from return decomposition down to the action

Return decomposition, though, only answers what the return was made of. Even after confirming that a single name delivered idiosyncratic alpha, you still cannot say which specific decision created the value.

An outcome that looks like a win is often a composite of actions pulling in opposite directions:

- the earnings inflection was called correctly, but the catalyst mapping was wrong;
- the core thesis was entirely wrong, and the position made money on an unrelated event;
- the fundamental logic was excellent, and it came with a poor entry, a position that was too small, and profits taken far too early.

Letting the model produce free-form natural-language "post-mortems" after a loss tends to end in catastrophic strategy drift. **Being able to reflect is not the same as being able to learn.**

In markets that are both highly stochastic and non-stationary, vague reflection amounts to rewriting the whole strategy on the basis of an extremely noisy terminal P&L. The more volatile the tape, the more readily the model mistakes accidental noise for a hard-won lesson.

The way out is to push attribution down to **structured decision units**:

- **What gets revised must line up exactly with what gets attributed.** Investment logic has to be decomposed into traceable conditional rules, an explicit thesis, catalyst checkpoints, sizing rules and stop-loss or exit mechanics.
- **Locate the defect, then tune at rule level.** A single loss should not tear down the research framework. The system should look across many decision samples for the specific rule defects that recur, correct only those parameters or rules, and put the change through strict out-of-sample rolling forward validation — rolling it back without hesitation when validation fails.

What gets attributed varies by strategy type. Quantitative strategies attribute to factors, signals and risk constraints. Discretionary fundamental strategies attribute to theses, catalysts, position tiers and exit rules. In multi-agent research systems, the objects of attribution extend further, to analytical modules, information sources, research tools and reasoning paths.

## 3. Learning attribution and evolving permissions: allocating credit and bandwidth the way a buy-side team does

On a real buy-side team, the way a portfolio manager runs analysts and the book has never been to demolish an analyst's entire knowledge base after one bad call. It is to adjust trust weights continuously, in live conditions:

- knowing who reads cycle inflections best, and who tends to over-read policy-driven tape;
- knowing which channel checks carry genuine forward-looking content, and which high-frequency updates are market noise dressed up as information;
- allocating more research budget, decision bandwidth and portfolio weight, across different regimes, to the research lines with the better hit rate.

Multi-agent research systems should evolve along the same organisational logic. **The feedback loop is not only for fine-tuning an individual agent. It should also govern how much information-processing bandwidth and decision weight each agent gets next time.**

By tracking the realised historical usefulness of each research module and information source under live market conditions, the system can delegate dynamically by regime: more decision weight to modules with durable incremental value, fewer resources burned on modules that mostly produce noise.

## 4. Decision memory and governance: escaping the self-improvement paradox

Many designers of autonomous systems are drawn to letting the agent rewrite its own prompts or strategy code in response to past forecast errors. Practice has surfaced a serious **self-improvement paradox**.

Small prompt edits routinely trigger behavioural drift far larger than intended. That is worst precisely when markets are under extreme stress and the input data is noisiest: self-updates driven by recent short-horizon error tend to break the strategy at the exact moment robustness matters most.

A system that rewrites itself frequently is often just overfitting recent local price action at a higher frequency.

A mature autonomous investment system needs a learning loop with layered governance:

```text
Market outcome (P&L)
        ↓
Economic attribution
Separate benchmark beta, sector/style exposure, idiosyncratic alpha and trading costs
        ↓
Decision attribution
Trace through to thesis, timing, position management and exit actions
        ↓
Learning attribution
Decide whether to adjust rule parameters, factor weights, or agent permissions and bandwidth
        ↓
Validation
Out-of-sample rolling validation, challenger strategies in parallel, shadow-mode observation
        ↓
Decision memory
Record the full decision episode, with time decay and confidence governance
        ↓
Governed update
```

Inside that structure, the core asset is not a vast archive of research summaries or execution logs. It is a clean, reproducible **decision episode**:

1. **The ex-ante state.** The complete information slice available at the moment of decision, which is what rules out hindsight bias and after-the-fact rationalisation.
2. **Thesis and chain of reasoning.** The assumptions on which the expectation gap was built at the time.
3. **Action and constraints.** The position taken, the timing rules applied, the risk limits in force.
4. **Attribution result and confidence.** Which decision layer the realised P&L can actually be traced to, and how much confidence that attribution carries.
5. **Promotion status.** Whether the lesson has been validated well enough to qualify for the production environment.

This matters most in low-frequency fundamental investing, where a thesis may take months or longer to receive feedback, sample sizes are tiny, and the market regime has often already turned by the time the answer arrives. The system cannot reinforce hard on a single win or loss. It has to look for patterns that hold across cycles, apply a memory-decay mechanism, and mark a case as **unattributable** when the attribution is genuinely unclear.

**In an investment system, recording "unattributable" honestly is worth far more than one confidently wrong lesson.**

## What this means for the investment manager

The evolution of an AI-native buy-side system comes down to the portfolio manager moving up the stack — out of single-point analysis and execution, and into **learning governance**:

- setting the standard of evidence required before an underlying rule may be changed, and which strategies stay confined to shadow mode;
- deciding which classes of attribution may update weights automatically, and which must pass human review;
- specifying the macro and market-state conditions under which a lesson that once worked should decay, or be retired outright.

The technical watershed for an autonomous investment system was never simply whether it can complete trades on its own. It is whether, **after cycle upon cycle of market weather, the system can demonstrate clearly what it has actually learned.**

## Scope of this research

This note addresses architecture and methodology for AI-native investment systems. Work on self-evolving research systems, in industry and in academia alike, still rests largely on controlled benchmarks and simulated backtests; it is not equivalent to live managed performance across a full macro cycle, and the empirical findings cited here should be read against their own test conditions. The contribution intended here is mechanism-level insight into system architecture.

## Key references

1. Zhu, T. et al. (2026), [From Knowing to Doing: A Memory-Controlled Benchmark for LLM Trading Agents on Stock Markets](https://arxiv.org/abs/2605.28359), arXiv:2605.28359.
2. Chen, X. et al. (2026), [SHARP: A Self-Evolving Human-Auditable Rubric Policy for Financial Trading Agents](https://arxiv.org/abs/2605.06822), arXiv:2605.06822.
3. Sun, R. et al. (2026, v4), [ContestTrade: A Multi-Agent Trading System Based on Internal Contest Mechanism](https://arxiv.org/abs/2508.00554), arXiv:2508.00554.
4. Jiang, Y. et al. (2026), [Evaluating Investment Logic in Large Language Models: A Real-World Benchmark Towards Personalized Financial Agents](https://arxiv.org/abs/2608.06108), arXiv:2608.06108.
5. Bevza, I. (2026), *The Self-Driving Portfolio: Promise, Pitfalls, and the Practitioner Gap*, CFA Institute Research & Policy Center.
6. Ang, A., Azimbayev, N. & Kim, A. (2026), [The Self-Driving Portfolio: Agentic Architecture for Institutional Asset Management](https://arxiv.org/abs/2604.02279), arXiv:2604.02279.
