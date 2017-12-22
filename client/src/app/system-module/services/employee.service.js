export default function ($resource) {
    return $resource('/api/employee/:employeeId',
        null,
        {
            'update': { method:'PUT' }
        });
}