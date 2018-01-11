import moment from 'moment';
export class Utilities {
    public static ConvertToUTCDate(value: Date) {
        return moment.utc(value).format();
    }
}