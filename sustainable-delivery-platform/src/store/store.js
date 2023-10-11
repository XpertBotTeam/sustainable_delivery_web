import Vuex from 'vuex';

export default new Vuex.Store({
  state: {
    cart: [], // Initial cart state
    userType:null,
    userAuth:false
  },
  mutations: {
    setUser(state,{user}){
      state.user = user;
      alert(user)
    },
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
    setInitialCart(state) {
      var myHeaders = new Headers();
      myHeaders.append("jwt", localStorage.getItem('JWT'));
    
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
    
      fetch("http://localhost:3000/user/myCart", requestOptions)
        .then(response => response.json())
        .then(result => {
          // Assuming 'result' contains the response from the server
    
          // Assuming 'result.cart' is an array of cart items from the backend
          const cartItems = result.cart.map(cartItem => {
            return {
              companyId: cartItem.companyId._id,
              companyName: cartItem.companyId.name,
              items: cartItem.items.map(item => {
                return {
                  id: item.product._id,
                  name: item.product.name,
                  quantity: item.quantity,
                  price: item.product.price
                };
              })
            };
          });
    
          // Update the cart state
          state.cart = cartItems // Assuming you have a mutation called 'setCart'
        })
        .catch(error => console.log('error', error));
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
    setInitialCart({commit}){
      commit('setInitialCart')
    },
    clearCart({ commit }) {
      commit('clearCart');
    },
    setAuth({ commit },{userAuth,userType}){
      commit('setAuth',{userAuth,userType});
    },setUser({ commit },{user}){
      commit('setUser',{user});
    }
  }
});
