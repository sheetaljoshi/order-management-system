export default function ($stateProvider) {
    $stateProvider
        .state('system', {
            url: "/system",
            component: 'system',
            abstract: true
        })
        .state('system.order', {
            url: '/order',
            component: 'order',
            resolve: {
                ordersData: (orderService) => {
                    return orderService.get().$promise;
                }
            }
        })
        .state('system.category', {
            url: '/category',
            component: 'category',
            resolve: {
                categories: (categoryService) => {
                    return categoryService.query().$promise;
                }
            }
        })
        .state('system.employee', {
            url: '/employee',
            component: 'employee',
            resolve: {
                employees: (employeeService) => {
                    return employeeService.query().$promise;
                }
            }
        })
        .state('system.shipper', {
            url: '/shipper',
            component: 'shipper',
            resolve: {
                shippers: (shipperService) => {
                    return shipperService.query().$promise;
                }
            }
        })
        .state('system.customer', {
            url: '/customer',
            component: 'customer',
            resolve: {
                customers: (customerService) => {
                    return customerService.query().$promise;
                }
            }
        })
        .state('system.supplier', {
            url: '/supplier',
            component: 'supplier',
            resolve: {
                suppliers: (supplierService) => {
                    return supplierService.query().$promise;
                }
            }
        })
        .state('system.product', {
            url: '/product',
            component: 'product',
            resolve: {
                products: (productService) => {
                    return productService.query().$promise;
                },
                categories: (categoryService) => {
                    return categoryService.query().$promise;
                },
                suppliers: (supplierService) => {
                    return supplierService.query().$promise;
                }
            }
        });
}

