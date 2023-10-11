import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { product } from '../product';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  quoteForm!: FormGroup;
  priceArray:product[]=[];
  bill:any;
  discount:any;
  total:any;
  ngOnInit(): void {}
  constructor(private fb: FormBuilder) {
    this.quoteForm = this.fb.group({
      quoteNumber: ['', Validators.required],
      location: ['', Validators.required],
      econsumption: ['', Validators.required],
      billInfo: ['', Validators.required],
      space: ['', Validators.required],
      bstorage: ['', Validators.required],
      addItem: this.fb.array([this.itemfields()]),
    });
  }
  itemfields() {
    return this.fb.group({
      item: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      discount: ['', Validators.required],
      amount: ['', Validators.required],
      remove: [''],
      update: [''],
    });
  }
  get itemArray() {
    return this.quoteForm.get('addItem') as FormArray;
  }
  additem() {
    this.itemArray.push(this.itemfields());

    

   
    // console.log(this.bill);

    // console.log(this.priceArray);
  }
  removeItem(index: any) {
    this.itemArray.removeAt(index);
  }
  calculate(){
    this.priceArray = this.itemArray.value;
    this.bill = this.priceArray.reduce((accumlator,value) => {
      return accumlator + (value.price * value.quantity - value.discount  ) ;
    },0);
    console.log('hi');
    
  }
}
