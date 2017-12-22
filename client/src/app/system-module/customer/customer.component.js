export default {
    bindings: {
        customers: '<'
    },
    controller: Controller,
    template: require('./customer.component.html'),
}

function Controller(customerService, $uibModal) {
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
           component: 'customerCreate',
           size: 'lg'
       });

       modalInstance.result.then(
           (data) => {
               customerService.save(data,
                   (response) => {
                       vm.alert = {
                           type: "success",
                           message: "Customer created!"
                       };

                       vm.customers.push(response);
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
   
   function update(customer) {
       const modalInstance = $uibModal.open({
           animation: false,
           component: 'customerUpdate',
           size: 'lg'
       });
       modalInstance.customer = angular.copy(customer);

       modalInstance.result.then(
           (data) => {
               customerService.update({customerId: data.id}, data,
                   (response) => {
                       vm.alert = {
                           type: "success",
                           message: "Customer updated!"
                       };

                       const index = vm.customers.findIndex(item => item.id === data.id);
                       vm.customers[index] = data;
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

    function remove(customer) {
        customerService.remove({customerId: customer.id},
            (response) => {
                vm.alert = {
                    type: "success",
                    message: "Customer deleted!"
                };

                vm.customers = vm.customers.filter(item => item.id !== customer.id);
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