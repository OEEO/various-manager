import Vue from 'vue'
import {
  Button,
  Radio,
  RadioGroup,
  Form,
  FormItem,
  Upload,
  Input,
  InputNumber,
  Tabs,
  TabPane,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Carousel, // 幻灯片
  CarouselItem, // 幻灯片
  Badge, // 购物车上方显示数量
  Select,
  Option,
  Dialog,
  Message,
  Loading
} from 'element-ui'

Vue.use(Button)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Upload)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Badge)
Vue.use(Select)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
