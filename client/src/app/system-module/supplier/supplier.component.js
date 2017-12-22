export default {
    bindings: {
        suppliers: '<'
    },
    controller: Controller,
    template: require('./supplier.component.html'),
}

function Controller(supplierService, $uibModal) {
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
           component: 'supplierCreate',
           size: 'lg'
       });

       modalInstance.result.then(
           (data) => {
               supplierService.save(data,
                   (response) => {
                       vm.alert = {
                           type: "success",
                           message: "Supplier created!"
                       };

                       vm.suppliers.push(response);
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
   
   function update(supplier) {
       const modalInstance = $uibModal.open({
           animation: false,
           component: 'supplierUpdate',
           size: 'lg'
       });
       modalInstance.supplier = angular.copy(supplier);

       modalInstance.result.then(
           (data) => {
               supplierService.update({supplierId: data.id}, data,
                   (response) => {
                       vm.alert = {
                           type: "success",
                           message: "Supplier updated!"
                       };

                       const index = vm.suppliers.findIndex(item => item.id === data.id);
                       vm.suppliers[index] = data;
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

    function remove(supplier) {
        supplierService.remove({supplierId: supplier.id},
            (response) => {
                vm.alert = {
                    type: "success",
                    message: "Supplier deleted!"
                };

                vm.suppliers = vm.suppliers.filter(item => item.id !== supplier.id);
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