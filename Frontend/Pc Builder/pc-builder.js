document.addEventListener('DOMContentLoaded', function () {
    const budgetForm = document.querySelector('.budget-form');
    const builderContent = document.querySelector('.builder-content');
    const loadingText = document.getElementById('loadingText');


    budgetForm.addEventListener('submit', function (event) {
        event.preventDefault();
        loadingText.style.display = 'block'; // Show loading text
         // Clear any existing content
         const existingTable = document.querySelector('.pc-build-table');
         if (existingTable) {
             existingTable.remove();
         }
        const budget = document.querySelector('#budget').value;
        fetchPCBuild(budget);
    });

    function fetchPCBuild(budget) {
        const apiUrl = `http://127.0.0.1:5000/api/pc-build?budget=${budget}`;
        
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                
                displayPCBuild(data);
                loadingText.style.display = 'none';
            })
            .catch(error =>{ console.error('Error fetching data:', error)
                loadingText.style.display = 'none';

            });
    }

    function displayPCBuild(data) {
       
        // Create table element
        const table = document.createElement('table');
        table.className = 'pc-build-table';

        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        ['Component', 'Model', 'Price in Taka'].forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement('tbody');

        // Iterate over components and add rows
        for (const [component, details] of Object.entries(data.pc_build)) {
            // Skip if the component details are null
            if (!details) continue;

            const row = document.createElement('tr');

            // Component name
            const componentName = document.createElement('td');
            componentName.textContent = component.toUpperCase();
            row.appendChild(componentName);

            // Component details
            const componentDetails = document.createElement('td');
            const componentImg = document.createElement('img');
            componentImg.src = details.img_src || 'default-image.jpg'; // Use a default image if img_src is null
            componentImg.alt = details.name || 'No details available';
            componentImg.style.width = '50px';
            componentImg.style.height = '50px';
            componentDetails.appendChild(componentImg);
            const componentNameText = document.createElement('span');
            componentNameText.textContent = details.name || 'No details available';
            componentDetails.appendChild(componentNameText);
            row.appendChild(componentDetails);

            // Component price
            const componentPrice = document.createElement('td');
            componentPrice.textContent = `${details.price !== undefined ? details.price : 'N/A'} ৳`;
            row.appendChild(componentPrice);

            tbody.appendChild(row);
        }

        table.appendChild(tbody);

        // Create table footer
        const tfoot = document.createElement('tfoot');
        const footerRow = document.createElement('tr');
        const totalLabel = document.createElement('td');
        totalLabel.setAttribute('colspan', 2);
        totalLabel.textContent = 'Total';
        footerRow.appendChild(totalLabel);

        const totalPrice = document.createElement('td');
        totalPrice.textContent = `${data.total_spent} ৳`;
        footerRow.appendChild(totalPrice);

        tfoot.appendChild(footerRow);
        table.appendChild(tfoot);

        builderContent.appendChild(table);
    }
});
