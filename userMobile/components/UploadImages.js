/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from "react";
import { useController } from "react-hook-form";
import {
    Image,
    LogBox,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    ToastAndroid,
    View,
} from "react-native";
import Modal from "react-native-modal";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

import getImageMeta from "../utils/getImageMeta";

LogBox.ignoreLogs([
    'Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead',
]);

const UploadImages = ({
    name,
    control,
    label,
    reqText,
    error,
    isDisabled,
    helperText,
    uploadedImages,
}) => {
    const {
        field: { onChange, value: controlledValue },
    } = useController({
        name,
        control,
    });
    const [openModal, setOpenModal] = useState(false);

    const handleShowModal = () => {
        setOpenModal(true);
    };

    const handleHideModal = () => {
        setOpenModal(false);
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.3,
        });

        console.log(result);

        if (!result.canceled) {
            handleHideModal();

            const uri = result.assets[0].uri;

            const fileInfo = await FileSystem.getInfoAsync(uri);

            if (fileInfo.exists && fileInfo.size > 500000) {
                ToastAndroid.show(
                    "Media pilihan terlalu besar",
                    ToastAndroid.LONG,
                );
                return;
            }

            const imageMeta = getImageMeta(uri);
            // setImage(imageMeta);
            if (value) {
                onChange([imageMeta, ...value]);
            } else {
                onChange([imageMeta]);
            }
        }
    };

    const pickImageGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 0.3,
        });

        console.log(result);

        if (!result.canceled) {
            handleHideModal();

            const uri = result.assets[0].uri;
            const fileInfo = await FileSystem.getInfoAsync(uri);
            console.log("FILE:", JSON.stringify(fileInfo, null, 4));

            if (fileInfo.exists) {
                if (fileInfo.size > 500000) {
                    ToastAndroid.show(
                        "Media pilihan terlalu besar",
                        ToastAndroid.LONG,
                    );
                    return;
                }
            }
            const imageMeta = getImageMeta(uri);
            // setImage(imageMeta);
            if (value) {
                onChange([imageMeta, ...value]);
            } else {
                onChange([imageMeta]);
            }
        }
    };

    const handleDeleteImage = (index) => {
        const prevImages = controlledValue;
        const images = prevImages.filter((_, idx) => idx !== index);
        onChange(images);
    };

    const value = useMemo(() => {
        if (uploadedImages) {
            return uploadedImages;
        }
        return controlledValue;
    }, [controlledValue, uploadedImages]);

    return (
        <View style={{ gap: 12 }}>
            {controlledValue.length > 0? controlledValue?.map((li, idx) => (
                <View style={{ position: "relative" }} key={idx.toString()}>
                    <View
                        style={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            zIndex: 99,
                        }}
                    >
                        <Pressable style={{
                            backgroundColor: '#0000007A',
                            borderRadius: 200,
                            padding: 4,
                        }} onPress={() => handleDeleteImage(idx)}>
                            <MaterialCommunityIcons
                                name="close"
                                size={12}
                                color="white"
                            />
                        </Pressable>
                    </View>
                    <View
                        style={{
                            width: "100%",
                            height: 180,
                            backgroundColor: "#a5a5a5",
                            borderRadius: 4,
                        }}
                    >
                        <Image
                            style={{
                                flex: 1,
                                borderRadius: 4,
                            }}
                            source={{ uri: li.uri }}
                            resizeMode="contain"
                        />
                    </View>
                </View>
            )):
            <View>
                <Pressable
                    disabled={isDisabled}
                    onPress={handleShowModal}
                    // onPress={pickImage}
                    style={[
                        styles.card,
                        isDisabled && { backgroundColor: "grey"  },
                    ]}
                >
                    <MaterialCommunityIcons
                        name="camera"
                        size={48}
                        color={"black" } />
                    <Text style={{ fontWeight: '600', fontSize: 16, color: "black"  }}>Ambil Gambar</Text>
                </Pressable>
                {error && <Text style={styles.textError}>{error.message}</Text>}
            </View>
            }
            
            <Modal
                isVisible={openModal}
                backdropOpacity={0.2}
                style={{
                    justifyContent: "flex-end",
                    margin: 0,
                }}
                onBackdropPress={handleHideModal}
                backdropTransitionOutTiming={0}
            >
                <View
                    style={{
                        height: 100,
                        backgroundColor: "white",
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: 'center',
                            padding: 12,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: 'space-between',
                                gap: 12,
                                width: "100%",
                            }}
                        >
                            <View style={{
                                alignItems: 'center', justifyContent: 'center', flex: 1
                            }}>
                                <MaterialCommunityIcons
                                    name="camera"
                                    onPress={pickImage}
                                    size={40}
                                    color={"black" } />
                                <Text style={{ fontWeight: '500', color: "black"  }}>Kamera</Text>
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                <MaterialCommunityIcons
                                    name="image"
                                    onPress={pickImageGallery}
                                    size={40}
                                    color={"black" } />
                                <Text style={{ fontWeight: '500', color: "black"  }}>Galeri</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default UploadImages;

const styles = StyleSheet.create({
    card: {
        padding: 24,
        borderRadius: 4,
        borderColor: "grey" ,
        borderWidth: 1,
        borderStyle: 'dashed',
        alignItems: 'center',
        gap: 16,
    },
    textError: {
        color: "red",
        fontSize: 12,
        marginTop: 2,
    },
});
