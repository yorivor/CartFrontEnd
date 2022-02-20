<template>
  <v-app>
    <v-container>
      <h1>Product List</h1>
      <v-row>
        <v-col class="text-right" cols="12">
          <v-btn @click="showCreate" depressed large light-blue darken-4>
            Create Product
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-right" cols="12">
          <v-alert v-if="alertTwo.show" cols="12" :type="alertTwo.type">
            <span v-html="alertTwo.message"></span>
          </v-alert>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">
                    Name
                  </th>
                  <th class="text-center">
                    Image
                  </th>
                  <th class="text-center">
                    Price
                  </th>
                  <th class="text-center">
                    Stock
                  </th>
                  <th class="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="list in productList" :key="list.id">
                  <td class="text-center">{{ list.name }}</td>
                  <td class="text-center"><v-img :src='$api + "/images/" + list.image' style="width:100px;"></v-img></td>
                  <td class="text-center">{{ list.price }}</td>
                  <td class="text-center">{{ list.stock }}</td>
                  <td class="text-center">
                    <v-icon
                    @click="editProduct(list.id)" 
                    >
                      mdi-pencil-outline
                    </v-icon>
                    <v-icon
                    @click="deleteProduct(list.id)" 
                    >
                      mdi-delete
                    </v-icon>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
      <v-dialog
        v-model="showModal"
        persistent
        transition="dialog-top-transition"
      >
        <template>
          <v-card>
            <v-toolbar color="primary">Create Contact</v-toolbar>
            <v-container>
              <v-alert v-if="alert.show" cols="12" :type="alert.type">
                <span v-html="alert.message"></span>
              </v-alert>
              <v-form @submit.prevent="submit(type)" >
                <v-file-input
                  label="Upload Image"
                  hint="Upload product image"
                  v-model="form.file"
                  persistent-hint
                  @change="FileChange"
                  required
                ></v-file-input>
                <v-text-field
                  v-model="form.name"
                  label="Name"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="form.price"
                  label="Price"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="form.stock"
                  label="Stock"
                  required
                ></v-text-field>
                <v-row class="text-right">
                  <v-col cols="12">
                    <v-btn class="my-3 mx-3" type="submit" color="primary"> Submit </v-btn>
                    <v-btn class="my-3 mx-3" color="error" @click="showModal = false">
                      Close
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card>
        </template>
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script>

export default {
  name: "home",
  data: () => ({
    usedKey: 0,
    showModal: false,
    productList: [],
    type: 'Create',
    alert: {
      show: false,
      message: "",
      type: "error",
    },
    alertTwo: {
      show: false,
      message: "",
      type: "error",
    },
    form: {
      name: "",
      file: null,
      price: "",
      stock: "",
    }
  }),
  methods: {
    FileChange(file) {
      this.form.file = file;
    },
    showCreate() {
      this.showModal = true;
      this.form = {
        name: "",
        file: null,
        price: "",
        stock: "",
      };
      this.alert = {
        show: false,
      };
    },
    getProduct() {
        this.$http.get(this.$api + "/products").then((response) => {
        this.productList = response.data.response.data;
      });
    },
    editProduct(id) {
      this.showModal = true;
      this.type = 'Update';
      this.usedKey = id;
      this.form.file = null;
      this.alert = {
        show: false,
      };
      this.$http
        .get(this.$api + "/product/" + id)
        .then((response) => {
          this.form.name = response.data.response.name;
          this.form.price = response.data.response.price;
          this.form.stock = response.data.response.stock;
        });
    },
    submit() {
      let url = "";
      let postForm = "";
      let headers = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      switch (this.type) {
        case 'Create' :
          url = this.$api + '/products'
          postForm = new FormData();
          postForm.append("name", this.form.name);
          postForm.append("file", this.form.file);
          postForm.append("price", this.form.price);
          postForm.append("stock", this.form.stock);
        break;
        case 'Update' :
          url = this.$api + '/product/' + this.usedKey
          postForm = new FormData();
          postForm.append("name", this.form.name);
          postForm.append("file", this.form.file);
          postForm.append("price", this.form.price);
          postForm.append("stock", this.form.stock);
          postForm.append("_method", "PUT");
          break;
      }
      this.$http
        .post(url, postForm, headers)
        .then((success) => {
          if(this.type == 'Create') {
            this.form = {
              name: "",
              file: null,
              price: "",
              stock: "",
            };
          }
          this.alert = {
            show: true,
            type: "success",
            message: success.data.message,
          };
          this.getProduct();
        })
        .catch((error) => {
          let msg = "";
          if (error.response.data.message) {
            msg = error.response.data.message;
          } else {
            msg = "Something went wrong. Please contact the administrator";
          }
          this.alert = {
            show: true,
            type: "error",
            message: msg,
          };
        });
    },
    deleteProduct(id) {
      this.$http
        .delete(this.$api + "/product/" + id)
        .then((response) => {
          this.getProduct();
          this.alertTwo = {
            show: true,
            type: "success",
            message: response.data.message,
          };
        })
        .catch((error) => {
          let msg = "";
          if (error.response.data.message) {
            msg = error.response.data.message;
          } else {
            msg = "Something went wrong. Please contact the administrator";
          }
          this.alertTwo = {
            show: true,
            type: "error",
            message: msg,
          };
        });
    }
  },
  mounted() {
    this.getProduct();
  }
};
</script>
