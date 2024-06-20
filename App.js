import { Button, StyleSheet, View, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    solicitarPermissoes();
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowAlert: true,
      }),
    });

    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        //console.log(notification);
        console.log(notification.request.content.data);
      }
    );

    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.info("Usuário clicou na notificação");
        console.log(response.notification.request.content.data);
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  async function solicitarPermissoes() {
    if (Platform.OS === "ios" || Platform.Version >= 33) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Falha ao obter o token de push para notificação push!");
        return;
      }
    }
  }

  function agendarNotificacao() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Notificação local agendada",
        body: "Esse notificação foi agendada para daqui a 5 segundos",
        data: { usuario: "Fabrício", idade: 32 },
      },
      trigger: {
        seconds: 5,
      },
    });
  }

  return (
    <View style={styles.container}>
      <Button title="Agendar notificação" onPress={agendarNotificacao} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
