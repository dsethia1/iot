import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ref, onValue } from "firebase/database";
import { rtdb } from "../firebase"; // adjust path if needed

export default function Index() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const dbRef = ref(rtdb, "esp32/data"); 
    const unsubscribe = onValue(dbRef, (snapshot) => {
      setData(snapshot.val());
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>ESP32 Sensor Data</Text>

      <Text style={{ marginTop: 20 }}>
        {data ? JSON.stringify(data, null, 2) : "Waiting for data..."}
      </Text>
    </View>
  );
}
