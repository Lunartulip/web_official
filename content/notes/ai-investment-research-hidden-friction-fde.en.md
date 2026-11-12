---
title: "The Hidden Friction in AI Investment Research: Why Systems Built by Top Analysts and FDE Teams Remain Fragile"
summary: "Even elite analyst–FDE teams lose fidelity in feedback translation and reuse. This note reconnects research questions, implementation and acceptance criteria."
publishedAt: 2026-11-12
category: AI Investment Research Systems
slug: ai-investment-research-hidden-friction-fde
notionId: 416dc518-7cf3-811d-9829-d3faeaaaec6e
sourceChannel: Lunartulip Lab website
sourceTitle: "The Hidden Friction in AI Investment Research: Why Systems Built by Top Analysts and FDE Teams Remain Fragile"
locale: en
---

> The key to integrating disciplines in AI investment research is translating market intuition into machine logic without loss.

When [Palantir's field practice](https://www.palantir.com/careers/) is mapped onto public-markets research, two commonly used dimensions—Delta, or engineering execution, and Echo, or domain insight—each present a formidable barrier. FDE teams make AI-enabled public-markets research work in practice, while analysts draw on years of market experience to provide research perspectives that can genuinely respond to market feedback. Buy-side institutions and sell-side teams in China and elsewhere widely regard this as the strongest available setup for applying AI to research and investment decisions. Yet a division of labour that appears reasonable does not mean its internal logic will work by default. The losses created by cross-disciplinary collaboration often lead people to overestimate how much progress this setup has actually made.

Over more than six months of working on-site with buy-side institutions to advance their research and AI systems, we have observed a recurring bottleneck. Consider a research question that requires continuous tracking. After multiple iterations, the workflow finally runs end to end and earns agreement from both engineering reviewers and the investment research team. When the next round of automated tracking begins, or when a similar capability is replicated across other verticals, how much of that capability can actually be reused without degrading its predictive power?

The greatest risk in AI investment research is not a failure to produce an analysis. It is that the analysis itself may not deliver enough of the commercial value the market requires. When an FDE engineer hears, "Please iterate once more toward a similar result," the analyst may believe the real message was, "Please understand the analytical framework and prior assumptions behind this judgement." Because their underlying professional modes of thought differ, the two sides do not share a common worldview or context for lossless translation across disciplines. Turning a portfolio manager's intuition and logic into machine language inevitably encounters discontinuities and must remain adaptable to complex market conditions. Both sides may be advancing the work in earnest, but a gap still separates one successful iteration from a reusable research capability.

As buy-side institutions have made substantive progress in applying AI to public-markets research over the past six months and begun setting more ambitious requirements, LunarTulip has worked with its partners to resolve practical mismatches between investment analysis and engineering implementation. Our aim is to become a rare, integrated Delta–Echo operator in quantitative fundamental research for public markets. For us, a solid record in investment research and public-markets practice, together with an exploration and understanding of how to direct AI and where its boundaries lie, makes it possible to close the loop ourselves. By using real problems in global technology stocks—our area of expertise—as acceptance criteria in reverse, we can define how a research question should be designed, improve our chances of receiving market feedback, control how the work is implemented, and ultimately deliver an auditable system that meets acceptance and governance requirements and adds genuine value to real decisions.

## Why feedback so easily causes directional drift and in-sample overfitting

Take a technology-stock research case. Once the workflow produces an analytical result, the analyst will raise questions or give specific feedback based on that result, much as they would when managing an intern or discussing work with a peer. This perspective often carries the experienced intuition of someone who has felt the market's consequences firsthand. On hearing the feedback, however, an FDE could make many different changes: retrieve additional relevant sources, adjust the prompts, add more detailed analysis to a particular section, or revise assumptions in the financial model and its calculations. The next version will probably come closer to what the analyst expected.

But the original problem has now been obscured by the iteration.

The issue is that identifying the value of a result and the direction for further improvement is still different from deciding how to embed that improvement in the system and what trade-offs to make. The proposed improvement may involve breaking down a specific solution path, selecting source inputs, or even choosing the [acceptance criteria](/notes/who-validates-ai-output). When the business side defines the task and the implementation team merely executes it, the project can fall into the trap of symbolism. When engineers design the system themselves after developing some domain understanding, they can instead fall into the blind spot of endless in-sample fitting. At an even more basic level, there is a great deal to unpack in deciding to what extent a result represents the most cost-effective increment to decision quality, and how that measure should be defined.

Data-science research has long examined this class of difficulty. Field studies of enterprise teams have found that turning business goals into implementable tasks requires specific choices about target variables, proxy metrics and success criteria. The same applies to "improving research quality." Does the immediate goal mean reducing information omissions, revising earnings assumptions, or improving a particular forecast? The underlying logic progresses step by step, with each objective pointing to a different kind of decision value and requiring corresponding evidence.

## Whether research capabilities remain reusable in new tasks

Iterating repeatedly around a case is a reasonable development method. What requires attention is that the development cases also shape what the system ultimately learns to please.

Even without changing model weights, adjustments to prompts, source retrieval and workflows can gradually adapt the system to the same set of known answers. Research on adaptive data analysis has demonstrated this risk: when later choices are continually influenced by earlier results from the same data, the independence of validation is weakened. [\[2\]](https://research.google/blog/the-reusable-holdout-preserving-validity-in-adaptive-data-analysis/) Applied to AI investment research, this raises a useful question: can the revised method handle new cases that were not part of the tuning process?

If the system is corrected once for underestimating the importance of a product structure, will it then overemphasise that factor for every company that follows? If the requirement is for "deeper analysis," will the report simply become longer while adding more explanations that lack evidence?

Investment research must also preserve room for disagreement and for changes in market style or market structure that can arrive at any time. Factual definitions can be checked. Judgements about the future should state their conditions, evidence and counterexamples. Analyst experience matters, but the system should also accommodate differing views that have evidential support. If every disagreement is revised into a conclusion that the reviewer agrees with, the research system's capacity for discovery may be weakened.

## Who is responsible for defining and evaluating the complete research question

Analysts can remain focused on industries, themes and companies, while engineering teams remain focused on reliable implementation. The two sides need to collaborate around the same research task and make clear who is responsible for the research judgement that runs through it. The key to the solution lies in defining the research question precisely, deciding the standards by which it will be accepted, and using objective comparisons to demonstrate genuine economic value instead of relying on a person's subjective assessment of whether the value threshold has been met.

In our view, a request such as "Help us research this industry" remains too broad. "When new operating evidence emerges, check whether the existing earnings assumptions should be revised and explain the basis for any change" is much closer to an implementable and testable task.

It requires the team to answer together: What information was available at the time? What kind of change is sufficient to justify revising the judgement? How should conflicting evidence be handled? Which step did this iteration affect? How will the team check next time whether it remains effective?

The task definition can change as exploration proceeds, but the reason for each change should be recorded. Only when every piece of feedback can be traced back to the same question does later work have a chance to inherit the results of what came before.

This responsibility also requires real time and decision-making authority. Some teams already recognise the problem but cannot change the acceptance process or how resources are allocated. Adding one person who understands technology or the industry will still only help when paired with a clear division of responsibilities.

## LunarTulip starts from its own investment research practice

LunarTulip Research focuses on global technology stocks and the AI value chain, combining fundamental analysis, quantitative research and [AlphaMap alternative data](/alphamap). We continue to build and use our own [Research Desk](/desk), where research questions, data organisation, method implementation and subsequent checks all take place in our daily work.

Being users of our own research output changes how we evaluate the system. Whenever we consider whether a new step is worth retaining, we ask whether it helps solve a specific research question. Whether an iteration should change the data, revise a calculation, re-examine an assumption or narrow the question must likewise be judged in the context of actual use.

AlphaMap organises maintainable industry relationships, company operating conditions and changes in those conditions into structured data. Research Desk provides the research setting in which that information can be used and checked. [Public research](/deep-dive), version histories and [result explanations](/authority-ledger) allow partners to evaluate our work further.

This provides a research and implementation foundation for external collaboration. Once the work enters another institution, it must still be tested against that institution's tasks, available materials and intended use. A functioning workflow, an improved research task and better predictive performance each require their own supporting evidence.

## Choosing the form of collaboration by task

If an institution needs ongoing access to relevant industry and company data, it can begin by evaluating AlphaMap's themes, fields and samples to determine whether the data can be incorporated into its existing research models or investment research agents.

For a clearly defined research task, LunarTulip can lead the development and application of a specialised research method within an agreed scope, connecting research design, data organisation, a reference implementation and acceptance requirements. The delivery scope is determined by the actual task.

For institutions that already have research and engineering teams in place, we can also deliver jointly. We take responsibility for framing the research question, designing the method and designing the evaluation of its effectiveness, working alongside domain experts and engineering partners to put it into practice. Each party retains its own professional responsibilities while sharing a sufficiently clear basis for the work.

Our focus is on what each investment of effort ultimately leaves behind for the next research task. This is a question worth asking at the start of a project and answering again after every iteration.

If your team is advancing AI investment research for technology stocks, we welcome a conversation with LunarTulip Research around a specific task. In your message, please describe your institution and role, the research question you are working on, and the single outcome that is hardest to evaluate. We will use that information to identify relevant AlphaMap data materials or the appropriate scope for a specialised collaboration.

## Research and collaboration

- [AlphaMap: public methodology research and data access](/alphamap)
- [Research Desk: product roadmap and anonymised interface](/desk)
- [Institutional collaboration scope and enquiries](/institutional-access)
- [chief@lunartuliplab.com](mailto:chief@lunartuliplab.com)

## References

1. [Palantir: the responsibilities of Echos, Deltas and Devs](https://www.palantir.com/careers/)
2. [Dwork et al. (2015), authors' overview of *The Reusable Holdout*](https://research.google/blog/the-reusable-holdout-preserving-validity-in-adaptive-data-analysis/)
