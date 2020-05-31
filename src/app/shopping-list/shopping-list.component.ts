import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  //private igChangeSub: Subscription
  ingredients: Observable<{ingredients: Ingredient[]}>;

  constructor(private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');

    // :::RxJS solution:::
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => this.ingredients = ingredients);
  }

  ngOnDestroy() : void {
    //this.igChangeSub.unsubscribe();
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

}
