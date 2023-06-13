window.addEventListener('DOMContentLoaded', () => {
    const eventListContainer = document.getElementById('event-list');
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartPopup = document.getElementById('cart-popup');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const checkoutBtn = document.getElementById('checkout-btn');
  
    // Sample array of events (replace with your own data)
    const events = [
      { name: 'Event 1', description: "event description", date: '2023-06-01', location: 'Venue 1', price: 10, imageUrl: 'img/pexels-sebastian-ervi-1763075.jpg' },
      { name: 'Event 2', description: "event description", date: '2023-06-01', location: 'Venue 2', price: 10, imageUrl: 'img/pexels-wendy-wei-1190297.jpg' },
      { name: 'Event 3', description: "event description", date: '2023-06-01', location: 'Venue 3', price: 10, imageUrl: 'img/pexels-wolfgang-2747446.jpg' },
      { name: 'Event 4', description: "event description", date: '2023-06-01', location: 'Venue 4', price: 10, imageUrl: 'img/photo-1507525428034-b723cf961d3e.jpg' },
      { name: 'Event 5', description: "event description", date: '2023-06-02', location: 'Venue 5', price: 15, imageUrl: 'img/pexels-johannes-plenio-1117672.jpg' },
      { name: 'Event 6', description: "event description", date: '2023-06-02', location: 'Venue 6', price: 15, imageUrl: 'img/pexels-pixabay-459655.jpg' },
      { name: 'Event 7', description: "event description", date: '2023-06-02', location: 'Venue 7', price: 15, imageUrl: 'img/pexels-pixabay-159377.jpg' },
      { name: 'Event 8', description: "event description", date: '2023-06-02', location: 'Venue 8', price: 15, imageUrl: 'img/pexels-pixabay-277197.jpg' },
      { name: 'Event 9', description: "event description", date: '2023-06-03', location: 'Venue 9', price: 20, imageUrl: 'img/pexels-andrea-piacquadio-3760659.jpg' },
      { name: 'Event 10', description: "event description", date: '2023-06-03', location: 'Venue 10', price: 20, imageUrl: 'img/pexels-andrea-piacquadio-3771699.jpg' },
      { name: 'Event 11', description: "event description", date: '2023-06-03', location: 'Venue 11', price: 20, imageUrl: 'img/pexels-andrea-piacquadio-3785078.jpg' },
      { name: 'Event 12', description: "event description", date: '2023-06-03', location: 'Venue 12', price: 20, imageUrl: 'img/pexels-andrea-piacquadio-3807512.jpg' },
      { name: 'Event 13', description: "event description", date: '2023-06-04', location: 'Venue 13', price: 25, imageUrl: 'img/pexels-pixabay-265234.jpg' },
      { name: 'Event 14', description: "event description", date: '2023-06-04', location: 'Venue 14', price: 25, imageUrl: 'img/pexels-pixabay-534152.jpg' },
      { name: 'Event 15', description: "event description", date: '2023-06-04', location: 'Venue 15', price: 25, imageUrl: 'img/pexels-pixabay-208349.jpg' },
      { name: 'Event 16', description: "event description", date: '2023-06-04', location: 'Venue 16', price: 25, imageUrl: 'img/pexels-pixabay-416378.jpg' }
    ];
    
    const sortedEvents = [];
    for (let i = 0; i < events.length; i += 4) {
      sortedEvents.push(events.slice(i, i + 4));
    }
    
    // Load cart data from storage or initialize an empty cart
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
    // Function to update the cart UI
    function updateCartUI() {
      cartItemsElement.innerHTML = '';
      let totalPrice = 0;
  
      cartItems.forEach((cartItem, index) => {
        const li = document.createElement('li');
        li.textContent = `${cartItem.name} - R${cartItem.price}`;
        cartItemsElement.appendChild(li);
  
        // Add quantity input and remove button for each item
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = cartItem.quantity || 1;
        quantityInput.min = 1;
        quantityInput.addEventListener('input', () => {
          cartItems[index].quantity = parseInt(quantityInput.value);
          updateCartUI();
        });
        li.appendChild(quantityInput);
  
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
          cartItems.splice(index, 1);
          updateCartUI();
        });
        li.appendChild(removeButton);
  
        totalPrice += cartItem.price * (cartItem.quantity || 1);
      });
  
      cartTotalElement.textContent = `R${totalPrice.toFixed(2)}`;
  
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  
    // Function to add an event to the cart
    function addToCart(event) {
      const eventName = event.target.getAttribute('data-event');
      const eventPrice = parseFloat(event.target.getAttribute('data-price'));
      const cartItem = { name: eventName, price: eventPrice, quantity: 1 };
  
      const existingCartItemIndex = cartItems.findIndex(item => item.name === eventName);
      if (existingCartItemIndex !== -1) {
        // If the item already exists in the cart, increase its quantity
        cartItems[existingCartItemIndex].quantity++;
      } else {
        cartItems.push(cartItem);
      }
  
      updateCartUI();
    }
  
    // Event listener for the "Add to Cart" buttons
    eventListContainer.addEventListener('click', event => {
      if (event.target.matches('button[data-event][data-price]')) {
        addToCart(event);
      }
    });
  
    // Event listener for the "Buy Now" button in the cart
    checkoutBtn.addEventListener('click', () => {
      // Implement your checkout logic here
      // Redirect the user to Stripe or 
      // Replace the console.log statement below with Stripe
      console.log('Checkout button clicked!');
    });
  
    // Function to toggle the cart visibility
    function toggleCart() {
      cartPopup.classList.toggle('show');
    }
  
    // Event listener for the "Close" button in the cart
    closeCartBtn.addEventListener('click', () => {
      cartPopup.classList.remove('show');
    });
  
    // Load events and update the cart UI
    events.forEach(event => {
      const eventElement = document.createElement('div');
      eventElement.innerHTML = `
        <img src="${event.imageUrl}" height="160px" width="170px" alt="Event Image">
        <h3>${event.name}</h3>
        <p>${event.description}</p>
        <p>Date: ${event.date}</p>
        <p>Location: ${event.location}</p>
        <p>Price: R${event.price}</p>
        <button data-event="${event.name}" data-price="${event.price}">Add to Cart</button>
      `;
      eventListContainer.appendChild(eventElement);
    });
  
    updateCartUI();
  });
  
  const eventList = document.getElementById('event-list');
const toggleButton = document.getElementById('toggle-button');

toggleButton.addEventListener('click', function() {
  if (eventList.style.display === 'none') {
    eventList.style.display = 'flex';
  } else {
    eventList.style.display = 'none';
  }
});
