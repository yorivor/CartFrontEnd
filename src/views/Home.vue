<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col class="col-8">
          <product v-on:addItemToCart="addItemToCart" />
        </v-col>
        <v-col class="col-4">
          <cart v-bind:cart="cart" v-on:deleteCartItem="deleteCartItem"   />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Product from './../components/Product.vue';
import Cart from './../components/Cart.vue';
export default {
  name: "Home",
  components: {
    Product,
    Cart
  },
  data: () => ({
    cart: [],
    total: 0,
    cartadd: {
      id: 0,
      name: "",
      price: 0,
      stock: 0,
      quantity: "",
      image: ""
     },
  }),
  mounted() {
    if (localStorage.getItem("cart")){
      this.cart = JSON.parse(localStorage.getItem("cart"))
      return;
    }
  },
  methods: {
    addItemToCart(list) {
      //this.cart.push(list);
      //this.cart = [...this.cart, list];
      var findProduct = this.cart.find(cart => cart.id == list.id)
      
      if (!findProduct) {
        this.cartadd.id = list.id;
        this.cartadd.name = list.name;
        this.cartadd.price = list.price;
        this.cartadd.stock = list.stock;
        this.cartadd.quantity = 1;
        this.cartadd.image = list.image;
        this.cart.push(this.cartadd);
        this.cartadd = {}
        this.storeCart();
      } else {
        if (findProduct.quantity >= list.stock) {
            alert('This item is out of stock')
            return;
        } else {
          if(findProduct){
              findProduct.quantity +=1;
              this.storeCart();
          } else {
            this.cartadd.id = list.id;
            this.cartadd.name = list.name;
            this.cartadd.price = list.price;
            this.cartadd.stock = list.stock;
            this.cartadd.image = list.image;
            this.cartadd.quantity = 1;
            this.cart.push(this.cartadd);
            this.cartadd = {}
            this.storeCart();
          }
        }
      }
      return;
    },
    deleteCartItem(id) {
      var findProduct = this.cart.find(cart => cart.id == id)
       if(findProduct){
         if(findProduct.quantity < 2) {
           this.cart = this.cart.filter(cart => cart.id !== id);
           this.storeCart();
         } else {
           findProduct.quantity -= 1;
           this.storeCart();
           return;
         }
      } else {
        this.cart = this.cart.filter(cart => cart.id !== id);
        this.storeCart();
        return;
      }
    },
    storeCart() {
        let parsed = this.cart;
        localStorage.setItem('cart',JSON.stringify(parsed));
        this.cart = JSON.parse(localStorage.getItem("cart"))
        return;
    },
  },
  // watch: {
  //   cart: {
  //     handler() {
  //       localStorage.setItem('cart',JSON.stringify(this.cart))
  //     },
  //     deep: true
  //   }
  // },
};
</script>

