export default class Stats {

    /**
     * Return the sum of an array
     * @param arr
     */
    static sum = (arr: Array<number>): number => arr.reduce((a, b) => a + b, 0)

    /**
     * Calculate the mean of an array
     * @param arr 
     */
    static mean = (arr: Array<number>): number => {
        let sum = Stats.sum(arr)
        let n = arr.length
        return sum / n
    }


    /**
     * Calculate the variance of a sample population
     * 
     * s^2 | õ^2 = ∑(x - M)^2
     * 
     * @param arr
     */
    static variance = (arr: Array<number>): number => {
        let m = Stats.mean(arr)
        return Stats.sum(arr.map(i => Math.pow(i - m, 2)))
    }

    /**
     * Calculate the pooled variance of multiple samples
     * @param arr
     */
    static variance_pooled = (arr: Array<Array<number>>): number => {

        let k: number = arr.length // Number of sample groups
        
        var number_of_samples: number = 0
        var pooled_variance: number = 0

        for(let i = 0; i < arr.length; i++) {
            number_of_samples += arr[i].length
            pooled_variance += Stats.variance(arr[i])
        }

        let dof: number = number_of_samples - k // Degrees of freedom

        return pooled_variance / dof

    }

    /**
     * Calculate the standard deviation of a population
     * 
     * õ = √(1/N) * s^2
     * 
     * õ = resulting standard deviation
     * s^2 = variance of population
     * N = number of samples in population
     * 
     * @param arr 
     */
    static sd_population = (arr: Array<number>): number => {
        let N = arr.length
        let s = Stats.variance(arr)
        return Math.sqrt(s / N)
    }

    /**
     * Calculate pooled standard deviation of multiple samples
     *                    (n1 - 1)s1^2 + (n2 - 1)s2^2 + ... (nk - 1)sk^2
     * SD_pooled =  √ (----------------------------------------------------)
     *                              n1 + n2 + ... nk - k
     * 
     * n = number of samples within sample group
     * s = variance of sample group
     * k = number of sample groups
     * @param arr | 2D array
     */
    static sd_pooled = (arr: Array<Array<number>>): number => {

        // Get the number of sample groups
        let k: number = arr.length

        let var_pooled = 0
        let n_pooled = 0
        for(let i = 0; i < arr.length; i++) {

            let sd: number = Stats.sd_sample(arr[i])
            let n: number = arr[i].length

            var_pooled += (n - 1) * Math.pow(sd, 2)
            n_pooled += n

        }

        return Math.sqrt(var_pooled / (n_pooled - k))

    }

    /**
     * Calculate the standard deviation of a sample
     * @param arr 
     */
    static sd_sample = (arr: Array<number>): number => {
        let n = arr.length - 1 // DoF corrected (Bessel's Correction)
        let s = Stats.variance(arr)
        return Math.sqrt(s / n)
    }

    /**
     * Calculate the standard error of the mean of a sample
     * @param arr
     */
    static sem = (arr: Array<number>): number => {
        let o: number = Stats.sd_sample(arr) // Standard Deviation
        let n: number = arr.length // Number of samples
        return o / Math.sqrt(n)
    }

    /**
     * Independent samples ttest. Compares the means of two independent samples to give you a t value.
     * @param sample_1
     * @param sample_2
     * @returns { t, dof }
     */
    static ttest = (sample_1: Array<number>, sample_2: Array<number>): { t: number, dof: number } => {

        let m1: number = Stats.mean(sample_1)
        let m2: number = Stats.mean(sample_2)

        let s: number = Stats.variance_pooled([sample_1, sample_2])

        let n1: number = sample_1.length
        let n2: number = sample_2.length

        let t = (m1 - m2) / Math.sqrt((s / n1) + (s / n2))
        let dof = n1 + n2 - 2

        return { t, dof }

    }

}