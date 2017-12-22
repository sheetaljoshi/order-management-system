export default function ($resource) {
    return $resource('/api/category/:categoryId',
        null,
        {
            'update': { method:'PUT' }
        });
}