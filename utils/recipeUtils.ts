// utils/recipeUtils.ts
import { db } from "../firebaseConfig";
import { RecipeData } from "../types";
import { collection, getDocs } from "firebase/firestore";

export const fetchRecipes = async (): Promise<RecipeData[]> => {
  const recipeCollection = await getDocs(collection(db, "recipes"));
  const recipes: RecipeData[] = [];

  for (const doc of recipeCollection.docs) {
    const data = doc.data();
    const recipe: RecipeData = {
      id: doc.id,
      title: data.title,
      time: data.time,
      calories: data.calories,
      image: data.image,
      favorite: data.favorite,
      description: data.description,
      ingredients: [],
      recipe_type: data.recipe_type || [],
    };

    recipes.push(recipe);
  }

  return recipes;
};

// Add a function to fetch ingredients for a specific recipe
export const fetchIngredients = async (recipeId: string) => {
  const ingredientsCollection = await getDocs(
    collection(db, "recipes", recipeId, "ingredients")
  );

  return ingredientsCollection.docs.map((ingredientDoc) => {
    const ingredientData = ingredientDoc.data();
    return {
      id: ingredientDoc.id,
      name: ingredientData.name,
      image: ingredientData.image,
    };
  });
};
