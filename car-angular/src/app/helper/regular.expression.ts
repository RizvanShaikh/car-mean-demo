export const validataion = {
    emailRegEx: /^[A-Za-z\d\.\_\-\+]{2,64}\@([A-Za-z\d\-\_]{1,256})\.[A-Za-z\d]+(.[A-Za-z\d]+)?$/,
    passwordRegEx: /^[a-zA-Z0-9-_\!\@\#\$\%\^&\*]{6,15}$/,
    phoneRegEx:/^[0-9]{10,12}$/,
    amount:/^\d{0,5}(\d\.\d?|\.\d)?\d?$/   ,
    imageSize: 4194304,  //4mb
    videoSize: 104857600, // 100mb
    MESSAGESLENGTH:25,
    nameRegEx: /^[a-z\sA-Z]+$/,
    nameNumericRegEx: /^[a-zA-Z][a-zA-Z\d]+$/,
    nameMinLength:2,   
    nameMaxLength:64,
}