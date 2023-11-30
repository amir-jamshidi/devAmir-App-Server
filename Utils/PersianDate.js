import moment from "jalali-moment";
const converToPersian = (date) => {
    const persian = moment(date.toISOString().slice(0, 10), 'YYYY-MM-DD').locale('fa').format('YY/MM/DD');
    return persian;
}

export default converToPersian