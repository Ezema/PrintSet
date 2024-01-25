import SignInFirebase from "../views/SignInFirebase"
import UserPreviousOrders from "../views/UserPreviousOrders"
import React from "react";

/**
 * Container component for displaying previous orders.
 * @param {Object} props - The component props.
 * @param {boolean} props.showLogInScreen - Flag indicating whether to show the login screen.
 * @param {function} props.setShowLogInScreen - Function to set the flag for showing the login screen.
 * @param {Object} props.firebase - The Firebase instance.
 * @param {function} props.setOpenSuccessfulLogInNotification - Function to open the successful login notification.
 * @param {function} props.openAuthErrorNotification - Function to open the authentication error notification.
 * @param {function} props.setOpenAuthErrorNotification - Function to set the flag for opening the authentication error notification.
 * @param {boolean} props.userIsLoggedIn - Flag indicating whether the user is logged in.
 * @returns {JSX.Element} - The rendered component.
 */
export default function ContainerOfPreviousOrders(props) {
    const {
        showLogInScreen,
        setShowLogInScreen,
        firebase,
        setOpenSuccessfulLogInNotification,
        openAuthErrorNotification,
        setOpenAuthErrorNotification,
        userIsLoggedIn,
    } = props;

    const signInOptional = false;

    return (
        <div>
            {!userIsLoggedIn ? (
                <SignInFirebase
                    signInOptional={signInOptional}
                    firebase={firebase}
                    showLogInScreen={showLogInScreen}
                    setShowLogInScreen={setShowLogInScreen}
                    setOpenSuccessfulLogInNotification={setOpenSuccessfulLogInNotification}
                    openAuthErrorNotification={openAuthErrorNotification}
                    setOpenAuthErrorNotification={setOpenAuthErrorNotification}
                />
            ) : (
                <UserPreviousOrders firebase={firebase} />
            )}
        </div>
    );
}