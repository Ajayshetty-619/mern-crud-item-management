
const form = document.getElementById('itemForm');
const table = document.getElementById('itemTable');

// READ ITEMS
async function loadItems() {

    const response = await fetch('/items');
    const items = await response.json();

    table.innerHTML = '';

    items.forEach(item => {

        table.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.price}</td>

                <td>
                    <button class="edit"
                    onclick="editItem(${item.id})">
                    Edit</button>

                    <button class="delete"
                    onclick="deleteItem(${item.id})">
                    Delete</button>
                </td>
            </tr>
        `;

    });
}

// CREATE AND UPDATE
form.addEventListener('submit', async function(e) {

    e.preventDefault();

    const id = document.getElementById('itemId').value;

    const item = {
        name: document.getElementById('name').value,
        price: Number(document.getElementById('price').value)
    };

    if (id) {

        await fetch('/items/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });

    } else {

        await fetch('/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });

    }

    form.reset();
    document.getElementById('itemId').value = '';
    document.getElementById('submitBtn').innerText = 'Submit';

    loadItems();

});

// EDIT ITEM
async function editItem(id) {

    const response = await fetch('/items');
    const items = await response.json();

    const item = items.find(i => i.id === id);

    if (item) {
        document.getElementById('itemId').value = item.id;
        document.getElementById('name').value = item.name;
        document.getElementById('price').value = item.price;

        document.getElementById('submitBtn').innerText = 'Update';
    }

}

// DELETE ITEM
async function deleteItem(id) {

    if (confirm('Are you sure you want to delete?')) {

        await fetch('/items/' + id, {
            method: 'DELETE'
        });

        loadItems();

    }

}

// LOAD ITEMS
loadItems();
