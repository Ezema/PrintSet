import React, { useEffect, useState } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';
import Container from '@material-ui/core/Container';
import CustomMadeCircularProgressWithLabel from '../custom_ui_components/customMadeCircularProgressWIthLabel'
import { makeStyles } from '@material-ui/core/styles';
import UserOrderDTO from '../model/UserOrderDTO';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const useStyles = makeStyles({
  mainContainer: {
    width: '100%',
    maxWidth: '100%',
    minWidth: '100%',
  },
  containerForChildren: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    justifySelf: 'center',
  },
});

/**
 * Represents a component for handling payment gateway functionality.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.arrayWithAllFilesConfigSettings - The array containing file configuration settings.
 * @param {Object} props.statefulUserObject - The user object.
 * @param {Object} props.firebase - The Firebase object.
 * @returns {JSX.Element} The PaymentGateway component.
 */
const PaymentGateway = (props) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const classes = useStyles();
  const { arrayWithAllFilesConfigSettings, statefulUserObject, firebase } = props;

  useEffect(() => {
    handleUpload();
  }, []);

  async function handleUpload() {
    const stripe = await stripePromise;
    if (!stripe) {
      return;
    }

    if (arrayWithAllFilesConfigSettings.length === 0) {
      return;
    }

    let firebaseUserUid = null;
    if (firebase.auth().currentUser !== null) {
      firebaseUserUid = firebase.auth().currentUser.uid;
    }

    const formData = new FormData();
    let listOfOrders = [];

    arrayWithAllFilesConfigSettings.forEach((filePlusConfig, index) => {
      formData.append("file", filePlusConfig.rawFile);
      listOfOrders.push(new UserOrderDTO(filePlusConfig.numberOfCopies, filePlusConfig.doubleSided, filePlusConfig.printInColor, filePlusConfig.paperSize, filePlusConfig.paperWeight, filePlusConfig.paperOrientation, filePlusConfig.turnDoubleSidedPrintBy, filePlusConfig.pdfNumberOfPages, filePlusConfig.pricePerDocument));
    });

    formData.append("filePrintSettings", JSON.stringify(listOfOrders));
    formData.append("firebaseUserUid", firebaseUserUid.toString());

    let session;

    try {
      setUploadProgress(0);

      const response = await axios.post(process.env.REACT_APP_API_UPLOAD_FILES_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        },
      });

      session = response.data;

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.log("Error:", result.error);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return (
    <Container className={classes.mainContainer}>
      <div className={classes.containerForChildren}>
        <h1>Uploading Files</h1>
      </div>
      <div className={classes.containerForChildren}>
        <CustomMadeCircularProgressWithLabel progress={uploadProgress} />
      </div>
    </Container>
  );
}

export default PaymentGateway;
