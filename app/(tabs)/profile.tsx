import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import RecipeCard from "../../components/recipeCard";
import ProfileHeader from "../../components/ProfileHeader";
import RecipeModal from "../../components/RecipeModal";
import { fetchRecipes } from "../../utils/recipeUtils";
import { RecipeData } from "../../types";
import * as Progress from "react-native-progress";
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function ProfileScreen() {
  const [recipes, setRecipes] = useState<RecipeData[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<any>({
    name: "",
    age: "",
    bio: "",
    location: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setProfileData(userDoc.data());
        }
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await fetchRecipes();
        setRecipes(data.filter((recipe) => recipe.favorite));
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  const openModal = (recipeId: string) => {
    const recipe = recipes.find((r) => r.id === recipeId);
    setSelectedRecipe(recipe || null);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedRecipe(null);
  };

  const toggleFavorite = (id: string) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe
      )
    );
  };

  const renderRecipe = ({ item }: { item: RecipeData }) => (
    <RecipeCard
      recipe={item}
      onPress={() => openModal(item.id)}
      onToggleFavorite={() => toggleFavorite(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <ProfileHeader
        name={profileData.name}
        age={profileData.age}
        bio={profileData.bio}
        location={profileData.location}
        imageSource={require("../../assets/images/profile.png")}
      />
      <Text style={styles.starredRecipesTitle}>My Starred Recipes</Text>
      {loading ? (
        <View style={styles.ProgressBar}>
          <Progress.Circle
            size={40}
            indeterminate={true}
            thickness={3}
            borderColor={"#F6A028"}
            borderWidth={2}
          />
        </View>
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        <FlatList
          data={recipes}
          renderItem={renderRecipe}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.recipesContainer}
          columnWrapperStyle={styles.columnWrapper}
        />
      )}
      <RecipeModal
        visible={modalVisible}
        recipe={selectedRecipe}
        onClose={closeModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
  starredRecipesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 11,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  recipesContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  columnWrapper: {
    justifyContent: "flex-start",
    width: "100%",
  },
  ProgressBar: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 64,
  },
});
