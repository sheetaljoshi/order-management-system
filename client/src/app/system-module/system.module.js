import angular from 'angular';
import ngResource from 'angular-resource';
import uiBootstrap from 'angular-ui-bootstrap';

import config from './system.config';
import system from './system.component';
import order from './order/order.component';
import orderView from './order/view/order-view.component';
import dateFormatter from './directives/date-formatter.directive';

import category from './category/category.component';
import categoryCreate from './category/create/category-create.component';
import categoryUpdate from './category/update/category-update.component';

import shipper from './shipper/shipper.component';
import shipperCreate from './shipper/create/shipper-create.component';
import shipperUpdate from './shipper/update/shipper-update.component';

import supplier from './supplier/supplier.component';
import supplierCreate from './supplier/create/supplier-create.component';
import supplierUpdate from './supplier/update/supplier-update.component';

import customer from './customer/customer.component';
import customerCreate from './customer/create/customer-create.component';
import customerUpdate from './customer/update/customer-update.component';

import product from './product/product.component';
import productCreate from './product/create/product-create.component';
import productUpdate from './product/update/product-update.component';

import employee from './employee/employee.component';
import employeeCreate from './employee/create/employee-create.component';
import employeeUpdate from './employee/update/employee-update.component';

import categoryService from './services/category.service';
import shipperService from './services/shipper.service';
import customerService from './services/customer.service';
import productService from './services/product.service';
import supplierService from './services/supplier.service';
import employeeService from './services/employee.service';
import orderService from './services/order.service';

export default angular.module('system', [ngResource, uiBootstrap])
    .config(config)
    .component('system', system)
    .component('order', order)
    .component('orderView', orderView)

    .component('category', category)
    .component('categoryCreate', categoryCreate)
    .component('categoryUpdate', categoryUpdate)

    .component('shipper', shipper)
    .component('shipperCreate', shipperCreate)
    .component('shipperUpdate', shipperUpdate)

    .component('supplier', supplier)
    .component('supplierCreate', supplierCreate)
    .component('supplierUpdate', supplierUpdate)

    .component('customer', customer)
    .component('customerCreate', customerCreate)
    .component('customerUpdate', customerUpdate)

    .component('product', product)
    .component('productCreate', productCreate)
    .component('productUpdate', productUpdate)

    .component('employee', employee)
    .component('employeeCreate', employeeCreate)
    .component('employeeUpdate', employeeUpdate)

    .factory('categoryService', categoryService)
    .factory('shipperService', shipperService)
    .factory('customerService', customerService)
    .factory('productService', productService)
    .factory('supplierService', supplierService)
    .factory('employeeService', employeeService)
    .factory('orderService', orderService)
    .directive('dateFormatter', dateFormatter)
    .name;