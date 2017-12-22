export default function ($resource) {
    return $resource('/api/order/:orderId',
        null,
        {
            'update': { method:'PUT' }
        });
}