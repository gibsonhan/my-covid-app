//TODO need to migrate to new CDC data
//https://dev.socrata.com/docs/endpoints.html#2.1
import { DEPRECIATED } from '../data/data'

export const CHECK_TIME_EST = 'checkTimeEt'
export const COMMERICAL = 'commercialScore'
export const DATA_QUALITY = 'dataQualityGrade'
export const DATE = 'date'
export const DATE_CHECKED = "dateChecked"
export const DATE_MODIFIED = "dateModified"
export const DEATH = "death"
export const DEATH_CONFIRMED = 'deathConfirmed'
export const DEATH_INCREASE = "deathIncrease"
export const DEATH_PROBABLE = 'deathProbable'
export const FIPS = 'fips'
export const GRADE = 'grade'
export const HASH = "hash"
export const HOSPITALIZED = "hospitalized"
export const HOSPITALIZED_CUMULATIVE = "hospitalizedCumulative"
export const HOSPITALIZED_CURR = "hospitalizedCurrently"
export const HOSPITALIZED_DISCHARGE = 'hospitalizedDischarged'
export const HOSPITALIZED_INCREASE = "hospitalizedIncrease"
export const IN_ICU_CUMULATIVE = "inIcuCumulative"
export const IN_ICU_CURR = "inIcuCurrently"
export const LAST_UPDATE = 'lastUpdateEt'
export const LATITUDE = "latitude"
export const LONGITUDE = 'longitude'
export const NEG_TEST = "negative"
export const NEG_TEST_INCREASE = "negativeIncrease"
export const NEG_REG_SCORE = 'negativeRegularScore'
export const NEG_TEST_ANTIBODY = 'negativeTestsAntibody'
export const NEG_TEST_PEOPLE_ANTIBODY = 'negativeTestsPeopleAntibody'
export const NEG_TEST_VIRAL = 'negativeTestsViral'
export const ON_VENT_CUMULATIVE = "onVentilatorCumulative"
export const ON_VENT_CURR = "onVentilatorCurrently"
export const PENDING = "pending"
export const POS_AND_NEG = "posNeg" //depreciated
export const POSITIVE = "positive"
export const POSITIVE_CASE_VIRAL = 'positiveCasesViral'
export const POSITIVE_INCREASE = "positiveIncrease"
export const POSITIVE_SCORE = 'positiveScore'
export const POSITIVE_TEST_ANTIBODY = 'positiveTestsAntibody'
export const POSITIVE_TEST_ANTIGEN = 'positiveTestsAntigen'
export const POSITIVE_TEST_PEOPLE_ANTIBODY = 'positiveTestsPeopleAntibody'
export const POSITIVE_TEST_PEOPLE_ANTIGEN = 'positiveTestsPeopleAntigen'
export const POSITIVE_TEST_VIRAL = 'positiveTestsViral'
export const PROBABLE_CASES = 'probableCases'
export const RECOVERED = "recovered"
export const SCORE = 'score'
export const STATE = 'state'
export const TOTAL = 'total'
export const TOTAL_TEST_ENCOUNTER_VIRAL = 'totalTestEncountersViral'
export const TOTAL_TEST_RESULT = 'totalTestResults'
export const TOTAL_TEST_RESULT_INCREASE = 'totalTestResults'
export const TOTAL_TEST_RESULT_SOURCE = 'totalTestResultsIncrease'
export const TOTAL_TEST_ANTIBODY = 'totalTestsAntibody'
export const TOTAL_TEST_ANTIGEN = 'totalTestsAntigen'
export const TOTAL_TEST_PEOPLE_ANTIBODY = 'totalTestsPeopleAntibody'
export const TOTAL_TEST_PEOPLE_ANTIGETN = 'totalTestsPeopleAntigen'
export const TOTAL_TEST_PEOPLE_VIRAL = 'totalTestsPeopleViral'
export const TOTAL_TEST_VIRAL = 'totalTestsViral'
export const TOTAL_RESULT = "totalTestResults"

