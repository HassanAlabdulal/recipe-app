import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import Recipe from "./recipeDetails";

interface RecipeData {
  title: string;
  time: string;
  calories: string;
}

interface RecipeModalProps {
  visible: boolean;
  recipe: RecipeData | null;
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({
  visible,
  recipe,
  onClose,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Recipe Details</Text>
          {recipe && <Recipe recipe={recipe} />}
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    height: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  closeButton: {
    alignSelf: "center",
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#F6A028",
    borderRadius: 20,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default RecipeModal;