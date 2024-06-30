import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../components/Input';
import UploadImages from '../components/UploadImages';
import axios from 'axios';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";

const StoreRegistration = ({ navigation }) => {
    const [storeName, setStoreName] = useState('');
    const [category, setCategory] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');

    const [userData, setUserData] = useState(null);
    const StoreSchema = Yup.object({
        name: Yup.string().required("Kolom wajib diisi"),
        category: Yup.string().required("Kolom wajib diisi"),
        address: Yup.string().required("Kolom wajib diisi"),
        description: Yup.string().required("Kolom wajib diisi"),
        images: Yup.array().required("Wajib upload foto!"),
      });
      const initialValues = {
        name: "",
        category: "",
        address: "",
        description: "",
        images: [],
      };
    
      const {
        control,
        handleSubmit,
        getValues,
        setValue,
        watch,
        setError,
        formState: { errors },
      } = useForm({
        mode: "onChange",
        resolver: yupResolver(StoreSchema),
        defaultValues: initialValues,
      });
      useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('auth_token');
                console.log('Retrieved Token:', token);

                const response = await axios.get('http://192.168.100.91:8000/api/user', {
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
    const handleRegister = async (values) => {
        console.log(values);
        try {
        const formData = new FormData();
        formData.append('user_id', String(userData.id));
        formData.append('name', String(values.name));
        formData.append('category', String(values.category));
        formData.append('address', String(values.address));
        formData.append('description', String(values.description));
        values.images.forEach((gambar) => {
            formData.append("image", gambar);
            console.log('g', gambar);
          });
        const { data } = await axios.post('http://192.168.100.91:8000/api/stores', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
            if (data) {
                // const data = await response.json();
                Alert.alert('Success', 'Store registered successfully');
                navigation.navigate('Market');
            } else {
                // const errorData = await response.json();
                Alert.alert('Error',  'Something went wrong');
            }
        } catch (error) {
            console.log(error.message);
            Alert.alert('Error', error.message || 'Something went wrong');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Pendaftaran Toko</Text>
            <UploadImages
              name="images"
              control={control}
            //   imagesCount={() => setImagesC(getValues('images').length ?? 0)}
              error={errors.images}
              helperText="Pilih foto (jpg, png)"
              reqText="Input foto garansi & foto barang"
            />
            <Input
            name={"name"}
            control={control}
            errors={errors.name}
                placeholder="Nama Toko"
            />
            <Input
            name={"category"}
            errors={errors.category}
            control={control}
                placeholder="Kategori"
            />
            <Input
            name={"address"}
            errors={errors.address}
            control={control}
                placeholder="Alamat Lengkap Toko"
            />
            <Input
            name={"description"}
            errors={errors.description}
            control={control}
                placeholder="Deskripsi"
            />
            {/* Tambahkan bidang lain yang diperlukan */}
            <Button title="Daftarkan Toko" onPress={handleSubmit(handleRegister)} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        gap:20,
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default StoreRegistration;
