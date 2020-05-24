import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.emitIngredientsChanged();
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.emitIngredientsChanged();
  }

  updateIngredient(index: number, newIngredient: Ingredient) { 
    this.ingredients[index] = newIngredient;
    this.emitIngredientsChanged();
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.emitIngredientsChanged();
  }

  emitIngredientsChanged() {
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
