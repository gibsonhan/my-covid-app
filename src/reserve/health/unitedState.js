//TODO need to migrate to new CDC data
export const DATE = 'date'
export const DATE_CHECKED = "dateChecked"
export const DEATH = "death"
export const DEATH_INCREASE = "deathIncrease"
export const HASH = "hash"
export const HOSPITALIZED = "hospitalized"
export const HOSPITALIZED_CUMULATIVE = "hospitalizedCumulative"
export const HOSPITALIZED_CURR = "hospitalizedCurrently"
export const HOSPITALIZED_INCREASE = "hospitalizedIncrease"
export const IN_ICU_CUMULATIVE = "inIcuCumulative"
export const IN_ICU_CURR = "inIcuCurrently"
export const LAST_MOD = "lastModified"
export const NEG_TEST = "negative"
export const NEG_TEST_INCREASE = "negativeIncrease"
export const ON_VENT_CUMULATIVE = "onVentilatorCumulative"
export const ON_VENT_CURR = "onVentilatorCurrently"
export const PENDING = "pending"
export const DEPRE_POS_AND_NEG = "posNeg" //depreciated
export const POSITIVE = "positive"
export const POSITIVE_INCREASE = "positiveIncrease"
export const RECOVERED = "recovered"
export const NUM_STATE = "states"
export const DEPRE_TOTAL = "total"// depreciatede
export const TOTAL_RESULT = "totalTestResults"
export const TOTAL_RESULT_INCR = "totalTestResultsIncrease"

export default UnitedStateTitle = {
    [DATE]: 'Date',
    [HASH]: 'Hash',
    [DATE_CHECKED]: 'Date Checked',
    [DEATH]: 'Death',
    [DEATH_INCREASE]: 'Death Increase',
    [HOSPITALIZED]: 'Hospitalized',
    [HOSPITALIZED_CUMULATIVE]: 'Cumulative Hospitalized',
    [HOSPITALIZED_CURR]: 'Currently Hospitalized',
    [HOSPITALIZED_INCREASE]: 'Increase in Hospitalization',
    [IN_ICU_CUMULATIVE]: 'Cumulative People in ICU',
    [IN_ICU_CURR]: 'Currently in ICU',
    [LAST_MOD]: 'Last Date Data was Modified',
    [NEG_TEST]: 'Negative PCR Test',
    [NEG_TEST_INCREASE]: 'Increase in Negative PCR TEST',
    [ON_VENT_CUMULATIVE]: 'Cumulative people on Ventilator',
    [ON_VENT_CURR]: 'Currently on Ventilator',
    [PENDING]: 'Pending PCR Test',
    [DEPRE_POS_AND_NEG]: null,
    [POSITIVE]: 'Positive Cases',
    [POSITIVE_INCREASE]: 'Increase in Positive Cases',
    [RECOVERED]: 'Recovered',
    [NUM_STATE]: 'States',
    [DEPRE_TOTAL]: null,
    [TOTAL_RESULT]: 'Total Results',
    [TOTAL_RESULT_INCR]: 'Increase in Total Results'
}