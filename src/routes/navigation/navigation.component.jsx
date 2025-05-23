import { Fragment, useContext } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/user/user.selector";
import { Outlet } from "react-router-dom"
import { CartContext } from "../../contexts/cart.context";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { NavigationContainer, LogoContainer, NavLinksContainer, NavLink } from "./navigation.styles";

const Navigation = () => {
    const  currentUser   = useSelector(userSelector);
    const { isCartOpen } = useContext(CartContext);

    return (
        <Fragment>
            <NavigationContainer >
                <LogoContainer to='/' >
                    <CrwnLogo className="logo" />
                </LogoContainer>
                <NavLinksContainer >
                    <NavLink to='/shop' >
                        SHOP
                    </NavLink>
                    {currentUser ? (
                        <NavLink as='span' onClick={signOutUser} >SIGN OUT</NavLink>
                    ) :
                        <NavLink to='/auth' >
                            SIGN IN
                        </NavLink>
                    }
                    <CartIcon />
                </NavLinksContainer>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
};

export default Navigation;