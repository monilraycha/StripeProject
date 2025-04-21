import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const ButtonComp = ({text = 'DONE', onPress = () => {}, disabled = false}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
            ...styles.button,
            ...(disabled ? {backgroundColor: '#ccc'} : {backgroundColor: '#6200EE'}),
        }}
        onPress={onPress}
        disabled={disabled}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
    elevation: 2,
    shadowColor: '#000',
  },
  buttonText: {
    color: '#ffff',
    fontSize: 16,
  },
});
