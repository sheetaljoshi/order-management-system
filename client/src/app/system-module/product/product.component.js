export default {
    bindings: {
        products: '<',
        categories: '<',
        suppliers: '<'
    },
    controller: Controller,
    template: require('./product.component.html'),
}

function Controller(productService, $uibModal) {
    const vm = this;

    vm.$onInit = onInit;
    vm.create = create;
    vm.update = update;
    vm.remove = remove;
    vm.closeMessage = closeMessage;

    function onInit() {
        vm.alert = null;
        vm.currentPage = 1;
        vm.itemsPerPage = 10;
    }
    
   function create() {
       const modalInstance = $uibModal.open({
           animation: false,
           component: 'productCreate',
           size: 'lg'
       });
       modalInstance.categories = vm.categories;
       modalInstance.suppliers = vm.suppliers;

       modalInstance.result.then(
           (data) => {
               productService.save(data,
                   (response) => {
                       vm.alert = {
                           type: "success",
                           message: "Product created!"
                       };

                       vm.products.push(response);
                   },
                   (error) => {
                       console.log(error);
                       vm.alert = {
                           type: "danger",
                           message: error.data.message
                       }
                   }
               );
           }, (error) => {
               console.log(error);
           }
       );
   }
   
   function update(product) {
       const modalInstance = $uibModal.open({
           animation: false,
           component: 'productUpdate',
           size: 'lg'
       });
       modalInstance.categories = vm.categories;
       modalInstance.suppliers = vm.suppliers;
       modalInstance.product = angular.copy(product);

       modalInstance.result.then(
           (data) => {
               productService.update({productId: data.id}, data,
                   (response) => {
                       vm.alert = {
                           type: "success",
                           message: "Product updated!"
                       };

                       const index = vm.products.findIndex(item => item.id === data.id);
                       vm.products[index] = data;
                   },
                   (error) => {
                       console.log(error);
                       vm.alert = {
                           type: "danger",
                           message: error.data.message
                       }
                   }
               );
           }, (error) => {
               console.log(error);
           }
       );
   }

    function remove(product) {
        productService.remove({productId: product.id},
            (response) => {
                vm.alert = {
                    type: "success",
                    message: "Product deleted!"
                };

                vm.products = vm.products.filter(item => item.id !== product.id);
            },
            (error) => {
                console.log(error);
                vm.alert = {
                    type: "danger",
                    message: error.data.message
                }
            }
        );
    }
    
    function closeMessage() {
        vm.alert = null;
    }
}