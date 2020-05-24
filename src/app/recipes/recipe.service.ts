import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test.', 'https://static01.nyt.com/images/2013/06/26/dining/26JPFLEX1/26JPFLEX1-articleLarge-v3.jpg',
    [
      new Ingredient('Meat', 1),
      new Ingredient('French fries', 20)
    ]),
  ];

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

  private emitChanges() {
    this.recipesChanged.next(this.recipes.slice());
  }
}
