const subscribedCompanyController = {
    duplicate: 'Bu isimde bir firma bulunmaktadır.',
    'not-found': 'Firma bulanamadı.',
    'validation-error.district': 'İlçe alanı en az 2 karakter uzunluğunda olmalıdır.',
    'validation-error.province': 'İl alanı en az 2 karakter uzunluğunda olmalıdır.',
    'validation-error.companyLong': 'Firma ismi alanı en az 2 karakter uzunluğunda olmalıdır.',
}

const loginService = {
    'authorization-required': 'Kullanıcı adı veya şifre yanlış.',
    'unauthorized.user-inactive': 'Kullanıcı inaktif',
    'unauthorized.user-disabled-provider': 'Hesabınız donduruldu.',
    'unauthorized.user-disabled-company': 'Hesabınız firmanız tarafından donduruldu.',
}

const adminUserController = {
    'validation-error.username': 'Geçersiz kullanıcı adı.',
    'validation-error.firstName': 'Geçersiz isim.',
    'validation-error.lastName': 'Geçersiz soyisim.',
    'validation-error.mail': 'Geçersiz e-mail.',
    'validation-error.authority': 'Geçersiz yetki.',
    'validation-error.status': 'Geçersiz durum.',
    'validation-error.passwordOld': 'Eski şifreniz hatalı.',
    'validation-error.password': 'Hatalı şifre.',
}

const adminReaderController = {
    'duplicate': 'Mac ID veya Reader Code daha önce kaydedilmiş.',
    'not-found': 'Cihaz bulanamadı.',
    'validation-error.macId': 'Geçersiz Mac ID.',
}

const readerController = {
    'duplicate': 'Bu isimde bir okuyucu bulunmaktadır.',
    'not-found': 'Cihaz bulanamadı.',
    'wrong-code': 'Okuyucu kodu veya anahtarı yanlış.',
    'validation-error.macId': 'Geçersiz Mac ID.',
    'validation-error.type': 'Geçersiz okuyucu tipi.',
    'already-registered': 'Cihaz daha önce kayıt edilmiş.'
}

const meterController = {
    'duplicate': 'Sayaç numarası veya adı daha önce kaydedilmiş.',
    'not-found': 'Sayaç bulanamadı.',
    'validation-error.groupId': 'Geçersiz grup.',
    'validation-error.queriesLength': 'Her bir periyot için sorgu sınırı 12.',
    'validation-error.meterReader': 'Geçersiz okuyucu.',
    'validation-error.meterType': 'Geçersiz sayaç modeli.',
    'validation-error.meterQuery': 'Geçersiz sayaç sorgusu.',
    'validation-error.confirmationText': 'Doğrulama yazısı eksik veya yanlış.',
    'not-updated': 'Kaydederken bir hata oluştu.',
}

const groupsController = {
    'duplicate': 'Bu isimde grup bulunmaktadır.',
    'not-found': 'Grup bulanamadı.',
    'validation-error.parent': 'Sadece en alt grubu silebilirsiniz.',
    'validation-error.name': 'Geçersiz grup adı. (min. 2)',
    'validation-error.type': 'Geçersiz grup tipi.',
}

const userController = {
    'duplicate': 'Kullanıcı adı kullanılmaktadır.',
    'validation-error.username': 'Geçersiz kullanıcı adı.',
    'validation-error.firstName': 'Geçersiz isim.',
    'validation-error.lastName': 'Geçersiz soyisim.',
    'validation-error.mail': 'Geçersiz e-mail.',
    'validation-error.authority': 'Geçersiz yetki.',
    'validation-error.status': 'Geçersiz durum.',
    'validation-error.password': 'Geçersiz şifre.',
    'validation-error.phone': 'Geçersiz telefon numarası.',
}


const feedPointController = {
    'duplicate': 'Besleme noktası bulunmaktadır.',
    'validation-error.name': 'Geçersiz isim.',
    'validation-error.city': 'Geçersiz şehir.',
    'validation-error.address': 'Geçersiz adres.'
}

module.exports = {
    loginService,
    subscribedCompanyController,
    adminUserController,
    adminReaderController,
    readerController,
    meterController,
    groupsController,
    userController,
    feedPointController
};