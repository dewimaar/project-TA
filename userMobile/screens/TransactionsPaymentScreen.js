import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm, Controller } from "react-hook-form";
import UploadImages from "../components/UploadImages";
import { Picker } from "@react-native-picker/picker";
import { apiUrl } from "../constant/common";

const TransactionsPaymentScreen = ({ navigation, route }) => {
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      fullAddress: "",
      googleMapsLink: "",
      paymentMethod: "",
      images: [],
    },
  });
  const [userId, setUserId] = useState(null);
  const [banks, setBanks] = useState([]);
  const [selectedEkspedisi, setSelectedEkspedisi] = useState([]);
  const [store, setStore] = useState(null);
  const [shippingInfos, setShippingInfos] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [totalCost, setTotalCost] = useState(0);
  const [selectedItems, setSelectedItems] = useState(
    route.params.selectedItems || []
  );
  const setResetCartItems = route.params.setResetCartItems || [];
  const fetchUserId = async () => {
    try {
      const token = await AsyncStorage.getItem("auth_token");
      const response = await axios.get(`${apiUrl}api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = response.data;
      setUserId(userData.id);
      // Set the default values for the form fields
      setValue("fullAddress", userData.address || "");
      setValue("googleMapsLink", userData.google_maps_link || "");
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      Alert.alert("Error", "Failed to fetch user data.");
    }
  };
  const fetchBankData = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/metodeTransaksi`);
      setBanks(response.data);
    } catch (error) {
      console.error("Failed to fetch bank data:", error);
      Alert.alert("Error", "Failed to fetch bank data.");
    }
  };
  useEffect(() => {
      fetchUserId();
  }, []);
  useEffect(() => {
    const Refresh = navigation.addListener("focus", () => {
      fetchUserId();
      fetchBankData();
    });
    return Refresh;
  }, [navigation]);
  const renderBankOptions = () => {
    return banks.map((bank) => (
      <Picker.Item key={bank.id} label={bank.bank_name} value={bank} />
    ));
  };
  const renderShippingOptions = (shippingInfos) => {
    return shippingInfos.map((shipping) => (
      <Picker.Item
        key={shipping.id}
        label={shipping.shipping_name}
        value={shipping}
      />
    ));
  };
  const onBankChange = (itemValue) => {
    setSelectedBank(itemValue);
    setValue("paymentMethod", itemValue.bank_name);
  };
  const onShippingChange = (itemValue, itemIndex) => {
    const updatedItems = [...selectedItems];
    updatedItems[itemIndex] = {
      ...updatedItems[itemIndex],
      selectedShipping: itemValue,
    };
    setSelectedItems(updatedItems);
    setTotalCost(
      updatedItems.reduce(
        (total, item) =>
          total +
          item.produk.reduce(
            (itemTotal, produk) => itemTotal + Number(produk.total_price),
            0
          ) +
          Number(item.selectedShipping?.shipping_cost || 0),
        0
      )
    );
  };
  const confirmCheckout = async (data) => {
    if (!userId) {
      Alert.alert("Error", "User ID not available.");
      return;
    }

    if (!selectedBank) {
      Alert.alert("Error", "Please select a bank.");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", userId);
    selectedItems.forEach((item, indexs) => {
      item.produk.forEach((itemp, index) => {
        console.log(`${indexs}${index}`)
        formData.append(
          `items[${indexs}${index}][variation_id]`,
          itemp.variation_id
        );
        formData.append(`items[${indexs}${index}][store_id]`, itemp.store.id);
        formData.append(
          `items[${indexs}${index}][variation_name]`,
          itemp.variation_name
        );
        formData.append(`items[${indexs}${index}][quantity]`, itemp.quantity);
        formData.append(
          `items[${indexs}${index}][unit_price]`,
          itemp.unit_price
        );
        formData.append(
          `items[${indexs}${index}][total_price]`,
          itemp.total_price
        );
        formData.append(
          `items[${indexs}${index}][ekspedisi_name]`,
          item.selectedShipping.shipping_name
        );
        formData.append(
          `items[${indexs}${index}][ekspedisi_cost]`,
          item.selectedShipping.shipping_cost
        );
      });
    });
    formData.append("total_cost", totalCost);

    formData.append("full_address", data.fullAddress);
    formData.append("google_maps_link", data.googleMapsLink);
    formData.append("payment_method", selectedBank.bank_name);
    data.images.forEach((image, index) => {
      formData.append(`payment_proof`, {
        uri: image.uri,
        type: image.type,
        name: image.name,
      });
    });
    formData.append("username_pengguna", selectedBank.username_pengguna);
    formData.append("no_rekening", selectedBank.no_rekening);

    try {
      const token = await AsyncStorage.getItem("auth_token");
      const response = await axios.post(`${apiUrl}api/transactions`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Transaction saved:", response.data);

      // Delete items from the cart
      const deletePromises = selectedItems.forEach((item, indexs) => {
        item.produk.forEach((itemp, index) => {
          return axios
            .delete(`${apiUrl}api/cart/${itemp.id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              console.log(`Deleted item ${itemp.id} from cart`);
            })
            .catch((error) => {
              console.error(
                `Failed to delete item ${itemp.id} from cart:`,
                error
              );
            });
        });
      });

      //   await Promise.all(deletePromises);

      Alert.alert("Success", "Transaction saved successfully.", [
        {
          text: "OK",
          onPress: () => {
            setResetCartItems(true);
            navigation.navigate("MyOrders");
          },
        },
      ]);
    } catch (error) {
      console.error("Error saving transaction:", error);
      Alert.alert("Error", "Failed to save transaction.");
    }
  };

  const formatRupiah = (amount) => {
    return (
      "Rp " +
      Number(amount)
        .toFixed(0)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={selectedItems}
        keyExtractor={(item) => item.idToko.toString()}
        ListHeaderComponent={() => (
          <View style={{ marginTop: 20 }}>
            <Text style={styles.label}>Alamat Lengkap:</Text>
            <Controller
              control={control}
              name="fullAddress"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Enter full address"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            <Text style={styles.label}>Tautan Alamat:</Text>
            <Controller
              control={control}
              name="googleMapsLink"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Enter Google Maps link"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            <Text style={styles.label}>Item yang Dipilih:</Text>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.label}>Metode Pembayaran:</Text>
            <Picker
              selectedValue={selectedBank}
              onValueChange={(itemValue) => onBankChange(itemValue)}
              style={styles.input}
            >
              <Picker.Item label="Pilih Bank" value={null} />
              {renderBankOptions()}
            </Picker>
            {selectedBank && (
              <View>
                <Text style={styles.label}>Username Pengguna:</Text>
                <Text style={styles.value}>
                  {selectedBank.username_pengguna}
                </Text>
                <Text style={styles.label}>No. Rekening:</Text>
                <Text style={styles.value}>{selectedBank.no_rekening}</Text>
              </View>
            )}
            <UploadImages
              name="images"
              control={control}
              label="Payment Proof"
              reqText="Required"
              error={watch("images") && watch("images").length === 0}
            />
            <View style={styles.totalCostContainer}>
              <Text style={styles.totalCostLabel}>Total Dibayar:</Text>
              <Text style={styles.totalCostValue}>
                {formatRupiah(totalCost)}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleSubmit(confirmCheckout)}
            >
              <Text style={styles.confirmButtonText}>
                Konfirmasi Pembayaran
              </Text>
            </TouchableOpacity>
          </View>
        )}
        renderItem={({ item, index }) => (
          <View key={item.idToko} style={{ marginBottom: 16 }}>
            <Text style={styles.itemTitle}>{item.nama}</Text>
            {item.produk &&
              item.produk.map((i, idx) => (
                <View key={idx}>
                  <View style={styles.cartItem}>
                    <Image
                      style={styles.itemImage}
                      source={{
                        uri: `${apiUrl}storage/${i.variation_image}`,
                      }}
                      resizeMode="contain"
                    />
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemTitle}>{i.variation_name}</Text>
                      <Text style={styles.itemQuantity}>
                        Jumlah: {i.quantity}
                      </Text>
                      <Text style={styles.itemPrice}>
                        Harga Satuan: {formatRupiah(i.unit_price)}
                      </Text>
                      <Text style={styles.itemTotalPrice}>
                        Total Harga: {formatRupiah(i.total_price)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            <Text style={styles.label}>Metode Pengiriman:</Text>
            <Picker
              selectedValue={item.selectedShipping}
              onValueChange={(itemValue) => onShippingChange(itemValue, index)}
              style={styles.input}
            >
              <Picker.Item label="Pilih Ekspedisi" value={null} />
              {renderShippingOptions(item.shipping_info)}
            </Picker>
            {item.selectedShipping && (
              <View>
                <Text style={styles.label}>Biaya Pengiriman:</Text>
                <Text style={styles.value}>
                  {formatRupiah(item.selectedShipping.shipping_cost)}
                </Text>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#f8f9fa",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  cartItem: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    justifyContent: "center",
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemQuantity: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
  },
  itemTotalPrice: {
    fontSize: 16,
    color: "#888",
  },
  confirmButton: {
    backgroundColor: "#00796B",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default TransactionsPaymentScreen;
