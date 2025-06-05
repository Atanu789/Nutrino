import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface NumberInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  unit?: string;
  control?: any;
  rules?: any;
  keyboardType?: "numeric" | "number-pad" | "decimal-pad";
  multiline?: boolean;
  defaultValue?: string | number;
  onChangeText?: (text: string) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({
  name,
  label,
  placeholder,
  required = false,
  unit,
  keyboardType = "numeric",
  multiline = false,
  control: propControl,
  defaultValue = "",
  onChangeText: propOnChangeText,
}) => {
  const formContext = useFormContext();
  const control = propControl || formContext?.control;

  if (!control && !propOnChangeText) {
    console.warn("NumberInput must be used within a FormProvider or have control/onChangeText props");
    return null;
  }

  const renderInput = ({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            multiline && styles.multiline,
            error && styles.errorInput,
          ]}
          placeholder={placeholder}
          onBlur={onBlur}
          onChangeText={(text) => {
            // Only allow numbers and decimal points
            const cleanedText = text.replace(/[^0-9.]/g, "");
            onChange(cleanedText);
            if (propOnChangeText) propOnChangeText(cleanedText);
          }}
          value={value ? String(value) : ""}
          keyboardType={keyboardType}
          multiline={multiline}
          defaultValue={defaultValue ? String(defaultValue) : undefined}
        />

        {unit && <Text style={styles.unit}>{unit}</Text>}
      </View>

      {error && (
        <Text style={styles.errorText}>{error.message || "Error"}</Text>
      )}
    </View>
  );

  return control ? (
    <Controller
      control={control}
      name={name}
      rules={{ required: required ? "This field is required" : false }}
      render={renderInput}
    />
  ) : (
    renderInput({
      field: {
        onChange: propOnChangeText || (() => {}),
        onBlur: () => {},
        value: defaultValue,
      },
      fieldState: { error: null },
    })
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2d3748",
    marginBottom: 8,
  },
  required: {
    color: "#e53e3e",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: "#1a202c",
    paddingVertical: 12,
  },
  multiline: {
    height: 100,
    textAlignVertical: "top",
  },
  unit: {
    fontSize: 16,
    color: "#718096",
    marginLeft: 8,
  },
  errorInput: {
    borderColor: "#e53e3e",
  },
  errorText: {
    color: "#e53e3e",
    fontSize: 14,
    marginTop: 4,
  },
});

export default NumberInput;