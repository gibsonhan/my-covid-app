import { formatISO } from 'date-fns'
import { DATE_CHECKED } from '../reserve/health/unitedState'

type dataType = {
    [key: string]: string
}

function isCountryDataFresh(data: dataType) {
    const localDataDate = data[DATE_CHECKED].slice(0, 10)
    const todayDate = formatISO(new Date()).slice(0, 10)
    return localDataDate === todayDate
}

export default isCountryDataFresh