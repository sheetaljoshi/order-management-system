export default function ($resource) {
    return $resource('/api/customer/:customerId',
        null,
        {
            'update': { method:'PUT' }
        });
}