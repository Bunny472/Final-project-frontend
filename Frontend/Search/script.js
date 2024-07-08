document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.querySelector('.search-form');
    const container = document.querySelector('.container');
    const loadingText = document.getElementById('loadingText');
    
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        loadingText.style.display = 'block'; // Show loading text
        const searchTerm = this.querySelector('input').value;
        fetchProducts(searchTerm);
    });

    function fetchProducts(searchTerm) {
        const apiUrl = `http://127.0.0.1:5000/api/merged-products?search_term=${encodeURIComponent(searchTerm)}`;
        
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                container.innerHTML = ''; // Clear previous products 
                displayProducts(data);
                // Hide loading text
                loadingText.style.display = 'none';
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                container.innerHTML = '<p>Error loading products. Please try again.</p>';
                // Hide loading text
                loadingText.style.display = 'none';
            });
    }

    function displayProducts(products) {
        if (products.length === 0) {
            container.innerHTML = '<p>No products found.</p>';
            return;
        }

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';

            const img = document.createElement('img');
            img.src = product.image_url;
            img.alt = product.name;

            const nameLink = document.createElement('a');
            nameLink.href = product.link_value;
            nameLink.textContent = product.name;
            nameLink.target = '_blank';

            const name = document.createElement('h3');
            name.appendChild(nameLink);

            const price = document.createElement('p');
            price.textContent = `Price: ${product.price} BDT`;

            card.appendChild(img);
            card.appendChild(name);
            card.appendChild(price);

            container.appendChild(card);
        });
    }
});
