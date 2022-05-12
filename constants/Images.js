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
const noProduct = require("../assets/branding/no-product.png");

const Brands = [
  {text: 'COKE & FANTA',path: require('../assets/branding/coke.png'),tag:"All Coca-Cola"},
  {text: 'SLUSHY JACK`S',path: require('../assets/branding/slushjack.png'),tag:"All Slushy Jack"},
  {text: 'TANGO ICE BLAST',path: require('../assets/branding/tango.png'),tag:"All Tango Ice"},
  {text: 'FRUITINA',path: require('../assets/branding/fruitina.png'),tag:"All Frutina"},
  {text: 'QUENCH',path: require('../assets/branding/qunch.png'),tag:"All Quench"},
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

const Icons = {
  profile : require("../assets/setttingIcon/Profile.png"),
  address: require("../assets/setttingIcon/Address.png"),
  contactUs : require("../assets/setttingIcon/contact_us3x.png"),
  logout: require("../assets/setttingIcon/Logout.png"),
  profile: require("../assets/setttingIcon/Profile.png"),
  profiePic: require("../assets/setttingIcon/profile_image.png"),
  privacy : require("../assets/setttingIcon/Privacy.png"),
  condition : require("../assets/setttingIcon/Term_Condition.png"),
  back: require('../assets/setttingIcon/back_btn.png')
}

export{
  Brands,
  Categories,
  Favourites,
  homeLogo,
  addressLogo,
  Icons,
  noProduct
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
