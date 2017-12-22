export default function ($resource) {
    return $resource('/api/shipper/:shipperId',
        null,
        {
            'update': { method:'PUT' }
        });
}