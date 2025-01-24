// import mongoose from 'mongoose';

// const userSchema = mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//         },
//         isMFAactive :{
//             type: Boolean,
//             reqiured: false
//         },
//         twoFactorKey: {
//             type: String,
//         }
// } ,
// {
//     timestamps: true,
// });

// const User = mongoose.model("User", userSchema);
// export default User; 


import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

export default User;