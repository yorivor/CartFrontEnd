<template>
  <v-app>
    <h1>Product</h1>
    <v-row>
        <v-col class="col-md-3" v-for="(list , id) in productList" :key="id">
            <v-card
            max-width="100%"
            >    
            <v-img
                class="img-size"
                :src='$api + "/images/" + list.image'
            ></v-img>
        
            <v-card-title>{{ list.name }}</v-card-title>
            <v-card-text>
                <div class="text-subtitle-1">
                $ {{ list.price }}
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn
                color="green lighten-2"
                text
                @click="addItemToCart(list)"
                >
                Add to Cart
                </v-btn>
            </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
  </v-app>
</template>

<script>

export default {
  name: "Product",
  data: () => ({
    productList: [],
  }),
  methods: {
     getProduct() {
        this.$http.get(this.$api + "/products").then((response) => {
        this.productList = response.data.response.data;
      });
    },
    addItemToCart(list) {
      this.$emit("addItemToCart", list);
    },
  },
  mounted() {
    this.getProduct();
  }
};
</script>
<style scoped>
    .img-size {
    width:100%;
    height:100px;
    }
</style>
