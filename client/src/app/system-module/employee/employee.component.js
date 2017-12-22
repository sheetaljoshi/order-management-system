export default {
    bindings: {
        employees: '<'
    },
    controller: Controller,
    template: require('./employee.component.html'),
}

function Controller(employeeService, $uibModal) {
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
           component: 'employeeCreate',
           size: 'lg'
       });

       modalInstance.result.then(
           (data) => {
               employeeService.save(data,
                   (response) => {
                       vm.alert = {
                           type: "success",
                           message: "Employee created!"
                       };

                       vm.employees.push(response);
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
   
   function update(employee) {
       const modalInstance = $uibModal.open({
           animation: false,
           component: 'employeeUpdate',
           size: 'lg'
       });
       modalInstance.employee = angular.copy(employee);

       modalInstance.result.then(
           (data) => {
               employeeService.update({employeeId: data.id}, data,
                   (response) => {
                       vm.alert = {
                           type: "success",
                           message: "Employee updated!"
                       };

                       const index = vm.employees.findIndex(item => item.id === data.id);
                       vm.employees[index] = data;
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

    function remove(employee) {
        employeeService.remove({employeeId: employee.id},
            (response) => {
                vm.alert = {
                    type: "success",
                    message: "Employee deleted!"
                };

                vm.employees = vm.employees.filter(item => item.id !== employee.id);
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