import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import UploadImages from "../components/UploadImages";

const AddProductScreen = ({ navigation }) => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      name: "",
      description: "",
      images: [],
      variations: [{ name: "", price: "", stock: "", image: [] }],
    },
  });
  const [userData, setUserData] = useState(null);
  const [store, setStore] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        console.log('Retrieved Token:', token);

        const response = await axios.get('http://192.168.92.23:8000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        Alert.alert('Error', 'Failed to fetch user data.');
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchStore = async () => {
      if (userData) {
        try {
          const response = await fetch(`http://192.168.92.23:8000/api/stores/${userData.id}`);
          if (response.ok) {
            const data = await response.json();
            setStore(data);
          } else {
            Alert.alert('Error', 'Failed to fetch store data');
          }
        } catch (error) {
          Alert.alert('Error', 'Failed to fetch store data');
        }
      }
    };

    fetchStore();
  }, [userData]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variations",
  });

  const onSubmit = async (data) => {
    try {
      if (!userData || !store) {
        Alert.alert("Error", "User or store data is not available.");
        return;
      }

      const token = await AsyncStorage.getItem("auth_token");
      const formData = new FormData();
      formData.append('user_id', String(userData.id));
      formData.append('store_id', String(store.id)); // Include store_id
      formData.append("name", data.name);
      formData.append("description", data.description);

      data.images.forEach((image, index) => {
        formData.append(`images[${index}]`, {
          uri: image.uri,
          name: image.fileName || `image_${Date.now()}.jpg`,
          type: image.type || "image/jpeg",
        });
      });

      data.variations.forEach((variation, index) => {
        formData.append(`variations[${index}][name]`, variation.name);
        formData.append(`variations[${index}][price]`, variation.price);
        formData.append(`variations[${index}][stock]`, variation.stock);

        if (variation.image.length === 0) {
          throw new Error(`Variation ${index + 1} does not have an image.`);
        }

        variation.image.forEach((image, imgIndex) => {
          formData.append(`variations[${index}][image]`, {
            uri: image.uri,
            name: image.fileName || `variation_${index}_${imgIndex}_${Date.now()}.jpg`,
            type: image.type || "image/jpeg",
          });
        });
      });

      const response = await axios.post(
        "http://192.168.92.23:8000/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        Alert.alert("Success", "Product added successfully");
        navigation.navigate("Market");
      } else {
        Alert.alert("Error", "Something went wrong");
      }
    } catch (error) {
      console.error("Failed to add product:", error);
      if (error.response) {
        console.error("Server Error Data:", error.response.data);
      }
      Alert.alert("Error", "Failed to add product.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tambah Produk</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Nama Produk"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Deskripsi Produk"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <UploadImages
        name="images"
        control={control}
        label="Product Images"
        reqText="Required"
        error={watch("images") && watch("images").length === 0}
      />
      {fields.map((item, index) => (
        <View key={item.id} style={styles.variationContainer}>
          <Controller
            control={control}
            name={`variations[${index}].name`}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Variasi Nama Produk"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name={`variations[${index}].price`}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Harga"
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name={`variations[${index}].stock`}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Stok"
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <UploadImages
            name={`variations[${index}].image`}
            control={control}
            label="Variation Images"
            reqText="Required"
            error={watch(`variations[${index}].image`) && watch(`variations[${index}].image`).length === 0}
          />
          <TouchableOpacity
            style={[styles.button, styles.removeButton]}
            onPress={() => remove(index)}
          >
            <Text style={styles.buttonText}>Hapus Variasi Produk</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity
        style={[styles.button, styles.addButton]}
        onPress={() => append({ name: "", price: "", stock: "", image: [] })}
      >
        <Text style={styles.buttonText}>Tambah Variasi</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.submitButton]}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.buttonText}>Tambah Produk</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  variationContainer: {
    marginBottom: 20,
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  button: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#4CAF50",
  },
  removeButton: {
    backgroundColor: "#f44336",
  },
  submitButton: {
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AddProductScreen;
