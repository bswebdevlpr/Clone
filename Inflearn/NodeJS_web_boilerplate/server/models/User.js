const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// saltRounds는 암호화 글자수?였던걸로 기억함.
const saltRounds = 10;


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        required: [true, "Name must be required."]
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

// mongoose의 pre method.
// Defines a pre hook for the model.
// 아래의 경우 Model.prototype.save method를 실행하기 전에 정의된 함수를 실행한다.
userSchema.pre('save', function(next) {
    let user = this;

    // 비밀번호 변경 요청이 있을 시 암호화 시킨 후 save method로 전달한다.
    // Document.prototype.isModified()
    if(user.isModified('password')){
        // salt를 이용해서 비밀번호를 암호화
        bcrypt.genSalt(saltRounds, function(err, salt){
            // 만약 에러가 발생하면 next 함수로 바로 이동.
            if(err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                else {
                    user.password = hash;
                    return next(null, user);
                }
            })
        });
    } else {
        next();
    }
   
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        // closure 개념인가?
        // 외부의 cb 변수에 err 혹은 null, isMatch를 넘겨줌
        if (err) return cb(err);
        else cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function(cb){
    const user = this;
    // jsonwebtoken module을 이용하여 user token 생성
    const token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.token = token;
    user.save((err, user) => {
        if (err) return cb(err);
        else cb(null, user);
    })

}

userSchema.statics.findByToken = function(token, cb){
    var user = this;
    // 토큰 decoding
    jwt.verify(token, 'secretToken', function(err, decoded){
        // 유저 아이디를 통해 유저를 찾은 다음
        // 클라이언트에서 가져온 token과 db에 보관된 토큰이 일치하는지 확인
        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            else cb(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema);

module.exports = { User }