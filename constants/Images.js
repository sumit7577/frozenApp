// local imgs
/*const Onboarding = require('../assets/imgs/getPro-bg-1.png');
const Logo = require('../assets/imgs/now-logo.png');
const ProfileBackground = require('../assets/imgs/bg5.png');
const RegisterBackground = require('../assets/imgs/register-bg.png');
const Pro = require('../assets/imgs/bg.png');
const NowLogo = require('../assets/imgs/now-logo.png');
const iOSLogo = require('../assets/imgs/ios.png');
const androidLogo = require('../assets/imgs/android.png');
const ProfilePicture = require('../assets/imgs/profile-img.jpg');
const CreativeTimLogo = require('../assets/imgs/creative-tim-white-slim2.png');
const InvisionLogo = require('../assets/imgs/invision-white-slim.png');

const Viewed = [
  require('../assets/imgs/project5.jpg'),
  require('../assets/imgs/project7.jpg'),
  require('../assets/imgs/project6.jpg'),
  require('../assets/imgs/project4.jpg'),
  require('../assets/imgs/project21.jpg'),
  require('../assets/imgs/project24.jpg')
];*/
const homeLogo = require("../assets/branding/homepage.png");
const addressLogo = require("../assets/branding/address.jpg");

const Brands = [
  {text: 'View article',path: require('../assets/imgs/demo.jpeg')},
  {text: 'View article',path: require('../assets/imgs/demo2.jpeg')},
  {text: 'View article',path: require('../assets/imgs/demo3.jpeg')},
  {text: 'View article',path: require('../assets/imgs/demo4.png')},
  {text: 'View article',path: require('../assets/imgs/demo5.png')},
]

const Categories=[
  { title: 'Shop', url: 'Shop', icon: 'shopping-cart' },
  { title: 'Sites', url: 'Sites', icon: 'cog' },
  { title: 'Account', url: 'Account', icon: 'user-circle' },
  { title: 'Help', url: 'Help', icon: 'life-ring' }

]
const Favourites = [
  {text: 'View article',path: require('../assets/imgs/demo.jpeg')},
  {text: 'View article',path: require('../assets/imgs/demo2.jpeg')},
  {text: 'View article',path: require('../assets/imgs/demo3.jpeg')},
  {text: 'View article',path: require('../assets/imgs/demo4.png')},
  {text: 'View article',path: require('../assets/imgs/demo5.png')},

]

export{
  Brands,
  Categories,
  Favourites,
  homeLogo,
  addressLogo
}

/*export default {
  Onboarding,
  Logo,
  ProfileBackground,
  ProfilePicture,
  RegisterBackground,
  Viewed,
  Pro,
  Products,
  NowLogo: NowLogo,
  iOSLogo,
  androidLogo,
  CreativeTimLogo,
  InvisionLogo,
  Products
};*/
