<template>
  <v-app>
    <h1>Cart:</h1>
    <v-col class="col-md-12">
        <v-row class="py-0" v-for="(list , index) in cart" :key="index">
            <v-col class="col-md-12 py-0"><v-divider></v-divider></v-col>
            <v-col class="col-md-12 py-0">
                <h2>{{ list.name }}</h2>
            </v-col>
            <v-col class="col-md-9 py-2">
                {{ list.quantity }}x
                Price: $ {{ parseFloat(list.quantity * list.price).toFixed(2) }}
            </v-col>
            <v-col class="col-md-3 py-0">
                 <v-btn
                    color="green lighten-2"
                    text
                    @click="$emit('deleteCartItem', list.id)"
                >
                    X
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col><v-divider></v-divider></v-col>
        </v-row>
        <v-row>
            <v-col class="col-md-6">
                Total Price:
            </v-col>
            <v-col class="col-md-6 text-right">
                {{ parseFloat(totalPrice).toFixed(2) }}
            </v-col>
        </v-row>
    </v-col>
  </v-app>
</template>

<script>

export default {
  name: "Cart",
  data: () => ({}),
  props: ["cart"],
  computed: {
    totalPrice(){
      return  this.cart.reduce((total, product) => {
        return total + product.price * product.quantity
      }, 0)
    }
  },
};
</script>
<style scoped>
    .img-size {
        width:100%;
        height:100px;
    }
</style>
