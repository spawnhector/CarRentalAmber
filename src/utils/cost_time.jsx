import moment from 'moment';

export function numOfDays(startDate,endDate){
    let newstartDate = startDate.format('YYYY-MM-DD');
    let newendDate = endDate.format('YYYY-MM-DD');
    const start = new Date(newstartDate) //clone
        const end = new Date(newendDate) //clone
        let dayCount = 0

        while (end > start) {
            dayCount++
            start.setDate(start.getDate() + 1)
        }

        return dayCount
}

export function calculateCost(startDate,endDate,vehiclePrice){
    let newstartDate = startDate.format('YYYY-MM-DD');
    let newendDate = endDate.format('YYYY-MM-DD');
    if (newstartDate !== newendDate) {
        return numOfDays(startDate,endDate) * vehiclePrice
    }
    return vehiclePrice;
}
export function dateDiff(startDate,endDate){
    let newstartDate = startDate.format('YYYY-MM-DD');
    let newendDate = endDate.format('YYYY-MM-DD');
    if (newstartDate !== newendDate) {
        return `${moment(newstartDate).format('dddd MMMM YYYY')} - ${moment(newendDate).format('dddd MMMM YYYY')}`
    }
    return moment(newstartDate).format('dddd MMMM YYYY');
}
