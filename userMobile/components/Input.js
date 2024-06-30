import React, { memo, useState } from "react";
import { FieldError, useController } from "react-hook-form";
import { ViewStyle, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Input = ({
  label,
  name,
  isPassword,
  errors,
  control,
  isBold,
  isTelp,
  iconRight,
  isNumber,
  isDrop,
  isDisabled,
  isTanggal,
  isTime,
  pressed,
  valName,
  ...props
}) => {
  const [isInvisible, setIsInvisible] = useState(true);
  const {
    field: { onChange, onBlur, value },
  } = useController({
    name,
    control,
  });

  const handleChange = (text) => {
    onChange(text);
  };

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
        <View
          style={Container(
            errors ? "red" : isBold ? "black" : "black",
            isDisabled ? "gray" : "white" 
          )}
        >
          <TextInput
            placeholderTextColor={"black"}
            selectionColor={"black"}
            style={styles.textInput}
            onChangeText={handleChange}
            editable={!isDisabled && !isDrop && !isTanggal && !isTime}
            onBlur={() => {
              onBlur && onBlur();
            }}
            value={value}
            secureTextEntry={isPassword && isInvisible}
            {...props}
          />
          {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
          {isTanggal && (
            <View style={{ paddingHorizontal: 12 }}>
              <MaterialCommunityIcons name="calendar-month-outline" size={24} color={"black"} />
            </View>
          )}
          {isTime && (
            <View style={{ paddingHorizontal: 12 }}>
              <MaterialCommunityIcons name="clock-outline" size={24} color={"black"} />
            </View>
          )}
          {isPassword && (
            <Pressable style={{ paddingHorizontal: 12 }} onPress={() => setIsInvisible(!isInvisible)}>
              {isInvisible ? (
                <Ionicons name="eye" size={24} color={"black"} />
              ) : (
                <Ionicons name="eye-off" size={24} color={"black"} />
              )}
            </Pressable>
          )}
        </View>
      {errors && <Text style={styles.error}>{errors.message}</Text>}
    </View>
  );
};

export default memo(Input);

const Container = (borderColor, bgColor) => ({
  backgroundColor: bgColor,
  borderWidth: 1,
  borderColor: borderColor,
  borderRadius: 4,
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
  width: "100%",
});

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
    fontWeight: "600",
    fontSize: 14,
    color: "black",
    borderRadius: 4,
  },
  textInput: {
    color: "black",
    fontWeight: "400",
    fontSize: 16,
    borderRadius: 4,
    flex: 1,
    padding: 12,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 2,
  },
  iconRight: {
    marginHorizontal: 12,
  },
});
