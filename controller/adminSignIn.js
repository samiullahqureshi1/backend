import jwt from 'jsonwebtoken';

const createToken = (user, res) => {
	const { id, email, name, } = user;
	const payload = {
		_id: id,
		email,
		name,
	};
	console.log(payload);
	// create a token
	jwt.sign({payload},process.env.SECRET_KEY,{expiresIn:"167d"},(err,token)=>{
        if(err){
            res.status(404).send('unable to generate')
        }else{
            res.status(201).json({
                token
            })
        }
    })
};

const adminSignin = (req, res, next) => {
	const { email, password } = req.body;
	if (email == 'adminsami999@gmail.com' && password == 'sami000') {
		const user = {
			id: '66a1060a05d23c4e4cb5e92a',
			email: 'adminsami999@gmail.com',
			name: 'Admin',
			
		};
		createToken(user, res);
	} else {
		res.status(400);
		next(new Error('Invalid email or Password'));
	}
};

export default adminSignin;
