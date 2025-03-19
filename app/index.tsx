import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const Index = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [reps, setReps] = useState({ set1: "", set2: "", set3: "" });
  const [entries, setEntries] = useState<{ date: string; set1: string; set2: string; set3: string }[]>([]);

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleInputChange = (set: keyof typeof reps, value: string) => {
    setReps((prev) => ({ ...prev, [set]: value }));
  };

  const handleSave = () => {
    setEntries([...entries, { date: date.toDateString(), ...reps }]);
    setReps({ set1: "", set2: "", set3: "" });
  };

  return (
    <View style={styles.container}>
      <Button title="Select Date" onPress={() => setShowPicker(true)} />
      {showPicker && (
        <DateTimePicker value={date} mode="date" display="default" onChange={handleDateChange} />
      )}
      <Text style={styles.dateText}>Selected Date: {date.toDateString()}</Text>
      
      <View style={styles.tableHeader}>
        <Text style={styles.columnHeader}>Date</Text>
        <Text style={styles.columnHeader}>Set 1</Text>
        <Text style={styles.columnHeader}>Set 2</Text>
        <Text style={styles.columnHeader}>Set 3</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.cell}>{date.toDateString()}</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={reps.set1}
          onChangeText={(text) => handleInputChange("set1", text)}
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={reps.set2}
          onChangeText={(text) => handleInputChange("set2", text)}
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={reps.set3}
          onChangeText={(text) => handleInputChange("set3", text)}
        />
      </View>
      <Button title="Save Entry" onPress={handleSave} />

      <FlatList
        data={entries}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.cell}>{item.date}</Text>
            <Text style={styles.cell}>{item.set1}</Text>
            <Text style={styles.cell}>{item.set2}</Text>
            <Text style={styles.cell}>{item.set3}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  dateText: { fontSize: 16, marginVertical: 10 },
  tableHeader: { flexDirection: "row", backgroundColor: "#ddd", padding: 10 },
  columnHeader: { flex: 1, fontWeight: "bold", textAlign: "center" },
  tableRow: { flexDirection: "row", borderBottomWidth: 1, padding: 10 },
  cell: { flex: 1, textAlign: "center" },
  input: { flex: 1, borderWidth: 1, textAlign: "center", padding: 5 }
});

export default Index;