export default StateTitle = {
    [CHECK_TIME_EST]: DEPRECIATED,
    [COMMERICAL]: DEPRECIATED,
    [DATA_QUALITY]: 'Quality of Data',
    [DATE]: 'date',
    [DATE_CHECKED]: DEPRECIATED,
    [DATE_MODIFIED]: DEPRECIATED,
    [DEATH]: "Probable and confirmed death",
    [DEATH_CONFIRMED]: 'Death comfired with COVID19',
    [DEATH_INCREASE]: 'Death increase',
    [DEATH_PROBABLE]: 'Probable death due to COVID19',
    [FIPS]: 'State Fip Code',
    [GRADE]: DEPRECIATED,
    [HASH]: DEPRECIATED,
    [HOSPITALIZED]: DEPRECIATED,
    [HOSPITALIZED_CUMULATIVE]: 'Total ever hospitalized',
    [HOSPITALIZED_CURR]: "Currently hospitalized",
    [HOSPITALIZED_DISCHARGE]: 'Total COVID19 patient discharged',
    [HOSPITALIZED_INCREASE]: "Increase in hospitalziation",
    [IN_ICU_CUMULATIVE]: "Total ever in ICU",
    [IN_ICU_CURR]: "Currently in ICU",
    [LAST_UPDATE]: 'Last update to Data',
    [LATITUDE]: "latitude",
    [LONGITUDE]: 'longitude',
    [NEG_TEST]: "Negative PCR TEST",
    [NEG_TEST_INCREASE]: DEPRECIATED,
    [NEG_REG_SCORE]: DEPRECIATED,
    [NEG_TEST_ANTIBODY]: 'Negative anti body test (specimens)',
    [NEG_TEST_PEOPLE_ANTIBODY]: 'Negative unique antibody test',
    [NEG_TEST_VIRAL]: 'Negative PCR Test (or speciment tested)',
    [ON_VENT_CUMULATIVE]: "Total ever on ventilation",
    [ON_VENT_CURR]: "Currently on ventilation ",
    [PENDING]: "Viral Test that are not completed",
    [POS_AND_NEG]: DEPRECIATED,
    [POSITIVE]: 'Confirmed + Probable COVID Cases',
    [POSITIVE_CASE_VIRAL]: 'Unique postive PCR or NAAT test',
    [POSITIVE_INCREASE]: "Increase in Confirm and Probable COVID Cases",
    [POSITIVE_SCORE]: DEPRECIATED,
    [POSITIVE_TEST_ANTIBODY]: 'Total positive antibody test (specimens)',
    [POSITIVE_TEST_ANTIGEN]: 'Total positive antigen test',
    [POSITIVE_TEST_PEOPLE_ANTIBODY]: 'Total positive unique antibody test',
    [POSITIVE_TEST_PEOPLE_ANTIGEN]: 'Total positive unique antigen test ',
    [POSITIVE_TEST_VIRAL]: 'Total positive PCR test ( or specimen tested) ',
    [PROBABLE_CASES]: 'Probable cases of COVID19',
    [RECOVERED]: 'Total recovered from COVID19',
    [SCORE]: DEPRECIATED,
    [STATE]: 'Name of State',
    [TOTAL]: DEPRECIATED,
    [TOTAL_TEST_ENCOUNTER_VIRAL]: 'Total PCR tested per day',
    [TOTAL_TEST_RESULT]: 'Total estiamte PCR testing',
    [TOTAL_TEST_RESULT_INCREASE]: 'Total estimate PCR testing today',
    [TOTAL_TEST_RESULT_SOURCE]: DEPRECIATED,
    [TOTAL_TEST_ANTIBODY]: 'Total completed antibody test',
    [TOTAL_TEST_ANTIGEN]: 'Total completed antigen test',
    [TOTAL_TEST_PEOPLE_ANTIBODY]: 'Total unique antibody test',
    [TOTAL_TEST_PEOPLE_ANTIGETN]: 'Total unique antigen test',
    [TOTAL_TEST_PEOPLE_VIRAL]: 'Total unique PCR test',
    [TOTAL_TEST_VIRAL]: 'Total PCR test',
    [TOTAL_RESULT]: "Total Tests",
}