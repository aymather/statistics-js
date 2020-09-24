import Stats from './Stats'
import { placebo, caffine } from './data'
import { permutationTest } from 'simple-statistics'


// Mean
console.log(`Placebo mean: ${Stats.mean(placebo)}`)
console.log(`Caffine mean: ${Stats.mean(caffine)}`)

// Standard Deviation Sample
console.log(`Placebo SD: ${Stats.sd_sample(placebo)}`)
console.log(`Caffine SD: ${Stats.sd_sample(caffine)}`)

// SEM (Standard Error of the Mean)
console.log(`Placebo SEM: ${Stats.sem(placebo)}`)
console.log(`Caffine SEM: ${Stats.sem(caffine)}`)

// Variance
console.log(`Placebo variance: ${Stats.variance(placebo)}`)
console.log(`Caffine variance: ${Stats.variance(caffine)}`)
console.log(`Pooled variance: ${Stats.variance_pooled([placebo, caffine])}`)

// Results
const { t, dof } = Stats.ttest(placebo, caffine)
console.log(`T Value: ${t}`)
console.log(`Degrees of Freedom: ${dof}`)
console.log(`P Value: ${permutationTest(placebo, caffine)}`)

console.log(`
    \n
    From this data we can conclude that caffine does not have\n
    an effect of muscle metabolism. The reason for that lies in the\n
    p-value (0.0606). What this value means is that we are ~94% confident\n
    that our effect is happening. In order to reject our null hypothesis\n
    it is generally accepted that we need to be above 95% confident in our\n
    interaction. Now, that doesn't mean that our research should stop here though.\n
    Clearly our data is indicating that we are extremely close to being confident.\n
    It is still certainly possible that our effect is happening, but maybe we don't\n
    have a large enough sample size. We should calculate how much statistical power\n
    we have, in order to determine the number of samples necessary to be confident that\n
    sample size is not the issue. We could also calculate Cohen's D to observe the effect\n
    size. This statistic does not give us anything that is conclusive, however, effect\n
    size can be helpful to know as a piece of evidence for where to look next. For example,
    if the effect size is very large (0.8-1) then maybe we have a Type-1 error. But, if our\n
    effect size is very small (0.1-0.3) then we can probably just accept the null hypothesis.
`)