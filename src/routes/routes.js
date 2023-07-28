import PlacedOrder from "../component/PlacedOrder";
import Settings from "../component/Settings";
import SignInForm from "../component/SignInForm";
import SignupForm from "../component/SignupForm";
import Checkout from "../pages/Checkout";


export const routes = [
    { path: '/signin', component: SignInForm, exact: true, auth: false },
    { path: '/signUp', component: SignupForm, exact: true, auth: false },
    { path: '/settings', component: Settings, exact: true, auth: true },
    { path: '/checkout', component: Checkout, exact: true, auth: true },
    { path: '/successOrder', component: PlacedOrder, exact: true, auth: true }


]

export default routes