import { StyleSheet, Text, TouchableOpacity } from 'react-native';

function Button({bgColor = "#19918F", textColor = "#fff", text, marginTop = 0, marginBottom = 0}) {
    return (
        <TouchableOpacity style={{...styles.button, backgroundColor: bgColor,  marginTop: marginTop, marginBottom: marginBottom}}>
            <Text style={{...styles.buttonText, color: textColor}}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button