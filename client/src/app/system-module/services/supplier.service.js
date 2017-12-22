export default function ($resource) {
    return $resource('/api/supplier/:supplierId',
        null,
        {
            'update': { method:'PUT' }
        });
}