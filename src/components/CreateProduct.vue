<template>
  <div class="pa-5">
    <h2>Create New Product</h2>
    <v-text-field
      v-model="ProductName"
      label="Product Name"
      placeholder="Type something..."
      outlined
      clearable
      maxlength="50"
    ></v-text-field>

    <v-select
      v-model="SupplierId"
      :items="Suppliers.map((sup) => sup.id)"
      label="Supplier"
      outlined
    ></v-select>

    <v-text-field
      v-model="UnitPrice"
      label="Unit Price"
      type="number"
      step="0.01"
      outlined
    ></v-text-field>

    <v-btn depressed color="primary" class="mx-1" @click="saveNewProduct">
      Save
    </v-btn>
    <v-btn
      depressed
      color="secondary"
      @click="
        () => {
          this.$router.push('/list-products');
        }
      "
    >
      Cancel
    </v-btn>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "CreateProduct",

  data() {
    return {
      ProductName: "",
      SupplierId: null,
      UnitPrice: null,
      Suppliers: [],
    };
  },
  methods: {
    saveNewProduct() {
      console.log("create new product");
      Axios.post("http://127.0.0.1:8000/api/products", {
        ProductName: this.ProductName,
        SupplierId: this.SupplierId,
        UnitPrice: this.UnitPrice,
      })
        .then((response) => {
          // Handle the response
          console.log("save new product :", response.data);
          if (response.data.status == 422) {
            alert(JSON.stringify(response.data.errors));
          } else {
            this.$router.push("/list-products");
          }
        })
        .catch((error) => {
          // Handle the error
          console.error(error);
        });
    },
  },
  created() {
    Axios.get("http://127.0.0.1:8000/api/suppliers").then((resp) => {
      this.Suppliers = resp.data;
      console.log(resp.data);
    });
  },
};
</script>
