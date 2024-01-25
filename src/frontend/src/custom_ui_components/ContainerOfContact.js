import React from "react";
import PropTypes from "prop-types";
import SignInFirebase from "../views/SignInFirebase";
import Contact from "../views/Contact";

/**
 * Container component for the Account section.
 * Renders the SignInFirebase component if the user is not logged in,
 * otherwise renders the Contact component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.showLogInScreen - Flag to show the login screen.
 * @param {function} props.setShowLogInScreen - Function to set the showLogInScreen flag.
 * @param {Object} props.firebase - The Firebase object.
 * @param {function} props.setOpenSuccessfulLogInNotification - Function to open the successful login notification.
 * @param {function} props.openAuthErrorNotification - Function to open the authentication error notification.
 * @param {function} props.setOpenAuthErrorNotification - Function to set the openAuthErrorNotification flag.
 * @param {boolean} props.userIsLoggedIn - Flag indicating if the user is logged in.
 * @returns {JSX.Element} - The rendered component.
 */
export default function ContainerOfContact(props) {
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
                <Contact />
            )}
        </div>
    );
}

ContainerOfContact.propTypes = {
    showLogInScreen: PropTypes.bool.isRequired,
    setShowLogInScreen: PropTypes.func.isRequired,
    firebase: PropTypes.object.isRequired,
    setOpenSuccessfulLogInNotification: PropTypes.func.isRequired,
    openAuthErrorNotification: PropTypes.func.isRequired,
    setOpenAuthErrorNotification: PropTypes.func.isRequired,
    userIsLoggedIn: PropTypes.bool.isRequired,
};
