import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Recipe from "../recipeDetails";

interface RecipeData {
  title: string;
  time: string;
  calories: string;
}

const HomeScreen: React.FC = () => {
  const categories = [
    { name: "Breakfast", image: require("../../assets/images/egg.png") },
    { name: "Lunch", image: require("../../assets/images/burger.png") },
    { name: "Dinner", image: require("../../assets/images/spaghetti.png") },
    { name: "Dessert", image: require("../../assets/images/dessert.png") },
    { name: "Diet", image: require("../../assets/images/vegetable.png") },
  ];
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeData | null>(null);

  const openModal = (recipe: RecipeData) => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedRecipe(null);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello,</Text>
        <Text style={styles.name}>Hassan 👋</Text>
        <Image
          style={styles.profileImage}
          source={require("../../assets/images/profile.png")}
        />
      </View>
      <View style={styles.searchWrapper}>
        <Text style={styles.prompt}>What would you like to cook today?</Text>
        <View style={styles.inputContainer}>
          <Icon
            name="search-outline"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            placeholder="Search any recipe"
            style={styles.searchInput}
            keyboardType="default"
          />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.category,
              index === selectedCategory && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(index)}
          >
            <Image source={category.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.recommendationsTitle}>Recommendations</Text>
      <View style={styles.recommendations}>
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <TouchableOpacity
              key={index}
              style={styles.recipeCard}
              onPress={() =>
                openModal({
                  title: "Creamy Pasta",
                  time: "20 Min",
                  calories: "239 Cal",
                })
              }
            >
              <Image
                style={styles.recipeImage}
                source={require("../../assets/images/creamyPasta.png")}
              />
              <Text style={styles.recipeTitle}>Creamy Pasta</Text>
              <Text style={styles.recipeTime}>⏱️ 20 Min</Text>
            </TouchableOpacity>
          ))}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedRecipe && <Recipe recipe={selectedRecipe} />}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 48,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "normal",
    color: "#666",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 4,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: "auto",
  },
  searchWrapper: {
    marginTop: 8,
  },
  prompt: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
  },
  inputText: {
    width: "100%",
    marginLeft: 8,
    marginBottom: 4,
    fontSize: 16,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F4FA",
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  category: {
    paddingTop: 10,
    paddingBottom: 6,
    backgroundColor: "#FFF",
    borderRadius: 12,
    alignItems: "center",
    width: 80,
    height: 85,
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: "#F6A028",
  },
  categoryImage: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginBottom: 4,
    objectFit: "contain",
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  recommendations: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  recipeCard: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingVertical: 4,
    marginBottom: 8,
  },
  recipeImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  recipeTime: {
    fontSize: 14,
    color: "#888",
  },
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
    maxHeight: "80%",
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

export default HomeScreen;
