import Vue from "vue";
import VueRouter from "vue-router";
import ListProducts from "@/components/ListProducts.vue";
import ListOrders from "@/components/ListOrders.vue";
import CreateProduct from "@/components/CreateProduct.vue";
import AddOrder from "@/components/AddOrder.vue";
import UpdateProduct from "@/components/UpdateProduct.vue";
import UpdateOrder from "@/components/UpdateOrder.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/list-products",
    name: "listProducts",
    component: ListProducts,
  },
  {
    path: "/list-orders",
    name: "listOrders",
    component: ListOrders,
  },
  {
    path: "/create-product",
    name: "CreateProduct",
    component: CreateProduct,
  },
  {
    path: "/update-product/:id",
    name: "UpdateProduct",
    component: UpdateProduct,
  },
  {
    path: "/update-order/:id",
    name: "UpdateOrder",
    component: UpdateOrder,
  },
  {
    path: "/add-order",
    name: "AddOrder",
    component: AddOrder,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
