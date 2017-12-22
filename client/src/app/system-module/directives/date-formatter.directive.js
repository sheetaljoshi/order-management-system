import moment from 'moment';

export default function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: (scope, element, attrs, ngModel) => {
            ngModel.$parsers.push(
                (data) => {
                    return moment(data).format('YYYY-MM-DD');
                }
            );

            ngModel.$formatters.push(
                (data) => {
                    return moment(data, 'YYYY-MM-DD').toDate();
                }
            );
        }
    };
}