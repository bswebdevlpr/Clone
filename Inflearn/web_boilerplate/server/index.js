const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const config = require('./config/key')
const { User } = require('./models/User')
const { auth } = require('./middleware/auth')

const app = express()
const port = 4000

// application/x-www-form-urlencoded
// 위 형태의 데이터를 분석해서 가져올 수 있도록 함
app.use(bodyParser.urlencoded({extended: true}))

// application/json
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(config.mongoURI, 
    ).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/test', (req, res) => {
    res.send("CORS & axios test");
})

app.post('/api/users/register', (req, res) => {
    /*
    회원가입 할 때 필요한 정보들을 client에서 가져오면
    해당 정보들을 db에 넣어준다.
    */

    // req.body 형태로 가져올 수 있는 이유는 body-parser를 사용하기 때문이다.
    let user = new User(req.body); 

    user.save((err, user) => {
        if(err) return res.json({success: false, err});
        else return res.status(200).json({
            success: true,
            contents: req.body
        });
    });
})

app.post('/api/users/login', (req, res) => {
    // 요청된 이메일이 db에 있는지 search.
    // 객체를 생성한게 아닌 참조로써 User가 사용됨.
    User.findOne({email: req.body.email}, (err, user) => {
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "일치하는 이메일이 없습니다."
            })
        }
        // 요청된 이메일이 db에 있다면, 비밀번호가 일치하는지 check.
        // User.js; comparePassword(plainPassword, cb)
        // cb == (err, isMatch)
        // 이 부분 한번 더 봐야할듯. 잘 이해가 안가네.
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch)
                return res.json({loginSuccess: false, message: "Wrong Password!"});
        
            // 비밀번호가 일치하다면 token generate.
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                
                // token을 cookie name "x_auth"에 저장한다.
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({loginSuccess: true, userId: user._id})
            })
        })
    })
})

// end point에서 request를 받은 다음, middleware auth를 거침.
app.get('/api/users/auth', auth, (req, res) => {
    // So far, Authentication Success
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
        
        // isAdmin: req.user.role === 0 ? false : true,
        // isAuth: true,
        // ...req.user._doc
    });
})

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id}, 
        {token: ""},
        (err, user) => {
            if(err) return res.json({ success: false, err });
            else return res.status(200).send({ success: true });
        })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

