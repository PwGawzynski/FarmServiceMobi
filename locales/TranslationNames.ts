export const TranslationNames = {
  screens: {
    authDriver: {
      chooseLoginType: {
        header: 'screens.AuthDriver.chooseLoginType.header',
        email: 'screens.AuthDriver.chooseLoginType.email',
        google: 'screens.AuthDriver.chooseLoginType.google',
        registerButton: 'screens.AuthDriver.chooseLoginType.registerButton',
        registerText: 'screens.AuthDriver.chooseLoginType.registerText',
        instruction: 'screens.AuthDriver.chooseLoginType.instruction',
      },
      landing: {
        connecting: 'screens.AuthDriver.landing.connecting',
      },
      chooseRegisterType: {
        header: 'screens.AuthDriver.chooseRegisterType.header',
        email: 'screens.AuthDriver.chooseRegisterType.email',
        google: 'screens.AuthDriver.chooseRegisterType.google',
        instruction: 'screens.AuthDriver.chooseRegisterType.instruction',
      },
      loginByEmail: {
        header: 'screens.AuthDriver.loginByEmail.header',
        email: 'screens.AuthDriver.loginByEmail.email',
        password: 'screens.AuthDriver.loginByEmail.password',
        loginButton: 'screens.AuthDriver.loginByEmail.loginButton',
        registerText: 'screens.AuthDriver.loginByEmail.registerText',
        forgotPassword: 'screens.AuthDriver.loginByEmail.forgotPassword',
        emailValidationInvalid:
          'screens.AuthDriver.loginByEmail.emailValidationInvalid',
        emailValidationRequired:
          'screens.AuthDriver.loginByEmail.emailValidationRequired',
        emailValidationMinLength:
          'screens.AuthDriver.loginByEmail.emailValidationMinLength',
        emailValidationMaxLength:
          'screens.AuthDriver.loginByEmail.emailValidationMaxLength',
        passwordValidationRequired:
          'screens.AuthDriver.loginByEmail.passwordValidationRequired',
        passwordValidationMinLength:
          'screens.AuthDriver.loginByEmail.passwordValidationMinLength',
        passwordValidationMaxLength:
          'screens.AuthDriver.loginByEmail.passwordValidationMaxLength',
        charComplement:
          'screens.AuthDriver.loginByEmail.passwordValidationComplement',
        passwordValidationPattern:
          'screens.AuthDriver.loginByEmail.passwordValidationPattern',
        pendingStatus: 'screens.AuthDriver.loginByEmail.pendingStatus',
        resetPassword: 'screens.AuthDriver.loginByEmail.resetPassword',
        emailPlaceholder: 'screens.AuthDriver.loginByEmail.emailPlaceholder',
        passwordPlaceholder:
          'screens.AuthDriver.loginByEmail.passwordPlaceholder',
      },
      passwordReset: {
        instruction: 'screens.AuthDriver.passwordReset.instruction',
        header: 'screens.AuthDriver.passwordReset.header',
        button: 'screens.AuthDriver.passwordReset.button',
        pendingStatus: 'screens.AuthDriver.passwordReset.pendingStatus',
        afterSuccess: 'screens.AuthDriver.passwordReset.afterSuccess',
      },
      createCompany: {
        screenTitle: 'screens.AuthDriver.createCompany.screenTitle',
        submitButton: 'screens.AuthDriver.createCompany.submitButton',
        successMessage: 'screens.AuthDriver.createCompany.successMessage',
      },
    },
    clientDriver: {
      assignCompanyToClient: {
        screenTitle: 'screens.clientDriver.assignCompanyToClient.screenTitle',
        assignationSubmitButton:
          'screens.clientDriver.assignCompanyToClient.assignationSubmitButton',
        editSubmitButton:
          'screens.clientDriver.assignCompanyToClient.editSubmitButton',
        createSubmitButton:
          'screens.clientDriver.assignCompanyToClient.createButton',
        successMessageStart:
          'screens.clientDriver.assignCompanyToClient.successMessageStart',
        successMessageEnd:
          'screens.clientDriver.assignCompanyToClient.successMessageEnd',
        pendingStatus:
          'screens.clientDriver.assignCompanyToClient.pendingStatus',
      },
      clientDetails: {
        personalData: 'screens.clientDriver.clientDetails.personalData',
        address: 'screens.clientDriver.clientDetails.address',
        companyData: 'screens.clientDriver.clientDetails.companyData',
        companyAddress: 'screens.clientDriver.clientDetails.companyAddress',
        editButton: 'screens.clientDriver.clientDetails.editButton',
        assignCompanyButton:
          'screens.clientDriver.clientDetails.assignCompanyButton',
      },
    },
    clientDesktopDriver: {
      createClient: {
        screenTitle: 'screens.clientDesktopDriver.createClient.screenTitle',
        submitButton: 'screens.clientDesktopDriver.createClient.submitButton',
        editSubmitButton:
          'screens.clientDesktopDriver.createClient.editSubmitButton',
        successMessage:
          'screens.clientDesktopDriver.createClient.successMessage',
        alertTitle: 'screens.clientDesktopDriver.createClient.alertTitle',
        alertDescription:
          'screens.clientDesktopDriver.createClient.alertDescription',
        alertGoWithoutButton:
          'screens.clientDesktopDriver.createClient.alertGoWithoutButton',
        alertCreateButton:
          'screens.clientDesktopDriver.createClient.alertCreateButton',
        alertOnScreenBlurTitle:
          'screens.clientDesktopDriver.createClient.alertOnScreenBlurTitle',
        alertOnScreenBlurDescription:
          'screens.clientDesktopDriver.createClient.alertOnScreenBlurDescription',
        alertOnScreenBlurLeaveButton:
          'screens.clientDesktopDriver.createClient.alertOnScreenBlurLeaveButton',
        alertOnScreenBlurStayButton:
          'screens.clientDesktopDriver.createClient.alertOnScreenBlurStayButton',
        pendingStatus: 'screens.clientDesktopDriver.createClient.pendingStatus',
      },
      clientsDesktop: {
        title: 'screens.clientDesktopDriver.clientsDesktop.title',
        searchClient:
          'screens.clientDesktopDriver.clientsDesktop.searchPlaceholder',
      },
    },
  },
  serviceDefaults: {
    unauthorised: 'serviceDefaults.unauthorised',
    default: 'serviceDefaults.default',
  },
  userService: {
    errorMessages: {
      wrongCredentials: 'userService.errorMessages.wrongCredentials',
    },
  },
  components: {
    sendMail: {
      title: 'components.sendMail.title',
      cannotSendAlertTitle: 'components.sendMail.cannotSendAlertTitle',
      cannotSendAlertMessage: 'components.sendMail.cannotSendAlertMessage',
    },
    call: {
      title: 'components.call.title',
      cannotCallAlertTitle: 'components.call.cannotCallAlertTitle',
      cannotCallAlertMessage: 'components.call.cannotCallAlertMessage',
    },
    clientList: {
      listEmptyText: 'components.clientList.listEmptyText',
      listLoadingText: 'components.clientList.listLoadingText',
    },
    toast: {
      clientsFetchErrorHeader: 'components.toast.clientsFetchErrorHeader',
      clientsFetchErrorContext: 'components.toast.clientsFetchErrorContext',
    },
  },
  addressForm: {
    formPlaceholder: {
      street: 'addressForm.formPlaceholder.street',
      city: 'addressForm.formPlaceholder.city',
      postalCode: 'addressForm.formPlaceholder.postalCode',
      apartmentNumber: 'addressForm.formPlaceholder.apartmentNumber',
      houseNumber: 'addressForm.formPlaceholder.houseNumber',
      county: 'addressForm.formPlaceholder.county',
      country: 'addressForm.formPlaceholder.country',
      voivodeship: 'addressForm.formPlaceholder.voivodeship',
    },
    validation: {
      street: 'addressForm.validation.street',
      city: 'addressForm.validation.city',
      postalCode: 'addressForm.validation.postalCode',
      apartmentNumber: 'addressForm.validation.apartmentNumber',
      houseNumber: 'addressForm.validation.houseNumber',
      county: 'addressForm.validation.county',
      country: 'addressForm.validation.country',
      voivodeship: 'addressForm.validation.voivodeship',
      validationAtLeast: 'addressForm.validation.validationAtLeast',
      validationMaximum: 'addressForm.validation.validationMaximum',
      validationCharacters: 'addressForm.validation.validationCharacters',
    },
  },
  createCompanyForm: {
    formPlaceholder: {
      email: 'createCompanyForm.formPlaceholder.email',
      name: 'createCompanyForm.formPlaceholder.name',
      phoneNumber: 'createCompanyForm.formPlaceholder.phoneNumber',
      NIP: 'createCompanyForm.formPlaceholder.NIP',
    },
    validation: {
      email: 'createCompanyForm.validation.email',
      name: 'createCompanyForm.validation.name',
      phoneNumber: 'createCompanyForm.validation.phoneNumber',
      NIP: 'createCompanyForm.validation.NIP',
      validationAtLeast: 'createCompanyForm.validation.validationAtLeast',
      validationMaximum: 'createCompanyForm.validation.validationMaximum',
      validationCharacters: 'createCompanyForm.validation.validationCharacters',
    },
  },
  createClientForm: {
    formPlaceholder: {
      email: 'createClientForm.formPlaceholder.email',
      name: 'createClientForm.formPlaceholder.name',
      surname: 'createClientForm.formPlaceholder.surname',
      phoneNumber: 'createClientForm.formPlaceholder.phoneNumber',
      NIP: 'createClientForm.formPlaceholder.NIP',
    },
    validation: {
      email: 'createClientForm.validation.email',
      emailPattern: 'createClientForm.validation.emailPattern',
      name: 'createClientForm.validation.name',
      surname: 'createClientForm.validation.surname',
      phoneNumber: 'createClientForm.validation.phoneNumber',
      NIP: 'createClientForm.validation.NIP',
      validationAtLeast: 'createClientForm.validation.validationAtLeast',
      validationMaximum: 'createClientForm.validation.validationMaximum',
      validationCharacters: 'createClientForm.validation.validationCharacters',
    },
  },
};
