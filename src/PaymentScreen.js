// import {StyleSheet, Text, View, Button, Alert, Keyboard} from 'react-native';
// import React, {useState} from 'react';
// import {CardField, useStripe, createToken , confirmPayment} from '@stripe/stripe-react-native';
// import ButtonComp from './Components/ButtonComp';
// import createPaymentIntent from './apis/stripeApis';

// const PaymentScreen = () => {
//   const {confirmPayment} = useStripe();
//   const [cardInfo, setcardInfo] = useState(null);

//   const fetchCardDetail = async cardDetail => {
//     if (cardDetail.complete) {
//       setcardInfo(cardDetail);
//       console.log('cardDetail ----', cardDetail);
//     } else {
//       setcardInfo(null);
//     }
//   };

//   const onDone = async () => {
//     let apiData = {
//       amount: 50000,
//       currency: "USD",
//     };

//     try {
//       const res = await createPaymentIntent(apiData);
//       console.log('Payment created successfully', res);

//       const { error, paymentIntent } = await confirmPayment(res.paymentIntent, {
//         paymentMethodType: 'Card',
//       });

//       if (error) {
//         console.log('Payment confirmation error', error);
//         Alert.alert('Payment Failed', error.message);
//       } else if (paymentIntent) {
//         console.log('Payment successful', paymentIntent);
//         Alert.alert('Payment Successful', 'Your payment was successful!');
//       }
//     } catch (error) {
//       console.log('Error in payment:', error.response?.data || error.message);
//       Alert.alert('Payment Failed', error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Payment Screen</Text>

//       <CardField
//         postalCodeEnabled={false}
//         placeholders={{
//           number: '4242 4242 4242 4242',
//         }}
//         cardStyle={styles.card}
//         style={styles.cardContainer}
//         onCardChange={cardDetails => {
//           fetchCardDetail(cardDetails);
//         }}
//         onFocus={focusedField => {
//           console.log('focusField', focusedField);
//         }}
//       />

//       {/* <Button onPress={handlePayPress} title="Pay" />  */}

//       <ButtonComp onPress={onDone} disabled={cardInfo === null} title="Pay" />
//     </View>
//   );
// };

// export default PaymentScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   card: {
//     backgroundColor: '#FFFFFF',
//     textColor: '#000000',
//     borderWidth: 1,
//     borderColor: '#000',
//     borderRadius: 8,
//   },
//   cardContainer: {
//     height: 50,
//     marginVertical: 30,
//   },
// });

import {
  StyleSheet,
  Text,
  View,
  Alert,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {CardField, useStripe} from '@stripe/stripe-react-native';
import ButtonComp from './Components/ButtonComp';
import createPaymentIntent from './apis/stripeApis';

const PaymentScreen = () => {
  const {confirmPayment} = useStripe();
  const [cardInfo, setCardInfo] = useState(null);
  const [amount, setAmount] = useState('500'); // default amount
  const [currency, setCurrency] = useState('INR'); // default currency
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);

  const fetchCardDetail = async cardDetail => {
    if (cardDetail.complete) {
      setCardInfo(cardDetail);
    } else {
      setCardInfo(null);
    }
  };

  const onPayPress = () => {
    setShowAmountModal(true);
  };

  const onProceedToCard = () => {
    setShowAmountModal(false);
    setShowCardModal(true);
  };

  const onDone = async () => {
    let apiData = {
      amount: parseInt(amount) * 100, // convert to paisa
      currency: currency,
    };

    try {
      const res = await createPaymentIntent(apiData);
      console.log('Payment created successfully', res);

      const {error, paymentIntent} = await confirmPayment(res.paymentIntent, {
        paymentMethodType: 'Card',
      });

      if (error) {
        console.log('Payment confirmation error', error);
        Alert.alert('Payment Failed', error.message);
      } else if (paymentIntent) {
        console.log('Payment successful', paymentIntent);
        Alert.alert('Payment Successful', 'Your payment was successful!');
      }
    } catch (error) {
      console.log('Error in payment:', error.response?.data || error.message);
      Alert.alert('Payment Failed', error.message);
    } finally {
      setShowCardModal(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Screen</Text>

      {/* Main Pay Button */}
      <ButtonComp onPress={onPayPress} text="Pay Now" />

      {/* Amount Modal */}
      <Modal visible={showAmountModal} animationType="slide" transparent={true}>
        <View style={styles.bottomModalContainer}>
          <View style={styles.bottomModalContent}>
            <Text style={styles.modalTitle}>Enter Amount</Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              style={styles.input}
              placeholder="Enter Amount"
            />

            <TouchableOpacity
              style={styles.proceedButton}
              onPress={onProceedToCard}>
              <Text style={styles.proceedButtonText}>Next</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowAmountModal(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Card Details Modal */}
      <Modal visible={showCardModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Card Details</Text>

            <CardField
              postalCodeEnabled={false}
              placeholders={{
                number: '4242 4242 4242 4242',
              }}
              cardStyle={styles.card}
              style={styles.cardContainer}
              onCardChange={fetchCardDetail}
            />
{/* 
            <ButtonComp
              onPress={onDone}
              disabled={cardInfo === null}
              text="Pay"
            /> */}

            <TouchableOpacity style={styles.proceedButton} onPress={onDone}>
              <Text style={styles.proceedButtonText}>Proceed</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowCardModal(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bottomModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)', // dim background
    marginBottom: 15,
  },  
  bottomModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  proceedButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
  },
  cardContainer: {
    height: 50,
    marginVertical: 20,
    width: '100%',
  },
  cancelText: {
    color: 'red',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5
  },
});
