import React, {useState, useRef, useMemo, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  SafeAreaView,
  Button
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const KeyboardView = () => {
  // Sample comments data
  const [comments, setComments] = useState([
    {id: 1, text: 'This is awesome!'},
    {id: 2, text: 'Love this!'},
    {id: 3, text: 'Great work!'},
  ]);
  
  const [newComment, setNewComment] = useState('');
  const bottomSheetRef = useRef(null);
  const textInputRef = useRef(null);
  const scrollViewRef = useRef(null);

  const snapPoints = useMemo(() => ['25%', '50%', '100%'], []);

  const handleOpenSheet = () => {
    bottomSheetRef.current?.expand();
    console.log("Butoton pressed")
  };

  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    
    const comment = { 
      id: comments.length + 1,
      text: newComment,
    };
    
    setComments([...comments, comment]);
    setNewComment('');
    
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({animated: true});
    }, 100);
  };

  const handleSheetChange = useCallback((index) => {
    if (index > 0) {
      setTimeout(() => {
        textInputRef.current?.focus();
      }, 300);
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {/* Main screen content */}
        <View style={styles.mainContent}>
          <Button title="Open Comments" onPress={handleOpenSheet} />
        </View>

        {/* Bottom Sheet */}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChange}
          enablePanDownToClose
          keyboardBehavior="interactive"
          keyboardBlurBehavior="restore">
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.sheetContent}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
            <ScrollView
              ref={scrollViewRef}
              style={styles.commentsContainer}
              contentContainerStyle={styles.commentsContent}
              keyboardShouldPersistTaps="handled">
              {comments.map(comment => (
                <View key={comment.id} style={styles.commentItem}>
                  <Text>{comment.text}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.inputContainer}>
              <TextInput
                ref={textInputRef}
                style={styles.input}
                value={newComment}
                onChangeText={setNewComment}
                placeholder="Write a comment..."
                multiline
                onSubmitEditing={handleAddComment}
                returnKeyType="send"
              />
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleAddComment}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
  },
  sheetContent: {
    flex: 1,
  },
  commentsContainer: {
    flex: 1,
  },
  commentsContent: {
    paddingBottom: 16,
  },
  commentItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    marginRight: 8,
  },
  sendButton: {
    padding: 8,
  },
  sendButtonText: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default KeyboardView;

