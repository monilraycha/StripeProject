import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  GestureHandlerRootView,
  ScrollView,
  TextInput,
} from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';

const App = () => {
  const bottomSheetRef = useRef(null);

  const [comments, setComments] = useState([
    'This is awesome!',
    'Great job!',
    'Really useful post!',
  ]);
  const [inputText, setInputText] = useState('');

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleSend = () => {
    if (inputText.trim()) {
      setComments(prevComments => [...comments, inputText]);
      setInputText('');
    }
  };

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand(); // open bottom sheet
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {/* Primary scrollable screen */}
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.mainContentText}>Main Screen Content 📜</Text>

        {/* Button to open BottomSheet */}
        <TouchableOpacity style={styles.openButton} onPress={openBottomSheet}>
          <Text style={styles.buttonText}>Open Comments</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Sheet */}
      <BottomSheet
        // Adjusts the bottom sheet when keyboard is open
        ref={bottomSheetRef}
        index={-1} // Start closed
        snapPoints={['25%', '50%', '70%']}
        onChange={handleSheetChanges}
        enablePanDownToClose={true} // allows swipe down to close
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}
          enabled={true}>
          <BottomSheetScrollView
            contentContainerStyle={styles.bottomSheetContent}>
            {/* Render comments */}
            {comments.map((comment, index) => (
              <View key={index} style={styles.commentBox}>
                <Text>{comment}</Text>
              </View>
            ))}

            {/* Input and Send button inside the ScrollView */}
            <View style={styles.inputContainer}>
              <TextInput
                value={inputText}
                onChangeText={setInputText}
                placeholder="Type a comment..."
                style={styles.input}
                onFocus={() => bottomSheetRef.current?.expand()} // re-expand if needed
              />
              <Button title="Send" onPress={handleSend} />
            </View>
          </BottomSheetScrollView>
        </KeyboardAvoidingView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  mainContentText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  openButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomSheetContent: {
    padding: 20,
  },
  commentBox: {
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});

export default App;
