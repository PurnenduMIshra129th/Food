import react from '@vitejs/plugin-react'


const useitforlocal = 'https://abhinasfoodservices.onrender.com';
// const useitforlocal = 'http://localhost:4000';

const generateProxyPath = (path) => ({
  [path]: {
    target: useitforlocal,
    pathRewrite: { [`^${path}`]: '' },
    // secure: false
  },
});

export default {
  plugins: [react()],
  server: {
    proxy: {
      ...generateProxyPath('/api/users/signin'),
      ...generateProxyPath('/api/users/signup'),
      ...generateProxyPath('/api/users/getUsers'),
      ...generateProxyPath('/api/users/updateUser'),
      ...generateProxyPath('/api/users/updateProfile'),
      ...generateProxyPath('/api/users/getUser'),
      ...generateProxyPath('/api/users/deleteUser'),
  
      ...generateProxyPath('/api/uploads/upload'),
      ...generateProxyPath('/api/products/addProduct'),
      ...generateProxyPath('/api/products/getProduct'),
      ...generateProxyPath('/api/products/deleteProduct'),
      ...generateProxyPath('/api/products/updateProduct'),

      ...generateProxyPath('/api/orders/newOrder'),
      ...generateProxyPath('/api/orders/getOrders'),
      ...generateProxyPath('/api/orders/updateOrders'),
      ...generateProxyPath('/api/orders/deleteOrder'),
      ...generateProxyPath('/api/orders/getParticularOrder'),
      ...generateProxyPath('/api/orders/mine'),
    },
  },
};

