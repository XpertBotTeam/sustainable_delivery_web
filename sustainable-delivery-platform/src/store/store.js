import Vuex from 'vuex';

export default new Vuex.Store({
  state: {
    cart: [], // Initial cart state
    userType:null,
    userAuth:false
  },
  mutations: {
    addToCart(state, { companyId, product, quantity,companyName }) {
      //find company
      const companyOrder = state.cart.find(order => order.companyId === companyId);

      if (companyOrder) {
        //company order found
        const productIndex = companyOrder.items.findIndex(item => item.id === product.id);
        if (productIndex !== -1) {
          //product not added to cart before so we add it
          companyOrder.items[productIndex].quantity += quantity;
        } else {
          //product ordered before so we increase quantity
          companyOrder.items.push({ 
            id:product.id, 
            name: product.name, 
            quantity, 
            price: product.price 
          });
        }
      } else {
        state.cart.push({ 
          companyId, 
          companyName, 
          items: [{ 
            id:product.id, 
            name: product.name, 
            quantity, 
            price: product.price 
          }] 
        });
      }
    },
    removeFromCart(state, { companyId, product, quantity }) {
      //finding company order
      const companyOrder = state.cart.find(order => order.companyId === companyId);

      if (companyOrder) {
        //company order found so we search for the product
        const productIndex = companyOrder.items.findIndex(item => item.product.id === product.id);

        if (productIndex !== -1) {
          //product found
          if (companyOrder.items[productIndex].quantity > quantity) {
            //quantity not zero so we just subtract quantity
            companyOrder.items[productIndex].quantity -= quantity;
          } else {
            //item is now of 0 quantity so we just remove it
            companyOrder.items.splice(productIndex, 1);
          }
        }
      }
    },
    clearCart(state) {
      state.cart = [];
    },
    setAuth(state,{userAuth,userType}){
      state.userType=userType;
      state.userAuth = userAuth
    }
  },
  actions: {
    addToCart({ commit }, { companyId, product, quantity ,companyName}) {
        alert('companyName: '+companyName)
      commit('addToCart', { companyId, product, quantity,companyName });
    },
    removeFromCart({ commit }, { companyId, product, quantity }) {
      commit('removeFromCart', { companyId, product, quantity });
    },
    clearCart({ commit }) {
      commit('clearCart');
    },
    setAuth({ commit },{userAuth,userType}){
      commit('setAuth',{userAuth,userType});
    }
  }
});
