import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    private recipesUrl = 'https://udemy-angular-course-59dcf.firebaseio.com/recipes.json';

    constructor(private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put(this.recipesUrl, recipes)
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(this.recipesUrl)
        .pipe(map(recipes => {
            return recipes.map(recipes => {
                return {...recipes, ingredients: recipes.ingredients ? recipes.ingredients : []};
            });
        }), tap(recipes => {
            this.recipeService.setRecipes(recipes);
        }));
    }
}