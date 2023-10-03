import Vuex from 'vuex';

export default new Vuex.Store({
  state: {
    cart: [] // Initial cart state
  },
  mutations: {
    addToCart(state, { companyId, product, quantity,companyName }) {
      const companyOrder = state.cart.find(order => order.companyId === companyId);

      if (companyOrder) {
        const productIndex = companyOrder.items.findIndex(item => item.id === product.id);
        alert(productIndex)
        if (productIndex !== -1) {
          companyOrder.items[productIndex].quantity += quantity;
        } else {
          companyOrder.items.push({ 
            id:product.id, 
            name: product.name, // Assuming product has a name property
            quantity, 
            price: product.price // Assuming product has a price property
          });
        }
      } else {
        state.cart.push({ 
          companyId, 
          companyName, // Assuming companyId has a name property
          items: [{ 
            id:product.id, 
            name: product.name, // Assuming product has a name property
            quantity, 
            price: product.price // Assuming product has a price property
          }] 
        });
      }
    },
    removeFromCart(state, { companyId, product, quantity }) {
      const companyOrder = state.cart.find(order => order.companyId === companyId);

      if (companyOrder) {
        const productIndex = companyOrder.items.findIndex(item => item.product.id === product.id);

        if (productIndex !== -1) {
          if (companyOrder.items[productIndex].quantity > quantity) {
            companyOrder.items[productIndex].quantity -= quantity;
          } else {
            companyOrder.items.splice(productIndex, 1);
          }
        }
      }
    },
    clearCart(state) {
      state.cart = [];
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
    }
  }
});
