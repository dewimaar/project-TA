import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import UploadImages from '../components/UploadImages';
import { Picker } from '@react-native-picker/picker';

const EditProfileScreen = ({ navigation, route }) => {
    const { userData } = route.params;
    const { control, handleSubmit, setValue } = useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userData) {
            setValue('name', userData.name);
            setValue('email', userData.email);
            setValue('noTelp', userData.noTelp);
            setValue('address', userData.address);
            setValue('google_maps_link', userData.google_maps_link);
            setValue('birthdate', userData.birthdate);
            setValue('gender', userData.gender);
            setValue('profile_photo', userData.profile_photo ? [{ uri: `http://192.168.0.23:8000/storage/${userData.profile_photo}` }] : []);
        }
    }, [userData]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('auth_token');
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('noTelp', data.noTelp);
            formData.append('address', data.address);
            formData.append('google_maps_link', data.google_maps_link);
            formData.append('birthdate', data.birthdate);
            formData.append('gender', data.gender);

            if (data.profile_photo && data.profile_photo.length > 0) {
                const image = data.profile_photo[0];
                const filename = image.uri.split('/').pop();
                const match = /\.(\w+)$/.exec(filename);
                const type = match ? `image/${match[1]}` : `image`;

                formData.append('profile_photo', {
                    uri: image.uri,
                    name: filename,
                    type,
                });
            }

            console.log('Sending request to server with formData:', formData);

            const response = await axios.post('http://192.168.0.23:8000/api/user/update', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Response from server:', response.data);

            Alert.alert('Success', 'Profile updated successfully');
            navigation.goBack();
        } catch (error) {
            console.error('Failed to update profile:', error);
            Alert.alert('Error', 'Failed to update profile: ' + (error.response ? error.response.data.message : error.message));
        } finally {
            setLoading(false);
        }
    };

    const handleDateChange = (text) => {
        let formattedText = text.replace(/[^0-9]/g, '');

        if (formattedText.length >= 4 && formattedText.length < 7) {
            formattedText = formattedText.substring(0, 4) + '-' + formattedText.substring(4);
        } else if (formattedText.length >= 7) {
            formattedText = formattedText.substring(0, 4) + '-' + formattedText.substring(4, 6) + '-' + formattedText.substring(6, 8);
        }

        return formattedText;
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.label}>Name</Text>
                <Controller
                    control={control}
                    name="name"
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <Text style={styles.label}>Email</Text>
                <Controller
                    control={control}
                    name="email"
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            onChangeText={onChange}
                            value={value}
                            keyboardType="email-address"
                        />
                    )}
                />

                <Text style={styles.label}>No. Telp</Text>
                <Controller
                    control={control}
                    name="noTelp"
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <Text style={styles.label}>Address</Text>
                <Controller
                    control={control}
                    name="address"
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <Text style={styles.label}>Google Maps Link</Text>
                <Controller
                    control={control}
                    name="google_maps_link"
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <Text style={styles.label}>Date of Birth</Text>
                <Controller
                    control={control}
                    name="birthdate"
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => onChange(handleDateChange(text))}
                            value={value}
                            placeholder="YYYY-MM-DD"
                            keyboardType="numeric"
                            maxLength={10}
                        />
                    )}
                />

                <Text style={styles.label}>Gender</Text>
                <Controller
                    control={control}
                    name="gender"
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <Picker
                            selectedValue={value}
                            onValueChange={onChange}
                            style={styles.picker}
                        >
                            <Picker.Item label="Male" value="male" />
                            <Picker.Item label="Female" value="female" />
                        </Picker>
                    )}
                />

                <Text style={styles.label}>Profile Photo</Text>
                <Controller
                    control={control}
                    name="profile_photo"
                    defaultValue={[]}
                    render={({ field: { onChange, value } }) => (
                        <UploadImages
                            name="profile_photo"
                            control={control}
                            uploadedImages={value}
                            onChange={onChange}
                        />
                    )}
                />

                <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)} disabled={loading}>
                    <Text style={styles.buttonText}>{loading ? 'Updating...' : 'Update Profile'}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    form: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 20,
        borderRadius: 4,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    picker: {
        backgroundColor: '#fff',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#013B0A',
        padding: 15,
        borderRadius: 4,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default EditProfileScreen;
