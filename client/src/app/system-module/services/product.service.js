export default function ($resource) {
    return $resource('/api/product/:productId',
        null,
        {
            'update': { method:'PUT' }
        });
}