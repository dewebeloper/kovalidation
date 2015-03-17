
var UP = UP || {};

$(function () {
   function RegistrationVModel(model) {
      var self = this;

      self.userName = ko.observable(model.userName || '').extend({
         required: {
            message: 'Ovo polje je obavezno.'
         }
      });
      self.firstName = ko.observable(model.firstName || '').extend({
         required: {
            message: 'Ovo polje je obavezno.'
         }
      });
      self.lastName = ko.observable(model.lastName || '').extend({
         required: {
            message: 'Ovo polje je obavezno.'
         }
      });
      self.email = ko.observable(model.email || '').extend({
         required: {
            message: 'Ovo polje je obavezno.'
         }, email: { message: 'Format e-maila nije validan.' }
      });
      self.password = ko.observable(model.password || '').extend({
         required: {
            message: 'Ovo polje je obavezno.'
         }, minLength: { params: 5, message: 'Lozinka mora imati bar 5 karaktera.' }
      });
      self.repeatPassword = ko.observable(model.repeatPassword || '').extend({
         areSame: { params: self.password, message: "Lozinke se ne polapaju." }
      });


      self.validateModel = ko.validatedObservable({
         userName: self.userName,
         firstName: self.firstName,
         lastName: self.lastName,
         email: self.email,
         password: self.password,
         repeatPassword: self.repeatPassword
      });

   }

   ko.validation.rules['areSame'] = {
      getValue: function (o) {
         return (typeof o === 'function' ? o() : o);
      },
      validator: function (val, otherField) {
         return val === this.getValue(otherField);
      },
      message: 'The fields must have the same value'
   };
   ko.validation.registerExtenders();


   ko.validation.init({
      errorElementClass: 'has-error',
      errorMessageClass: 'help-block',
      decorateElement: true
   });

   UP.registration = function () {
      var _registration = ko.observable();

      var doregistration = function () {
         //console.log(ko.toJSON(_registration));
         toastr.success(ko.toJSON(_registration));

         //ajax call
      }

      var init = function () {
         var jsonData = { userName: 'dewebeloper', firstName: 'Djordje', lastName: 'Cvetkovic', email: 'dewebeloper@gmail.com' };
         var R = new RegistrationVModel(jsonData);

         _registration(R);

         var element = $('#registration-form')[0];
         //ko.cleanNode(element);
         ko.applyBindings(UP.registration, element);
      }


      return {
         init: init,
         _registration: _registration,
         doregistration: doregistration
      }
   }();

   UP.registration.init();
});
