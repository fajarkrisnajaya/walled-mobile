import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';

const CustomModal = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text onPress={onClose} style={styles.backButtonText}>{"<"}</Text>
          <Text style={styles.headerText}>Terms and Conditions</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.modalText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Text>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
  },
  headerText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  backButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
  },
  scrollViewContent: {
    padding: 20,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'justify',
  },
});

export default CustomModal;