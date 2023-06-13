window.addEventListener('DOMContentLoaded', () => {
  const eventListContainer = document.getElementById('event-list-pe');
  const cartItemsElement = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  const cartPopup = document.getElementById('cart-popup');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const checkoutBtn = document.getElementById('checkout-btn');

  // Sample array of events (replace with your own data)
  const events = [
    { name: 'Hosting an event?', description: "Visit Contact Page", date: '2023-08-01', location: 'Now!', price: 250, imageUrl: 'img/pexels-sebastian-ervi-1763075.jpg' }
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
  // If the item already exists in the cart, increase its quantity if the limit is not reached
  if (cartItems[existingCartItemIndex].quantity < 5) {
    cartItems[existingCartItemIndex].quantity++;
  } else {
    // Display a message or take appropriate action when the limit is reached
    console.log('Ticket limit reached for this event!');
    return;
  }
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
    cartPopup.classList.remove('close');
  });

  // Load events and update the cart UI
  events.forEach(event => {
    const eventElement = document.createElement('div');
    // Load events and update the cart UI
events.forEach(event => {
const eventElement = document.createElement('div');

const eventTickets = cartItems.reduce((total, item) => {
  if (item.name === event.name) {
    return total - (item.quantity || 5); // Updated to include existing quantity in the cart
  }
  return total;
}, 5);

eventElement.innerHTML = `
  <img src="${event.imageUrl}" height="160px" width="170px" alt="Event Image">
  <h3>${event.name}</h3>
  <p>${event.description}</p>
  <p>Date: ${event.date}</p>
  <p>Location: ${event.location}</p>
  <p>Price: R${event.price}</p>
  <p>Tickets Available: ${eventTickets >= 0 ? eventTickets : 0}</p>
  <button data-event="${event.name}" data-price="${event.price}">Add to Cart</button>
`;

const addToCartButton = eventElement.querySelector('button');
addToCartButton.addEventListener('click', () => {
const eventName = addToCartButton.getAttribute('data-event');
const eventPrice = Number(addToCartButton.getAttribute('data-price'));

  // Add the event to the cart
  addToCart(eventName, eventPrice);
  
  // Update the tickets available count
  const updatedEventTickets = eventTickets - 1 >= 0 ? eventTickets - 1 : 0;
  eventElement.querySelector('p:last-child').textContent = `Tickets Available: ${updatedEventTickets}`;
});

eventListContainer.appendChild(eventElement);
});
updateCartUI();

    eventElement.innerHTML = `
      <img src="${event.imageUrl}" height="160px" width="170px" alt="Event Image">
      <h3>${event.name}</h3>
      <p>${event.description}</p>
      <p>Date: ${event.date}</p>
      <p>Location: ${event.location}</p>
      <p>Price: R${event.price}</p>
      <p>Tickets Available: ${eventTickets >= 0 ? eventTickets : 0}</p>
      <button data-event="${event.name}" data-price="${event.price}">Add to Cart</button>
    `;
    eventListContainer.appendChild(eventElement);
  });

  const addToCartButton = eventElement.querySelector('button');
  addToCartButton.addEventListener('click', () => {
    const eventName = addToCartButton.getAttribute('data-event');
    const eventPrice = Number(addToCartButton.getAttribute('data-price'));

    // Add the event to the cart
    addToCart(eventName, eventPrice);
    // Update the tickets available count
    eventTickets = eventTickets - 1 >= 0 ? eventTickets - 1 : 0;
    eventElement.querySelector('p:last-child').textContent = `Tickets Available: ${eventTickets}`;
  });

  updateCartUI();
});

// JavaScript code to toggle event list visibility
document.addEventListener('DOMContentLoaded', function() {
  const eventList = document.getElementById('event-list-pe');
  const toggleButton = document.getElementById('toggle-button-pe');

  toggleButton.addEventListener('click', function() {
    if (eventList.style.display === 'none') {
      eventList.style.display = 'flex';
    } else {
      eventList.style.display = 'none';
    }
  });
});
