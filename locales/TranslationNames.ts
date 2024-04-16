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
      createField: {
        screenTitle: 'screens.AuthDriver.createField.screenTitle',
        submitButton: 'screens.AuthDriver.createField.submitButton',
        editSubmitButton: 'screens.AuthDriver.createField.editSubmitButton',
        editScreenTitle: 'screens.AuthDriver.createField.editScreenTitle',
        successMessage: 'screens.AuthDriver.createField.successMessage',
        gpsConnecting: 'screens.AuthDriver.createField.gpsConnecting',
        gpsAccess: 'screens.AuthDriver.createField.gpsAccess',
        gpsMoreInfo: 'screens.AuthDriver.createField.gpsMoreInfo',
        gpsError: 'screens.AuthDriver.createField.gpsError',
        serverError: 'screens.AuthDriver.createField.serverError',
        locationPolicyTitle:
          'screens.AuthDriver.createField.locationPolicyTitle',
        locationPolicyDescription:
          'screens.AuthDriver.createField.locationPolicyDescription',
        locationPolicyButton:
          'screens.AuthDriver.createField.locationPolicyButton',
      },
    },
    machineDesktopDriver: {
      addMachineScreen: {
        screenTitle:
          'screens.machineDesktopDriver.addMachineScreen.screenTitle',
        screenEditTitle:
          'screens.machineDesktopDriver.addMachineScreen.screenEditTitle',
        button: {
          creating:
            'screens.machineDesktopDriver.addMachineScreen.button.creating',
          save: 'screens.machineDesktopDriver.addMachineScreen.button.save',
        },
      },
      machinesDesktop: {
        title: 'screens.machineDesktopDriver.machinesDesktop.title',
        searchPlaceholder:
          'screens.machineDesktopDriver.machinesDesktop.searchPlaceholder',
        emptyList: 'screens.machineDesktopDriver.machinesDesktop.emptyList',
      },
    },
    machineDriver: {
      machineDetailsScreen: {
        screenBaseName:
          'screens.machineDriver.machineDetailsScreen.screenBaseName',
        entityAsACard: {
          topRightButtonName:
            'screens.machineDriver.machineDetailsScreen.entityAsACard.topRightButtonName',
          cardName:
            'screens.machineDriver.machineDetailsScreen.entityAsACard.cardName',
          names: {
            id: 'screens.machineDriver.machineDetailsScreen.entityAsACard.names.id',
            name: 'screens.machineDriver.machineDetailsScreen.entityAsACard.names.name',
            licensePlate:
              'screens.machineDriver.machineDetailsScreen.entityAsACard.names.licensePlate',
          },
        },
        deleteButton: 'screens.machineDriver.machineDetailsScreen.deleteButton',
        deleteAlertDescription:
          'screens.machineDriver.machineDetailsScreen.deleteAlertDescription',
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
      clientControlPanel: {
        title: 'screens.clientDriver.clientControlPanel.title',
        clientDataButton:
          'screens.clientDriver.clientControlPanel.clientDataButton',
        clientFieldsButton:
          'screens.clientDriver.clientControlPanel.clientFieldsButton',
        clientOrdersButton:
          'screens.clientDriver.clientControlPanel.clientOrdersButton',
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
        emptyList: 'screens.clientDesktopDriver.clientsDesktop.emptyList',
      },
    },
    orderDriver: {
      editOrder: {
        screenTitle: 'screens.orderDriver.editOrder.screenTitle',
        submitButton: 'screens.orderDriver.editOrder.submitButton',
      },
      orderDetails: {
        screenName: 'screens.orderDriver.orderDetails.screenName',
        taskListHeader: 'screens.orderDriver.orderDetails.taskListHeader',
        detailsCard: {
          cardName: 'screens.orderDriver.orderDetails.detailsCard.cardName',
          fields: {
            name: 'screens.orderDriver.orderDetails.detailsCard.fields.name',
            performanceDate:
              'screens.orderDriver.orderDetails.detailsCard.fields.performanceDate',
            creationDate:
              'screens.orderDriver.orderDetails.detailsCard.fields.creationDate',
            openedAt:
              'screens.orderDriver.orderDetails.detailsCard.fields.openedAt',
            pricePerUnit:
              'screens.orderDriver.orderDetails.detailsCard.fields.pricePerUnit',
          },
          topRightButtonName:
            'screens.orderDriver.orderDetails.detailsCard.topRightButtonName',
        },
        additionalInfo: 'screens.orderDriver.orderDetails.additionalInfo',
        clientCard: {
          cardName: 'screens.orderDriver.orderDetails.clientCard.cardName',
          topRightButtonName:
            'screens.orderDriver.orderDetails.clientCard.topRightButtonName',
          fields: {
            name: 'screens.orderDriver.orderDetails.clientCard.fields.name',
            surname:
              'screens.orderDriver.orderDetails.clientCard.fields.surname',
          },
        },
        tasksButton: 'screens.orderDriver.orderDetails.tasksButton',
      },
      createTask: {
        screenTitle: 'screens.orderDriver.createTask.screenTitle',
        screenSummaryTitle: 'screens.orderDriver.createTask.screenSummaryTitle',
        ha: 'screens.orderDriver.createTask.ha',
        submitButton: 'screens.orderDriver.createTask.submitButton',
        pendingStatus: 'screens.orderDriver.createTask.pendingStatus',
        selectWorkers: {
          stepSelectWorkers:
            'screens.orderDriver.createTask.selectWorkers.stepSelectWorkers',
          hintHeader: 'screens.orderDriver.createTask.selectWorkers.hintHeader',
          hintDescription:
            'screens.orderDriver.createTask.selectWorkers.hintDescription',
        },
        selectMachines: {
          stepSelectMachine:
            'screens.orderDriver.createTask.selectMachines.stepSelectMachine',
          hintHeader:
            'screens.orderDriver.createTask.selectMachines.hintHeader',
          hintDescription:
            'screens.orderDriver.createTask.selectMachines.hintDescription',
        },
        selectFields: {
          stepSelectFields:
            'screens.orderDriver.createTask.selectFields.stepSelectFields',
          hintHeader: 'screens.orderDriver.createTask.selectFields.hintHeader',
          hintDescription:
            'screens.orderDriver.createTask.selectFields.hintDescription',
          submitButton:
            'screens.orderDriver.createTask.selectFields.submitButton',
        },
        summary: {
          summaryCard: {
            fields: 'screens.orderDriver.createTask.summary.summaryCard.fields',
            workers:
              'screens.orderDriver.createTask.summary.summaryCard.workers',
            machines:
              'screens.orderDriver.createTask.summary.summaryCard.machines',
            type: 'screens.orderDriver.createTask.summary.summaryCard.type',
            totalArea:
              'screens.orderDriver.createTask.summary.summaryCard.totalArea',
          },
          typeSelector: {
            label: 'screens.orderDriver.createTask.summary.typeSelector.label',
            description:
              'screens.orderDriver.createTask.summary.typeSelector.description',
            creatingTasks:
              'screens.orderDriver.createTask.summary.typeSelector.creatingTasks',
          },
        },
        fieldSelectorEmptyList:
          'screens.orderDriver.createTask.fieldSelectorEmptyList',
        workerSelectorEmptyList:
          'screens.orderDriver.createTask.workerSelectorEmptyList',
        machineSelectorEmptyList:
          'screens.orderDriver.createTask.machineSelectorEmptyList',
      },
    },
    ordersDesktopDriver: {
      addOrder: {
        screenTitle: 'screens.ordersDesktopDriver.addOrder.screenTitle',
        submitButton: 'screens.ordersDesktopDriver.addOrder.submitButton',
        step1Communicat: 'screens.ordersDesktopDriver.addOrder.step1Communicat',
        step2Communicat: 'screens.ordersDesktopDriver.addOrder.step2Communicat',
        emptyList: 'screens.ordersDesktopDriver.addOrder.emptyList',
        createClientButton:
          'screens.ordersDesktopDriver.addOrder.createClientButton',
      },
      orderDesktop: {
        title: 'screens.ordersDesktopDriver.orderDesktop.title',
        searchPlaceholder:
          'screens.ordersDesktopDriver.orderDesktop.searchPlaceholder',
      },
    },
    ownerRootDriver: {
      workerAssignation: {
        qrCodeScanCommunication:
          'screens.ownerRootDriver.workerAssignation.qrCodeScanCommunication',
        qrCodeTimeOut:
          'screens.ownerRootDriver.workerAssignation.qrCodeTimeOut',
        connectionTimeout:
          'screens.ownerRootDriver.workerAssignation.connectionTimeout',
        error: 'screens.ownerRootDriver.workerAssignation.error',
        retryButton: 'screens.ownerRootDriver.workerAssignation.retryButton',
        welcomeText: 'screens.ownerRootDriver.workerAssignation.welcomeText',
        pendingStatus:
          'screens.ownerRootDriver.workerAssignation.pendingStatus',
      },
      workersDesktop: {
        title: 'screens.ownerRootDriver.workersDesktop.title',
        searchPlaceholder:
          'screens.ownerRootDriver.workersDesktop.searchPlaceholder',
        emptyList: 'screens.ownerRootDriver.workersDesktop.emptyList',
      },
      workerDetails: {
        personalData: 'screens.ownerRootDriver.workerDetails.personalData',
        address: 'screens.ownerRootDriver.workerDetails.address',
        status: 'screens.ownerRootDriver.workerDetails.status',
        position: 'screens.ownerRootDriver.workerDetails.Position',
        editButton: 'screens.ownerRootDriver.workerDetails.editButton',
        choose: 'screens.ownerRootDriver.workerDetails.choose',
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
    list: {
      cannotSelectMore: 'components.list.cannotSelectMore',
      cannotSelectMoreDescription:
        'components.list.cannotSelectMoreDescription',
    },
    taskInfoCard: {
      type: 'components.taskInfoCard.type',
      worker: 'components.taskInfoCard.worker',
      machine: 'components.taskInfoCard.machine',
      createdAt: 'components.taskInfoCard.createdAt',
      openedAt: 'components.taskInfoCard.openedAt',
      closedAt: 'components.taskInfoCard.closedAt',
      fieldArea: 'components.taskInfoCard.fieldArea',
      ha: 'components.taskInfoCard.ha',
      deleteButton: 'components.taskInfoCard.deleteButton',
    },
    fieldSelector: {
      subbmitButton: 'components.fieldSelector.title',
      searchPlaceholder: 'components.fieldSelector.searchPlaceholder',
    },
    workerSelector: {
      subbmitButton: 'components.workerSelector.title',
      searchPlaceholder: 'components.workerSelector.searchPlaceholder',
    },
    machineSelector: {
      subbmitButton: 'components.machineSelector.title',
      searchPlaceholder: 'components.machineSelector.searchPlaceholder',
    },
    clientsFieldsList: {
      searchPlaceholder: 'components.clientsFieldsList.searchPlaceholder',
    },
    buttonTamagui: {
      processing: 'components.buttonTamagui.processing',
    },
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
    CallAndMailPanel: {
      sign: 'components.CallAndMailPanel.sign',
    },
    universalList: {
      listEmptyText: 'components.universalList.listEmptyText',
      listLoadingText: 'components.universalList.listLoadingText',
    },
    toast: {
      clientsFetchErrorHeader: 'components.toast.clientsFetchErrorHeader',
      workerUpdateErrorHeader: 'components.toast.workerUpdateErrorHeader',
      clientsFetchErrorContext: 'components.toast.clientsFetchErrorContext',
      workerUpdateErrorContext: 'components.toast.workerUpdateErrorContext',
      openMapErrorHeader: 'components.toast.openMapErrorHeader',
      openMapErrorDescription: 'components.toast.openMapErrorDescription',
      cantDeleteFieldHeader: 'components.toast.cantDeleteFieldHeader',
      cantDeleteFieldDescription: 'components.toast.cantDeleteFieldDescription',
      cantCreateOrderHeader: 'components.toast.cantCreateOrderHeader',
      cantCreateOrderDescription: 'components.toast.cantCreateOrderDescription',
      canUpdateOrderHeader: 'components.toast.canUpdateOrderHeader',
      canUpdateOrderDescription: 'components.toast.canUpdateOrderDescription',
      cantAddMachine: 'components.toast.cantAddMachine',
      cantAddMachineDescription: 'components.toast.cantAddMachineDescription',
      cantUpdateMachine: 'components.toast.cantUpdateMachine',
      cantUpdateMachineDescription:
        'components.toast.cantUpdateMachineDescription',
      cantDeleteMachine: 'components.toast.cantDeleteMachine',
      cantDeleteMachineDescription:
        'components.toast.cantDeleteMachineDescription',
    },
    filedBottomSheet: {
      showOnMapButton: 'components.filedBottomSheet.showOnMapButton',
      editButton: 'components.filedBottomSheet.editButton',
      deleteButton: 'components.filedBottomSheet.deleteButton',
      addButton: 'components.filedBottomSheet.addButton',
      historyButton: 'components.filedBottomSheet.historyButton',
      address: 'components.filedBottomSheet.address',
      deleteFieldAlertTitle:
        'components.filedBottomSheet.deleteFieldAlertTitle',
      deleteFieldAlertDescription:
        'components.filedBottomSheet.deleteFieldAlertDescription',
      deleteFieldAlertDeleteButton:
        'components.filedBottomSheet.deleteFieldAlertDeleteButton',
      deleteFieldAlertCancelButton:
        'components.filedBottomSheet.deleteFieldAlertCancelButton',
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
      latitude: 'addressForm.formPlaceholder.latitude',
      longitude: 'addressForm.formPlaceholder.longitude',
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
      latitude: 'addressForm.validation.latitude',
      longitude: 'addressForm.validation.longitude',
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
  createFieldForm: {
    formPlaceholder: {
      nameLabel: 'createFieldForm.formPlaceholder.nameLabel',
      area: 'createFieldForm.formPlaceholder.area',
      polishSystemId: 'createFieldForm.formPlaceholder.polishSystemId',
    },
    validation: {
      nameLabel: 'createFieldForm.validation.nameLabel',
      polishSystemId: 'createFieldForm.validation.polishSystemId',
      polishSystemIdPattern: 'createFieldForm.validation.polishSystemIdPattern',
      area: 'createFieldForm.validation.area',
      validationAtLeast: 'createFieldForm.validation.validationAtLeast',
      validationMaximum: 'createFieldForm.validation.validationMaximum ',
      validationCharacters: 'createFieldForm.validation.validationCharacters',
      moreThan: 'createFieldForm.validation.moreThan',
      lessThan: 'createFieldForm.validation.lessThan',
    },
  },
  createOrderForm: {
    formPlaceholder: {
      name: 'createOrderForm.formPlaceholder.name',
      additionalInfo: 'createOrderForm.formPlaceholder.additionalInfo',
      performanceDate: 'createOrderForm.formPlaceholder.performanceDate',
      pricePerUnit: 'createOrderForm.formPlaceholder.pricePerUnit',
    },
    validation: {
      name: 'createOrderForm.validation.name',
      performanceDate: 'createOrderForm.validation.performanceDate',
    },
  },
  createMachineForm: {
    formPlaceholder: {
      name: 'createMachineForm.formPlaceholder.name',
      licensePlate: 'createMachineForm.formPlaceholder.licensePlate',
    },
    validation: {
      name: 'createMachineForm.validation.name',
      nameMinLength: 'createMachineForm.validation.nameMinLength',
      nameMaxLength: 'createMachineForm.validation.nameMaxLength',
      licensePlate: 'createMachineForm.validation.licensePlate',
      licensePlateMinLength:
        'createMachineForm.validation.licensePlateMinLength',
      licensePlateMaxLength:
        'createMachineForm.validation.licensePlateMaxLength',
    },
  },
};
