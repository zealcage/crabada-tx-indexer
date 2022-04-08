const subscribedCompanyController = {
    duplicate: 'Another company exists with the same name.',
    'not-found': 'Company not found.',
    'validation-error.district': 'Company district should be minimum 2 characters long.',
    'validation-error.province': 'Company province should be minimum 2 characters long.',
    'validation-error.companyLong': 'Company name should be minimum 2 characters long.'
}

const loginService = {
    'authorization-required': 'Username or password is wrong.',
    'unauthorized.user-inactive': 'User inactive.',
    'unauthorized.user-disabled-provider': 'Account disabled by Enersee.',
    'unauthorized.user-disabled-company': 'Account disabled by your company.',
}

const adminUserController = {
    'validation-error.username': 'Invalid username.',
    'validation-error.firstName': 'Invalid firstname.',
    'validation-error.lastName': 'Invalid lastname.',
    'validation-error.mail': 'Invalid e-mail.',
    'validation-error.authority': 'Invalid authority.',
    'validation-error.status': 'Invalid status.',
    'validation-error.passwordOld': 'Invalid old password.',
    'validation-error.password': 'Invalid password.',
}

const adminReaderController = {
    'duplicate': 'Mac ID or Reader Code already exists.',
    'not-found': 'Reader not found.',
    'validation-error.macId': 'Invalid Mac ID.',
}

const readerController = {
    'duplicate': 'Mac ID already exists.',
    'not-found': 'Reader not found.',
    'wrong-code': 'Reader code or key is wrong.',
    'validation-error.macId': 'Invalid Mac ID.',
    'validation-error.type': 'Invalid reader type.',
    'already-registered': 'Reader already registered.'
}

const meterController = {
    'duplicate': 'Meter already exists.',
    'not-found': 'Meter not found.',
    'validation-error.groupId': 'Invalid group.',
    'validation-error.queriesLength': 'The limit for the queries is 12.',
    'validation-error.meterReader': 'Invalid reader.',
    'validation-error.meterType': 'Invalid meter model.',
    'validation-error.meterQuery': 'Invalid meter query.',
    'validation-error.confirmationText': 'Invalid confirmation text.',
    'not-updated': 'Error occured while updating.',
}

const groupsController = {
    'duplicate': 'Duplicate group name.',
    'not-found': 'Group not found.',
    'validation-error.parent': 'Only leaf groups can be deleted.',
    'validation-error.name': 'Invalid group name. (min. 2)',
    'validation-error.type': 'Invalid group type.',
}

const userController = {
    'duplicate': 'Username already exists.',
    'validation-error.username': 'Invalid username.',
    'validation-error.firstName': 'Invalid firstname.',
    'validation-error.lastName': 'Invalid lastname.',
    'validation-error.mail': 'Invalid e-mail.',
    'validation-error.authority': 'Invalid authority.',
    'validation-error.status': 'Invalid status.',
    'validation-error.password': 'Invalid password.',
    'validation-error.phone': 'Invalid phone number.',
}

const feedPointController = {
    'duplicate': 'Feed point already exists.',
    'validation-error.name': 'Invalid name.',
    'validation-error.city': 'Invalid city.',
    'validation-error.address': 'Invalid address.'
}

module.exports = {
    loginService,
    subscribedCompanyController,
    adminUserController,
    adminReaderController,
    readerController,
    groupsController,
    meterController,
    userController,
    feedPointController
};