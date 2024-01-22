import { Toast } from "react-native-alert-notification"

export const customAlert = (title,message, type) => {
    Toast.show({
        type: type,
        title: title,
        textBody: message,
      })
}
