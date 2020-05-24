import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {

  }

  getRecipes() {
    // Return exact copy.
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.emitChanges();
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.emitChanges();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.emitChanges();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.emitChanges();
  }

  private emitChanges() {
    this.recipesChanged.next(this.recipes.slice());
  }
}
